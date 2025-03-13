"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/shadcn/Button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/shadcn/Avatar";
import { useFindRandomStreamsQuery } from "@/graphql/generated/output";
import Link from "next/link";
import Image from "next/image";
import { getMediaSource } from "@/utils/get-media-source";
import { cn } from "@/utils/cn";

interface StreamType {
  id: string;
  title: string;
  previewUrl?: string | null;
  isLive: boolean;
  user: {
    id: string;
    username: string;
    avatar?: string | null;
  };
  category: {
    title: string;
    slug: string;
  };
}

export function FeaturedChannelsCarousel() {
  const { data, loading } = useFindRandomStreamsQuery({
    variables: { take: 9 },
    fetchPolicy: "network-only",
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const streams = (data?.findRandomStreams as StreamType[]) || [];

  const handlePrev = () => {
    if (isAnimating || streams.length < 3) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === 0 ? streams.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleNext = () => {
    if (isAnimating || streams.length < 3) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === streams.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Auto-advance carousel every 8 seconds
  useEffect(() => {
    if (streams.length < 3) return;

    const interval = setInterval(() => {
      handleNext();
    }, 8000);

    return () => clearInterval(interval);
  }, [streams.length, activeIndex, isAnimating]);

  if (loading || streams.length === 0) {
    return (
      <div className="w-full h-[400px] bg-card/50 rounded-lg animate-pulse" />
    );
  }

  // Calculate indices for the visible items
  const getVisibleIndices = () => {
    if (streams.length < 3) return { prev: null, current: 0, next: null };

    const prev = activeIndex === 0 ? streams.length - 1 : activeIndex - 1;
    const next = activeIndex === streams.length - 1 ? 0 : activeIndex + 1;

    return { prev, current: activeIndex, next };
  };

  const { prev, current, next } = getVisibleIndices();

  return (
    <div className="relative w-full overflow-hidden rounded-lg bg-card/20 p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Featured Channels</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrev}
            disabled={isAnimating || streams.length < 3}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            disabled={isAnimating || streams.length < 3}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="relative h-[300px]" ref={carouselRef}>
        <div className="absolute inset-0 flex items-center justify-center">
          {streams.length >= 3 && prev !== null && (
            <div
              className={cn(
                "absolute left-0 top-1/2 w-[30%] -translate-x-[30%] -translate-y-1/2 transform transition-all duration-500 ease-in-out",
                isAnimating && "opacity-0"
              )}
            >
              <FeaturedChannelCard stream={streams[prev]} isActive={false} />
            </div>
          )}

          <div
            className={cn(
              "absolute left-1/2 top-1/2 w-[40%] -translate-x-1/2 -translate-y-1/2 transform transition-all duration-500 ease-in-out z-10",
              isAnimating && "scale-110 opacity-90"
            )}
          >
            <FeaturedChannelCard stream={streams[current]} isActive={true} />
          </div>

          {streams.length >= 3 && next !== null && (
            <div
              className={cn(
                "absolute right-0 top-1/2 w-[30%] translate-x-[30%] -translate-y-1/2 transform transition-all duration-500 ease-in-out",
                isAnimating && "opacity-0"
              )}
            >
              <FeaturedChannelCard stream={streams[next]} isActive={false} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface FeaturedChannelCardProps {
  stream: StreamType;
  isActive: boolean;
}

function FeaturedChannelCard({ stream, isActive }: FeaturedChannelCardProps) {
  return (
    <Link
      href={`/profile/${stream.user.username}`}
      className={cn(
        "block overflow-hidden rounded-lg bg-card shadow-md transition-all hover:shadow-lg",
        isActive ? "scale-100 opacity-100" : "scale-90 opacity-70"
      )}
    >
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={getMediaSource(stream.previewUrl) || "/placeholder-stream.jpg"}
          alt={stream.title}
          fill
          className="object-cover"
        />
        {stream.isLive && (
          <div className="absolute left-2 top-2 rounded-full bg-red-500 px-2 py-1 text-xs font-semibold text-white">
            LIVE
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border-2 border-primary">
            <AvatarImage src={stream.user.avatar || ""} />
            <AvatarFallback>
              {stream.user.username[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="line-clamp-1 font-semibold">{stream.title}</h3>
            <p className="text-sm text-muted-foreground">
              {stream.user.username}
            </p>
          </div>
        </div>
        <div className="mt-2 text-xs text-muted-foreground">
          {stream.category.title}
        </div>
      </div>
    </Link>
  );
}
