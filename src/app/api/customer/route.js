import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "../../../../config/prisma.connect";
import ApiResponseDto from "../../../../lib/apiResponseHelper";

export async function POST(req, res) {
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
    // const { id, email } = payload;
    const user = await prisma.user.findUnique({
      where: { id: payload.id, email: payload.email },
      include: {
        Management: true,
        Personel: true,
      },
    });
    if (!user || user.role !== 'ADMIN')
      return NextResponse.json(
        ApiResponseDto({ message: "oops, user details not found | not allowed" }),
        { status: 403 }
      );
    const body = await req.json();
    const { name, email, phone, product, thirdParty } = body;
    const addCustomer = await prisma.customer.create({
      data: {
        name,
        email,
        phoneNumber: phone,
        product,
        thirdParty,
        createdBy: {
          connect: {
            id: user.id,
          },
        },
      },
    });
    const createResponse = ApiResponseDto({
      message: "successfully",
      data: addCustomer,
      statusCode: 201,
    });
    return NextResponse.json(createResponse, {
      status: 201,
    });
  } catch (err) {
    return NextResponse.json({ message: err.message, status: 500 });
  }
}
