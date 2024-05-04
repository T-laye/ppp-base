import { NextResponse } from "next/server";
import { prisma } from "../../../../../config/prisma.connect";
import { getAuthUser } from "../../../../../lib/get-auth-user";
import ApiResponseDto from "../../../../../lib/apiResponseHelper";

export async function GET(req, context) {
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
    const { params } = context;
    const getProductId = params.productId;
    const getProductById = await prisma.product.findUnique({
      where: {
        id: getProductId,
      },
      include: {
        voucher: true,
        poc: true,
        user: true,
      },
    });
    if (!getProductById) {
      return NextResponse.json(
        ApiResponseDto({
          statusCode: 404,
          message: "product details not found",
        }),
        { status: 200 }
      );
    }
    return NextResponse.json(
      ApiResponseDto({
        statusCode: 200,
        data: getProductById,
        message: "Successful",
      }),
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: err.message, error: err },
      { status: 500 }
    );
  }
}

export async function PATCH(req, context) {
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
    const searchParams = req.nextUrl.searchParams;
    const { params } = context;
    const getProductId = params.productId;
    const name = searchParams.get("productName");
    const unit = searchParams.get("unit");
    const voucherAllocation = searchParams.get("voucherAllocation");
    const pocId = searchParams.get("pocId");
    const stockAvailable = Number(searchParams.get("stockAvailable"));
    const stockLimit = Number(searchParams.get("stockLimit"));
    const addJ = {
      productName: name ? name : undefined,
      unit: unit ? unit : undefined,
      voucherAllocation: voucherAllocation
        ? Number(voucherAllocation)
        : undefined,
      stockAvailable: stockAvailable ? stockAvailable : undefined,
      stockLimit: stockLimit ? stockLimit : undefined,
    };

    const updateProduct = await prisma.product.update({
      where: {
        id: getProductId,
      },
      data: {
        ...addJ,
        ...(pocId ? { poc: { connect: { id: pocId } } } : undefined),
      },
    });
    return NextResponse.json(
      ApiResponseDto({
        statusCode: 200,
        data: updateProduct,
        message: "successful",
      }),
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: err.message, error: err },
      { status: 500 }
    );
  }
}

export async function DELETE(req, context) {
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
    const { params } = context;
    const getProductId = params.productId;
    const getProductById = await prisma.product.findUnique({
      where: {
        id: getProductId,
      },
    });
    if (!getProductById) {
      return NextResponse.json(
        ApiResponseDto({
          statusCode: 404,
          message: "product details not found",
        }),
        { status: 200 }
      );
    }
    await prisma.product.delete({
      where: {
        id: getProductId,
      },
    });
    return NextResponse.json(
      ApiResponseDto({
        statusCode: 200,
        message: "Successfully deleted product",
      }),
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: err.message, error: err },
      { status: 500 }
    );
  }
}
