import { NextRequest, NextResponse } from "next/server";
import { signIn_validate } from "../../../../lib/validate";
import ApiResponseDto from "../../../../lib/apiResponseHelper";
import _isUserAvailable from "../../../../repo/check-user-available";
import { prisma } from "../../../../config/prisma.connect";
import hashPassword from "../../../../lib/hashHelper";

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

  const { email, password, address, phoneNumber, name, gender } = body;
  try {
    const userAvailable = await _isUserAvailable(email);
    if (!userAvailable) {
      const newUser = await prisma.user.create({
        data: {
          address,
          email: email?.toLowerCase(),
          gender,
          name,
          password: await hashPassword(password),
          phoneNumber,
        },
      });
      const createUserResponse = ApiResponseDto({
        message: "User created successfully",
        data: newUser,
        statusCode: 201,
      });
      return NextResponse.json(createUserResponse, { status: 201 });
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
