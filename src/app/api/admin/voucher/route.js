import { prisma } from "../../../../../config/prisma.connect";
import { NextResponse } from "next/server";
import ApiResponseDto from "../../../../../lib/apiResponseHelper";
import { getAuthUser } from "../../../../../lib/get-auth-user";
import { generateVoucherCode } from "../../../../../lib/hashHelper";

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
    // set timeout to run the check on the database
    //get the customer that is ready for voucher collection
    // now send an email with the voucher code to the customer
    return NextResponse.json(
      { message: "successful", data: v },
      {
        status: 200,
      }
    );
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
