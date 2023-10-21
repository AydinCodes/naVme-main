import { UserButton, auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import prismadb from '@/lib/prismadb';
import { MainNav } from './main-nav';
import { ThemeToggle } from './theme-toggle';
import MobileNav from './mobile-nav';

const Navbar = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const customers = await prismadb.customer.findMany({
    where: {
      userId,
    },
  });
  return (
    <div className="flex flex-row-reverse h-16 items-center px-4 border-b ">
      <div className="hidden md:flex h-full w-full justify-center items-center ">
        <MainNav className="mx-6 hidden md:flex justify-center" />
      </div>
      <div className="ml-auto flex items-center space-x-4 justify-between md:absolute">
        <ThemeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
      <div className=' h-full flex'>
      <MobileNav className="md:hidden items-center my-auto" />
      </div>
    </div>
  );
};

export default Navbar;
