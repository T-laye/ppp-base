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
      await prisma.email.update({
          
      })
  } catch (err) {}
}
