"use client";

import {
  useConnectionState,
  useRemoteParticipant,
  useTracks,
} from "@livekit/components-react";
import { ConnectionState, Track } from "livekit-client";

import { FindChannelByUsernameQuery } from "@/graphql/generated/output";

import { Skeleton } from "@/components/ui/shadcn/Skeleton";
import { OfflineStream } from "./OfflineStream";
import { LoadingStream } from "./LoadingStream";
import { Player } from "./Player";

interface StreamVideoProps {
  channel: FindChannelByUsernameQuery["findChannelByUsername"];
}

export function StreamVideo({ channel }: StreamVideoProps) {
  console.log("channel", channel);
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(channel.id);

  const tracks = useTracks([
    Track.Source.Camera,
    Track.Source.Microphone,
  ]).filter((track) => track.participant.identity === channel.id);

  console.log("participant", participant);
  console.log("connectionState", connectionState);
  console.log("tracks", tracks);

  const getContent = () => {
    if (!participant && connectionState === ConnectionState.Connected) {
      console.log("OfflineStream");
      return <OfflineStream channel={channel} />;
    }
    if (!participant || tracks.length === 0) {
      console.log("LoadingStream");
      return <LoadingStream />;
    }
    console.log("Player");
    return <Player participantIdentity={channel.id} />;
  };

  return (
    <div className="group relative mb-6 aspect-video rounded-lg">
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
