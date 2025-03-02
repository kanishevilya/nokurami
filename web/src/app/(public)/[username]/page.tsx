"use client";

import { useFindChannelByUsernameQuery } from "@/graphql/generated/output";
import ChannelOverview from "@/components/shared/channel/ChannelOverview";
import { Skeleton } from "@/components/ui/shadcn/Skeleton";
import { use } from "react";

interface ChannelPageProps {
  params: Promise<{ username: string }>;
}

export default function ChannelPage({ params }: ChannelPageProps) {
  const { username } = use(params);

  const { data, loading, error } = useFindChannelByUsernameQuery({
    variables: {
      username,
    },
  });

  const channel = data?.findChannelByUsername;
  console.log(channel);
  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-1/3" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (error || !channel) {
    return (
      <div className="text-red-500">
        {error ? `Error: ${error.message}` : "Channel not found"}
      </div>
    );
  }

  return <ChannelOverview channel={channel} />;
}
