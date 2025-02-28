"use client";

import { Button } from "@/components/ui/shadcn/Button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/shadcn/DropdownMenu";
import { Settings2Icon } from "lucide-react";

interface Action {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

interface ActionDropdownProps {
  actions: Action[];
}

export function ActionDropdown({ actions }: ActionDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings2Icon className="min-h-5 min-w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {actions.map((action, index) => (
          <DropdownMenuItem
            key={index}
            onClick={action.onClick}
            disabled={action.disabled}
          >
            {action.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
