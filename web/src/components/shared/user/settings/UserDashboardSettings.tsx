"use client";

import { Heading } from "@/components/ui/items/Heading";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/shadcn/Tabs";
import { ProfileSettings } from "./profile/ProfileSettings";
import { NotificationSettingsForm } from "./notifications/NotificationSettingsForm";
import { SessionSettings } from "./sessions/SessionSettings";
import AppearanceLanguageSettings from "./appearance_language/AppearanceLanguageSettings";
import { SecuritySettings } from "./security/SecuritySettings";
import { useClearAccordions } from "@/hooks/useAccordion";
import { useCallback } from "react";
import { useTabs } from "@/hooks/useTabs";

export function UserDashboardSettings() {
  const { clearAccordions } = useClearAccordions();
  const { settingsTab, setSettingsTab } = useTabs();

  const handleTabChange = useCallback(
    (tab: string) => {
      clearAccordions();
      setSettingsTab(tab);
    },
    [clearAccordions, setSettingsTab]
  );

  return (
    <div className="lg:px-10">
      <Heading
        title={"Settings"}
        description={"Manage your account settings and preferences"}
        size="lg"
      />
      <Tabs
        onValueChange={handleTabChange}
        value={settingsTab}
        defaultValue="profile"
        className="mt-3 w-full"
      >
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
          <TabsTrigger value="appearance">Appearance & Language</TabsTrigger>
        </TabsList>
        <div className="mt-10">
          <TabsContent value="profile">
            <ProfileSettings />
          </TabsContent>
          <TabsContent value="security">
            <SecuritySettings />
          </TabsContent>
          <TabsContent value="notifications">
            <NotificationSettingsForm />
          </TabsContent>
          <TabsContent value="sessions">
            <SessionSettings />
          </TabsContent>
          <TabsContent value="appearance">
            <AppearanceLanguageSettings />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
