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
    if (authResponse.user.role !== "ADMIN") {
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
      return NextResponse.json(
        ApiResponseDto({ message: "you are not allowed to access this route" }),
        {
          status: 403,
        }
      );
    }
    const { params } = context;
    const id = params.id;
    const getUserData = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        management: true,
        admin: true,
        personnel: true,
      },
    });
    // todo: map response
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
        data: getUserData,
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
