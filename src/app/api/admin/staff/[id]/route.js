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
    const getM = findUser.management.find((m) => m.userId === findUser.id);
    const getP = findUser.personnel.find((p) => p.userId === findUser.id);
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
        ...(canEdit
          ? {
              management: {
                update: {
                  where: {
                    id: getM.id,
                  },
                  data: {
                    canEdit: canEdit === "true" ? true : false,
                  },
                },
              },
            }
          : undefined),

        ...(role && role === "MANAGEMENT"
          ? {
              role: role.toUpperCase(),
              management: {
                upsert: {
                  create: {
                    canEdit: false,
                  },
                  where: {
                    id: getM ? getM.id : getId,
                  },
                  update: {
                    canEdit: undefined,
                  },
                },
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
          : role === "PERSONNEL"
          ? {
              role: role,
              personnel: {
                connectOrCreate: {
                  where: {
                    id: getP.id,
                  },
                  create: {
                    createdBy: {
                      connect: {
                        id: adminId,
                      },
                    },
                  },
                },
              },
            }
          : undefined),
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
                productAllocation: {
                  include: {
                    product: true,
                  },
                },
              },
            },
          },
        },
        poc: {
          include: {
            productAllocation: {
              include: {
                product: true,
              },
            },
          },
        },
        personnel: {
          include: {
            poc: {
              include: {
                productAllocation: {
                  include: {
                    product: true,
                  },
                },
              },
            },
          },
        },
        admin: true,
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
        personnel: v.personnel?.flatMap((p) => ({
          personnelId: p.id,
          createdById: p.createdById,
          poc: {
            id: p.poc.id,
            name: p.poc.name,
            address: p.poc.address,
            phoneNumber: p.poc.phoneNumber,
            stockAvailable: p.poc.stockAvailable,
            stockLimit: p.poc.stockLimit,
            createdAt: p.poc.createdAt,
            productAllocation: p.poc.productAllocation.map((v) => ({
              ...v,
            })),
          },
        })),
      };
    case "MANAGEMENT":
      return {
        ...commonData,
        management: v.management?.flatMap((p) => ({
          id: p.id,
          createdAt: p.createdAt,
          userId: p.userId,
          canEdit: p.canEdit,
          poc: p.poc.flatMap((v) => ({
            poc_id: v.id,
            name: v.name,
            address: v.address,
            phoneNumber: v.phoneNumber,
            productAllocation: v.productAllocation.map((v) => ({
              ...v,
            })),
          })),
        })),
      };
    case "ADMIN":
      return {
        ...commonData,
        admin: { ...data.admin },
      };
    default:
      return null;
  }
}
