import { NextResponse } from "next/server";
import { prisma } from "../../../../config/prisma.connect";
import ApiResponseDto from "../../../../lib/apiResponseHelper";
import { getAuthUser } from "../../../../lib/get-auth-user";

export async function POST(req, res) {
  try {
    const authRes = await getAuthUser(req, true);
    if (authRes?.user?.role !== "ADMIN") {
      return NextResponse.json(
        ApiResponseDto({
          statusCode: 400,
          data: undefined,
          message: "not allowed, contact admin",
        }),
        { status: 400 }
      );
    }
    const body = await req.json();
    const { name, unit, voucherAllocation, pocId } =
      body;
    const createProduct = await prisma.product.create({
      data: {
        productName: name.toLowerCase(),
        unit,
        voucherAllocation: Number(voucherAllocation),
        ...(pocId
          ? {
              poc: {
                connect: {
                  id: pocId,
                },
              },
            }
          : undefined),
        user: {
          connect: {
            id: authRes.user.id,
          },
        },
      },
    });
    const createResponse = ApiResponseDto({
      message: "successful",
      data: createProduct,
      statusCode: 201,
    });
    return NextResponse.json(createResponse, {
      status: 201,
    });
  } catch (err) {
    return NextResponse.json({ message: err.message, status: 500 });
  }
}

export async function GET(req, res) {
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
    const searchParams = req.nextUrl.searchParams;
    const pageNumber = parseInt(searchParams.get("pageNumber"));
    const createdBy = searchParams.get("createdBy");
    const name = searchParams.get("name");
    const order = searchParams.get("order");
    const take = searchParams.get("take")
      ? parseInt(searchParams.get("take"))
      : 10;
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
    const totalCount = await prisma.product.count();
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
    const getAllProducts = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        voucher: true,
        poc: true,
        user: true,
      },
      take: take,
      skip: offset,
      where: {
        createdBy: createdBy ? createdBy : {},
        productName: name ? { contains: name } : {},
      },
    });
    const resData = ApiResponseDto({
      message: "successful",
      data: getAllProducts.map((v) => ({
        productId: v?.id,
        name: v.productName,
        unit: v?.unit,
        stockLimit: v?.stockLimit,
        stockAvailable: v?.stockAvailable,
        poc_id: v?.poc?.id,
        poc_name: v?.poc?.name,
        poc_address: v?.poc?.address,
        poc_phoneNumber: v?.poc?.phoneNumber,
        poc_stockAvailable: v?.poc?.stockAvailable,
        poc_stockLimit: v?.poc?.stockLimit,
        poc_createdAt: v?.poc?.createdAt,
        voucher: v.voucher.map((v) => ({
          voucherCode: v?.voucherCode,
          createdDate: v?.createdAt,
          collectionStatus: v?.collected,
          customerId: v?.customerId,
          id: v?.voucherId,
        })),
      })),
      count: totalCount,
      totalPages: totalPages,
      statusCode: 200,
    });
    return NextResponse.json(resData, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: err.message, status: 500 });
  }
}
