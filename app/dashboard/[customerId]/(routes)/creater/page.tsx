import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import MapWithJobs from "../../../../../components/map-with-jobs";

interface CreaterPageProps {
  params: {
    customerId: string;
  };
}

const CreaterPage: React.FC<CreaterPageProps> = async ({ params }) => {
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
  } else {
    var origin = {
      lat: customer.lat,
      lng: customer.lng
    }
  }

  if (customer?.address === "") {
    redirect(`/dashboard/${params.customerId}/settings`)
  }
  return (
    <div className="">
      <div className="p-4 md:p-8 pt-6">
        <MapWithJobs origin={origin}/>
      </div>
    </div>
  );
};

export default CreaterPage;