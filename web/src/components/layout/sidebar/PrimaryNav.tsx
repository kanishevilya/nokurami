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
export function PrimaryNav() {
  const { user, isLoadingProfile } = useCurrent();
  const { isAuthenticated } = useAuth();
  const routes: Route[] = [
    {
      label: "Home",
      href: "/",
      icon: Home,
    },
    {
      label: "Categories",
      href: "/directory",
      icon: List,
    },
    {
      label: "Community",
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
            label: "Messages",
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
            href={`/profile/${user?.username}`}
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
