import { prisma } from "../../../../../config/prisma.connect";
import { NextResponse } from "next/server";
import { getAuthUser } from "../../../../../lib/get-auth-user";
import ApiResponseDto from "../../../../../lib/apiResponseHelper";

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
    if (
      authResponse.user.role !== "ADMIN" &&
      authResponse.user.management.canEdit === true
    ) {
      return NextResponse.json(ApiResponseDto({ message: "not allowed" }), {
        status: 403,
      });
    }

    const getAllCustomers = await prisma.customer.count();
    const getPoc = await prisma.pointOfConsumption.count();
    const workForce = await prisma.user.count();
    const queue = await prisma.voucher.count({
      where: {
        approvedByAdmin: false,
        availableForDispense: false,
      },
    });
    const approvedVouchers = await prisma.voucher.count({
      where: {
        approvedByAdmin: true,
        availableForDispense: true,
      },
    });
    const usedVouchers = await prisma.voucherDispense.count();
    const getD = await prisma.product.findMany({
      include: {
        _count: {
          select: {
            voucher: {
              where: {
                voucherDispense: {
                  Id: {
                    not: undefined
                  }
                },
              },
            },
          },
        },
      },
    });
    const createResponse = ApiResponseDto({
      message: "successful",
      data: {
        totalCustomers: getAllCustomers,
        totalPoc: getPoc,
        totalWorkforce: workForce,
        totalVQueue: queue,
        totalApprovedV: approvedVouchers,
        usedV: usedVouchers,
        totalDispensedVouchers: getD.map(v => ({
            productName: v.productName,
            voucherAllocation: v.voucherAllocation,
            unit: v.unit,
            totalDispensedVouchers: Number(v._count.voucher) * Number(v.voucherAllocation),
        }))
      },
      statusCode: 200,
    });
    return NextResponse.json(createResponse, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: err.message, status: 500 });
  }
}
