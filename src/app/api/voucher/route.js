import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "../../../../config/prisma.connect";

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
    const { id, email } = payload;
    const user = await prisma.user.findUnique({
      where: { email: email },
      include: {
        Management: true,
        Personel: true,
      },
    });
    if (!user)
      return NextResponse.json(
        ApiResponseDto({ message: "oops, user details not found" }),
        { status: 403 }
      );
    const body = await req.json();
      const { name, v_email, phone, product, poc, thirdParty } = body;
    //   const addNewVoucher = await prisma.voucher.create({
          
    //   })
  } catch (err) {}
  // get the jwt
  // decode the jwt
  // search if the id is available, return relations
  // then get the details from the body
  // return saved response
  const body = await req.json();
}
