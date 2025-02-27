"use client";

import { Key, LayoutDashboard, MessageCircle, Settings } from "lucide-react";
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
    {
      label: "Stream Keys",
      href: "/dashboard/stream-keys",
      icon: Key,
    },
    {
      label: "Chat",
      href: "/dashboard/chat",
      icon: MessageCircle,
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
