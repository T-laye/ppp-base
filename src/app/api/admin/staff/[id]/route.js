import { NextResponse } from "next/server";
import { prisma } from "../../../../../../config/prisma.connect";
import { getAuthUser } from "../../../../../../lib/get-auth-user";
import ApiResponseDto from "../../../../../../lib/apiResponseHelper";
import hashPassword from "../../../../../../lib/hashHelper";

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
      authResponse.user.management.canEdit !== true
    ) {
      return NextResponse.json(
        ApiResponseDto({ message: "not allowed to access this route" }),
        {
          status: 403,
        }
      );
    }
    const adminId = authResponse?.user?.id;
    const searchParams = req.nextUrl.searchParams;
    const { params } = context;
    const getId = params.id;
    const email = searchParams.get("email");
    const name = searchParams.get("name");
    const phoneNumber = searchParams.get("phoneNumber");
    const canEdit = searchParams.get("edit");
    const address = searchParams.get("address");
    const gender = searchParams.get("gender");
    const role = searchParams.get("role");
    const password = searchParams.get("password");

    const findUser = await prisma.user.findUnique({
      where: {
        id: getId,
      },
      include: {
        management: true,
        admin: true,
        personnel: true,
      },
    });

    if (!findUser) {
      return NextResponse.json(
        ApiResponseDto({
          statusCode: 404,
          message: "the userId does not exist",
        }),
        { status: 404 }
      );
    }

    const updateUser = await prisma.user.update({
      where: {
        id: getId,
      },
      data: {
        address: address ? address : undefined,
        email: email ? email : undefined,
        gender: gender ? gender : undefined,
        name: name ? name.toLowerCase() : undefined,
        password: password ? await hashPassword(password) : undefined,
        phoneNumber: phoneNumber ? phoneNumber : undefined,
        ...(role && role === "MANAGEMENT"
          ? {
              role: role,
              management: {
                connectOrCreate: {
                  where: {
                    id: getId,
                  },
                  create: {
                    id: getId,
                  },
                },
                ...(canEdit
                  ? {
                      update: {
                        where: {
                          id: findUser?.management[0]?.id,
                        },
                        data: {
                          canEdit: canEdit,
                        },
                      },
                    }
                  : undefined),
              },
            }
          : role === "ADMIN"
          ? {
              role: role,
              admin: {
                connectOrCreate: {
                  where: {
                    id: getId,
                  },
                  create: {
                    id: getId,
                  },
                },
              },
            }
          : {
              role: role,
              personnel: {
                connectOrCreate: {
                  where: {
                    id: getId,
                  },
                  create: {
                    id: getId,
                    createdBy: {
                      connect: {
                        id: adminId,
                      },
                    },
                  },
                },
              },
            }),
      },
    });

    return NextResponse.json(
      ApiResponseDto({
        statusCode: 200,
        data: updateUser,
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
    const getId = params.id;
    const getUser = await prisma.user.findUnique({
      where: {
        id: getId,
      },
    });
    if (!getUser) {
      return NextResponse.json(
        ApiResponseDto({
          statusCode: 404,
          message: "user details not found",
        }),
        { status: 404 }
      );
    }
    await prisma.user.delete({
      where: {
        id: getId,
      },
      include: {
        admin: true,
        management: true,
        personnel: true,
      },
    });
    return NextResponse.json(
      ApiResponseDto({
        statusCode: 200,
        message: "Successfully deleted",
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
    const { params } = context;
    const id = params.id;
    const getUserData = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        management: {
          include: {
            poc: {
              include: {
                product: true,
              },
            },
          },
        },
        admin: true,
        personnel: {
          include: {
            poc: {
              include: {
                product: true,
              },
            },
          },
        },
        poc: {
          include: {
            product: true,
          },
        },
      },
    });
    if (!getUserData) {
      return NextResponse.json(
        ApiResponseDto({
          statusCode: 404,
          message: "user details not found",
        }),
        { status: 404 }
      );
    }
    console.log(getUserData.management[0].poc)
    return NextResponse.json(
      ApiResponseDto({
        statusCode: 200,
        data: mapSingleStaff(getUserData),
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

function mapSingleStaff(data) {
  const v = data;

  const commonData = {
    userId: v.id,
    name: v.name,
    email: v.email,
    emailVerification: v.emailVerified,
    role: v.role,
    phoneNumber: v.phoneNumber,
    createdAt: v.createdAt,
    address: v.address,
    gender: v.gender,
  };

  switch (v.role) {
    case "PERSONNEL":
      return {
        ...commonData,
        personnel_poc_data: v.personnel?.flatMap((p) => ({
          personnelId: p.id,
          createdAt: p.createdAt,
          personnelUserId: p.userId,
          createdById: p.createdById,
          poc_id: p.poc.id,
          poc_name: p.poc.name,
          poc_address: p.poc.address,
          poc_phoneNumber: p.poc.phoneNumber,
          poc_stockAvailable: p.poc.stockAvailable,
          poc_stockLimit: p.poc.stockLimit,
          poc_createdAt: p.poc.createdAt,
          poc_products: p.poc.product.map((v) => ({
            product_id: v.id,
            product_name: v.productName,
            product_voucher_allocation: v.voucherAllocation,
            product_unit: v.unit,
            product_createdDate: v.createdAT,
            product_updatedAt: v.updatedAt,
            product_createdById: v.createdById,
          })),
        })),
      };
    case "MANAGEMENT":
      return {
        ...commonData,
        management: v.management?.flatMap((p) => ({
          management_id: p.id,
          createdAt: p.createdAt,
          userId: p.userId,
          canEdit: p.canEdit,
          poc: p.poc.flatMap((v) => ({
            poc_id: p.id,
            name: v.name,
            address: v.address,
            phoneNumber: v.phoneNumber,
            stockAvailable: v.stockAvailable,
            stockLimit: v.stockLimit,
            createdAt: v.createdAt,
            products: v.product.map((v) => ({
              product_id: v.id,
              product_name: v.productName,
              product_voucher_allocation: v.voucherAllocation,
              product_unit: v.unit,
              product_createdDate: v.createdAT,
              product_updatedAt: v.updatedAt,
              product_createdById: v.createdById,
            })),
          })),
        })),
      };
    default:
      return null;
  }
}
