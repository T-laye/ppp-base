import { NextResponse } from "next/server";
import ApiResponseDto from "../../../../../lib/apiResponseHelper";
import { prisma } from "../../../../../config/prisma.connect";

export async function GET(req, res) {
  const searchParams = req.nextUrl.searchParams;
  try {
    const token = searchParams.get("token");
    const findCustomer = await prisma.customer.findUnique({
      where: {
        verificationToken: { contains: token },
      },
    });
    if (!findCustomer) {
      return NextResponse.json(
        ApiResponseDto({
          message: "forbidden, customer details not found",
        }),
        { status: 404 }
      );
    } else {
      const updateCustomer = await prisma.customer.update({
        where: {
          id: findCustomer.id,
        },
        data: {
          acceptTerms: true,
          emailVerified: true,
        },
      });
      return NextResponse.json({
        message: "successfully verified",
        data: updateCustomer,
      });
    }
  } catch (err) {
    return NextResponse.json(
      { message: err.message, status: 500 },
      { status: 500 }
    );
  }
}
