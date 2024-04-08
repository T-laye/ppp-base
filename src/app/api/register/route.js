import { NextRequest, NextResponse } from "next/server";
import { personnel_validate, signIn_validate } from "../../../../lib/validate";
import ApiResponseDto from "../../../../lib/apiResponseHelper";
import _isUserAvailable from "../../../../repo/check-user-available";
import { prisma } from "../../../../config/prisma.connect";
import hashPassword from "../../../../lib/hashHelper";
import { serialize } from "cookie";
import createAccessToken from "../../../../lib/sign-jwt";

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

  const { email, password, address, phoneNumber, name, gender, role, createdBy } = body;
  try {
    const userAvailable = await _isUserAvailable(email);
    let roleUser;
    if (!userAvailable) {
      const newUser = await prisma.$transaction(async (prisma) => {
        const createdUser = await prisma.user.create({
          data: {
            address,
            email: email?.toLowerCase(),
            gender,
            name,
            password: await hashPassword(password),
            phoneNumber,
            role,
          },
        });
        
        if (role === "ADMIN") {
          roleUser = await prisma.admin.create({
            data: {
              user: {
                connect: {
                  id: createdUser.id,
                },
              },
            },
          });
        } else if (role === "MANAGEMENT") {
          roleUser = await prisma.management.create({
            data: {
              user: {
                connect: {
                  id: createdUser.id,
                },
              },
            },
          });
        } else {
          roleUser = await prisma.personnel.create({
            data: {
              user: {
                connect: {
                  id: createdUser.id,
                },
              },
            },
          });
        }
        return createdUser;
      });

      const setToken = createAccessToken(newUser.id, newUser.email);
      const atCookie = serialize("ppp-base", setToken, {
        httpOnly: false,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "development" ? false : true,
        maxAge: 60 * 60 * 24 * 7, // expires in 1 week
        path: "/",
      });
      const createUserResponse = ApiResponseDto({
        message: "User created successfully",
        data: {
          user: newUser,
          role: {
            ...roleUser,
            type: newUser.role
          },
        },
        statusCode: 201,
      });
      return NextResponse.json(createUserResponse, {
        status: 201,
        headers: { "Set-Cookie": atCookie },
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
