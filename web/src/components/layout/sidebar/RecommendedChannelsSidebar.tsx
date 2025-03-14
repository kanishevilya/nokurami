"use client";

import { useFindRandomStreamsQuery } from "@/graphql/generated/output";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/shadcn/Avatar";
import { Skeleton } from "@/components/ui/shadcn/Skeleton";
import Link from "next/link";
import { useSidebar } from "@/hooks/useSidebar";
import { cn } from "@/utils/cn";
import { Sparkles } from "lucide-react";

interface StreamType {
  id: string;
  title: string;
  previewUrl?: string | null;
  isLive: boolean;
  user: {
    id: string;
    username: string;
    avatar?: string | null;
  };
  category: {
    title: string;
    slug: string;
  };
}

export function RecommendedChannelsSidebar() {
  const { isCollapsed } = useSidebar();
  const { data, loading } = useFindRandomStreamsQuery({
    fetchPolicy: "network-only",
  });

  const streams = (data?.findRandomStreams as unknown as StreamType[]) || [];

  if (loading) {
    return (
      <div className="px-3 py-2">
        <div
          className={cn(
            "mb-2 flex items-center",
            isCollapsed ? "justify-center" : "px-2"
          )}
        >
          {!isCollapsed && (
            <h3 className="text-sm font-semibold text-muted-foreground">
              Recommended
            </h3>
          )}
          {isCollapsed && (
            <Sparkles className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="mb-2 flex items-center gap-2 px-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            {!isCollapsed && <Skeleton className="h-4 w-24" />}
          </div>
        ))}
      </div>
    );
  }

  if (streams.length === 0) {
    return null;
  }

  return (
    <div className="px-3 py-2">
      <div
        className={cn(
          "mb-2 flex items-center",
          isCollapsed ? "justify-center" : "px-2"
        )}
      >
        {!isCollapsed && (
          <h3 className="text-sm font-semibold text-muted-foreground">
            Recommended
          </h3>
        )}
        {isCollapsed && <Sparkles className="h-4 w-4 text-muted-foreground" />}
      </div>
      {streams.map((stream) => (
        <Link
          key={stream.id}
          href={`/${stream.user.username}`}
          className={cn(
            "mb-2 flex items-center gap-2 rounded-md px-2 py-1 transition-colors hover:bg-accent",
            isCollapsed && "justify-center"
          )}
        >
          <div className="relative">
            <Avatar className="h-8 w-8">
              <AvatarImage src={stream.user.avatar || ""} />
              <AvatarFallback>
                {stream.user.username[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {stream.isLive && (
              <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-red-500 ring-2 ring-background" />
            )}
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden">
              <p className="truncate text-sm font-medium">
                {stream.user.username}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {stream.category.title}
              </p>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
}
