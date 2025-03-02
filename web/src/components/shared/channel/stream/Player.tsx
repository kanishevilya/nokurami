"use client";

import { useEffect, useRef, useState } from "react";
import { useTracks } from "@livekit/components-react";
import { Track } from "livekit-client";
import { useEventListener } from "usehooks-ts";

import { VolumeControl } from "./VolumeControl";
import { FullscreenControl } from "./FullscreenControl";

interface PlayerProps {
  participantIdentity: string;
}

export function Player({ participantIdentity }: PlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [volume, setVolume] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const tracks = useTracks([
    Track.Source.Camera,
    Track.Source.Microphone,
  ]).filter((track) => track.participant.identity === participantIdentity);

  useEffect(() => {
    tracks.forEach((track) => {
      const mediaTrack = track.publication.track;
      if (!mediaTrack) return;

      if (track.source === Track.Source.Camera && videoRef.current) {
        mediaTrack.attach(videoRef.current);
      } else if (track.source === Track.Source.Microphone && audioRef.current) {
        mediaTrack.attach(audioRef.current);
      }
    });

    return () => {
      tracks.forEach((track) => {
        const mediaTrack = track.publication.track;
        if (mediaTrack) {
          mediaTrack.detach();
        }
      });
    };
  }, [tracks, participantIdentity]);

  useEffect(() => {
    onVolumeChange(0);
  }, []);

  const onVolumeChange = (value: number) => {
    setVolume(value);

    if (videoRef.current) {
      videoRef.current.muted = value === 0;
      videoRef.current.volume = value * 0.01;
    }
    if (audioRef.current) {
      audioRef.current.muted = value === 0;
      audioRef.current.volume = value * 0.01;
    }
  };

  const toggleMute = () => {
    const isMuted = volume === 0;
    const newVolume = isMuted ? 50 : 0;
    onVolumeChange(newVolume);
  };

  const toggleFullscreen = () => {
    if (isFullscreen) {
      document.exitFullscreen();
    } else if (wrapperRef.current) {
      wrapperRef.current.requestFullscreen();
    }
  };

  const handleFullscreenChange = () => {
    const isCurrentlyFullscreen = document.fullscreenElement !== null;
    setIsFullscreen(isCurrentlyFullscreen);
  };

  useEventListener(
    "fullscreenchange" as keyof WindowEventMap,
    handleFullscreenChange as EventListener
  );

  return (
    <div
      ref={wrapperRef}
      className="relative h-full w-full rounded-lg overflow-hidden flex"
    >
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        autoPlay
        muted
        playsInline
      />
      <audio ref={audioRef} autoPlay />
      <div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 transition-opacity">
        <div className="absolute bottom-0 flex h-16 w-full items-center justify-between px-4 bg-gradient-to-t from-black/50 to-transparent">
          <VolumeControl
            onToggle={toggleMute}
            onChange={onVolumeChange}
            value={volume}
          />
          <FullscreenControl
            isFullscreen={isFullscreen}
            onToggle={toggleFullscreen}
          />
        </div>
      </div>
    </div>
  );
}
