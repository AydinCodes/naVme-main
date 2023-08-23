import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Data receiveddd: ", body);
    return new NextResponse(`Data recieved`, { status: 200 });
  } catch (error: any) {
    return new NextResponse(`Error: ${error.message}`, { status: 400 });
  }
}
