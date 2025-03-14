"use client";

import {
  useFindFollowersCountByChannelQuery,
  useFindMyFollowingsChannelsQuery,
  FindProfileQuery,
} from "@/graphql/generated/output";
import { Heading } from "@/components/ui/items/Heading";
import FollowingCardWithFollowers from "./components/FollowingCardWithFollowers";
import { Skeleton } from "@/components/ui/shadcn/Skeleton";
import { useFindFollowingsCountByChannelQuery } from "@/graphql/generated/output";

interface FollowingChannelsPageProps {
  user: FindProfileQuery["getProfile"];
}

export default function FollowingChannelsPage({
  user,
}: FollowingChannelsPageProps) {
  console.log(user);

  const { data: followingsCount } = useFindFollowingsCountByChannelQuery({
    variables: {
      channelId: user?.id!,
    },
  });

  console.log(followingsCount);

  const { data, loading } = useFindMyFollowingsChannelsQuery({
    variables: {
      data: {
        take: followingsCount?.findFollowingsCountByChannel,
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
                myId={user.id}
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
