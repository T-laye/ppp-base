import { getAuthUser } from "../../../../../../../lib/get-auth-user";
import { NextResponse } from "next/server";
import ApiResponseDto from "../../../../../../../lib/apiResponseHelper";
import { prisma } from "../../../../../../../config/prisma.connect";
import { sendVoucherEmailNotification } from "../../route";

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
      include: {
        customer: true,
      },
    });

    if (findV) {
      await prisma.voucher.update({
        where: {
          id: findV.id,
        },
        data: {
          approvedByAdmin: true,
          availableForDispense: true,
          is3FirstTime: false,
          is4FirstTime: false,
        },
      });
      // send the email for voucher notification
      await sendVoucherEmailNotification({
        customerName: findV.customer.name,
        email: findV.customer.email,
        voucherCode: findV.voucherCode,
      });
    }
  } catch (err) {
    return NextResponse.json({ message: err.message, status: 500 });
  }
}

export async function GET(req, context) {
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
    if (
      authResponse.user.role !== "ADMIN" &&
      authResponse.user.management.canEdit === true
    ) {
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
      include: {
        customer: true,
        product: true,
      },
    });

    if (!findV) {
      return NextResponse.json(
        { message: "the voucher id is not available", status: 404 },
        { status: 404 }
      );
    }
    const data = ApiResponseDto({
      message: "successful",
      statusCode: 200,
      data: findV,
    });
    return NextResponse.json(data, {
      status: 200,
    });
  } catch (err) {
    return NextResponse.json({ message: err.message, status: 500 });
  }
}
