"use client";

import {
  useFindFollowersCountByChannelQuery,
  useFindMyFollowingsChannelsQuery,
} from "@/graphql/generated/output";
import { Heading } from "@/components/ui/items/Heading";
import FollowingCardWithFollowers from "./components/FollowingCardWithFollowers";
import { Skeleton } from "@/components/ui/shadcn/Skeleton";
import { useCurrent } from "@/hooks/useCurrent";

export default function FollowingChannelsPage() {
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

  const sortedFollowingsList = [...followingsList].sort((a, b) => {
    const aIsLive = a.following.stream?.isLive ? 1 : 0;
    const bIsLive = b.following.stream?.isLive ? 1 : 0;
    return bIsLive - aIsLive;
  });

  return (
    <div className="space-y-8 w-full">
      <Heading title="Подписки" description="Каналы, на которые вы подписаны" />
      {loading ? (
        <FollowingsSkeleton />
      ) : (
        <div className="flex flex-wrap gap-12 max-w-[1440px]">
          {sortedFollowingsList.length > 0 ? (
            sortedFollowingsList.map((following) => (
              <FollowingCardWithFollowers
                key={following.following.username}
                following={{
                  id: following.following.id,
                  username: following.following.username,
                  avatar: following.following.avatar,
                  isLive: following.following.stream?.isLive || false,
                }}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-sm text-gray-500">
                Вы не подписаны ни на один канал
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function FollowingsSkeleton() {
  return (
    <div className="flex flex-wrap gap-12">
      {[...Array(12)].map((_, index) => (
        <Skeleton key={index} className="h-[200px] w-[400px] rounded-lg" />
      ))}
    </div>
  );
}
