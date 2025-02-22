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
import { Notifications } from "@/components/layout/header/Notifications";

export function ProfileMenu() {
  const router = useRouter();

  const { unauthenticate } = useAuth();
  const { user, isLoadingProfile } = useCurrent();

  const [logout] = useLogoutUserMutation({
    onCompleted() {
      unauthenticate();
      toast.success("Вы успешно вышли из системы");
      router.push("/account/login");
    },
    onError() {
      toast.error("Произошла ошибка при выходе из системы");
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
          <Link href={`/test`}>
            <DropdownMenuItem>
              <User className="mr-2 size-2" />
              Профиль
            </DropdownMenuItem>
          </Link>
          <Link href="/dashboard/settings">
            <DropdownMenuItem>
              <LayoutDashboard className="mr-2 size-2" />
              Панель управления
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem onClick={() => logout()}>
            <LogOut className="mr-2 size-2" />
            Выйти
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
