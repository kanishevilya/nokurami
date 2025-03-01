"use client";

import { useFindChannelByUsernameQuery } from "@/graphql/generated/output";
import ChannelOverview from "@/components/shared/channel/ChannelOverview";
import { Skeleton } from "@/components/ui/shadcn/Skeleton";
import { use } from "react"; // Импортируем React.use

interface ChannelPageProps {
  params: Promise<{ username: string }>; // params как Promise
}

export default function ChannelPage({ params }: ChannelPageProps) {
  const { username } = use(params); // Разворачиваем params с помощью React.use()

  const { data, loading, error } = useFindChannelByUsernameQuery({
    variables: {
      username,
    },
  });

  const channel = data?.findChannelByUsername;

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-1/3" /> {/* Заголовок */}
        <Skeleton className="h-64 w-full" /> {/* Основной контент */}
      </div>
    );
  }

  if (error || !channel) {
    return (
      <div className="text-red-500">
        {error ? `Ошибка: ${error.message}` : "Канал не найден"}
      </div>
    );
  }

  return <ChannelOverview channel={channel} />;
}
