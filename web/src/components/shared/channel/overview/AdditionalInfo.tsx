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
import { useTranslations } from "next-intl";

interface AdditionalInfoProps {
  username: string;
}

export default function AdditionalInfo({ username }: AdditionalInfoProps) {
  const { isAuthenticated } = useAuth();
  const { user: currentUser } = useCurrent();
  const [activeTab, setActiveTab] = useState("overview");
  const [requestingChat, setRequestingChat] = useState(false);
  const t = useTranslations("profile");

  const { data, loading, error } = useFindChannelByUsernameQuery({
    variables: {
      username,
    },
  });

  const channel = data?.findChannelByUsername;

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

  if (loading || !channel) return <Skeleton className="w-full h-full" />;

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList>
        <TabsTrigger value="overview">{t("overview")}</TabsTrigger>
        <TabsTrigger value="about">{t("about")}</TabsTrigger>
        <TabsTrigger value="content">{t("content")}</TabsTrigger>
      </TabsList>

      {}
      <TabsContent value="overview" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>{t("overview")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-medium">{t("followers")}</h3>
                <p className="text-2xl font-bold">{followerCount}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-medium">{t("following")}</h3>
                <p className="text-2xl font-bold">{followingCount}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-medium">{t("memberSince")}</h3>
                <p className="text-lg font-semibold">
                  {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {}
      <TabsContent value="about" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>{t("about")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {channel?.information ? (
                <p>{channel.information}</p>
              ) : (
                <p className="text-muted-foreground">
                  {t("noInformationProvided")}
                </p>
              )}

              {channel?.socialLinks && channel?.socialLinks.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-medium">{t("socialLinks")}</h3>
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

      {}
      <TabsContent value="content" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>{t("content")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              {t("recentStreamsWillBeShown")}
            </p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
