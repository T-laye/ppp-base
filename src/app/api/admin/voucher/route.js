import { prisma } from "../../../../../config/prisma.connect";
import { NextResponse } from "next/server";
import ApiResponseDto from "../../../../../lib/apiResponseHelper";
import { getAuthUser } from "../../../../../lib/get-auth-user";
import { generateVoucherCode } from "../../../../../lib/hashHelper";
import { sendEmailHelper } from "../../../../../lib/email/email-transport";
import VoucherApprovalNotification from "../../../../../lib/email/templates/voucher-approval";
import VoucherCreationEmail from "../../../../../lib/email/templates/voucher-creation";

async function checkVoucherListAction({ productId}) {
  try {
    const vCount = await prisma.voucher.count(
      {
        where: {
          product: {
            id: productId
          }
        }
      }
    );
    if (vCount < 2 || vCount === 0) {
      return {
        data: { count: vCount },
        message: `the voucher queue is not yet complete, current count: ${vCount}`,
      };
    }
    if (vCount === 3) {
      const oldestCustomer = await prisma.voucher.findFirst({
        orderBy: { createdAt: "asc" },
        where: {
          product: {
            id: productId
          }
        },
        include: {
          customer: true,
        },
      });
      if (oldestCustomer.is3FirstTime === true) {
        const updateCustomer = await prisma.voucher.update({
          where: {
            id: oldestCustomer.id,
          },
          data: {
            availableForDispense: true,
            is3FirstTime: false,
            approvedByAdmin: true,
          },
          include: {
            customer: true,
          },
        });
        const voucherTransaction = await prisma.$transaction(async (prisma) => {
          await prisma.voucher.updateMany({
            where: {
              is3FirstTime: true,
              product: {
                id: productId
              }
            },
            data: {
              is3FirstTime: false,
            },
          });
        });

        return {
          data: { customer: updateCustomer, count: vCount },
          message: `customer with Id ${updateCustomer?.customer?.id} voucher, is ready for approval`,
        };
      }
    }
    if (vCount >= 4) {
      const last4Vouchers = await prisma.voucher.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          availableForDispense: false,
          product: {
            id: productId
          }
        },
        take: 4,
        include: {
          customer: true,
          product: true,
        },
      });

      const getInit = last4Vouchers[0]?.product?.id;
      const checkProductMatch = last4Vouchers?.every(
        (v) => v?.product?.id === getInit
      );
      if (last4Vouchers.length === 4 && checkProductMatch === true) {
        
        const oldestVoucher = last4Vouchers.reduce(
          (old, curr) => (curr.createdAt < old.createdAt ? curr : old),
          last4Vouchers[0]
        );
        const updateV = await prisma.voucher.update({
          where: {
            id: oldestVoucher.id,
          },
          data: {
            availableForDispense: true,
            is4FirstTime: false,
            approvedByAdmin: true,
          },
          include: {
            customer: true,
          },
        });
        return {
          data: { customer: updateV, count: last4Vouchers.length },
          message: `customer with Id ${updateV.customer.id} voucher, is ready for approval`,
        };
      } else {
        return {
          data: { count: last4Vouchers.length },
          message: `the voucher queue is not yet complete for product ${getInit}, current count: ${last4Vouchers.length}`,
        };
      }
    } else {
      return {
        data: { count: vCount },
        message: `the voucher queue is not yet complete, current count: ${vCount}`,
      };
    }
  } catch (err) {
    return { error: err, errMessage: err.message };
  }
}

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
    if (
      authResponse.user.role !== "ADMIN" &&
      authResponse.user.management.canEdit === true
    ) {
      return NextResponse.json(ApiResponseDto({ message: "not allowed" }), {
        status: 403,
      });
    }
    const body = await req.json();
    const { customerId, productId } = body;
    const vToken = await generateVoucherCode({
      customerId: customerId,
      product: productId,
    });
    if (vToken.error) {
      return NextResponse.json(
        { error: vToken.error, message: vToken.message },
        { status: 500 }
      );
    }
    const v = await prisma.voucher.create({
      data: {
        collected: false,
        customer: {
          connect: {
            id: customerId,
          },
        },
        product: {
          connect: {
            id: productId,
          },
        },
        voucherCode: vToken.hash.toUpperCase(),
        hashToken: vToken.token,
        createdBy: {
          connect: {
            id: authResponse.user.id,
          },
        },
      },
      include: {
        customer: true,
      },
    });
    // if (v) {
    //   await sendVoucherCreationEmail({
    //     email: v.customer.email,
    //     firstName: v.customer.name.split(" ")[0],
    //   });
    // }
    const vQueue = await checkVoucherListAction({productId: productId});
    if (vQueue?.data) {
      // if (vQueue.data.customer) {
      //   const {
      //     customer: {
      //       voucherCode,
      //       customer: { name, email },
      //     },
      //   } = vQueue.data;
      //   await sendVoucherEmailNotification({
      //     customerName: name.split(" ")[0],
      //     email: email,
      //     voucherCode: voucherCode,
      //   });
      // }
      return NextResponse.json(
        {
          message: "successful",
          statusCode: 200,
          data: {
            // voucher: v,
            queueData: vQueue?.data,
            queueMessage: vQueue.message,
          },
        },
        {
          status: 200,
        }
      );
    }
    return NextResponse.json({statusCode: 200}, {status: 200})
  } catch (err) {
    return NextResponse.json({ message: err.message, status: 500, error: err });
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
    if (
      authResponse.user.role !== "ADMIN" &&
      authResponse.user.management.canEdit === true
    ) {
      return NextResponse.json(ApiResponseDto({ message: "not allowed" }), {
        status: 403,
      });
    }
    const pageNumber = parseInt(searchParams.get("pageNumber"));
    const order = searchParams.get("order");
    const take = searchParams.get("take")
      ? parseInt(searchParams.get("take"))
      : 10;
    const product = searchParams.get("product_name");
    const collected = Boolean(searchParams.get("collected"));
    const customer = searchParams.get("customer");
    const av4D = searchParams.get("av4D");
    const totalCount = await prisma.voucher.count();
    if (take || pageNumber) {
      if (isNaN(take) || isNaN(pageNumber)) {
        return NextResponse.json(
          { message: "invalid number for take or pageNumber" },
          { status: 400 }
        );
      }
      if (pageNumber < 1) {
        return NextResponse.json({
          message: "please provide a valid page number counting from 1",
        });
      }
    }
    const boolCheck = av4D === "true" ? true : false;
    const boolCheck2 = collected === "true" ? true : false;
    const totalPages = Math.ceil(totalCount / take);
    const offset = (pageNumber - 1) * totalPages;
    if (offset > totalCount) {
      return NextResponse.json(
        {
          message:
            "the page number you used is not available yet, use a lesser value",
        },
        { status: 400 }
      );
    }
    const getAllVouchers = await prisma.voucher.findMany({
      where: {
        product: {
          productName: product ? { contains: product } : {},
        },
        customer: {
          name: customer ? { contains: customer } : {},
        },
        collected: collected ? boolCheck2 : {},
        availableForDispense: av4D ? boolCheck : {},
      },
      include: {
        customer: true,
        product: true,
      },
      take: take,
      skip: offset,
      orderBy: {
        createdAt: "desc",
      },
    });
    const data = ApiResponseDto({
      message: "successful",
      statusCode: 200,
      data: getAllVouchers,
      count: totalCount,
    });
    return NextResponse.json(data, {
      status: 200,
    });
  } catch (err) {
    return NextResponse.json({ message: err.message, status: 500 });
  }
}

export async function sendVoucherEmailNotification({
  customerName,
  voucherCode,
  email,
}) {
  await sendEmailHelper({
    email: email,
    subject: "VOUCHER APPROVAL NOTIFICATION",
    Body: VoucherApprovalNotification({
      firstName: customerName.split(" ")[0],
      voucherCode: voucherCode,
    }),
  });
}

export async function sendVoucherCreationEmail({ email, firstName }) {
  await sendEmailHelper({
    Body: VoucherCreationEmail({
      firstName: firstName,
    }),
    email: email,
    subject: "VOUCHER CREATION NOTIFICATION",
  });
}
