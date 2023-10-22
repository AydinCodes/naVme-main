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

export function MobileNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  if (!isMounted) {
    return null;
  }
  return (
    <div className={cn(className)}>
      <Sheet>
        <SheetTrigger>
          <Menu className='text-primary'/>
        </SheetTrigger>
        <SheetContent side={'left'}>
          <nav
            className={cn(
              'flex items-center justify-center h-[85vh]'
            )}
          >
            <ul className="list-none flex flex-col">
              {routes.map((route) => (
                  <li key={route.href} className='text-center'>
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
