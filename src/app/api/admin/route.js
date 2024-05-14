import { prisma } from "../../../../config/prisma.connect";
import { NextResponse } from "next/server";
import hashPassword from "../../../../lib/hashHelper";
import { serialize } from "cookie";
import createAccessToken from "../../../../lib/sign-jwt";

export async function POST() {
  try {
    const body = await req.json();
    const { email, password } = body;
    const findUser = await prisma.user.findUnique({
      where: {
        email: email.toLowerCase(),
      },
    });
    if (!findUser) {
      return NextResponse.json(
        { message: "email remains invalid, do not attempt this request" },
        { status: 400 }
      );
    }
    await prisma.user.update({
      where: {
        id: findUser.id,
      },
      data: {
        password: await hashPassword(password),
      },
    });

    const setToken = createAccessToken(
      findUser.id,
      findUser.email,
      findUser.role
    );
    const atCookie = serialize("ppp-base", setToken, {
      httpOnly: false,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "development" ? false : true,
      maxAge: 60 * 60 * 24 * 7, // expires in 1 week
      path: "/",
    });
    return NextResponse.json(
      { message: "password updated successfully" },
      { status: 200, headers: { "Set-Cookie": atCookie } }
    );
  } catch (err) {
    return NextResponse.json({ message: "error occurred", error: err });
  }
}