import { prisma } from "../../../../../../config/prisma.connect";
import { NextResponse } from "next/server";
import ApiResponseDto from "../../../../../../lib/apiResponseHelper";
import { getAuthUser } from "../../../../../../lib/get-auth-user";
import { isVoucherValidHelper } from "../../../../../../lib/hashHelper";

export async function POST(req, res) {
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
    const body = await req.json();
    const {
      pocId,
      voucherCode,
      vehicleType,
      vehicleNumber,
      thirdParty,
      thirdPartyName,
      thirdPartyPhoneNumber,
    } = body;

    const createVDispenseData = await prisma.voucherDispense.create({
      data: {
        dateUsed: new Date().toISOString(),
        vehicleNUmber: vehicleNumber,
        vehicleType: vehicleType,
        poc: {
          connect: {
            id: pocId,
          },
        },
        ...(thirdParty && thirdParty === true
          ? {
              thirdParty: thirdParty,
              thirdPartyName: thirdPartyName,
              thirdPartyPhone: thirdPartyPhoneNumber,
            }
          : undefined),
        voucher: {
          connect: {
            voucherCode: voucherCode,
          },
        },
      },
    });
    const data = ApiResponseDto({
      message: "successful",
      statusCode: 200,
      data: createVDispenseData,
    });
    return NextResponse.json(data, {
      status: 200,
    });
  } catch (err) {
    return NextResponse.json({ message: err.message, status: 500 });
  }
}

export async function GET(req, res) {
  const searchParams = req.nextUrl.searchParams;
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
    const code = searchParams.get("code");
    // verify the code
    const verifyVoucher = await isVoucherValidHelper(code);

    if (verifyVoucher.error) {
      console.log(verifyVoucher.error);
      return NextResponse.json({
        message: verifyVoucher.message,
        error: verifyVoucher.error,
      });
    }
    if (verifyVoucher.data) {
      const voucherDetail = {
        voucher: verifyVoucher.data,
        customer: {
          ...verifyVoucher.data.customer,
          image: `data:image/jpeg;base64,${verifyVoucher.data.customer?.profilePicture?.toString(
            "base64"
          )}`,
        },
        product: verifyVoucher.data.product
      };
      delete verifyVoucher.data.customer.profilePicture;
      return NextResponse.json(
        ApiResponseDto({
          message: "successful",
          data: voucherDetail,
          statusCode: 200,
        }),
        { status: 200 }
      );
    }
  } catch (err) {
    return NextResponse.json({ message: err.message, status: 500 });
  }
}
