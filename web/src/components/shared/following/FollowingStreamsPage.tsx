"use client";

import {
  FindMyFollowingsChannelsQuery,
  useFindFollowersCountByChannelQuery,
  useFindMyFollowingsChannelsQuery,
} from "@/graphql/generated/output";
import { Heading } from "@/components/ui/items/Heading";
import { StreamCard } from "@/components/shared/stream/StreamCard";
import { Skeleton } from "@/components/ui/shadcn/Skeleton";
import { useCurrent } from "@/hooks/useCurrent";

export default function FollowingStreamsPage() {
  const { user } = useCurrent();

  const { data: followersCount } = useFindFollowersCountByChannelQuery({
    variables: {
      channelId: user?.id!,
    },
  });

  const { data, loading } = useFindMyFollowingsChannelsQuery({
    variables: {
      data: {
        take: followersCount?.findFollowersCountByChannel,
        skip: 0,
      },
    },
    notifyOnNetworkStatusChange: true,
  });

  const followingsList = data?.findMyFollowings?.followings || [];

  const onlineStreams = followingsList.filter(
    (following) => following.following.stream?.isLive
  );
  const offlineStreams = followingsList.filter(
    (following) =>
      !following.following.stream?.isLive && following.following.stream
  );

  function getStream(
    following: FindMyFollowingsChannelsQuery["findMyFollowings"]["followings"][0]
  ) {
    return {
      previewUrl: following.following.stream?.previewUrl || null,
      title: following.following.stream?.title || "Без названия",
      isLive: following.following.stream?.isLive || false,
      user: {
        username: following.following.username,
        avatar: following.following.avatar,
      },
      category: {
        title: following.following.stream?.category?.title || "N/A",
        slug: following.following.stream?.category?.slug || "n-a",
      },
    };
  }

  return (
    <div className="space-y-8 w-full">
      <Heading
        title="Стримы подписок"
        description="Активные стримы каналов, на которые вы подписаны"
      />

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">В сети</h2>
        {loading ? (
          <StreamsSkeleton count={3} />
        ) : onlineStreams.length > 0 ? (
          <div className="flex flex-wrap gap-12">
            {onlineStreams.map((following) => (
              <StreamCard
                key={following.following.id}
                stream={getStream(following)}
              />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">Нет активных стримов</p>
        )}
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Не в сети</h2>
        {loading ? (
          <StreamsSkeleton count={3} />
        ) : offlineStreams.length > 0 ? (
          <div className="flex flex-wrap gap-12">
            {offlineStreams.map((following) => (
              <StreamCard
                key={following.following.id}
                stream={getStream(following)}
              />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">Нет неактивных стримов</p>
        )}
      </div>
    </div>
  );
}

function StreamsSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="flex flex-wrap gap-12 justify-center max-w-[1440px]">
      {[...Array(count)].map((_, index) => (
        <Skeleton key={index} className="h-[200px] w-[480px] rounded-lg" />
      ))}
    </div>
  );
}
