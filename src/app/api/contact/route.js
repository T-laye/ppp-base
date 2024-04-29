import { NextResponse } from "next/server";
import { sendEmailHelper } from "../../../../lib/email/email-transport";
import WelcomeEmail from "../../../../lib/email/templates/welcome";

export async function GET(req, res) {
  try {
    const email = "davidhero125@gmail.com";
    const emailRes = await sendEmailHelper({
      email: email,
      subject: "this is a test",
      Body: WelcomeEmail,
    });

    if (emailRes.data) {
      return NextResponse.json({ message: "successful" });
    }
    return NextResponse.json({ message: "ok" });
  } catch (err) {
    return NextResponse.json({ message: err });
  }
}
