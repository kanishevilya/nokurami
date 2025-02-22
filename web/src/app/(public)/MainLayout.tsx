"use client";

import { type PropsWithChildren, useEffect } from "react";

import { useIsMobile } from "@/hooks/useIsMobile";
import { useSidebar } from "@/hooks/useSidebar";

import { cn } from "@/utils/cn";

export function MainLayout({ children }: PropsWithChildren<unknown>) {
  const isMobile = useIsMobile();

  const { isCollapsed, open, close } = useSidebar();

  useEffect(() => {
    if (isMobile) {
      if (!isCollapsed) close();
    } else {
      if (isCollapsed) open();
    }
  }, [isMobile]);

  return (
    <main
      className={cn(
        "mt-[75px] flex-1 p-8",
        isCollapsed ? "ml-16" : "ml-16 lg:ml-64"
      )}
    >
      {children}
    </main>
  );
}
