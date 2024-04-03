import { NextResponse } from "next/server";
import { prisma } from "../../../../../config/prisma.connect";
import ApiResponseDto from "../../../../../lib/apiResponseHelper";
import { prismaErrorHelper } from "../../../../../lib/prisma-error-helper";
import { getAuthUser } from "../../../../../lib/get-auth-user";

export async function PATCH(req, context) {
  try {
    const authResponse = getAuthUser(req, prisma, true);
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
    const getUserId = params.customerId;
    const email = searchParams.get("email");
    const name = searchParams.get("name");
    const phoneNumber = searchParams.get("phoneNumber");
    const addJ = {
      email: email ? email : undefined,
      name: name ? name : undefined,
      phoneNumber: phoneNumber ? phoneNumber : undefined,
    };
    const editCustomerData = await prisma.customer.update({
      where: {
        customerId: getUserId,
      },
      data: addJ,
    });
    return NextResponse.json(
      ApiResponseDto({
        statusCode: 200,
        data: editCustomerData,
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

export async function GET(req, context) {
  try {
    const userResponse = await getAuthUser(req, prisma, true);
    if (userResponse.error) {
      return NextResponse.json(
        ApiResponseDto({
          statusCode: userResponse.status,
          message: userResponse.error.message,
        }),
        { status: userResponse.status }
      );
    }
    if (authResponse.user.role !== "ADMIN") {
      return NextResponse.json(ApiResponseDto({ message: "not allowed" }), {
        status: 403,
      });
    }
    const { params } = context;
    const getUserId = params.customerId;
    const getCustomer = await prisma.customer.findUnique({
      where: {
        customerId: getUserId,
      },
      include: {
        poc: true,
        user: true,
        Voucher: true,
      },
    });
    if (!getCustomer) {
      return NextResponse.json(
        ApiResponseDto({
          statusCode: 404,
          message: "Customer details not found",
        }),
        { status: 200 }
      );
    }
    return NextResponse.json(
      ApiResponseDto({
        statusCode: 200,
        data: mapCustomer(getCustomer),
        message: "Successful",
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

function mapCustomer(customer) {
  return {
    id: customer.customerId,
    name: customer.name,
    email: customer.email,
    phoneNumber: customer.phoneNumber,
    createdAt: customer.createdAt,
    createdByAdmin: customer.user.name,
    createdByAdminId: customer.user.id,
    createdByEmail: customer.user.email,
    vouchers: customer.Voucher.map((voucher) => ({
      voucherId: voucher.voucherId,
      voucherCode: voucher.voucherCode,
      collected: voucher.collected,
      thirdParty: voucher.thirdParty,
      product: {
        id: voucher.product.id,
        productName: voucher.product.productName,
        createdAt: voucher.product.createdAt,
        pointOfConsumption: voucher.product.PointOfConsumption.map((poc) => ({
          pocId: poc.pocId,
          address: poc.address,
          name: poc.name,
          phoneNumber: poc.phoneNumber,
          email: poc.email,
          stockLimit: poc.stockLimit,
          stockAvailable: poc.stockAvailable,
        })),
      },
    })),
  };
}

export async function DELETE(req, context) {
  try {
    const authResponse = getAuthUser(req, prisma, true);
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
    const getUserId = params.customerId;
    const getCustomer = await prisma.customer.findUnique({
      where: {
        customerId: getUserId,
      },
      include: {
        poc: true,
        user: true,
        Voucher: true,
      },
    });
    if (!getCustomer) {
      return NextResponse.json(
        ApiResponseDto({
          statusCode: 404,
          message: "customer details not found",
        }),
        { status: 200 }
      );
    }
    await prisma.customer.delete({
      where: {
        customerId: getUserId,
      },
      include: {
        poc: true,
        Voucher: true,
      },
    });
    return NextResponse.json(
      ApiResponseDto({
        statusCode: 200,
        message: "successfully deleted customer",
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
