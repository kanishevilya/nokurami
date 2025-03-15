"use client";

import { LayoutDashboard, Loader, LogOut, User } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/shadcn/DropdownMenu";

import { useLogoutUserMutation } from "@/graphql/generated/output";

import { useAuth } from "@/hooks/useAuth";
import { useCurrent } from "@/hooks/useCurrent";
import { ChannelAvatar } from "@/components/ui/items/ChannelAvatar";
import { Notifications } from "@/components/layout/header/notifications/Notifications";

export function ProfileMenu() {
  const router = useRouter();
  const t = useTranslations("profile");
  const commonT = useTranslations("common");

  const { unauthenticate } = useAuth();
  const { user, isLoadingProfile } = useCurrent();

  const [logout] = useLogoutUserMutation({
    onCompleted() {
      unauthenticate();
      toast.success(t("logoutSuccess"));
      router.push("/account/login");
    },
    onError() {
      toast.error(commonT("error"));
    },
  });

  return isLoadingProfile || !user ? (
    <Loader className="size-6 animate-spin" />
  ) : (
    <div className="flex items-center gap-x-6">
      <Notifications />
      <DropdownMenu>
        <DropdownMenuTrigger>
          <ChannelAvatar
            size="md"
            channel={{ username: user.username, avatar: user.avatar }}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[230px]">
          <div className="flex items-center gap-x-3 p-2">
            <ChannelAvatar
              size="md"
              channel={{ username: user.username, avatar: user.avatar }}
            />
            <h2 className="font-medium text-foreground">{user.username}</h2>
          </div>
          <DropdownMenuSeparator />
          <Link href={`/${user.username}`}>
            <DropdownMenuItem>
              <User className="mr-2 size-2" />
              {t("profile")}
            </DropdownMenuItem>
          </Link>
          <Link href="/dashboard/settings">
            <DropdownMenuItem>
              <LayoutDashboard className="mr-2 size-2" />
              {t("dashboard")}
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem onClick={() => logout()}>
            <LogOut className="mr-2 size-2" />
            {t("logOut")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
