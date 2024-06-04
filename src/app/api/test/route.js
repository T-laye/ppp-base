import { NextResponse } from "next/server";
import { prisma } from "../../../../config/prisma.connect";
import sharp from "sharp";
import { CompressImageHelper } from "../../../../lib/compress-image-helper";

export async function POST(req, res) {
    try {
        const formData = await req.formData();
        const pfp = formData.get("profilePicture");
        
        // console.log(pfp)
        const toBase64 = Buffer.from(await pfp.arrayBuffer()).toString('base64');
        const r = await CompressImageHelper(pfp);
        return NextResponse.json({ reduce: r}, { status: 200 })
    } catch (err) {
        // console.log(err)
        return NextResponse.json(
            { message: err.message, status: 500 },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const getImage = await prisma.image.findUnique({
          where: {
            id: "e77042a3-f919-4713-a891-92494bc2be36",
          },
        });
        const { image } = getImage
        const base64 = image.toString('base64')
        return NextResponse.json({data: image})
    } catch (err) {
         return NextResponse.json(
           { message: err.message, status: 500 },
           { status: 500 }
         );
    }
}

