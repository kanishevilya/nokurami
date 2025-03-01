"use client";

import { useFindAllLiveStreamsQuery } from "@/graphql/generated/output";
import { Heading } from "@/components/ui/items/Heading";
import { StreamCard } from "@/components/shared/directory/streams/StreamCard";
import { Skeleton } from "@/components/ui/shadcn/Skeleton";
import InfiniteScroll from "react-infinite-scroll-component";

export default function DirectoryLiveStreamsPage() {
  const { data, loading, fetchMore } = useFindAllLiveStreamsQuery({
    variables: {
      filters: {
        take: 12, // Загружаем по 12 стримов за раз
        skip: 0, // Начальный отступ
        searchKey: "",
      },
    },
    notifyOnNetworkStatusChange: true, // Обновляет loading при fetchMore
  });

  const streamList = data?.findAllLiveStreams || [];
  const hasMore = streamList.length === 12;

  const fetchMoreStreams = async () => {
    if (!loading && hasMore) {
      await fetchMore({
        variables: {
          filters: {
            take: 12,
            skip: streamList.length, // Сдвиг на основе текущего количества
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
    <div className="space-y-8">
      <Heading
        title="Трансляции"
        description="Активные трансляции на платформе"
      />
      <InfiniteScroll
        dataLength={streamList.length} // Текущая длина списка
        next={fetchMoreStreams} // Функция подгрузки
        hasMore={hasMore} // Есть ли ещё данные
        loader={
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 12 }).map((_, index) => (
              <Skeleton key={index} className="h-[200px] w-full rounded-lg" />
            ))}
          </div>
        }
      >
        {loading && !streamList.length ? (
          <StreamsSkeleton />
        ) : (
          <div className="flex flex-wrap gap-12">
            {streamList.map((stream) => (
              <StreamCard key={stream.user.username} stream={stream} />
            ))}
          </div>
        )}
      </InfiniteScroll>
    </div>
  );
}

function StreamsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(12)].map((_, index) => (
        <Skeleton key={index} className="h-[200px] w-full rounded-lg" />
      ))}
    </div>
  );
}
