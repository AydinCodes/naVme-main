import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface HomePageProps {
  params: {
    customerId: string;
  };
}

const HomePage: React.FC<HomePageProps> = async ({ params }) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const customer = await prismadb.customer.findFirst({
    where: {
      id: params.customerId,
      userId,
    },
  });

  const originDetails = await prismadb.originDetails.findFirst({
    where: {
      customerId: params.customerId
    },
    select: {
      address: true
    }
  })
 

  if (!customer) {
    redirect("/auth");
  } 

  if (!originDetails) {
    redirect("/auth")
  }

  if (originDetails?.address === "") {
    redirect(`/dashboard/${params.customerId}/settings`)
  }

  return (
    <div>
      dashboard page
    </div>
  );
};

export default HomePage;