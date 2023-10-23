import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import SettingsForm from "./components/settings-form";

interface SettingsPageProps {
  params: {
    customerId: string;
  };
}

const SettingsPage: React.FC<SettingsPageProps> = async ({ params }) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const customerSettings = await prismadb.customer.findFirst({
    where: {
      id: params.customerId,
      userId,
    },
    select: {
      name: true,
      vehicles: true
    }
  });

  const originSettings = await prismadb.originDetails.findFirst({
    where: {
      customerId: params.customerId
    },
    select: {
      address: true
    }
  });

  

  if (!customerSettings || !originSettings) {
    redirect("/auth");
  }

  const customerDetails = {
    ...customerSettings,
    ...originSettings
  };
  
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialSettings={customerDetails}/>
      </div>
    </div>
  );
};

export default SettingsPage;

// const customerSettings = await prismadb.customer.findFirst({
//   where: {
//     id: params.customerId,
//     userId,
//   },
//   select: {
//     name: true,
//     address: true,
//     vehicles: true
//   }
// });
