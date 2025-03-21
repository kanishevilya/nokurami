"use client";

import {
  FindMyFollowingsChannelsQuery,
  FindProfileQuery,
  useFindFollowersCountByChannelQuery,
  useFindFollowingsCountByChannelQuery,
  useFindMyFollowingsChannelsQuery,
} from "@/graphql/generated/output";
import { Heading } from "@/components/ui/items/Heading";
import { StreamCard } from "@/components/shared/stream/StreamCard";
import { Skeleton } from "@/components/ui/shadcn/Skeleton";
import { useCurrent } from "@/hooks/useCurrent";
import { useTranslations } from "next-intl";

export default function FollowingStreamsPage({
  user,
}: {
  user: FindProfileQuery["getProfile"];
}) {
  const t = useTranslations("streams");
  const profileT = useTranslations("profile");

  const { data: followingsCount } = useFindFollowingsCountByChannelQuery({
    variables: {
      channelId: user?.id!,
    },
  });

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
      title: following.following.stream?.title || t("noTitle"),
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
        title={profileT("followingStreams")}
        description={profileT("followingStreamsDescription")}
      />

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">{t("live")}</h2>
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
          <p className="text-muted-foreground">{t("noActiveStreams")}</p>
        )}
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">
          {t("offline")}
        </h2>
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
          <p className="text-muted-foreground">{t("noStreams")}</p>
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
