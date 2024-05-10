import { NextResponse } from "next/server";
import ApiResponseDto from "../../../../lib/apiResponseHelper";
import { prisma } from "../../../../config/prisma.connect";
import { getAuthUser } from "../../../../lib/get-auth-user";

export async function POST(req, res) {
  try {
    const authResponse = await getAuthUser(req, true);
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
    const body = await req.json();
    const {
      poc_name,
      phoneNumber,
      address,
      email,
      product_name,
      product_unit,
      voucher_allocation,
    } = body;
    const createPOC = await prisma.pointOfConsumption.create({
      data: {
        address,
        email,
        name: poc_name.toLowerCase(),
        phoneNumber,
        ...(product_name && product_unit
          ? {
              product: {
                create: {
                  productName: product_name.toLowerCase(),
                  unit: product_unit,
                  voucherAllocation: Number(voucher_allocation),
                  user: {
                    connect: {
                      id: authResponse.user.id,
                    },
                  },
                },
              },
            }
          : undefined),
        user: {
          connect: {
            id: authResponse.user.id,
          },
        },
      },
      include: {
        productAllocation: true
      }
    });
    const createResponse = ApiResponseDto({
      message: "poc added successfully",
      data: createPOC,
      statusCode: 201,
    });
    return NextResponse.json(createResponse, {
      status: 201,
    });
  } catch (err) {
    if (err.code === "P2002") {
      return NextResponse.json(
        { message: `the poc ${err.meta.target} already exist`, status: 409 },
        { status: 409 }
      );
    }
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
    const name = searchParams.get("name");
    const productName = searchParams.get("productName");
    const productId = searchParams.get("productId")
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
    const totalCount = await prisma.pointOfConsumption.count();
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

    const getPoc = await prisma.pointOfConsumption.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        customer: true,
        management: true,
        personnel: true,
        product: {
          include: {
            productAllocation: true
          }
        },
      },
      take: take,
      skip: offset,
      where: {
        name: name ? { contains: name } : {},
        ...(productName || productId ? {
          product: {
            some: {
            id: productId ? productId : {},
            productName: productName ? { contains: productName } : {},
          },
        }}: {})
      },
    });
    return NextResponse.json(
      {
        statusCode: 200,
        message: "successful",
        data: getPoc,
        count: totalCount,
        totalPages: totalPages
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ message: err.message, status: 500 });
  }
}
