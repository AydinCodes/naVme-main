import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import MapWithJobs from "./components/map-with-jobs";

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

  
 

  if (!customer) {
    redirect("/auth");
  } 
  return (
    <div>
      dashboard page
    </div>
  );
};

export default HomePage;