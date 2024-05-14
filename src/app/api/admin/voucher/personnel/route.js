import { getAuthUser } from "../../../../../../lib/get-auth-user";
import { NextResponse } from "next/server";
import { prisma } from "../../../../../../config/prisma.connect";

export async function GET() {
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

    const getPId = getP.personnel?.find((p) => p?.userId === getP?.id);
    const getUsedV = await prisma.voucherDispense.findMany({
      where: {
        verifiedBy: {
          id: getPId?.id,
        },
        voucher: {
          collected: true,
        },
      },
      include: {
        voucher: true,
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
