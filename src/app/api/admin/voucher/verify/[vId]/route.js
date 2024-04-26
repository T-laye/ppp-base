import { getAuthUser } from "../../../../../../../lib/get-auth-user";
import { NextResponse } from "next/server";
import ApiResponseDto from "../../../../../../../lib/apiResponseHelper";
import { prisma } from "../../../../../../../config/prisma.connect";

export async function PATCH(req, context) {
  try {
    const authResponse = await getAuthUser(req, false);
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
      return NextResponse.json(ApiResponseDto({ message: "not allowed" }), {
        status: 403,
      });
    }
    const { params } = context;
    const getVoucherId = params.vId;
    const findV = await prisma.voucher.findUnique({
      where: {
        id: getVoucherId,
      },
    });

    if (findV) {
      await prisma.voucher.update({
        where: {
          id: findV.id,
        },
        data: {
          approvedByAdmin: true,
        },
      });
    }
  } catch (err) {
    return NextResponse.json({ message: err.message, status: 500 });
  }
}
