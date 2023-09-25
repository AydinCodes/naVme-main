// import { auth } from "@clerk/nextjs";

// export async function POST(
//     req: Request,
//     { params }: { params: { customerId: string } }
//   ) {
//     try {
//       const { userId } = auth();
//       const body = await req.json();
  
//       const { name, billboardId} = body;
  
//       if (!userId) {
//         return new NextResponse("Unauthenticated", { status: 401 });
//       }
//       if (!name) {
//         return new NextResponse("Name is required", { status: 400 });
//       }
//       if (!billboardId) {
//         return new NextResponse("Billboard ID is required", { status: 400 });
//       }
  
//       if (!params.customerId) {
//         return new NextResponse("Store ID is required", { status: 400 });
//       }
  
//       const storeByUserId = await prismadb.store.findFirst({
//         where: {
//           id: params.customerId,
//           userId,
//         },
//       });
  
//       if (!storeByUserId) {
//         return new NextResponse("Unauthorized", { status: 403 });
//       }
  
//       const category = await prismadb.category.create({
//         data: {
//           name,
//           billboardId,
//           customerId: params.customerId,
//         },
//       });
  
//       return NextResponse.json(category);
//     } catch (error) {
//       console.log("[CATEGORIES_POST]", error);
//       return new NextResponse("Internal error", { status: 500 });
//     }
//   }