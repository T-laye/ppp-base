import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import ApiResponseDto from "./apiResponseHelper";
import { prisma } from "../config/prisma.connect";

export async function getAuthUser(req, editManagement) {
  try {
    const cookiesStore = cookies();
    const token = cookiesStore.get("ppp-base");
    if (!token) {
      return {
        error: errorResponse("you are not logged in", 401),
        status: 401,
      };
    }
    const payload = verify(
      token.value,
      process.env.ACCESS_TOKEN_SECRET,
      (err, decoded) => {
        if (err) {
          return { error: err };
        }
        return { data: decoded };
      }
    );
    if (payload.error)
      return {
        error: errorResponse(
          "unauthenticated, not allowed. Kindly login or register",
          404
        ),
        status: 404,
      };
    const user = await prisma.user.findUnique({
      where: { id: payload.data.id, email: payload.data.email },
      include: {
        Management: true,
        personnel: true,
      },
    });
    if (!user)
      return {
        error: errorResponse("user not found", 404),
        status: 404,
      };
    if (
      user.role === "MANAGEMENT" &&
      editManagement === true &&
      user.Management[0].canEdit === false
    ) {
      return {
        error: errorResponse(
          "not allowed to access this route kindly contact admin",
          400
        ),
        status: 400,
      };
    }
    return { user: user };
  } catch (err) {
    return NextResponse.json({ message: err.message, status: 500 });
  }
}

function errorResponse(message, statusCode) {
  return ApiResponseDto({
    message,
    statusCode,
  });
}
