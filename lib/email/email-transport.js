import { render } from "@react-email/render";
import nodemailer from "nodemailer";
import ApiResponseDto from "../apiResponseHelper";

export async function sendEmailHelper({ email, subject, Body }) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      tls: {
        ciphers: "SSLv3",
        rejectUnauthorized: false,
      },
      secure: true,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const renderEmail = render(<Body />);
    await transporter.sendMail({
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: subject,
      html: renderEmail,
    });
    return { data: "email sent" };
  } catch (err) {
    return {
      error: errorResponse(err, 500),
      status: 500,
    };
  }
}

function errorResponse(message, statusCode) {
  return ApiResponseDto({
    message,
    statusCode,
  });
}
