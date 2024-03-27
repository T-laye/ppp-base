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
    const { id, email } = payload;
    const user = await prisma.user.findUnique({
      where: { id: id, email },
      include: {
        Management: true,
        Personel: true,
      },
    });
    if (!user)
      return NextResponse.json(
        ApiResponseDto({ message: "oops, user details not found" }),
        { status: 403 }
      );
    const body = await req.json();
    const { name, c_email, phone, product, pocId, thirdParty } = body;
    const addNewVoucher = await prisma.customer.create({
      data: {
        name,
        email: c_email,
        phoneNumber: phone,
        product,
        thirdParty,
        poc: {
          connect: {
            pocId: pocId,
          },
        },
        createdBy: {
          connect: {
            id: user.id,
          },
        },
      },
    });
    const createResponse = ApiResponseDto({
      message: "successfully",
      data: addNewVoucher,
      statusCode: 201,
    });
    return NextResponse.json(createResponse, {
      status: 201,
    });
  } catch (err) {
    return NextResponse.json({ message: err.message, status: 500 });
  }
}
