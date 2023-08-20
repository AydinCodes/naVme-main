import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import DisplayData from "./display-data";

export default function Home() {


  return (
    <div className="p-4">
      <UserButton afterSignOutUrl="/"/>

      
      <DisplayData/>
    </div>
  );
}