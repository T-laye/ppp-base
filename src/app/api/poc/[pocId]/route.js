import { prisma } from "../../../../../config/prisma.connect";
import ApiResponseDto from "../../../../../lib/apiResponseHelper";
import { getAuthUser } from "../../../../../lib/get-auth-user";
import { NextResponse } from "next/server";

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
      return NextResponse.json(ApiResponseDto({ message: "not allowed" }), {
        status: 403,
      });
    }
    const { params } = context;
    const getPocId = params.pocId;
    const searchParams = req.nextUrl.searchParams;
    const email = searchParams.get("email");
    const findUser = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        Management: true,
        personnel: true,
      },
    });
    if (!findUser) {
      return NextResponse.json(ApiResponseDto({ message: "email not found" }), {
        status: 404,
      });
    }
    const updatePoc = await prisma.pointOfConsumption.update({
      where: {
        pocId: getPocId,
      },
      data: {
        ...(findUser.role === "MANAGEMENT"
          ? { managementId: findUser.id }
          : findUser.role === "PERSONNEL"
          ? { personnelId: findUser.id }
          : { adminId: findUser.id }),
      },
    });
    return NextResponse.json(
      ApiResponseDto({
        statusCode: 200,
        data: updatePoc,
        message: "successful",
      }),
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ message: err.message, status: 500 });
  }
}

export async function DELETE(req, context) {
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
      return NextResponse.json(ApiResponseDto({ message: "not allowed" }), {
        status: 403,
      });
    }
    const { params } = context;
    const getPocId = params.pocId;
    const getPocById = await prisma.pointOfConsumption.findUnique({
      where: {
        id: getPocId,
      },
      include: {
        product: true,
        admin: true,
        management: true,
        personnel: true,
        Customer: true,
      },
    });
    if (!getPocById) {
      return NextResponse.json(
        ApiResponseDto({
          statusCode: 404,
          message: "poc details not found",
        }),
        { status: 200 }
      );
    }
    await prisma.pointOfConsumption.delete({
      where: {
        pocId: getPocId,
      },
    });
    return NextResponse.json(
      ApiResponseDto({
        statusCode: 200,
        message: "successfully deleted poc",
      }),
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: err.message, error: err },
      { status: 500 }
    );
  }
}

export async function GET(req, context) {
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
      return NextResponse.json(ApiResponseDto({ message: "not allowed" }), {
        status: 403,
      });
    }
    const { params } = context;
    const getPocId = params.pocId;
    const getPocById = await prisma.pointOfConsumption.findUnique({
      where: {
        id: getPocId,
      },
      include: {
        product: true,
        admin: true,
        management: true,
        personnel: true,
        Customer: true,
      },
    });
    if (!getPocById) {
      return NextResponse.json(
        ApiResponseDto({
          statusCode: 404,
          message: "poc details not found",
        }),
        { status: 200 }
      );
    }
    return NextResponse.json(
      ApiResponseDto({
        statusCode: 200,
        data: getPocById,
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
