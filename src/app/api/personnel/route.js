import { prisma } from "../../../../config/prisma.connect";
import { NextResponse } from "next/server";
import { getAuthUser } from "../../../../lib/get-auth-user";

export async function GET(req, res) {
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
    const searchParams = req.nextUrl.searchParams;
    const createdBy = searchParams.get("createdBy");
    const name = searchParams.get("name");
    const email = searchParams.get("email");
    const totalCount = await prisma.personnel.count();
    const getAllPersonnel = await prisma.personnel.findMany({
      where: {
        createdBy: createdBy ? createdBy : {},
        user: {
          email: email ? { contains: email } : {},
          name: name ? { contains: name } : {},
        },
      },
      include: {
        user: true,
        createdBy: true,
        poc: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    const resData = ApiResponseDto({
      message: "successful",
      data: getAllPersonnel.map((v) => ({
        personnelId: v?.personnelId,
        personnelUserId: v?.user.id,
        createdAt: v?.createdAt,
        name: v.user.name,
        phoneNumber: v?.user.phoneNumber,
        email: v?.user.email,
        createdAt: v?.createdAt,
        createdById: v?.createdById,
        createdByName: v?.createdBy.name,
        createdByRole: v?.createdBy.role,
        createdByEmail: v?.createdBy.email,
        poc: v?.poc.map((v) => ({
          name: v?.name,
          address: v?.address,
          phoneNumber: v?.phoneNumber,
          stockAvailable: v?.stockAvailable,
          stockLimit: v?.stockLimit,
          createdAt: v?.createdAt,
        })),
      })),
      statusCode: 200,
      count: totalCount,
    });
    return NextResponse.json(resData, {
      status: 201,
    });
  } catch (err) {
    return NextResponse.json({ message: err.message, status: 500 });
  }
}
