import { NextResponse } from "next/server";

// Define a type for the store
type Store = {
  data?: any; // Using 'any' for simplicity, but ideally you should be more specific
};

// Initialize the in-memory store with its type
let store: Store = {};

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Store the received body data in the in-memory store
    store.data = body;

    return new NextResponse(`Data received`, { status: 200 });
  } catch (error: any) {
    return new NextResponse(`Error: ${error.message}`, { status: 400 });
  }
}

// Sample GET function to return stored data to frontend
export async function GET(req: Request) {
  try {
    // Get the stored data
    const data = store.data;

    if (!data) {
      return new NextResponse(`No data available`, { status: 404 });
    }

    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (error: any) {
    return new NextResponse(`Error: ${error.message}`, { status: 400 });
  }
}
