"use client";

import { Heading } from "@/components/ui/items/Heading";
import { Skeleton } from "@/components/ui/shadcn/Skeleton";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useTranslations } from "next-intl";

import {
  FindAllStreamsQuery,
  useFindAllStreamsQuery,
} from "@/graphql/generated/output";
import { StreamsList } from "../directory/streams/StreamsList";

export default function ResultPage() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("searchTerm");
  const t = useTranslations("streams");

  const { data, loading, fetchMore } = useFindAllStreamsQuery({
    variables: {
      filters: {
        take: 12,
        skip: 0,
        searchKey: searchTerm ?? "",
      },
    },
    fetchPolicy: "network-only",
  });

  const [streamList, setStreamList] = useState<
    FindAllStreamsQuery["findAllStreams"]
  >([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (!loading && data?.findAllStreams) {
      setStreamList(data.findAllStreams);
      setHasMore(data.findAllStreams.length === 12);
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

    if (newData?.findAllStreams) {
      const newStreams = newData.findAllStreams.filter(
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

  const description = searchTerm
    ? t("searchResults", { searchTerm })
    : t("description");

  return (
    <div className="space-y-8 w-full">
      <Heading title={t("title")} description={description} />
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
          <StreamsList streamList={streamList} />
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
