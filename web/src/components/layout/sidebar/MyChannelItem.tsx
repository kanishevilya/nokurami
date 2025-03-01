"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/shadcn/Button";
import { Hint } from "@/components/ui/shadcn/Hint";

import { useSidebar } from "@/hooks/useSidebar";

import { cn } from "@/utils/cn";
import { ChannelAvatar } from "@/components/ui/items/ChannelAvatar";
import { useCurrent } from "@/hooks/useCurrent";
import { Loader2 } from "lucide-react";
import { FindProfileQuery } from "@/graphql/generated/output";

interface MyChannelItemProps {
  href: string;
  label: string;
  user: FindProfileQuery["getProfile"];
  stream: FindProfileQuery["getProfile"]["stream"];
}

export function MyChannelItem({
  href,
  label,
  user,
  stream,
}: MyChannelItemProps) {
  const pathname = usePathname();
  const { isCollapsed } = useSidebar();

  const isActive = pathname === href;

  return isCollapsed ? (
    <Hint label={label} side="right" asChild>
      <Button
        className={cn(
          "relative top-2 h-11 w-full rounded-full justify-center",
          isActive && "bg-accent"
        )}
        variant="ghost"
        asChild
      >
        <Link href={href}>
          <ChannelAvatar
            channel={user}
            status={stream?.isLive ? "live" : "online"}
          />
        </Link>
      </Button>
    </Hint>
  ) : (
    <Button
      className={cn("h-14 w-full justify-start", isActive && "bg-accent")}
      variant="ghost"
      asChild
    >
      <Link href={href} className="flex items-start gap-x-4 w-full">
        <ChannelAvatar
          className="-ml-2"
          channel={user}
          status={stream?.isLive ? "live" : "online"}
        />
        <div className="flex flex-col gap-y-2 max-w-32">
          <p className="text-sm font-medium">{user.username}</p>
          <p className="text-xs text-muted-foreground truncate">
            {stream.title}
          </p>
        </div>
      </Link>
    </Button>
  );
}
