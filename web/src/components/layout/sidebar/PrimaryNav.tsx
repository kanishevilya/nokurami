"use client";

import { Home, List, Loader2, Settings, Users } from "lucide-react";
import { SidebarMenu } from "@/components/ui/shadcn/Sidebar";
import { SidebarItem } from "./SidebarItem";
import { Route } from "./types/Route";
import { TrackedChannels } from "./TrackedChannels";
import { MyChannelItem } from "./MyChannelItem";
import { useCurrent } from "@/hooks/useCurrent";
import { useAuth } from "@/hooks/useAuth";
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
  ];

  return (
    <div className="space-y-2 px-2 pt-4 lg:pt-0">
      {routes.map((route, index) => (
        <SidebarItem key={index} route={route} />
      ))}
      {isLoadingProfile || !user ? (
        isAuthenticated && (
          <Loader2 className="size-5 animate-spin relative top-4 left-5" />
        )
      ) : (
        <MyChannelItem
          href={`/${user?.username}`}
          user={user}
          label={user?.username}
          stream={user?.stream}
        />
      )}
    </div>
  );
}
