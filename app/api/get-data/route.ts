import { NextResponse } from "next/server";

// Define a type for the customer
type Customer = {
  data?: any; 
};

let customer: Customer = {};

export async function POST(req: Request) {
  try {
    const body = await req.json();

    customer.data = body;

    console.log(body)

    return new NextResponse(`Data received`, { status: 200 });
  } catch (error: any) {
    return new NextResponse(`Error: ${error.message}`, { status: 400 });
  }
}
export async function GET(req: Request) {
  try {
    const data = customer.data;

    if (!data) {
      return new NextResponse(`No data available`, { status: 404 });
    }

    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (error: any) {
    return new NextResponse(`Error: ${error.message}`, { status: 400 });
  }
}
