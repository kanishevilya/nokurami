"use client";

import { useState } from "react";
import { useFindMyFollowingsChannelsQuery } from "@/graphql/generated/output";
import { Button } from "@/components/ui/shadcn/Button";
import { Hint } from "@/components/ui/shadcn/Hint";
import { useSidebar } from "@/hooks/useSidebar";
import { cn } from "@/utils/cn";
import { ChannelAvatar } from "@/components/ui/items/ChannelAvatar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users } from "lucide-react";
import { Skeleton } from "@/components/ui/shadcn/Skeleton";
import { useTranslations } from "next-intl";

export function FollowedChannels() {
  const { data, loading } = useFindMyFollowingsChannelsQuery({
    variables: {
      data: {
        take: 10,
        skip: 0,
      },
    },
  });
  const { isCollapsed } = useSidebar();
  const pathname = usePathname();

  const followings = data?.findMyFollowings?.followings || [];
  const showViewAll = followings.length === 10;

  console.log(followings);
  const t = useTranslations("navigation");
  return (
    <div className="space-y-2">
      {isCollapsed ? (
        <Hint label={t("subscriptions")} side="right" asChild>
          <Users className="h-5 w-5 relative left-3 top-6" />
        </Hint>
      ) : (
        <div className="p-5 flex items-center h-11 w-full justify-start gap-x-4 text-base font-semibold">
          <Users className="h-5 w-5" />
          <p className="text-sm font-medium">{t("subscriptions")}</p>
        </div>
      )}

      <div className="space-y-2">
        {loading ? (
          <Skeleton className="h-11 w-full rounded-lg" />
        ) : followings.length > 0 ? (
          <>
            {followings.map((following) => {
              const channel = following.following;
              const stream = channel.stream || {
                title: "Нет стрима",
                isLive: false,
              };
              const href = `/${channel.username}`;
              const isActive = pathname === href;

              return isCollapsed ? (
                <Hint
                  label={channel.username}
                  key={channel.username}
                  side="right"
                  asChild
                >
                  <Button
                    variant="ghost"
                    className={cn(
                      "h-11 w-full rounded-full justify-center relative top-10",
                      isActive && "bg-accent"
                    )}
                    asChild
                  >
                    <Link href={href}>
                      <ChannelAvatar
                        channel={channel}
                        status={stream.isLive ? "live" : "online"}
                      />
                    </Link>
                  </Button>
                </Hint>
              ) : (
                <Button
                  variant="ghost"
                  className={cn(
                    "h-14 w-full justify-start",
                    isActive && "bg-accent"
                  )}
                  asChild
                  key={channel.username}
                >
                  <Link href={href} className="flex items-start gap-x-4 w-full">
                    <ChannelAvatar
                      className="-ml-2"
                      channel={channel}
                      status={stream.isLive ? "live" : "online"}
                    />
                    <div className="flex flex-col gap-y-2 max-w-32">
                      <p className="text-sm font-medium">{channel.username}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {stream.title}
                      </p>
                    </div>
                  </Link>
                </Button>
              );
            })}
            {!isCollapsed && showViewAll && (
              <Button
                variant="ghost"
                className="h-11 w-full justify-start text-sm text-primary hover:bg-accent"
                asChild
              >
                <Link href="http://localhost:3000/directory/following">
                  Show all
                </Link>
              </Button>
            )}
          </>
        ) : (
          <p className="text-sm text-muted-foreground px-4">No subscriptions</p>
        )}
      </div>
    </div>
  );
}
