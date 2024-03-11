import { NextResponse } from "next/server";


export async function GET(req, res) {
    // Do whatever you want
    
    // chc
  return NextResponse.json({ message: "the test works", status: 200 }, {});
}
