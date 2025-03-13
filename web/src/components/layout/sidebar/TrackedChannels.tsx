import { ChevronDown, ChevronUp, Radio } from "lucide-react";
import { useState } from "react";
import { cn } from "@/utils/cn";
import { useSidebar } from "@/hooks/useSidebar";
import { useFindMyFollowingsChannelsQuery } from "@/graphql/generated/output";
import { ChannelAvatar } from "@/components/ui/items/ChannelAvatar";

export function TrackedChannels() {
  const [isOpen, setIsOpen] = useState(false);
  const { data, loading } = useFindMyFollowingsChannelsQuery({
    variables: {
      data: {
        take: 10,
        skip: 0,
      },
    },
  });
  const { isCollapsed } = useSidebar();

  const channels =
    data?.findMyFollowings.followings
      .map(({ following }) => following)
      .sort((a, b) => {
        if (a.stream?.isLive && !b.stream?.isLive) return -1;
        if (!a.stream?.isLive && b.stream?.isLive) return 1;
        return a.username.localeCompare(b.username);
      }) ?? [];

  console.log(data?.findMyFollowings);

  const totalCount = data?.findMyFollowings.totalCount ?? 0;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex w-full items-center gap-2 rounded-lg p-2",
          "hover:bg-accent hover:text-accent-foreground",
          isOpen && "bg-accent"
        )}
      >
        <Radio className="h-4 w-4" />
        {!isCollapsed && (
          <>
            <span className="flex-1 text-left">Tracked</span>
            {isOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </>
        )}
      </button>

      {isOpen && (
        <div className="mt-1 space-y-1 px-2">
          {channels.map((channel) => (
            <a
              key={channel.username}
              href={`/profile/${channel.username}`}
              className="flex items-start gap-2 rounded-lg p-2 hover:bg-accent"
            >
              <div className="relative flex-shrink-0">
                <ChannelAvatar
                  channel={channel}
                  className="h-8 w-8 rounded-full"
                />
                <div
                  className={cn(
                    "absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-background",
                    channel.stream?.isLive ? "bg-green-500" : "bg-gray-400"
                  )}
                />
              </div>
              {!isCollapsed && (
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">
                    {channel.username}
                  </p>
                  {channel.stream?.title && (
                    <p className="truncate text-xs text-muted-foreground">
                      {channel.stream.title}
                    </p>
                  )}
                </div>
              )}
            </a>
          ))}
          {totalCount > 7 && !isCollapsed && (
            <a
              href="/following"
              className="block px-2 py-1 text-xs text-muted-foreground hover:text-primary"
            >
              See all ({totalCount})
            </a>
          )}
        </div>
      )}
    </div>
  );
}
