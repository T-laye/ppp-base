import { NextResponse } from "next/server";
import { prisma } from "../../../../../config/prisma.connect";
import { getAuthUser } from "../../../../../lib/get-auth-user";
import ApiResponseDto from "../../../../../lib/apiResponseHelper";
import hashPassword from "../../../../../lib/hashHelper";

export async function PATCH(req, context) {
  try {
    const authResponse = await (req, prisma, true);
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
    const getId = params.personnelId;
    const email = searchParams.get("email");
    const name = searchParams.get("name");
    const phoneNumber = searchParams.get("phoneNumber");
    const address = searchParams.get("address");
    const gender = searchParams.get("gender");
    const role = searchParams.get("role");
    const password = searchParams.get("password");
    const getPersonnel = await prisma.user.update({
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
              Management: {
                connect: {
                  user: {
                    id: getId,
                  },
                },
              },
            }
          : {
              Admin: {
                connect: {
                  user: {
                    id: getId,
                  },
                },
              },
            }),
      },
    });
    if (role) {
      await prisma.personnel.delete({
        where: {
          user: getId,
        },
      });
    }
    return NextResponse.json(
      ApiResponseDto({
        statusCode: 200,
        data: getPersonnel,
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
    const authResponse = await getAuthUser(req, prisma, true);
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
    const getId = params.personnelId;
    const getCustomer = await prisma.personnel.findUnique({
      where: {
        personnelId: getId,
      },
      include: {
        user: true,
        personnelPerformance: true,
        Product: true,
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

export async function GET() {
  try {
    const authResponse = await getAuthUser(req, prisma, true);
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
    const id = params.personnelId;
    const getPersonnelData = await prisma.personnel.findUnique({
      where: {
        personnelId: id,
      },
      include: {
        createdBy: true,
        user: true,
        poc: true,
      },
    });
    if (!getPersonnelData) {
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
        data: getPersonnelData,
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
