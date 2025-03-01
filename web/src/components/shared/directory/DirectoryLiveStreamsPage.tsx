"use client";

import { useFindAllLiveStreamsQuery } from "@/graphql/generated/output";
import { Heading } from "@/components/ui/items/Heading";
import { StreamCard } from "@/components/shared/stream/StreamCard";
import { Skeleton } from "@/components/ui/shadcn/Skeleton";
import InfiniteScroll from "react-infinite-scroll-component";
import { LiveStreamsList } from "./streams/LiveStreamsList";

export default function DirectoryLiveStreamsPage() {
  const { data, loading, fetchMore } = useFindAllLiveStreamsQuery({
    variables: {
      filters: {
        take: 12,
        skip: 0,
        searchKey: "",
      },
    },
    notifyOnNetworkStatusChange: true,
  });

  const streamList = data?.findAllLiveStreams || [];
  const hasMore = streamList.length === 12;

  const fetchMoreStreams = async () => {
    if (!loading && hasMore) {
      await fetchMore({
        variables: {
          filters: {
            take: 12,
            skip: streamList.length,
            searchKey: "",
          },
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return {
            ...prev,
            findAllLiveStreams: [
              ...prev.findAllLiveStreams,
              ...fetchMoreResult.findAllLiveStreams,
            ],
          };
        },
      });
    }
  };

  return (
    <div className="space-y-8 w-full">
      <Heading
        title="Трансляции"
        description="Активные трансляции на платформе"
      />
      <InfiniteScroll
        dataLength={streamList.length}
        next={fetchMoreStreams}
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
        {loading && !streamList.length ? (
          <StreamsSkeleton />
        ) : (
          <LiveStreamsList streamList={streamList} />
        )}
      </InfiniteScroll>
    </div>
  );
}

function StreamsSkeleton() {
  return (
    <div className="flex flex-wrap gap-12 justify-center max-w-[1440px]">
      {[...Array(12)].map((_, index) => (
        <Skeleton key={index} className="h-[200px] w-[480px] rounded-lg" />
      ))}
    </div>
  );
}
