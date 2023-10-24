import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { customerId: string } }
) {
  try {
    const { userId } = auth();


    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const country = await prismadb.originDetails.findFirst({
      where: {
        customerId: params.customerId,
      },
      select: {
        country: true,
      }
    });

    const bounds = await prismadb.originDetails.findFirst({
      where: {
        customerId: params.customerId,
      },
      select: {
        north: true,
        south: true,
        east: true,
        west: true
      }
    });

    if (!country || !bounds) {
      return new NextResponse("Unauthorized", { status: 403 });
    }



   const originDetails = {
    country: country,
    bounds: bounds
   }

    return NextResponse.json(originDetails);
  } catch (error) {
    console.log("[CUSTOMER_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
