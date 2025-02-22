"use client";

import { LayoutDashboard, Settings } from "lucide-react";
import { SidebarMenu } from "@/components/ui/shadcn/Sidebar";
import { Route } from "./types/Route";
import { SidebarItem } from "./SidebarItem";

export function DashboardNav() {
  const routes: Route[] = [
    {
      label: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
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
