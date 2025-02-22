"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/shadcn/Popover";
import { Loader } from "lucide-react";
import { Bell } from "lucide-react";
import { useFindUnreadNotificationsCountQuery } from "@/graphql/generated/output";
import { NotificationsList } from "./NotificationsList";

export const Notifications = () => {
  const { data, loading } = useFindUnreadNotificationsCountQuery();

  const unreadCount = data?.findUnreadNotificationsCount ?? 0;

  const count = unreadCount > 10 ? "+9" : unreadCount;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="relative">
          <Bell className="h-6 w-6" />
          {unreadCount > 0 && (
            <div className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-white">
              {count}
            </div>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="max-h-[500px] w-[320px] overflow-y-auto"
      >
        <NotificationsList />
      </PopoverContent>
    </Popover>
  );
};
