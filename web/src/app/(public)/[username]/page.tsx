"use client";

import { useState } from "react";
import {
  useFindChannelByUsernameQuery,
  useFindFollowersCountByChannelQuery,
  useFindFollowingsCountByChannelQuery,
} from "@/graphql/generated/output";
import ChannelOverview from "@/components/shared/channel/ChannelOverview";
import { Skeleton } from "@/components/ui/shadcn/Skeleton";
import { Button } from "@/components/ui/shadcn/Button";
import { MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/shadcn/Badge";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/shadcn/Avatar";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/shadcn/Tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/Card";
import { toast } from "sonner";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useCurrent } from "@/hooks/useCurrent";
import { getMediaSource } from "@/utils/get-media-source";
import { use } from "react";

interface ChannelPageProps {
  params: Promise<{ username: string }>;
}

export default function ChannelPage({ params }: ChannelPageProps) {
  const { username } = use(params);
  const { isAuthenticated } = useAuth();
  const { user: currentUser } = useCurrent();
  const [activeTab, setActiveTab] = useState("overview");
  const [requestingChat, setRequestingChat] = useState(false);

  const { data, loading, error } = useFindChannelByUsernameQuery({
    variables: {
      username,
    },
  });

  const channel = data?.findChannelByUsername;

  // Fetch follower and following counts
  const { data: followerData } = useFindFollowersCountByChannelQuery({
    variables: { channelId: channel?.id || "" },
    skip: !channel?.id,
  });

  const { data: followingData } = useFindFollowingsCountByChannelQuery({
    variables: { channelId: channel?.id || "" },
    skip: !channel?.id,
  });

  const followerCount = followerData?.findFollowersCountByChannel || 0;
  const followingCount = followingData?.findFollowingsCountByChannel || 0;

  const handleChatRequest = async () => {
    if (!currentUser || !channel) return;

    setRequestingChat(true);

    // This would be replaced with an actual API call
    try {
      // Simulate API call
      setTimeout(() => {
        toast.success("Chat request sent successfully");
        setRequestingChat(false);
      }, 1000);
    } catch (error) {
      toast.error("Failed to send chat request");
      setRequestingChat(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-6 space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          <Skeleton className="h-32 w-32 rounded-full" />
          <div className="space-y-4 flex-1">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-20 w-full" />
          </div>
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (error || !channel) {
    return (
      <div className="container py-6">
        <div className="bg-destructive/20 text-destructive p-4 rounded-md">
          {error ? `Error: ${error.message}` : "Channel not found"}
        </div>
      </div>
    );
  }

  const isCurrentUser = currentUser?.id === channel.id;
  const isLive = channel.stream?.isLive;

  return (
    <div className="container py-6 space-y-6">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row gap-6 ml-16">
        <Avatar className="h-32 w-32">
          <AvatarImage src={getMediaSource(channel.avatar) || ""} />
          <AvatarFallback>
            {channel.displayName[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="space-y-4 flex-1">
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
            <h1 className="text-3xl font-bold">{channel.displayName}</h1>
            <div className="text-muted-foreground">@{channel.username}</div>
            {isLive && (
              <Badge variant="destructive" className="ml-2">
                LIVE
              </Badge>
            )}
          </div>

          {channel.information && (
            <p className="text-muted-foreground">{channel.information}</p>
          )}

          <div className="flex flex-wrap gap-2">
            {isAuthenticated && !isCurrentUser && (
              <Button
                onClick={handleChatRequest}
                disabled={requestingChat}
                size="sm"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                {requestingChat ? "Sending request..." : "Send message"}
              </Button>
            )}

            {isLive && (
              <Button variant="secondary" size="sm" asChild>
                <Link href={`/streams/${channel.username}`}>Watch Stream</Link>
              </Button>
            )}

            {isCurrentUser && (
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/settings">Edit Profile</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
      <ChannelOverview channel={channel} />
    </div>
  );
}
