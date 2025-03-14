"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/shadcn/Button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/shadcn/Avatar";
import { useFindRandomStreamsQuery } from "@/graphql/generated/output";
import Image from "next/image";
import { getMediaSource } from "@/utils/get-media-source";
import { cn } from "@/utils/cn";
import { Badge } from "@/components/ui/shadcn/Badge";
import { Card, CardContent } from "@/components/ui/shadcn/Card";
import { Skeleton } from "@/components/ui/shadcn/Skeleton";
import { useRouter } from "next/navigation";
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const { data, loading } = useFindRandomStreamsQuery();

  const streams = data?.findRandomStreams || [];

  console.log(streams);
  const handlePrev = () => {
    if (isAnimating || streams.length < 2) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === 0 ? streams.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleNext = () => {
    if (isAnimating || streams.length < 2) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === streams.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Handle touch events for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      // Swipe left
      handleNext();
    } else if (touchEndX.current - touchStartX.current > 50) {
      // Swipe right
      handlePrev();
    }
  };

  // Auto-advance carousel every 8 seconds
  useEffect(() => {
    if (streams.length < 2) return;

    const interval = setInterval(() => {
      handleNext();
    }, 8000);

    return () => clearInterval(interval);
  }, [streams.length, activeIndex, isAnimating]);

  if (loading || !streams) return <Skeleton className="w-full h-[400px]" />;

  return (
    <div className="relative w-full overflow-hidden rounded-xl bg-gradient-to-b from-background/80 to-background p-6 shadow-md">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Featured Channels</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrev}
            disabled={isAnimating || streams.length < 2}
            className="h-9 w-9 rounded-full"
            aria-label="Previous channel"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            disabled={isAnimating || streams.length < 2}
            className="h-9 w-9 rounded-full"
            aria-label="Next channel"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div
        className="relative mx-auto max-w-5xl"
        ref={carouselRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative h-[400px] overflow-visible">
          {/* Main active card */}
          <div
            className={cn(
              "absolute left-1/2 top-0 w-full max-w-md -translate-x-1/2 transition-all duration-500 ease-out z-20",
              isAnimating && "scale-95 opacity-90"
            )}
          >
            <FeaturedChannelCard
              stream={streams[activeIndex]}
              isActive={true}
            />
          </div>

          {/* Previous card */}
          {streams.length > 1 && (
            <div
              className={cn(
                "absolute left-0 top-1/4 w-[280px] transition-all duration-500 ease-out z-10 opacity-70 scale-90",
                isAnimating && "opacity-50 -translate-x-10"
              )}
              onClick={handlePrev}
            >
              <FeaturedChannelCard
                stream={
                  streams[
                    activeIndex === 0 ? streams.length - 1 : activeIndex - 1
                  ]
                }
                isActive={false}
              />
            </div>
          )}

          {/* Next card */}
          {streams.length > 1 && (
            <div
              className={cn(
                "absolute right-0 top-1/4 w-[280px] transition-all duration-500 ease-out z-10 opacity-70 scale-90",
                isAnimating && "opacity-50 translate-x-10"
              )}
              onClick={handleNext}
            >
              <FeaturedChannelCard
                stream={
                  streams[
                    activeIndex === streams.length - 1 ? 0 : activeIndex + 1
                  ]
                }
                isActive={false}
              />
            </div>
          )}
        </div>
      </div>

      {/* Carousel indicators */}
      {streams.length > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {streams.map((_, index) => (
            <button
              key={index}
              className={cn(
                "h-2 rounded-full transition-all",
                index === activeIndex ? "bg-primary w-6" : "bg-muted w-2"
              )}
              onClick={() => {
                if (!isAnimating) {
                  setIsAnimating(true);
                  setActiveIndex(index);
                  setTimeout(() => setIsAnimating(false), 500);
                }
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface FeaturedChannelCardProps {
  stream: StreamType;
  isActive: boolean;
}

function FeaturedChannelCard({ stream, isActive }: FeaturedChannelCardProps) {
  // Check if avatar exists and is not an empty string
  const hasAvatar = stream.user.avatar && stream.user.avatar.trim() !== "";
  const router = useRouter();
  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-500",
        isActive ? "shadow-xl" : "shadow-md cursor-pointer",
        isActive ? "hover:-translate-y-1" : "hover:scale-105"
      )}
    >
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={getMediaSource(stream.previewUrl) || ""}
          alt={stream.title}
          fill
          className="object-cover transition-transform duration-700 hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {stream.isLive && (
          <Badge
            variant="destructive"
            className="absolute left-3 top-3 px-2 py-1 text-xs font-semibold"
          >
            LIVE
          </Badge>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border-2 border-primary ring-2 ring-background">
            {hasAvatar ? (
              <AvatarImage
                src={getMediaSource(stream.user.avatar) || ""}
                alt={stream.user.username}
              />
            ) : null}
            <AvatarFallback className="bg-primary/10">
              {stream.user.username[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="overflow-hidden">
            <h3 className="line-clamp-1 font-semibold text-sm md:text-base">
              {stream.title}
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground truncate">
              {stream.user.username}
            </p>
          </div>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <Badge variant="outline" className="text-xs">
            {stream.category.title}
          </Badge>
          {isActive && (
            <Button
              size="sm"
              variant="secondary"
              className="text-xs h-7 px-2 md:px-3"
              onClick={() => {
                router.push(`/${stream.user.username}`);
              }}
            >
              Watch Now
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
