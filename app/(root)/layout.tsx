
import Navbar from "./components/home-navbar";

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
