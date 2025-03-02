"use client";

import { useFindRecommendedChannelsQuery } from "@/graphql/generated/output";
import { StreamCard } from "../stream/StreamCard";
import { Skeleton } from "@/components/ui/shadcn/Skeleton";
import { Heading } from "@/components/ui/items/Heading";

export default function RecommendedChannels() {
  const { data, loading } = useFindRecommendedChannelsQuery();

  return loading ? (
    <RecommendedChannelsSkeleton />
  ) : (
    <>
      <Heading title="Recommended Channels" />
      <div className="mx-auto">
        <div className="flex flex-row gap-4">
          {data?.findRecommendedChannels.map((channel) => (
            <div key={channel.id + channel.username} className="w-72">
              <StreamCard stream={channel.stream} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function RecommendedChannelsSkeleton() {
  return (
    <div className="flex flex-row gap-4">
      <Skeleton className="h-[200px] w-full" />
      <Skeleton className="h-[200px] w-full" />
      <Skeleton className="h-[200px] w-full" />
      <Skeleton className="h-[200px] w-full" />
    </div>
  );
}
