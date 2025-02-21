"use client";

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { ProfileMenu } from "./ProfileMenu";
import { Button } from "@/components/ui/shadcn/Button";

const HeaderMenu = () => {
  const { isAuthenticated } = useAuth();
  return (
    <div className="flex items-center space-x-4 ml-auto">
      {isAuthenticated ? (
        <ProfileMenu />
      ) : (
        <>
          <Link href="/account/login">
            <Button variant={"secondary"}>Login</Button>
          </Link>
          <Link href="/account/register">
            <Button>Register</Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default HeaderMenu;
