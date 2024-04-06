import { prisma } from "../../../../../config/prisma.connect";
import { NextResponse } from "next/server";
import { getAuthUser } from "../../../../../lib/get-auth-user";
import ApiResponseDto from "../../../../../lib/apiResponseHelper";
import { product } from "../../../../../public/dummy";

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

    if (authResponse.user.role !== "ADMIN") {
      return NextResponse.json(ApiResponseDto({ message: "not allowed" }), {
        status: 403,
      });
    }
    const searchParams = req.nextUrl.searchParams;
    const name = searchParams.get("name");
    const email = searchParams.get("email");
    const role = searchParams.get("role");
    const totalCount = await prisma.user.count();
    const getAll = await prisma.user.findMany({
      where: {
        email: email ? { contains: email } : {},
        role: role ? { equals: role.toUpperCase() } : {},
        name: name ? { contains: name } : {},
      },
      include: {
        Product: true,
        Customer: true,
        personnel: {
          include: {
            poc: true,
          },
        },
        Management: {
          include: {
            poc: true,
          },
        },
        Admin: {
          include: {
            VoucherDispense: true,
            poc: true,
          },
        },
      },
      orderBy: {
        createdDate: "desc",
      },
    });
    const data = ApiResponseDto({
      message: "successful",
      statusCode: 200,
      data: mapAllStaff(getAll),
      count: totalCount,
    });
    return NextResponse.json(data, {
      status: 201,
    });
  } catch (err) {
    return NextResponse.json({ message: err.message, status: 500 });
  }
}

function mapAllStaff(data) {
  return data.map((v) => {
    switch (v.role) {
      case "PERSONNEL":
        const getPPoc = v.personnel?.flatMap((v) => v.poc) || [];
        return {
          id: v.id,
          name: v.name,
          role: v.role,
          phoneNumber: v.phoneNumber,
          createdAt: v.createdAt,
          createdBy: v.createdBy,
         poc: getPPoc.map((p) => ({
            id: p.id,
            name: p.name,
            address: p.address,
            phoneNumber: p.phoneNumber,
            stockAvailable: p.stockAvailable,
            stockLimit: p.stockLimit,
            createdAt: p.createdAt,
          })),
        };
      case "MANAGEMENT":
        const getMPoc = v.Management?.flatMap((v) => v.poc) || [];
        return {
          id: v.id,
          name: v.name,
          role: v.role,
          createdAt: v?.createdAt,
          phoneNumber: v.phoneNumber,
          address: v.address,
          gender: v.gender,
          poc: getMPoc.map((p) => ({
            id: p.id,
            name: p.name,
            address: p.address,
            phoneNumber: p.phoneNumber,
            stockAvailable: p.stockAvailable,
            stockLimit: p.stockLimit,
            createdAt: p.createdAt,
          })),
        };
      case "ADMIN":
        const getPoc = v.Admin?.flatMap((v) => v.poc) || [];
        return {
          id: v.id,
          name: v.name,
          role: v.role,
          createdAt: v?.createdAt,
          phoneNumber: v.phoneNumber,
          address: v.address,
          gender: v.gender,
          poc: getPoc.map((p) => ({
            id: p.id,
            name: p.name,
            address: p.address,
            phoneNumber: p.phoneNumber,
            stockAvailable: p.stockAvailable,
            stockLimit: p.stockLimit,
            createdAt: p.createdAt,
          })),
          product: v?.Product.map((v) => ({
            productId: v?.id,
            name: v.productName,
            unit: v?.unit,
            voucherAllocation: v?.voucherAllocation,
            createdAt: v?.createdAt,
          })),
        };
      default:
        return null;
    }
  });
}
