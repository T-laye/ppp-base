import { NextResponse } from "next/server";


export async function prismaErrorHelper(res, prismaQuery) {
  try {
    const queryResult = await prismaQuery();
    if (!queryResult)
      return NextResponse.json(
        { message: "No response returned for query" },
        { status: 404 }
      );
    return NextResponse.json(queryResult, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: err.message, status: 500 });
  }
}
