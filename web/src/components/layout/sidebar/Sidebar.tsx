"use client";

import { usePathname } from "next/navigation";
import { PrimaryNav } from "./PrimaryNav";
import { DashboardNav } from "./DashboardNav";
import { cn } from "@/utils/cn";
import { useSidebar } from "@/hooks/useSidebar";
import { SidebarHeader } from "./SidebarHeader";
export function Sidebar() {
  const { isCollapsed } = useSidebar();

  const pathname = usePathname();

  const isDashboard = pathname.includes("/dashboard");

  return (
    <aside
      className={cn(
        "fixed left-0 z-50 mt-[75px] flex h-full flex-col border-r border-border bg-card transition-all duration-100 ease-in-out",
        isCollapsed ? "w-16" : "w-56"
      )}
    >
      <SidebarHeader />
      {isDashboard ? <DashboardNav /> : <PrimaryNav />}
    </aside>
  );
}
