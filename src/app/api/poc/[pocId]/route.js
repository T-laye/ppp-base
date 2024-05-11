import { prisma } from "../../../../../config/prisma.connect";
import ApiResponseDto from "../../../../../lib/apiResponseHelper";
import { getAuthUser } from "../../../../../lib/get-auth-user";
import { NextResponse } from "next/server";

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
    const { params } = context;
    const getPocId = params.pocId;
    const searchParams = req.nextUrl.searchParams;
    const user_email = searchParams.get("user_email");
    const email = searchParams.get("email");
    const productId = searchParams.get("productId");
    const poc_name = searchParams.get("name");
    const phoneNumber = searchParams.get("phoneNumber");
    const address = searchParams.get("address");
    const capacity = searchParams.get("capacity");
    const productValue = searchParams.get("stockAvailable");
    const stockLimit = searchParams.get("stockLimit");
    const allocationId = searchParams.get("allocationId");

    if (user_email) {
      const findUser = await prisma.user.findUnique({
        where: {
          email: user_email,
        },
        include: {
          management: true,
          personnel: true,
        },
      });
      if (!findUser) {
        return NextResponse.json(
          ApiResponseDto({ message: "email not found" }),
          {
            status: 404,
          }
        );
      }
      const getM = findUser.management.find((m) => m.userId === findUser.id);
      const getP = findUser.personnel.find((p) => p.userId === findUser.id);
      const addUserToPoc = await prisma.pointOfConsumption.update({
        where: {
          id: getPocId,
        },
        data: {
          ...(findUser.role === "MANAGEMENT"
            ? {
                management: { connect: { id: getM.id } },
              }
            : { personnel: { connect: { id: getP.id } } }),
        },
      });

      return NextResponse.json(
        ApiResponseDto({
          statusCode: 200,
          data: addUserToPoc,
          message: "successful",
        }),
        { status: 200 }
      );
    }

    const updatePoc = await prisma.pointOfConsumption.update({
      where: {
        id: getPocId,
      },
      data: {
        address: address ? address.toLowerCase() : undefined,
        email: email ? email.toLowerCase() : undefined,
        name: poc_name ? poc_name.toLowerCase() : undefined,
        phoneNumber: phoneNumber ? phoneNumber : undefined,
        ...(productId
          ? {
              productAllocation: {
                ...(allocationId
                  ? {
                      update: {
                        where: {
                          id: allocationId,
                        },
                        data: {
                          capacity: capacity ? Number(capacity) : undefined,
                          stockAvailable: productValue
                            ? Number(productValue)
                            : undefined,
                          stockLimit: stockLimit
                            ? Number(stockLimit)
                            : undefined,
                        },
                      },
                    }
                  : {
                      create: {
                        capacity: capacity ? Number(capacity) : undefined,
                        stockLimit: stockLimit ? Number(stockLimit) : undefined,
                        stockAvailable: productValue
                          ? Number(productValue)
                          : undefined,
                        product: {
                          connect: {
                            id: productId,
                          },
                        },
                      },
                    }),
              },
            }
          : undefined),
      },
    });
    return NextResponse.json(
      ApiResponseDto({
        statusCode: 200,
        data: updatePoc,
        message: "successful",
      }),
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ message: err.message, status: 500 });
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
    if (
      authResponse.user.role !== "ADMIN" &&
      authResponse.user.management.canEdit === true
    ) {
      return NextResponse.json(ApiResponseDto({ message: "not allowed" }), {
        status: 403,
      });
    }
    const { params } = context;
    const getPocId = params.pocId;
    const getPocById = await prisma.pointOfConsumption.findUnique({
      where: {
        id: getPocId,
      },
    });
    if (!getPocById) {
      return NextResponse.json(
        ApiResponseDto({
          statusCode: 404,
          message: "poc details not found",
        }),
        { status: 200 }
      );
    }
    await prisma.pointOfConsumption.delete({
      where: {
        id: getPocId,
      },
    });
    return NextResponse.json(
      ApiResponseDto({
        statusCode: 200,
        message: "successfully deleted poc",
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
    if (authResponse.user.role === "CUSTOMER") {
      return NextResponse.json(ApiResponseDto({ message: "not allowed" }), {
        status: 403,
      });
    }
    const { params } = context;
    const getPocId = params.pocId;
    const getPocById = await prisma.pointOfConsumption.findUnique({
      where: {
        id: getPocId,
      },
      include: {
        management: {
          include: {
            user: true
          }
        },
        personnel: {
          include: {
            user: true
          }
        },
        user: true,
        productAllocation: {
          include: {
            product: true,
          },
        },
      },
    });
    if (!getPocById) {
      return NextResponse.json(
        ApiResponseDto({
          statusCode: 404,
          message: "poc details not found",
        }),
        { status: 200 }
      );
    }
    return NextResponse.json(
      ApiResponseDto({
        statusCode: 200,
        data: getPocById,
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
