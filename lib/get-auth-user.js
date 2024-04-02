import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "../config/prisma.connect";
import ApiResponseDto from "./apiResponseHelper";

export async function getAuthUser(req, prisma, editManagement) {
  const cookiesStore = cookies();
  const token = cookiesStore.get("ppp-base");
  const handleError = ApiResponseDto({
    message: "you are not logged in",
    data: null,
    statusCode: 401,
  });

  if (!token) return NextResponse.json(handleError, { status: 401 });

  try {
    const payload = verify(token.value, process.env.ACCESS_TOKEN_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: payload.id, email: payload.email },
      include: {
        Management: true,
        Personel: true,
      },
    });
      
    if (!user) {
      return NextResponse.json(
        ApiResponseDto({ message: "Invalid user email or password" }),
        { status: 403 }
      );
    }
      
    if (user.role === 'MANAGEMENT' && editManagement === true && user.Management[0].canEdit === false) {
      return NextResponse.json(
        {
          message: "not allowed to access this route kindly contact admin",
          statusCode: 400,
        },
        { status: 400 }
      );
    }
    return user;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: err.message, status: 500 });
  }
}
