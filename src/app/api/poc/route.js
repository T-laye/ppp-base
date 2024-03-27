import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import ApiResponseDto from "../../../../lib/apiResponseHelper";
import { prisma } from "../../../../config/prisma.connect";

export async function POST(req, res) {
  try {
    const cookiesStore = cookies();
    console.log(cookiesStore);
    const token = cookiesStore.get("ppp-base");
    const handleError = ApiResponseDto({
      message: "you are not logged in",
      data: null,
      statusCode: 401,
    });
    if (!token) return NextResponse.json(handleError, { status: 401 });
    const payload = verify(token.value, process.env.ACCESS_TOKEN_SECRET);
    const { id, email } = payload;
    const user = await prisma.user.findUnique({
      where: { id: id, email },
      include: {
        Management: true,
        Personel: true,
      },
    });
    if (user.role !== "ADMIN") {
      return NextResponse.json(ApiResponseDto({ message: "not allowed" }), {
        status: 403,
      });
    }
    if (!user)
      return NextResponse.json(
        ApiResponseDto({ message: "oops, user details not found" }),
        { status: 403 }
      );

    const body = await req.json();
    const {
      name,
      phoneNumber,
      address,
      p_email,
      product,
      stockLimit,
      stockAvailable,
    } = body;
    const createPOC = await prisma.pointOfConsumption.create({
      data: {
        address,
        email: p_email,
        name,
        phoneNumber,
        productType: product,
        stockAvailable,
        stockLimit,
        admin: {
          connect: {
            adminId: user.id,
          },
        },
      },
    });
    const createResponse = ApiResponseDto({
      message: "poc added successfully",
      data: createPOC,
      statusCode: 201,
    });
    return NextResponse.json(createResponse, {
      status: 201,
    });
  } catch (err) {
    return NextResponse.json({ message: err.message, status: 500 });
  }
}
