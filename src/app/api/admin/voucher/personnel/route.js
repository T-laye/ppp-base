import { getAuthUser } from "../../../../../../lib/get-auth-user";
import { NextResponse } from "next/server";
import { prisma } from "../../../../../../config/prisma.connect";
import { endOfDay, isValid } from "date-fns";

export async function GET(req, res) {
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
    const getP = await prisma.user.findUnique({
      where: {
        id: authResponse.user.id,
      },
      include: {
        personnel: true,

      },
    });
    if (getP.role !== "PERSONNEL") {
      return NextResponse.json(
        { message: "successful, no data available" },
        { status: 200 }
      );
    }
    const customer = searchParams.get("customer");
    const date = searchParams.get("date");
    const product = searchParams.get("product_name");
    if (date && !isValid(new Date(date))) {
      return NextResponse.json(
        {
          message:
            "the date format is not correct, date is supposed to be of type YYYY-MM-DD",
          error: "invalid date format",
        },
        { status: 400 }
      );
    }

    const getPId = getP.personnel?.find((p) => p?.userId === getP?.id);
    const getUsedV = await prisma.voucherDispense.findMany({
      where: {
        ...(date
          ? {
              createdAt: {
                gte: new Date(date).toISOString(),
                lt: endOfDay(new Date(date)),
              },
            }
          : undefined),
        verifiedBy: {
          id: getPId?.id,
        },
        voucher: {
          collected: true,
          product: {
            productName: product ? { contains: product } : {},
          },
          customer: {
            name: customer ? { contains: customer } : {},
          },
        },
      },
      include: {
        voucher: {
          include: {
            customer: true,
            product: true,
          }
        },
        
      },
    });
    return NextResponse.json(
      { message: "successful", data: getUsedV },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: err.message, error: err },
      { status: 500 }
    );
  }
}
