"use client";

import {
  Home,
  List,
  Loader2,
  Settings,
  Users,
  MessageSquare,
  Mail,
} from "lucide-react";
import { SidebarMenu } from "@/components/ui/shadcn/Sidebar";
import { SidebarItem } from "./SidebarItem";
import { Route } from "./types/Route";
import { TrackedChannels } from "./TrackedChannels";
import { MyChannelItem } from "./MyChannelItem";
import { useCurrent } from "@/hooks/useCurrent";
import { useAuth } from "@/hooks/useAuth";
import { FollowedChannels } from "./FollowedChannels";
import { useTranslations } from "next-intl";

export function PrimaryNav() {
  const { user, isLoadingProfile } = useCurrent();
  const { isAuthenticated } = useAuth();
  const t = useTranslations("navigation");
  const messagesT = useTranslations("messages");

  const routes: Route[] = [
    {
      label: t("home"),
      href: "/",
      icon: Home,
    },
    {
      label: t("categories"),
      href: "/directory",
      icon: List,
    },
    {
      label: t("community"),
      href: "/community",
      icon: MessageSquare,
    },
  ];

  return (
    <div className="space-y-2 px-2 pt-4 lg:pt-0">
      {routes.map((route, index) => (
        <SidebarItem key={index} route={route} />
      ))}

      {isAuthenticated && (
        <SidebarItem
          route={{
            label: messagesT("title"),
            href: "/messages",
            icon: Mail,
          }}
        />
      )}

      {isLoadingProfile || !user ? (
        isAuthenticated && (
          <Loader2 className="size-5 animate-spin relative top-4 left-5" />
        )
      ) : (
        <div className="space-y-2">
          <MyChannelItem
            href={`/${user?.username}`}
            user={user}
            label={user?.username}
            stream={user?.stream}
          />
          <FollowedChannels />
        </div>
      )}
    </div>
  );
}
