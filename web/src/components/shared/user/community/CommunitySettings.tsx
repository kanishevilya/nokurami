"use client";

import { Heading } from "@/components/ui/items/Heading";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/shadcn/Tabs";
import { useClearAccordions } from "@/hooks/useAccordion";
import { useCallback } from "react";
import { useTabs } from "@/hooks/useTabs";
import { FollowingsTable } from "./FollowingsTable";
import { FollowersTable } from "./FollowersTable";

export function CommunitySettings() {
  return (
    <div className="lg:px-10">
      <Heading
        title={"Community"}
        description={"View and manage your followers and followings"}
        size="lg"
      />
      <Tabs defaultValue="followers" className="mt-3 w-full">
        <TabsList className="grid grid-cols-2 w-full max-w-[400px]">
          <TabsTrigger value="followers">Followers</TabsTrigger>
          <TabsTrigger value="followings">Followings</TabsTrigger>
        </TabsList>
        <div className="mt-10">
          <TabsContent value="followers">
            <FollowersTable />
          </TabsContent>
          <TabsContent value="followings">
            <FollowingsTable />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
