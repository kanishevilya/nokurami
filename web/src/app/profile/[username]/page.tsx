"use client";

import { useState } from "react";
import { Button } from "@/components/ui/shadcn/Button";
import { MessageSquare } from "lucide-react";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/shadcn/Avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/Card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/shadcn/Tabs";
import { Skeleton } from "@/components/ui/shadcn/Skeleton";
import { Badge } from "@/components/ui/shadcn/Badge";
import { toast } from "sonner";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useCurrent } from "@/hooks/useCurrent";
import {
  useFindChannelByUsernameQuery,
  useFindFollowersCountByChannelQuery,
  useFindFollowingsCountByChannelQuery,
} from "@/graphql/generated/output";
import { getMediaSource } from "@/utils/get-media-source";

export default function UserProfilePage() {
  const params = useParams();
  const username = typeof params.username === "string" ? params.username : "";
  const { isAuthenticated } = useAuth();
  const { user: currentUser } = useCurrent();
  const [activeTab, setActiveTab] = useState("overview");

  const { data, loading, error } = useFindChannelByUsernameQuery({
    variables: {
      username,
    },
    skip: !username,
  });

  const user = data?.findChannelByUsername;

  // Fetch follower and following counts
  const { data: followerData } = useFindFollowersCountByChannelQuery({
    variables: { channelId: user?.id || "" },
    skip: !user?.id,
  });

  const { data: followingData } = useFindFollowingsCountByChannelQuery({
    variables: { channelId: user?.id || "" },
    skip: !user?.id,
  });

  const followerCount = followerData?.findFollowersCountByChannel || 0;
  const followingCount = followingData?.findFollowingsCountByChannel || 0;

  const [requestingChat, setRequestingChat] = useState(false);

  const handleChatRequest = async () => {
    if (!currentUser || !user) return;

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
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="container py-6">
        <div className="bg-destructive/20 text-destructive p-4 rounded-md">
          {error ? `Error: ${error.message}` : "User not found"}
        </div>
      </div>
    );
  }

  const isCurrentUser = currentUser?.id === user.id;
  const isLive = user.stream?.isLive;

  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <Avatar className="h-32 w-32">
          <AvatarImage src={getMediaSource(user.avatar) || ""} />
          <AvatarFallback>{user.displayName[0].toUpperCase()}</AvatarFallback>
        </Avatar>

        <div className="space-y-4 flex-1">
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
            <h1 className="text-3xl font-bold">{user.displayName}</h1>
            <div className="text-muted-foreground">@{user.username}</div>
            {isLive && (
              <Badge variant="destructive" className="ml-2">
                LIVE
              </Badge>
            )}
          </div>

          {user.information && (
            <p className="text-muted-foreground">{user.information}</p>
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
                <Link href={`/streams/${user.username}`}>Watch Stream</Link>
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

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-medium">Followers</h3>
                  <p className="text-2xl font-bold">{followerCount}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-medium">Following</h3>
                  <p className="text-2xl font-bold">{followingCount}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-medium">Member Since</h3>
                  <p className="text-lg font-semibold">
                    {/* Use a default date since we don't have createdAt in the query */}
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {user.information ? (
                  <p>{user.information}</p>
                ) : (
                  <p className="text-muted-foreground">
                    No information provided.
                  </p>
                )}

                {user.socialLinks && user.socialLinks.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="font-medium">Social Links</h3>
                    <div className="space-y-1">
                      {user.socialLinks.map((link) => (
                        <a
                          key={link.id}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-primary hover:underline"
                        >
                          {link.title}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>Content</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Recent streams and content will be shown here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
