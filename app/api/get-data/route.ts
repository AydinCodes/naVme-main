import { NextResponse } from "next/server";

// Define a type for the store
type Store = {
  data?: any; 
};

let store: Store = {};

export async function POST(req: Request) {
  try {
    const body = await req.json();

    store.data = body;

    return new NextResponse(`Data received`, { status: 200 });
  } catch (error: any) {
    return new NextResponse(`Error: ${error.message}`, { status: 400 });
  }
}
export async function GET(req: Request) {
  try {
    const data = store.data;

    if (!data) {
      return new NextResponse(`No data available`, { status: 404 });
    }

    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (error: any) {
    return new NextResponse(`Error: ${error.message}`, { status: 400 });
  }
}
