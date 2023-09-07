import { UserButton, auth } from "@clerk/nextjs";
import { MainNav } from "./home-main-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

const Navbar = async () => {
  return (
    <div className="items-center flex">
      <div className="flex h-16 items-center w-[100%]">
        <div className="w-[10rem]">LOGO</div>
        <MainNav className="mx-6" />
        <div className="flex items-center space-x-4 w-[10rem]">
          <Button>Dashboard</Button>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
