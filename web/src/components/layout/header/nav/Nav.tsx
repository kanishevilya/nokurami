import { FilesIcon, Users } from "lucide-react";
import { NavItem } from "./NavItem";
import { Route } from "@/components/layout/sidebar/types/Route";

export function Nav() {
  const routes: Route[] = [
    {
      label: "Following",
      href: "/following",
      icon: Users,
    },
    {
      label: "Browse",
      href: "/directory",
      icon: FilesIcon,
    },
  ];

  return (
    <div className="ml-16 -mr-60 flex w-40 items-center gap-x-4">
      {routes.map((route) => (
        <NavItem key={route.href} route={route} />
      ))}
    </div>
  );
}
