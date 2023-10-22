import Navbar from "@/components/navbar";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect, useParams } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();


  if (!userId) {
    redirect("/sign-in");
  }



  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
