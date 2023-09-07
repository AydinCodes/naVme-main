import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Navbar from "./components/home-navbar";

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  if (userId) {
    const customer = await prismadb.customer.findFirst({
      where: {
        userId,
      },
    });

    if (customer) {
      redirect(`/app/${customer.id}`);
    }
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
