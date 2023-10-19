"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/dashboard/${params.customerId}`,
      label: "Dashboard",
      active: pathname === `/dashboard/${params.customerId}`,
    },
    {
      href: `/dashboard/${params.customerId}/creater`,
      label: "Run Creater",
      active: pathname === `/dashboard/${params.customerId}/creater`,
    },
    {
      href: `/dashboard/${params.customerId}/organiser`,
      label: "Run Organiser",
      active: pathname === `/dashboard/${params.customerId}/organiser`,
    },
    {
      href: `/dashboard/${params.customerId}/settings`,
      label: "Settings",
      active: pathname.startsWith(`/dashboard/${params.customerId}/settings`),
    },
    {
      href: `/dashboard/${params.customerId}/support`,
      label: "Support",
      active: pathname.startsWith(`/dashboard/${params.customerId}/support`),
    }
  ];
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colours hover:text-primary",
            route.active
              ? "text-primary"
              : "text-secondary-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
