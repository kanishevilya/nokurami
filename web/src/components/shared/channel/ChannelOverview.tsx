"use client";

import { FindChannelByUsernameQuery } from "@/graphql/generated/output";
import { useStreamToken } from "@/hooks/useStreamToken";
import { Skeleton } from "@/components/ui/shadcn/Skeleton";
import { LiveKitRoom } from "@livekit/components-react";
import { StreamVideo } from "./StreamVideo";

interface ChannelOverviewProps {
  channel: FindChannelByUsernameQuery["findChannelByUsername"];
}

export default function ChannelOverview({ channel }: ChannelOverviewProps) {
  const { token, name, identity } = useStreamToken(channel.id);

  if (!token || !name || !identity) {
    return <ChannelOverviewSkeleton />;
  }
  return (
    <div>
      <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WSS_URL}
      >
        <div className="order-1 col-span-1 flex flex-col lg:col-span-5">
          <StreamVideo channel={channel} />
          info
          <br />
          about
          <br />
        </div>
        <div className="order-2 col-span-1 flex h-80 flex-col space-y-6 lg:col-span-2">
          Chat
        </div>
      </LiveKitRoom>
    </div>
  );
}

export function ChannelOverviewSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-10 w-10 rounded-full" />
      <Skeleton className="h-4 w-40" />
      <Skeleton className="h-4 w-32" />
    </div>
  );
}
