"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/shadcn/Tabs";
import { StreamsList } from "../directory/category/information/StreamsList";
import FollowingChannelsPage from "./FollowingChannelsPage";
import FollowingStreamsPage from "./FollowingStreamsPage";
import { useCurrent } from "@/hooks/useCurrent";
import { Skeleton } from "@/components/ui/shadcn/Skeleton";
import { FindProfileQuery } from "@/graphql/generated/output";
import { useTranslations } from "next-intl";

export default function FollowingTabsPage() {
  const { user, isLoadingProfile } = useCurrent();
  const t = useTranslations("profile");

  console.log(user);

  return (
    <Tabs defaultValue="channels">
      <TabsList>
        <TabsTrigger value="channels">{t("channels")}</TabsTrigger>
        <TabsTrigger value="streams">{t("streams")}</TabsTrigger>
      </TabsList>
      <TabsContent className="mt-6" value="channels">
        {isLoadingProfile ? (
          <Skeleton className="h-11 w-full rounded-lg" />
        ) : (
          <FollowingChannelsPage
            user={user as FindProfileQuery["getProfile"]}
          />
        )}
      </TabsContent>
      <TabsContent className="mt-6" value="streams">
        {isLoadingProfile ? (
          <Skeleton className="h-11 w-full rounded-lg" />
        ) : (
          <FollowingStreamsPage user={user as FindProfileQuery["getProfile"]} />
        )}
      </TabsContent>
    </Tabs>
  );
}
