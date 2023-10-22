import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import MapWithJobs from "@/components/map-with-jobs";

interface OrganiserPageProps {
  params: {
    customerId: string;
  };
}

const OrganiserPage: React.FC<OrganiserPageProps> = async ({ params }) => {
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
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <MapWithJobs origin={origin}/>
      </div>
    </div>
  );
};

export default OrganiserPage;