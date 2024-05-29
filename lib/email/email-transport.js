import { render } from "@react-email/render";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import ApiResponseDto from "../apiResponseHelper";

export async function sendEmailHelper({ email, subject, Body}) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      requireTLS: true,
      secure: true,
      // tls: {
      //   ciphers: "SSLv3",
      //   rejectUnauthorized: false,

      // },
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const renderEmail = render(Body);
    await transporter.sendMail({
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: subject,
      html: renderEmail,
    });
    return { data: "email sent successfully" };
  } catch (err) {
    console.log(err)
    return NextResponse.json({ message: err, status: 500 });
  }
}

function errorResponse(message, statusCode) {
  return ApiResponseDto({
    message,
    statusCode,
  });
}
