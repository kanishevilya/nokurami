"use client";

import {
  useConnectionState,
  useRemoteParticipant,
  useTracks,
} from "@livekit/components-react";
import { ConnectionState, Track } from "livekit-client";

import { FindChannelByUsernameQuery } from "@/graphql/generated/output";

import { Skeleton } from "@/components/ui/shadcn/Skeleton";
import { OfflineStream } from "../stream/OfflineStream";
import { LoadingStream } from "../stream/LoadingStream";
import { Player } from "../stream/Player";

interface StreamVideoProps {
  channel: FindChannelByUsernameQuery["findChannelByUsername"];
}

export function StreamVideo({ channel }: StreamVideoProps) {
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(channel.id);

  const tracks = useTracks([
    Track.Source.Camera,
    Track.Source.Microphone,
  ]).filter((track) => track.participant.identity === channel.id);

  const getContent = () => {
    if (!participant && connectionState === ConnectionState.Connected) {
      return <OfflineStream channel={channel} />;
    }
    if (!participant || tracks.length === 0) {
      return <LoadingStream />;
    }
    return <Player participantIdentity={channel.id} />;
  };

  return (
    <div className="group relative mb-6 aspect-video h-full w-full rounded-lg">
      {getContent()}
    </div>
  );
}

export function StreamVideoSkeleton() {
  return (
    <div className="mb-6 aspect-video">
      <Skeleton className="h-full w-full rounded-lg" />
    </div>
  );
}
