
import { UserButton } from "@clerk/nextjs";

import DisplayData from "./display-data";
  

export default async function Home() {

  return (
    <div className="p-4">
      <UserButton afterSignOutUrl="/"/>

      
      <DisplayData/>
    </div>
  );
}