"use client";

import {
  ArrowLeftFromLine,
  ArrowRightFromLine,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

import { Button } from "@/components/ui/shadcn/Button";
import { Hint } from "@/components/ui/shadcn/Hint";

import { useSidebar } from "@/hooks/useSidebar";

export function SidebarHeader() {
  const { isCollapsed, open, close } = useSidebar();

  const label = isCollapsed ? "Expand" : "Collapse";

  return isCollapsed ? (
    <div className="mb-4 hidden w-full items-center justify-center pt-4 lg:flex">
      <Hint label={label} side="right" asChild>
        <Button onClick={() => open()} variant="ghost" size="icon">
          <PanelLeftOpen className="min-w-5 min-h-5" />
        </Button>
      </Hint>
    </div>
  ) : (
    <div className="mb-2 flex w-full items-center justify-between p-3 pl-4">
      <h2 className="text-lg font-semibold text-foreground">Navigation</h2>
      <Hint label={label} side="right" asChild>
        <Button onClick={() => close()} variant="ghost" size="icon">
          <PanelLeftClose className="min-w-5 min-h-5" />
        </Button>
      </Hint>
    </div>
  );
}
