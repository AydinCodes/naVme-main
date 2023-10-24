import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { customerId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { name, vehicles, address, state, country, lat, lng, bounds, radius } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const customer = await prismadb.customer.findFirst({
      where: {
        id: params.customerId,
        userId,
      },
    });

    if (!customer) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const updatedCustomer = await prismadb.customer.update({
      where: {
        id: params.customerId,
      },
      data: {
        name,
        vehicles,
      },
    });

    const updatedOriginDetails = await prismadb.originDetails.update({
      where: {
        customerId: updatedCustomer.id,
      },
      data: {
        address: address,
        lat: lat,
        lng: lng,
      }
    })

    return NextResponse.json(updatedCustomer);
  } catch (error) {
    console.log("[SETTINGS_PATCH", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
