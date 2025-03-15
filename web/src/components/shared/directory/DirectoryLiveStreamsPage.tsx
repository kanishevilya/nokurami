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
import { useTranslations } from "next-intl";

export default function DirectoryLiveStreamsPage() {
  const t = useTranslations("streams");
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

    const skip = streamList.length;
    const { data: newData } = await fetchMore({
      variables: {
        filters: {
          searchKey: "",
          take: 12,
          skip,
        },
      },
    });

    if (newData?.findAllLiveStreams) {
      const newStreams = newData.findAllLiveStreams.filter(
        (newStream) =>
          !streamList.some(
            (existingStream) =>
              existingStream.title === newStream.title &&
              existingStream.user.username === newStream.user.username
          )
      );

      if (newStreams.length > 0) {
        setStreamList((prev) => [...prev, ...newStreams]);
        setHasMore(newStreams.length === 12);
      } else {
        setHasMore(false);
      }
    }
  }

  console.log("StreamList before render:", streamList);

  return (
    <div className="space-y-8 w-full">
      <Heading title={t("title")} description={t("description")} />
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
