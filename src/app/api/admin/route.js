import { prisma } from "../../../../config/prisma.connect";
import { NextResponse } from "next/server";
import hashPassword from "../../../../lib/hashHelper";
import { serialize } from "cookie";
// import createAccessToken from "../../../../lib/sign-jwt";
import { compare } from "bcrypt";

export async function POST() {
  try {
    const body = await req.json();
    const { email, password, oldPassword } = body;
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
    const ck = await compare(oldPassword, findUser.password);
    if (ck) {
      if (password === oldPassword) {
        return NextResponse.json(
          { message: "old password and new password cannot be the same" },
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
      return NextResponse.json(
        { message: "password updated successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "not allowed to carry out this operation" },
        { status: 404 }
      );
    }

    // const setToken = createAccessToken(
    //   findUser.id,
    //   findUser.email,
    //   findUser.role
    // );
    // const atCookie = serialize("ppp-base", setToken, {
    //   httpOnly: false,
    //   sameSite: "strict",
    //   secure: process.env.NODE_ENV === "development" ? false : true,
    //   maxAge: 60 * 60 * 24 * 7, // expires in 1 week
    //   path: "/",
    // });
  } catch (err) {
    return NextResponse.json({ message: "error occurred", error: err });
  }
}
