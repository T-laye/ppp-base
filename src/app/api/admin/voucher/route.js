import { prisma } from "../../../../../config/prisma.connect";
import { NextResponse } from "next/server";
import ApiResponseDto from "../../../../../lib/apiResponseHelper";
import { getAuthUser } from "../../../../../lib/get-auth-user";
import { generateVoucherCode } from "../../../../../lib/hashHelper";
import { sendEmailHelper } from "../../../../../lib/email/email-transport";
import VoucherApprovalNotification from "../../../../../lib/email/templates/voucher-creation";


async function checkVoucherListAction() {
  try {
    const vCount = await prisma.voucher.count();
    if (vCount < 2 || vCount === 0) {
      return {
        data: {},
        message: `the voucher queue is not yet complete, current count: ${vCount}`,
      };
    }

    if (vCount === 3) {
      const oldestCustomer = await prisma.voucher.findFirst({
        orderBy: { createdAt: "asc" },
        include: {
          customer: true,
        },
      });
      console.log(oldestCustomer)
      if (oldestCustomer.is3FirstTime === true) {
        await prisma.voucher.update({
          where: {
            id: oldestCustomer.id,
          },
          data: {
            availableForDispense: true,
            is3FirstTime: false,
          },
        });
        await sendEmailHelper({
          email: oldestCustomer.customer.email,
          subject: "VOUCHER APPROVAL NOTIFICATION",
          Body: VoucherApprovalNotification({
            firstName: oldestCustomer.customer.name.split(" ")[0],
            voucherCode: oldestCustomer.voucherCode,
          }),
        });
        await prisma.voucher.updateMany({
          where: {
            is3FirstTime: true,
          },
          data: {
            is3FirstTime: false,
          },
        });
        return {
          data: oldestCustomer,
          message: "customer voucher ready for approval",
        };
      }
    }
    if (vCount >=4) {
      const last4Vouchers = await prisma.voucher.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          availableForDispense: false,
        },
        take: 4,
        include: {
          customer: true,
          product: true,
        },
      });
      if (last4Vouchers.length === 4) {
        const oldestVoucher = last4Vouchers.reduce(
          (old, curr) => (curr.createdAt < old.createdAt ? curr : old),
          last4Vouchers[0]
        );
        await prisma.voucher.update({
          where: {
            id: oldestVoucher.id,
          },
          data: {
            availableForDispense: true,
            is4FirstTime: false,
          },
        });

        await sendEmailHelper({
          email: oldestVoucher.customer.email,
          subject: "VOUCHER APPROVAL NOTIFICATION",
          Body: VoucherApprovalNotification({
            firstName: oldestCustomer.customer.name.split(" ")[0],
            voucherCode: oldestCustomer.voucherCode,
          }),
        });
        return {
          data: oldestVoucher,
          message: "customer voucher ready for approval",
        };
      }
    } else {
      return {
        data: {},
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
        voucherCode: vToken.hash,
        hashToken: vToken.token,
        createdBy: {
          connect: {
            id: authResponse.user.id,
          },
        },
      },
    });
    const vQueue = await checkVoucherListAction();
    if (vQueue.data) {
      return NextResponse.json(
        {
          message: "successful",
          statusCode: 200,
          data: {
            voucher: v,
            queueData: vQueue.data,
            queueMessage: vQueue.message,
          },
        },
        {
          status: 200,
        }
      );
    } else {
      return NextResponse.json(
        {
          message: "successful",
          statusCode: 200,
          data: {
            voucher: v,
            queueData: vQueue.error,
            queueMessage: vQueue.errMessage,
          },
        },
        {
          status: 200,
        }
      );
    }
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
      userResponse.user.role !== "ADMIN" &&
      userResponse.user.management.canEdit === true
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
    const collected = searchParams.get("collected");
    const customer = searchParams.get("customer");
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
        collected: collected ? collected : {},
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

