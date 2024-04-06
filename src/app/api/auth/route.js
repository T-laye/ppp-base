import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get("ppp-base");

  if (!token) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  //   const { value } = token;

  try {
    // const v = verify(value, process.env.ACCESS_TOKEN_SECRET);
    const { value } = token;
    const decoded = verify(value, process.env.ACCESS_TOKEN_SECRET);
    // console.log(decoded);

    const response = {
      user: decoded,
      status: "Authenticated",
    };
    return new Response(JSON.stringify(response));
  } catch (e) {
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      {
        status: 400,
      }
    );
  }
}
