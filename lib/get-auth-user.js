import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import ApiResponseDto from "./apiResponseHelper";

export async function getAuthUser(req, prisma, editManagement) {
  try {
    const cookiesStore = cookies();
    const token = cookiesStore.get("ppp-base");
    if (!token)
      return {
        error: errorResponse("you are not logged in", 401),
        status: 401,
      };
    const payload = verify(token.value, process.env.ACCESS_TOKEN_SECRET);
    if (!payload)
      return {
        error: errorResponse("unauthenticated, not allowed", 400),
        status: 400,
      };
    const user = await prisma.user.findUnique({
      where: { id: payload.id, email: payload.email },
      include: {
        Management: true,
        Personel: true,
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
    return user;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: err.message, status: 500 });
  }
}

function errorResponse(message, statusCode) {
  return ApiResponseDto({
    message,
    statusCode,
  });
}
