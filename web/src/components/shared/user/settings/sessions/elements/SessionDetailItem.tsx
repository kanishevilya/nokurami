import React, { ReactNode } from "react";

interface SessionDetailItemProps {
  label: string;
  value: string;
  icon?: ReactNode;
}

export function SessionDetailItem({
  label,
  value,
  icon,
}: SessionDetailItemProps) {
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="text-sm font-medium text-muted-foreground">{label}</div>
      <div className="flex items-center gap-2">
        {icon && icon}
        <span className="text-sm font-medium">{value}</span>
      </div>
    </div>
  );
}
