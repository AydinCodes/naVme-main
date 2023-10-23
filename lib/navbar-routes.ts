import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export const getHomeRoutes = (pathname: string) => {
  return [
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
};

export const getDashboardRoutes = (params: Params, pathname: string) => {
    return [
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
  };


  