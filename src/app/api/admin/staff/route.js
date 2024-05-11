import { prisma } from "../../../../../config/prisma.connect";
import { NextResponse } from "next/server";
import ApiResponseDto from "../../../../../lib/apiResponseHelper";
import { getAuthUser } from "../../../../../lib/get-auth-user";

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
      authResponse.user.role !== "ADMIN" &&
      authResponse.user.management.canEdit === true
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
    const name = searchParams.get("name");
    const email = searchParams.get("email");
    const role = searchParams.get("role");
    const totalCount = await prisma.user.count();

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
    const offset = (pageNumber - 1) * take;
    if (offset >= totalCount) {
      return NextResponse.json(
        {
          message:
            "the page number you used is not available yet, use a lesser value",
        },
        { status: 400 }
      );
    }

    const getAll = await prisma.user.findMany({
      where: {
        email: email ? { contains: email } : {},
        role: role ? { equals: role.toUpperCase() } : {},
        name: name ? { contains: name } : {},
      },
      take: take,
      skip: offset,
      include: {
        personnel: {
          include: {
            poc: true
          },
        },
        management: {
          include: {
            poc: true
          },
        },
        admin: true,
      },
      orderBy: {
        createdDate: "desc",
      },
    });
    const data = ApiResponseDto({
      message: "successful",
      statusCode: 200,
      data: getAll,
      count: totalCount,
      totalPages: totalPages
    });
    return NextResponse.json(data, {
      status: 200,
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
