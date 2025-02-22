import type { PropsWithChildren } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/shadcn/Tooltip";

interface HintProps {
  label: string;
  asChild?: boolean;
  side?: "top" | "bottom" | "left" | "right";
  aling?: "start" | "center" | "end";
}

export function Hint({
  children,
  label,
  asChild,
  aling,
  side,
}: PropsWithChildren<HintProps>) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
        <TooltipContent
          className="rounded-md bg-slate-400 px-3 py-1.5 text-sm text-white shadow-md dark:bg-gray-800 dark:text-zinc-200"
          side={side}
          align={aling}
        >
          <p className="font-medium">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
