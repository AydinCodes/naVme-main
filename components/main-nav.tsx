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
      href: `/store/${params.storeId}`,
      label: "Home",
      active: pathname === `/store/${params.storeId}`,
    },
    {
      href: `/store/${params.storeId}/settings`,
      label: "Settings",
      active: pathname.startsWith(`/store/${params.storeId}/settings`),
    },
    {
      href: `/store/${params.storeId}/support`,
      label: "Support",
      active: pathname.startsWith(`/store/${params.storeId}/support`),
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
