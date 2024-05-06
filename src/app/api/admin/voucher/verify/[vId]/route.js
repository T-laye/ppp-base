import { getAuthUser } from "../../../../../../../lib/get-auth-user";
import { NextResponse } from "next/server";
import ApiResponseDto from "../../../../../../../lib/apiResponseHelper";
import { prisma } from "../../../../../../../config/prisma.connect";
import { sendVoucherEmailNotification } from "../../route";

export async function PATCH(req, context) {
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
    if (authResponse.user.role !== "ADMIN") {
      return NextResponse.json(ApiResponseDto({ message: "not allowed" }), {
        status: 403,
      });
    }
    const { params } = context;
    const getVoucherId = params.vId;
    const findV = await prisma.voucher.findUnique({
      where: {
        id: getVoucherId,
      },
    });

    if (!findV) {
      return NextResponse.json(
        { message: "the voucher sent does not exist" },
        { status: 404 }
      );
    }
    const updateV = await prisma.voucher.update({
      where: {
        id: findV.id,
      },
      data: {
        approvedByAdmin: true,
        availableForDispense: true,
        is3FirstTime: false,
        is4FirstTime: false,
      },
      include: {
        customer: true,
        product: true,
      },
    });
    // await sendVoucherEmailNotification({
    //   customerName: updateV.customer.name,
    //   email: updateV.customer.email,
    //   voucherCode: updateV.voucherCode,
    // });
    return NextResponse.json(
      { message: "voucher update was successful" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ message: err.message, status: 500 });
  }
}

export async function GET(req, context) {
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

    const { params } = context;
    const getVoucherId = params.vId;
    // console.log(getVoucherId);
    const findV = await prisma.voucher.findUnique({
      where: {
        id: getVoucherId,
      },
      include: {
        customer: true,
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
    });
    if (!findV) {
      return NextResponse.json(
        { message: "the voucher id is not available", status: 404 },
        { status: 404 }
      );
    }
    const data = ApiResponseDto({
      message: "successful",
      statusCode: 200,
      data: mapFindVData(findV),
    });
    return NextResponse.json(data, {
      status: 200,
    });
  } catch (err) {
    return NextResponse.json({ message: err.message, status: 500 });
  }
}

function mapFindVData(data) {
  return {
    id: data?.id,
    voucherCode: data.voucherCode,
    createdDate: data.createdAt,
    collected: data.collected,
    createdById: data.userId,
    availableForDispense: data.availableForDispense,
    approvedByAdmin: data.approvedByAdmin,
    customer: {
      id: data?.customer?.id,
      name: data.customer.name,
      email: data.customer.email,
      phoneNumber: data.customer.phoneNumber,
      address: data.customer.address,
      createdDate: data.customer.createdAt,
      createdById: data.customer.createdBy,
      verificationStatus: data.customer.emailVerified,
      profilePicture: `data:image/jpeg;base64,${data.customer?.profilePicture?.toString(
        "base64"
      )}`,
    },
    product: {
      id: data.product.id,
      name: data.product.productName,
      voucherAllocated: data.product.voucherAllocation,
      unit: data.product.unit,
      createdDate: data.product.createdAt,
      stockAvailable: data.product.stockAvailable,
      stockLimit: data.product.stockLimit,
    },
    voucherDispense: {
      Id: data?.voucherDispense?.id,
      createdDate: data?.voucherDispense?.createdAt,
      vehicleType: data?.voucherDispense?.vehicleType,
      thirdParty: data?.voucherDispense?.thirdParty,
      thirdPartyName: data?.voucherDispense?.thirdPartyName,
      thirdPartyPhone: data?.voucherDispense?.thirdPartyPhone,
      vehicleNUmber: data?.voucherDispense?.vehicleNUmber,
      dateUsed: data?.voucherDispense?.dateUsed,
      voucherId: data?.voucherDispense?.voucherId,
      pocId: data?.voucherDispense?.pocId,
      poc: {
        id: data?.voucherDispense?.poc?.id,
        address: data?.voucherDispense?.poc?.address,
        name: data?.voucherDispense?.poc?.name,
        phoneNumber: data?.voucherDispense?.poc?.phoneNumber,
        email: data?.voucherDispense?.poc?.email,
        createdAt: data?.voucherDispense?.poc?.createdAt,
        createdBy: data?.voucherDispense?.poc?.createdBy,
      },
      verifiedBy: {
        id: data?.voucherDispense?.verifiedBy?.id,
        createdAt: data?.voucherDispense?.verifiedBy?.createdAt,
        createdById: data?.voucherDispense?.verifiedBy?.createdById,
        user: {
          ...data?.voucherDispense?.verifiedBy?.user,
        },
      },
    },
  };
}

export async function DELETE(req, context) {
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
    const { params } = context;
    const getVoucherId = params.vId;
    const findV = await prisma.voucher.findUnique({
      where: {
        id: getVoucherId,
      },
    });
    if (!findV) {
      return NextResponse.json(
        { message: "the voucher id is not available", status: 404 },
        { status: 404 }
      );
    }
    await prisma.voucher.delete({
      where: {
        id: getVoucherId,
      },
    });
    return NextResponse.json(
      { message: "successfully deleted voucher" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ message: err.message, status: 500 });
  }
}
