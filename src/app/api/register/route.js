import { NextRequest, NextResponse } from "next/server";
import { personnel_validate, signIn_validate } from "../../../../lib/validate";
import ApiResponseDto from "../../../../lib/apiResponseHelper";
import _isUserAvailable from "../../../../repo/check-user-available";
import { prisma } from "../../../../config/prisma.connect";
import hashPassword from "../../../../lib/hashHelper";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req, res) {
  const body = await req.json();
  const error = signIn_validate(body);
  const handleError = ApiResponseDto({
    message: "validation error",
    data: null,
    error: error,
    statusCode: 400,
  });

  if (Object.keys(error).length > 0)
    return NextResponse.json(handleError, { status: 400 });

  const {
    email,
    password,
    address,
    phoneNumber,
    name,
    gender,
    role,
    createdBy,
  } = body;
  try {
    const cookiesStore = cookies();

    const userAvailable = await _isUserAvailable(email);
    let userRole;
    if (!userAvailable) {
      const newUser = await prisma.$transaction(async (prisma) => {
        const createdUser = await prisma.user.create({
          data: {
            address,
            email: email?.toLowerCase(),
            gender,
            name: name.toLowerCase(),
            password: await hashPassword(password),
            phoneNumber,
            role,
          },
        });
        if (role === "ADMIN") {
          userRole = await prisma.admin.create({
            data: {
              user: {
                connect: {
                  id: createdUser.id,
                },
              },
            },
          });
        } else {
          const token = cookiesStore.get("ppp-base");
          const payload = verify(token.value, process.env.ACCESS_TOKEN_SECRET);
          switch (role) {
            case "MANAGEMENT":
              userRole = await prisma.management.create({
                data: {
                  user: {
                    connect: {
                      id: createdUser.id,
                    },
                  },
                },
              });
              break;
            default:
              userRole = await prisma.personnel.create({
                data: {
                  createdBy: {
                    connect: {
                      id: payload?.id,
                    },
                  },
                  user: {
                    connect: {
                      id: createdUser.id,
                    },
                  },
                },
              });
              break;
          }
        }
        return createdUser;
      });
      const createUserResponse = ApiResponseDto({
        message: `${newUser.role.toLowerCase()} created successfully`,
        data: {
          user: newUser,
          role: {
            ...userRole,
            type: newUser.role,
          },
        },
        statusCode: 201,
      });
      return NextResponse.json(createUserResponse, {
        status: 201,
      });
    } else {
      const userExistsResponse = ApiResponseDto({
        message: `The user with email ${email} already exists`,
        statusCode: 403,
      });
      return NextResponse.json(userExistsResponse, { status: 403 });
    }
  } catch (err) {
    return NextResponse.json({ message: err.message, status: 500 });
  }
}
