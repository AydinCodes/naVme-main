'use client';

import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useEffect, useState } from 'react';

export function HomeMobileNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const pathname = usePathname();

  const routes = [
    {
      href: `/`,
      label: 'Home',
      active: pathname === `/`,
    },
    {
      href: `/product`,
      label: 'Product',
      active: pathname === `/product`,
    },
    {
      href: `/about`,
      label: 'About',
      active: pathname.startsWith(`/about`),
    },
    {
      href: `/support`,
      label: 'Support',
      active: pathname.startsWith(`/support`),
    },
  ];

  if (!isMounted) {
    return null;
  }
  return (
    <div>
      <Sheet>
        <SheetTrigger className='mt-2'>
          <Menu className='text-primary '/>
        </SheetTrigger>
        <SheetContent>
          <nav
            className={cn(
              className,
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

export default HomeMobileNav;
