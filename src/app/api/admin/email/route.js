import { prisma } from "../../../../../config/prisma.connect";
import { getAuthUser } from "../../../../../lib/get-auth-user";
import { NextResponse } from "next/server";
import ApiResponseDto from "../../../../../lib/apiResponseHelper";

export async function PATCH(req, context) {
  try {
    const authResponse = await getAuthUser(req, true);
    if (authResponse.error) {
      return NextResponse.json(
        ApiResponseDto({
          statusCode: authResponse.status,
          message: authResponse.error.message,
        }),
        { status: authResponse.status }
      );
    }
    if (authResponse.user.role !== "ADMIN") {
      return NextResponse.json(
        ApiResponseDto({ message: "not allowed to access this route" }),
        {
          status: 403,
        }
      );
    }
    const searchParams = req.nextUrl.searchParams;
    const email_type = searchParams.get("type");
    const body = searchParams.get("body");
    const title = searchParams.get("title");
    const subject = searchParams.get("subject");
    const findEmail = await prisma.email.findUnique({
      where: {
        type: email_type,
      },
    });
    if (!findEmail) {
      return NextResponse.json(
        { message: "EMAIL TYPE NOT FOUND" },
        { status: 404 }
      );
    }
    const emailWhole = {
      body: body ? body : undefined,
      subject: subject ? subject : undefined,
      title: title ? title : undefined,
    };
    await prisma.email.update({
      where: {
        id: findEmail.id,
      },
      data: emailWhole,
    });
    return NextResponse.json(
      ApiResponseDto({
        statusCode: 200,
        message: "successful",
      }),
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: err.message, error: err },
      { status: 500 }
    );
  }
}

export async function POST(req, res) {
  try {
    const authResponse = await getAuthUser(req, true);
    if (authResponse.error) {
      return NextResponse.json(
        ApiResponseDto({
          statusCode: authResponse.status,
          message: authResponse.error.message,
        }),
        { status: authResponse.status }
      );
    }
    if (authResponse.user.role !== "ADMIN") {
      return NextResponse.json(
        ApiResponseDto({ message: "not allowed to access this route" }),
        {
          status: 403,
        }
      );
    }
    const post_body = await req.json();
    const { title, subject, body, type } = post_body;
    await prisma.email.create({
      data: {
        body,
        subject,
        title,
        type,
      },
    });
    const createResponse = ApiResponseDto({
      message: "successful",
      statusCode: 201,
    });
    return NextResponse.json(createResponse, {
      status: 201,
    });
  } catch (err) {
    return NextResponse.json({ message: err.message, status: 500 });
  }
}
