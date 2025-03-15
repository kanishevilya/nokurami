"use client";

import {
  Key,
  LayoutDashboard,
  MessageCircle,
  Settings,
  Users,
} from "lucide-react";
import { SidebarMenu } from "@/components/ui/shadcn/Sidebar";
import { Route } from "./types/Route";
import { SidebarItem } from "./SidebarItem";
import { useTranslations } from "next-intl";

export function DashboardNav() {
  const t = useTranslations("profile");

  const routes: Route[] = [
    {
      label: t("settings"),
      href: "/dashboard/settings",
      icon: Settings,
    },
    {
      label: t("streamKeys"),
      href: "/dashboard/stream-keys",
      icon: Key,
    },
    {
      label: t("chat"),
      href: "/dashboard/chat",
      icon: MessageCircle,
    },
    {
      label: t("community"),
      href: "/dashboard/community",
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
