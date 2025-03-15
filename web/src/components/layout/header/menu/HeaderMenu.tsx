"use client";

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { ProfileMenu } from "./ProfileMenu";
import { Button } from "@/components/ui/shadcn/Button";
import { useTranslations } from "next-intl";

const HeaderMenu = () => {
  const { isAuthenticated } = useAuth();
  const t = useTranslations("auth");

  return (
    <div className="flex items-center space-x-4 ml-auto">
      {isAuthenticated ? (
        <ProfileMenu />
      ) : (
        <>
          <Link href="/account/login">
            <Button variant={"secondary"}>{t("login")}</Button>
          </Link>
          <Link href="/account/register">
            <Button>{t("register")}</Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default HeaderMenu;
