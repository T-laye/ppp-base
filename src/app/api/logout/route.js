import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import ApiResponseDto from "../../../../lib/apiResponseHelper";
import { serialize } from "cookie";

export async function GET() {
  try {
    const cookiesStore = cookies();
    const token = cookiesStore.get("ppp-base");
    const handleError = ApiResponseDto({
      message: "you are not logged in",
      data: null,
      statusCode: 401,
    });
    if (!token) return NextResponse.json(handleError, { status: 401 });
    const atCookie = serialize("ppp-base", null, {
      httpOnly: false,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "development" ? false : true,
      maxAge: 0,
      path: "/",
    });
    const logoutResponse = ApiResponseDto({
      message: "Logout successful",
      data: null,
      statusCode: 200,
    });

    return NextResponse.json(logoutResponse, {
      status: 200,
      headers: { "Set-Cookie": atCookie },
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: err, status: 500 }, { status: 500 });
  }
}
