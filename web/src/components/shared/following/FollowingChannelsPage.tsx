"use client";

import {
  useFindMyFollowingsChannelsQuery,
  useFindFollowersCountByChannelQuery,
  useUnfollowFromChannelMutation,
  useFollowToChannelMutation,
} from "@/graphql/generated/output";
import { Heading } from "@/components/ui/items/Heading";
import { Skeleton } from "@/components/ui/shadcn/Skeleton";
import InfiniteScroll from "react-infinite-scroll-component";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import Link from "next/link";
import { getMediaSource } from "@/utils/get-media-source";
import { ChannelAvatar } from "@/components/ui/items/ChannelAvatar";
import { Button } from "@/components/ui/shadcn/Button";
import { toast } from "sonner";
import { HeartCrackIcon, HeartIcon } from "lucide-react";
import { useState } from "react";
import FollowingCardWithFollowers from "./components/FollowingCardWithFollowers";

export default function FollowingChannelsPage() {
  const { data, loading, fetchMore } = useFindMyFollowingsChannelsQuery({
    variables: {
      data: {
        take: 12,
        skip: 0,
      },
    },
    notifyOnNetworkStatusChange: true,
  });

  const followingsList = data?.findMyFollowings?.followings || [];
  const hasMore = followingsList.length === 12;

  const fetchMoreFollowings = async () => {
    if (!loading && hasMore) {
      await fetchMore({
        variables: {
          data: {
            take: 12,
            skip: followingsList.length,
          },
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return {
            ...prev,
            findMyFollowings: {
              ...prev.findMyFollowings,
              followings: [
                ...prev.findMyFollowings.followings,
                ...fetchMoreResult.findMyFollowings.followings,
              ],
              totalCount: fetchMoreResult.findMyFollowings.totalCount,
            },
          };
        },
      });
    }
  };

  console.log(data);

  return (
    <div className="space-y-8 w-full">
      <Heading title="Подписки" description="Каналы, на которые вы подписаны" />
      <InfiniteScroll
        dataLength={followingsList.length}
        next={fetchMoreFollowings}
        hasMore={hasMore}
        loader={
          <div className="mt-6 flex flex-wrap gap-12 justify-center max-w-[1440px]">
            {Array.from({ length: 12 }).map((_, index) => (
              <Skeleton
                key={index}
                className="h-[200px] w-[480px] rounded-lg"
              />
            ))}
          </div>
        }
      >
        {loading && !followingsList.length ? (
          <FollowingsSkeleton />
        ) : (
          <div className="flex flex-wrap gap-12 max-w-[1440px]">
            {followingsList.map((following) => (
              <FollowingCardWithFollowers
                key={following.following.username}
                following={{
                  id: following.following.id,
                  username: following.following.username,
                  avatar: following.following.avatar,
                  isLive: following.following.stream?.isLive || false,
                }}
              />
            ))}
          </div>
        )}
      </InfiniteScroll>
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
