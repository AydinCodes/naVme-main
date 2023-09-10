import { auth } from "@clerk/nextjs";
import { MainNav } from "./home-main-nav";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = async () => {
  const { userId } = auth();

  return (
    <div className="relative px-4 py-4 flex justify-between items-center">
      <Link
        className="text-3xl font-bold leading-none hover:opacity-75"
        href="/"
      >
        naVme
      </Link>
      <div className="md:hidden">
        <button className="navbar-burger flex items-center text-primary p-3">
          <Menu /> Mobile Nav togg
        </button>
      </div>
      <ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 md:flex md:mx-auto md:items-center md:w-auto md:space-x-6">
        <MainNav />
      </ul>
	  <div>
      {userId ? (
        <Link href={"/auth"}>
          <Button>Dashboard</Button>
        </Link>
      ) : (
        <div className="space-x-4">
          <Link href={"/sign-in"}>
          <Button variant={"secondary"}>Sign in</Button>
        </Link>
		<Link href={"/sign-up"}>
          <Button>Sign up</Button>
        </Link>
        </div>
      )}
    </div></div>
  );
};

export default Navbar;
