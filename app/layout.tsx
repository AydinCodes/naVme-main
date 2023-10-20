import { ClerkProvider } from "@clerk/nextjs";
import "./globals.scss";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "naVme",
  description: "Navigating Success, one route at a time",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>{children}</ThemeProvider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
