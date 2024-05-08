import { prisma } from "../../../../../../config/prisma.connect";
import { NextResponse } from "next/server";
import ApiResponseDto from "../../../../../../lib/apiResponseHelper";
import { getAuthUser } from "../../../../../../lib/get-auth-user";
import { isVoucherValidHelper } from "../../../../../../lib/hashHelper";
import { sendEmailHelper } from "../../../../../../lib/email/email-transport";
import ProductNotificationEmail from "../../../../../../lib/email/templates/product-notification";

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
      allocationId,
      productId,
      pocId,
      vehicleType,
      vehicleNumber,
      thirdParty,
      thirdPartyName,
      thirdPartyPhoneNumber,
      personnelId,
    } = body;

    const getP = await prisma.productAllocation.findUnique({
      where: {
        id: allocationId,
        poc: {
          id: pocId
        },
        product: {
          id: productId
        }
      },
      include: {
        product: true,
        poc: {
          include: {
            user: true,
            personnel: {
              include: {
                user: true,
              },
            },
            management: {
              include: {
                user: true
              }
            }
          }
        }
      }
    })

    if (
      getP.stockAvailable <=
      getP.stockLimit
    ) {
      
      const emailArr = [];
      switch (true) {
        case getP?.poc?.user:
          emailArr.push(getP?.poc?.user);
          break;
        case getP?.poc.management:
          for (const m of getP?.poc?.management) {
            if (m?.user) {
              emailArr.push(m?.user);
            }
          }
          break;
        case getP?.poc?.personnel:
          emailArr.push(getP?.poc?.personnel?.user);
        default:
          break;
      }
      // for (const e of emailArr) {
      //   await sendEmailHelper({
      //     email: e.email,
      //     Body: ProductNotificationEmail({
      //       name: e.name?.split(" ")[0],
      //       poc: checkAvailability.product?.poc[0]?.name,
      //       address: checkAvailability?.product?.poc[0]?.address,
      //       product: checkAvailability?.product?.productName,
      //       productAvailable: checkAvailability?.product?.stockAvailable,
      //       stockLimit: checkAvailability?.product?.stockLimit,
      //     }),
      //   });
      // }
    }
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
        verifiedBy: {
          connect: {
            id: personnelId
          },
        },
        voucher: {
          connect: {
            id: checkAvailability.id,
          },
        },
      },
    });

    await prisma.productAllocation.update({
      where: {
        product: {
          id: checkAvailability.product.id
        }
      },
      data: {
        stockAvailable: getP?.stockAvailable - getP?.product?.voucherAllocation
      }
    })
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
    const verifyVoucher = await isVoucherValidHelper(code);
    if (verifyVoucher.error) {
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
        product: verifyVoucher.data.product,
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
