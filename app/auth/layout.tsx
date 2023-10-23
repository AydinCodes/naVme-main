import Navbar from '@/components/navbar';
import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const customer = await prismadb.customer.findFirst({
    where: {
      userId,
    },
  });

  if (!customer) {
    const customer = await prismadb.customer.create({
      data: {
        userId: userId,
      },
    });

    redirect(`/dashboard/${customer.id}`);
  }

  const originDetails = await prismadb.originDetails.findFirst({
    where: {
      customerId: customer.id,
    },
  });

  if (!originDetails) {
    const originDetails = await prismadb.originDetails.create({
      data: {
        customerId: customer.id,
      },
    });
  } else {
    redirect(`/dashboard/${customer.id}`);
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
