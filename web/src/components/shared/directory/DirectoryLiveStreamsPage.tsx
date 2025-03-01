"use client";

import {
  FindAllLiveStreamsQuery,
  useFindAllLiveStreamsQuery,
} from "@/graphql/generated/output";
import { Heading } from "@/components/ui/items/Heading";
import { Skeleton } from "@/components/ui/shadcn/Skeleton";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState, useEffect } from "react";
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
    fetchPolicy: "network-only",
  });

  const [streamList, setStreamList] = useState<
    FindAllLiveStreamsQuery["findAllLiveStreams"]
  >([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (!loading && data?.findAllLiveStreams) {
      setStreamList(data.findAllLiveStreams);
      setHasMore(data.findAllLiveStreams.length === 12);
    }
  }, [data, loading]);

  async function fetchMoreStreams() {
    if (!hasMore || loading) return;

    setTimeout(async () => {
      const { data: newData } = await fetchMore({
        variables: {
          filters: {
            searchKey: "",
            take: 12,
            skip: streamList.length,
          },
        },
      });

      if (newData?.findAllLiveStreams) {
        if (newData.findAllLiveStreams.length > 0) {
          setStreamList((prev) => [...prev, ...newData.findAllLiveStreams]);
          setHasMore(newData.findAllLiveStreams.length === 12);
        } else {
          setHasMore(false);
        }
      }
    }, 400);
  }

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
          <div className="mt-12 flex flex-wrap gap-12">
            {Array.from({ length: 12 }).map((_, index) => (
              <Skeleton
                key={index}
                className="h-[200px] w-[480px] rounded-lg"
              />
            ))}
          </div>
        }
      >
        {loading && streamList.length === 0 ? (
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
    <div className="flex flex-wrap gap-12">
      {[...Array(12)].map((_, index) => (
        <Skeleton key={index} className="h-[200px] w-[480px] rounded-lg" />
      ))}
    </div>
  );
}
