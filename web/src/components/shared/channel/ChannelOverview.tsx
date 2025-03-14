"use client";

import { FindChannelByUsernameQuery } from "@/graphql/generated/output";
import { useStreamToken } from "@/hooks/useStreamToken";
import { Skeleton } from "@/components/ui/shadcn/Skeleton";
import { LiveKitRoom } from "@livekit/components-react";
import { StreamVideo } from "./overview/StreamVideo";
import { StreamInfo } from "./overview/StreamInfo";
import { AboutChannel } from "./overview/AboutChannel";
import { useCurrent } from "@/hooks/useCurrent";
import { Chat } from "./chat/Chat";
import AdditionalInfo from "./overview/AdditionalInfo";

interface ChannelOverviewProps {
  channel: FindChannelByUsernameQuery["findChannelByUsername"];
}

export default function ChannelOverview({ channel }: ChannelOverviewProps) {
  const { token, name, identity } = useStreamToken(channel.id);
  const { user } = useCurrent();
  const isCurrentUser = user?.id === channel.id;

  if (!token || !name || !identity) {
    return <ChannelOverviewSkeleton />;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WSS_URL}
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Main content - Video and Info */}
          <div className="order-1 col-span-1 flex flex-col space-y-6 lg:col-span-8">
            <div className="overflow-hidden rounded-lg bg-card shadow-md">
              <StreamVideo channel={channel} />
            </div>
            {/* <div> */}
            <StreamInfo
              channel={channel}
              isCurrentUser={isCurrentUser}
              myId={user?.id!}
            />

            {/* <AboutChannel channel={channel} /> */}
            <AdditionalInfo username={channel.username} />
          </div>

          {/* Chat sidebar */}
          <div className="order-2 col-span-1 lg:col-span-4">
            <Chat streamId={channel.stream?.id} />
          </div>
        </div>
      </LiveKitRoom>
    </div>
  );
}

export function ChannelOverviewSkeleton() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="col-span-1 space-y-6 lg:col-span-8">
          <Skeleton className="aspect-video w-full rounded-lg" />
          <Skeleton className="h-32 w-full rounded-lg" />
          <Skeleton className="h-64 w-full rounded-lg" />
        </div>
        <div className="col-span-1 lg:col-span-4">
          <Skeleton className="h-[600px] w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}
