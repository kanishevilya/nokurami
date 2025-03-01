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

interface FollowingCardProps {
  following: {
    username: string;
    avatar?: string | null;
    isLive: boolean;
    followersCount: number;
    id: string;
  };
}

function FollowingCard({ following }: FollowingCardProps) {
  const { username, isLive, followersCount, id } = following;

  return (
    <div className="group relative block w-full max-w-[400px] rounded-lg shadow-md bg-card overflow-hidden">
      <Link href={`/${username}`}>
        <div className="relative flex flex-col items-center justify-center w-full h-[200px] bg-zinc-800 rounded-t-lg">
          <ChannelAvatar
            channel={following}
            className={`w-16 h-16 ${isLive ? "border-2 border-primary" : ""}`}
          />
          {isLive && (
            <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          )}
          <h3 className="text-md font-semibold text-foreground pt-4">
            {username}
          </h3>
        </div>
      </Link>

      <div className="absolute h-6 flex items-center justify-between left-0 right-0 bottom-0 p-4 pr-0 bg-card text-muted-foreground transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-10">
        <p className="text-sm">Подписчиков: {followersCount}</p>
        <FollowUnfollowButton channelId={id} />
      </div>
    </div>
  );
}

function FollowUnfollowButton({ channelId }: { channelId: string }) {
  const [isFollowing, setIsFollowing] = useState(true);

  const [followUser, { loading: following }] = useFollowToChannelMutation({
    onCompleted: () => {
      setIsFollowing(true);
      toast.success("Successfully followed");
    },
    onError: (error) => toast.error(`Error following`),
  });

  const [unfollowUser, { loading: unfollowing }] =
    useUnfollowFromChannelMutation({
      onCompleted: () => {
        setIsFollowing(false);
        toast.success("Successfully unfollowed");
      },
      onError: (error) => toast.error(`Error unfollowing`),
    });

  const handleFollow = () => {
    followUser({ variables: { channelId } });
  };

  const handleUnfollow = () => {
    unfollowUser({ variables: { channelId } });
  };

  return (
    <Button
      className="w-10 h-8 relative p-0"
      onClick={isFollowing ? handleUnfollow : handleFollow}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {isFollowing ? (
          <HeartCrackIcon className="w-5 h-5" />
        ) : (
          <HeartIcon className="w-5 h-5" />
        )}
      </div>
    </Button>
  );
}

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

function FollowingCardWithFollowers({
  following,
}: {
  following: {
    id: string;
    username: string;
    avatar?: string | null;
    isLive: boolean;
  };
}) {
  const { data } = useFindFollowersCountByChannelQuery({
    variables: { channelId: following.id },
  });

  console.log(data);

  const followersCount = data?.findFollowersCountByChannel || 0;

  return <FollowingCard following={{ ...following, followersCount }} />;
}

function FollowingsSkeleton() {
  return (
    <div className="flex flex-wrap gap-12 justify-center max-w-[1440px]">
      {[...Array(12)].map((_, index) => (
        <Skeleton key={index} className="h-[200px] w-[480px] rounded-lg" />
      ))}
    </div>
  );
}
