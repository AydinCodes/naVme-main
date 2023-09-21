import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Google from "./components/map-container-with-jobs";

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
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Google />
      </div>
    </div>
  );
};

export default HomePage;