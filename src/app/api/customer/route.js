import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "../../../../config/prisma.connect";
import ApiResponseDto from "../../../../lib/apiResponseHelper";
import { isValidDate, formatDateToISO } from "../../../../lib/date-helper";
import { prismaErrorHelper } from "../../../../lib/prisma-error-helper";

export async function POST(req, res) {
  const cookiesStore = cookies();
  const token = cookiesStore.get("ppp-base");
  const handleError = ApiResponseDto({
    message: "you are not logged in",
    data: null,
    statusCode: 401,
  });
  if (!token) return NextResponse.json(handleError, { status: 401 });
  try {
    const payload = verify(token.value, process.env.ACCESS_TOKEN_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: payload.id, email: payload.email },
      include: {
        Management: true,
        Personel: true,
      },
    });
    if (!user || (user.role !== "ADMIN" && user.role !== "MANAGEMENT"))
      return NextResponse.json(
        ApiResponseDto({
          message: "oops, user details not found | not allowed",
        }),
        { status: 403 }
      );
    const body = await req.json();
    const { name, email, phone } = body;
    const addCustomer = await prisma.customer.create({
      data: {
        name: name.toLowerCase(),
        email,
        phoneNumber: phone,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    const createResponse = ApiResponseDto({
      message: "successfully",
      data: addCustomer,
      statusCode: 201,
    });
    prismaErrorHelper(res, addCustomer);
    return NextResponse.json(createResponse, {
      status: 201,
    });
  } catch (err) {
    return NextResponse.json({ message: err.message, status: 500 });
  }
}

export async function GET(req, res) {
  const searchParams = req.nextUrl.searchParams;
  const cookiesStore = cookies();
  const token = cookiesStore.get("ppp-base");
  const handleError = ApiResponseDto({
    message: "you are not logged in",
    data: null,
    statusCode: 401,
  });
  if (!token) return NextResponse.json(handleError, { status: 401 });
  try {
    const payload = verify(token.value, process.env.ACCESS_TOKEN_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: payload.id, email: payload.email },
      include: {
        Management: true,
        Personel: true,
      },
    });
    if (!user )
      return NextResponse.json(
        ApiResponseDto({
          message: "oops, user details not found",
        }),
        { status: 403 }
      );
    if (user.role !== "ADMIN" && user.role !== "MANAGEMENT")
      return NextResponse.json(
      ApiResponseDto({
        message: "not allowed",
      }),
      { status: 404}
    );
    const pageNumber = parseInt(searchParams.get("pageNumber"));
    const createdBy = searchParams.get("createdBy");
    const name = searchParams.get("name");
    const order = searchParams.get("order");
    const take = searchParams.get("take")
      ? parseInt(searchParams.get("take"))
      : 10;
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

    const totalCount = await prisma.customer.count();
    const totalPages = Math.ceil(totalCount / take);
    const offset = (pageNumber - 1) * totalPages;
    if (offset > totalCount) {
      return NextResponse.json(
        {
          message:
            "the page number you used is not available yet, use a lesser value",
        },
        { status: 400 }
      );
    }
    const getAllCustomer = await prisma.customer.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        Voucher: true,
        poc: true,
        user: true,
      },
      take: take,
      skip: offset,
      where: {
        createdBy: createdBy ? createdBy : {},
        name: name ? { contains: name } : {},
      },
    });
    const resData = ApiResponseDto({
      message: "successful",
      data: getAllCustomer.map((v) => ({
        customerId: v?.customerId,
        name: v.name,
        phoneNumber: v?.phoneNumber,
        email: v?.email,
        createdAt: v?.createdAt,
        createdById: v?.user.id,
        createdByName: v?.user.name,
        createdByRole: v?.user.role,
      })),
      statusCode: 200,
    });
    return NextResponse.json(resData, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: err.message, status: 500 });
  }
}
