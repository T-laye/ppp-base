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
      voucherCode,
      vehicleType,
      vehicleNumber,
      thirdParty,
      thirdPartyName,
      thirdPartyPhoneNumber,
    } = body;

    const findVoucher = await prisma.voucher.findUnique({
      where: {
        voucherCode: voucherCode,
      },
    });

    if (!findVoucher) {
      NextResponse.json({ message: "the voucher is invalid" });
    }
    if (
      findVoucher.collected === true ||
      findVoucher.availableForDispense === false ||
      findVoucher.approvedByAdmin === false
    ) {
      return NextResponse.json({
        message:
          "this voucher is invalid, invalid voucher operation, theft alert",
      });
    }
    const getP = await prisma.productAllocation.findUnique({
      where: {
        id: allocationId,
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
                user: true,
              },
            },
          },
        },
      },
    });

    if (getP.stockAvailable <= getP.stockLimit) {
      const emailArr = [];
      const hasUser = !!getP?.poc?.user;
      const hasManagement = !!getP.poc.management;
      const hasPersonnel = !!getP?.poc?.personnel;

      if (hasUser) {
        emailPromises.push(
          sendEmailHelper({
            email: getP?.poc?.user.email,
            Body: ProductNotificationEmail({
              name: getP?.poc?.user.name?.split(" ")[0],
              poc: getP.poc.name,
              address: getP.poc.address,
              product: getP.product.productName,
              productAvailable: getP.stockAvailable,
              stockLimit: getP.stockLimit,
            }),
          })
        );
      }

      if (hasManagement) {
        for (const m of getP.poc.management) {
          if (m?.user) {
            emailPromises.push(
              sendEmailHelper({
                email: m.user.email,
                Body: ProductNotificationEmail({
                  name: m.user.name?.split(" ")[0],
                  poc: getP.poc.name,
                  address: getP.poc.address,
                  product: getP.product.productName,
                  productAvailable: getP.stockAvailable,
                  stockLimit: getP.stockLimit,
                }),
              })
            );
          }
        }
      }

      if (hasPersonnel) {
        emailPromises.push(
          sendEmailHelper({
            email: getP?.poc?.personnel?.user.email,
            Body: ProductNotificationEmail({
              name: getP?.poc?.personnel?.user.name?.split(" ")[0],
              poc: getP.poc.name,
              address: getP.poc.address,
              product: getP.product.productName,
              productAvailable: getP.stockAvailable,
              stockLimit: getP.stockLimit,
            }),
          })
        );
      }
      await Promise.all(emailArr);
    }

    const createVDispenseData = await prisma.voucherDispense.create({
      data: {
        dateUsed: new Date().toISOString(),
        vehicleNUmber: vehicleNumber,
        vehicleType: vehicleType,
        poc: {
          connect: {
            id: getP?.poc?.id,
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
            id: getP?.poc?.personnel?.id,
          },
        },
        voucher: {
          connect: {
            id: findVoucher.id,
          },
        },
      },
    });

    await prisma.voucher.update({
      where: {
        id: findVoucher.id,
      },
      data: {
        collected: true,
      },
    });

    const u = await prisma.productAllocation.update({
      where: {
        id: allocationId,
      },
      data: {
        stockAvailable: getP?.stockAvailable - getP?.product?.voucherAllocation,
      },
    });
    const data = ApiResponseDto({
      message: "successful",
      statusCode: 200,
      data: {
        ...createVDispenseData,
        updateProduct: u,
      },
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
      delete verifyVoucher.data.customer;
      delete verifyVoucher.data.product;
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
