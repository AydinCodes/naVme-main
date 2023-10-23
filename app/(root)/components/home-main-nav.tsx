"use client";

import { getHomeRoutes } from "@/lib/navbar-routes";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

  const routes = getHomeRoutes(pathname);

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {routes.map((route) => (
        <li key={route.href}>
          <Link
            href={route.href}
            className={cn(
              "text-sm font-medium transition-colours hover:text-primary transition duration-200",
              route.active ? "text-primary" : "text-secondary-foreground"
            )}
          >
            {route.label}
          </Link>
        </li>
      ))}
    </nav>
  );
}
