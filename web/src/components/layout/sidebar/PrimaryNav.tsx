"use client";

import { Home, Settings, Users } from "lucide-react";
import { SidebarMenu } from "@/components/ui/shadcn/Sidebar";
import { SidebarItem } from "./SidebarItem";
import { Route } from "./types/Route";

export function PrimaryNav() {
  const routes: Route[] = [
    {
      label: "Home",
      href: "/",
      icon: Home,
    },
    {
      label: "Community",
      href: "/community",
      icon: Users,
    },
  ];

  return (
    <div className="space-y-2 px-2 pt-4 lg:pt-0">
      {routes.map((route, index) => (
        <SidebarItem key={index} route={route} />
      ))}
    </div>
  );
}
