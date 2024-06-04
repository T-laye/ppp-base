import { NextResponse } from "next/server";
import { prisma } from "../../../../../config/prisma.connect";
import ApiResponseDto from "../../../../../lib/apiResponseHelper";
import { prismaErrorHelper } from "../../../../../lib/prisma-error-helper";
import { getAuthUser } from "../../../../../lib/get-auth-user";
import { CompressImageHelper } from "../../../../../lib/compress-image-helper";

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
    if (
      authResponse.user.role !== "ADMIN" &&
      authResponse.user.management.canEdit === true
    ) {
      return NextResponse.json(ApiResponseDto({ message: "not allowed" }), {
        status: 403,
      });
    }
    const formData = await req.formData();
    const { params } = context;
    const getUserId = params.customerId;
    const email = formData.get("email");
    const pfp = formData.get("profilePicture");
    const compressedImage = pfp ? await CompressImageHelper(pfp) : undefined;
    const name = formData.get("name");
    const address = formData.get("address");
    const phoneNumber = formData.get("phoneNumber");
    const addJ = {
      email: email ? email : undefined,
      name: name ? name : undefined,
      phoneNumber: phoneNumber ? phoneNumber : undefined,
      address: address ? address : undefined,
    };
    const editCustomerData = await prisma.customer.update({
      where: {
        id: getUserId,
      },
      data: { ...addJ, profilePicture: pfp ? compressedImage : undefined },
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
    const userResponse = await getAuthUser(req, false);

    if (userResponse.error) {
      return NextResponse.json(
        ApiResponseDto({
          statusCode: userResponse.status,
          message: userResponse.error.message,
        }),
        { status: userResponse.status }
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
    const { params } = context;
    const getUserId = params.customerId;
    const getCustomer = await prisma.customer.findUnique({
      where: {
        id: getUserId,
      },
      include: {
        poc: true,
        user: true,
        voucher: true,
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
    const newCustomer = {
      ...getCustomer,
      image: `data:image/jpeg;base64,${getCustomer?.profilePicture?.toString(
        "base64"
      )}`,
    };
    delete newCustomer.profilePicture;
    return NextResponse.json(
      ApiResponseDto({
        statusCode: 200,
        data: newCustomer,
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
    id: customer.id,
    name: customer.name,
    email: customer.email,
    address: customer.address,
    phoneNumber: customer.phoneNumber,
    createdAt: customer.createdAt,
    createdBy: customer.user.name,
    createdById: customer.user.id,
    createdByEmail: customer.user.email,
    vouchers: customer.voucher.map((voucher) => ({
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
    if (
      authResponse.user.role !== "ADMIN" &&
      authResponse.user.management.canEdit === true
    ) {
      return NextResponse.json(ApiResponseDto({ message: "not allowed" }), {
        status: 403,
      });
    }
    const { params } = context;
    const getUserId = params.customerId;
    const getCustomer = await prisma.customer.findUnique({
      where: {
        id: getUserId,
      },
      include: {
        // poc: true,
        // user: true,
        // voucher: true,
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
        id: getCustomer.id,
      },
      // include: {
      //   poc: true,
      //   voucher: true,
      // },
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
