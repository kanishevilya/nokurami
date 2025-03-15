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
import AppearanceLanguageSettings from "./appearance-language/AppearanceLanguageSettings";
import { SecuritySettings } from "./security/SecuritySettings";
import { useClearAccordions } from "@/hooks/useAccordion";
import { useCallback } from "react";
import { useTabs } from "@/hooks/useTabs";
import { useTranslations } from "next-intl";

export function UserDashboardSettings() {
  const { clearAccordions } = useClearAccordions();
  const { settingsTab, setSettingsTab } = useTabs();
  const t = useTranslations("settings");

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
        title={t("title")}
        description={t("dashboardDescription")}
        size="lg"
      />
      <Tabs
        onValueChange={handleTabChange}
        value={settingsTab}
        defaultValue="profile"
        className="mt-3 w-full"
      >
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="profile">{t("profile")}</TabsTrigger>
          <TabsTrigger value="security">{t("security")}</TabsTrigger>
          <TabsTrigger value="notifications">{t("notifications")}</TabsTrigger>
          <TabsTrigger value="sessions">{t("sessions")}</TabsTrigger>
          <TabsTrigger value="appearance">{t("appearance")}</TabsTrigger>
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
