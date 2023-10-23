'use client';

import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useEffect, useState } from 'react';
import { getDashboardRoutes } from '@/lib/navbar-routes';

export function MobileNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);


  const params = useParams();
  const pathname = usePathname();

  const routes = getDashboardRoutes(params, pathname);

  if (!isMounted) {
    return null;
  }
  return (
    <div className={cn(className)}>
      <Sheet>
        <SheetTrigger>
          <Menu className="text-primary" />
        </SheetTrigger>
        <SheetContent side={'left'}>
          <nav className={cn('flex items-center justify-center h-[85vh]')}>
            <ul className="list-none flex flex-col">
              {routes.map((route) => (
                <li key={route.href} className="text-center">
                  <SheetClose asChild>
                    <Link
                      href={route.href}
                      className={cn(
                        'text-sm font-medium transition-colours hover:text-primary transition duration-200',
                        route.active
                          ? 'text-primary'
                          : 'text-secondary-foreground'
                      )}
                    >
                      {route.label}
                    </Link>
                  </SheetClose>
                </li>
              ))}
            </ul>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default MobileNav;
