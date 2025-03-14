import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/shadcn/Card";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/shadcn/Tabs";
import {
  FindChannelByUsernameQuery,
  useFindChannelByUsernameQuery,
  useFindFollowersCountByChannelQuery,
  useFindFollowingsCountByChannelQuery,
} from "@/graphql/generated/output";
import { use } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useCurrent } from "@/hooks/useCurrent";
import { useState } from "react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/shadcn/Skeleton";

interface AdditionalInfoProps {
  username: string;
}

export default function AdditionalInfo({ username }: AdditionalInfoProps) {
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

  if (loading || !channel) return <Skeleton className="w-full h-full" />;

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="about">About</TabsTrigger>
        <TabsTrigger value="content">Content</TabsTrigger>
      </TabsList>

      {/* Overview Tab - Shows follower and following counts */}
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
                  {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* About Tab - Shows information and social links */}
      <TabsContent value="about" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {channel?.information ? (
                <p>{channel.information}</p>
              ) : (
                <p className="text-muted-foreground">
                  No information provided.
                </p>
              )}

              {channel?.socialLinks && channel?.socialLinks.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-medium">Social Links</h3>
                  <div className="space-y-1">
                    {channel.socialLinks.map((link) => (
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

      {/* Content Tab - Shows recent content */}
      <TabsContent value="content" className="space-y-4">
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
  );
}
