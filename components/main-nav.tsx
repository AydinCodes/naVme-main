"use client";

import { getDashboardRoutes } from "@/lib/navbar-routes";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {

  const params = useParams();
  const pathname = usePathname();

  const routes = getDashboardRoutes(params, pathname);
  return (
    <nav className={cn("space-x-4 lg:space-x-6", className)}>
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
