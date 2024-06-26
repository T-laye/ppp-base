import { prisma } from "../../../../../config/prisma.connect";
import { NextResponse } from "next/server";
import ApiResponseDto from "../../../../../lib/apiResponseHelper";
import { getAuthUser } from "../../../../../lib/get-auth-user";
import { generateVoucherCode } from "../../../../../lib/hashHelper";
import { sendEmailHelper } from "../../../../../lib/email/email-transport";
import VoucherApprovalNotification from "../../../../../lib/email/templates/voucher-approval";
import VoucherCreationEmail from "../../../../../lib/email/templates/voucher-creation";
import { endOfDay, isValid } from "date-fns";

async function checkVoucherListAction({ productId }) {
  try {
    const vCount = await prisma.voucher.count({
      where: {
        product: {
          id: productId,
        },
      },
    });

    if (vCount === 3) {
      const oldestCustomer = await prisma.voucher.findFirst({
        orderBy: { createdAt: "asc" },
        where: {
          product: {
            id: productId,
          },
          availableForDispense: false,
          approvedByAdmin: false,
        },
        include: {
          customer: true,
        },
      });
      if (oldestCustomer) {
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
        return {
          data: { customer: updateCustomer, count: vCount },
          message: `customer with Id ${updateCustomer?.customer?.id} voucher, is ready for approval`,
        };
      }
    }
    if (vCount === 5) {
      const last5Vouchers = await prisma.voucher.findMany({
        orderBy: {
          createdAt: "asc",
        },
        where: {
          availableForDispense: false,
          approvedByAdmin: false,
          product: {
            id: productId,
          },
        },
        take: 4,
        include: {
          customer: true,
          product: true,
        },
      });
      const getInit = last5Vouchers[0]?.product?.id;
      const checkProductMatch = last5Vouchers?.every(
        (v) => v?.product?.id === getInit
      );

      if (last5Vouchers.length === 4 && checkProductMatch === true) {
        const oldestVoucher = last5Vouchers.reduce(
          (old, curr) => (curr.createdAt < old.createdAt ? curr : old),
          last5Vouchers[0]
        );

        const updateV = await prisma.voucher.update({
          where: {
            id: oldestVoucher.id,
          },
          data: {
            availableForDispense: true,
            is3FirstTime: false,
            is4FirstTime: false,
            approvedByAdmin: true,
          },
          include: {
            customer: true,
          },
        });
        return {
          data: { customer: updateV, count: last5Vouchers.length },
          message: `customer with Id ${updateV.customer.id} voucher, is ready for approval`,
        };
      } else {
        return {
          data: { count: last5Vouchers.length },
          message: `the voucher queue is not yet complete for product ${getInit}, current count: ${last4Vouchers.length}`,
        };
      }
    }
    if (vCount > 5 && vCount % 2 !== 0) {
      const getAll = await prisma.voucher.findMany({
        where: {
          approvedByAdmin: false,
          availableForDispense: false,
          product: {
            id: productId,
          },
        },
        take: 4,
        include: {
          customer: true,
          product: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      });

      const getInit = getAll[0]?.product?.id;
      const checkProductMatch = getAll?.every(
        (v) => v?.product?.id === getInit
      );
      const getOld = checkProductMatch
        ? getAll.reduce(
            (old, curr) => (curr.createdAt < old.createdAt ? curr : old),
            getAll[0]
          )
        : null;
      const updateNow = await prisma.voucher.update({
        where: {
          id: getOld.id,
        },
        data: {
          availableForDispense: true,
          approvedByAdmin: true,
          is3FirstTime: false,
          is4FirstTime: false,
        },
        include: {
          customer: true,
          product: true,
        },
      });
      return {
        data: { customer: updateNow },
        message: `customer with Id ${updateNow.customer.id} voucher, is ready for approval`,
      };
    }
    return { data: { status: 200 }, message: "successful" };
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
    const { customerId, productId, note } = body;
    const getCustomer = await prisma.customer.findUnique({
      where: {
        id: customerId,
      },
    });
    if (getCustomer.acceptTerms !== true) {
      return NextResponse.json(
        {
          message: `customer with name ${getCustomer.name} is not verified. Kindly contact admin`,
          data: null,
        },
        { status: 400 }
      );
    }
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

    const check = await prisma.voucher.findFirst({
      where: { is4FirstTime: false, is3FirstTime: false },
    });
    await prisma.$transaction(async (p) => {
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
          is4FirstTime: check ? false : true,
          is3FirstTime: check ? false : true,
          note: note
        },
        include: {
          customer: true,
        },
      });

      if (v) {
        await sendVoucherCreationEmail({
          email: v.customer.email,
          firstName: v.customer.name.split(" ")[0],
        });
      }
    });
    const vQueue = await checkVoucherListAction({ productId: productId });
    if (vQueue?.data) {
      if (vQueue.data.customer) {
        const {
          customer: {
            voucherCode,
            customer: { name, email },
          },
        } = vQueue.data;
        await sendVoucherEmailNotification({
          customerName: name.split(" ")[0],
          email: email,
          voucherCode: voucherCode,
        });
      }
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
    return NextResponse.json({ statusCode: 200 }, { status: 200 });
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
    const pageNumber = parseInt(searchParams.get("pageNumber"));
    const order = searchParams.get("order");
    const take = searchParams.get("take")
      ? parseInt(searchParams.get("take"))
      : 10;
    const verifiedBy = searchParams.get("verifiedBy");
    const product = searchParams.get("product_name");
    const collected = searchParams.get("collected");
    const customer = searchParams.get("customer");
    const date = searchParams.get("date");
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
    const offset = (pageNumber - 1) * take;
    if (totalCount > 0 && offset >= totalCount) {
      return NextResponse.json(
        {
          message:
            "the page number you used is not available yet, use a lesser value",
        },
        { status: 400 }
      );
    }

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
    const getAllVouchers = await prisma.voucher.findMany({
      where: {
        ...(date
          ? {
              createdAt: {
                gte: new Date(date).toISOString(),
                lt: endOfDay(new Date(date)),
              },
            }
          : undefined),
        product: {
          productName: product ? { contains: product } : {},
        },
        customer: {
          name: customer ? { contains: customer } : {},
        },
        collected: collected ? boolCheck2 : {},
        availableForDispense: av4D ? boolCheck : {},
        ...(verifiedBy
          ? {
              voucherDispense: {
                verifiedBy: {
                  id: verifiedBy,
                },
              },
            }
          : undefined),
      },
      include: {
        customer: {
          select: {
            name: true,
            id: true,
            phoneNumber: true,
            email: true,
            address: true,
          },
        },
        product: true,
        voucherDispense: {
          include: {
            poc: true,
            verifiedBy: {
              include: {
                user: true,
              },
            },
          },
        },
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
      count: getAllVouchers.length,
      totalPages: totalPages,
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
    subject: "YOUR RFDA HAS BEEN PROCESSED",
  });
}
