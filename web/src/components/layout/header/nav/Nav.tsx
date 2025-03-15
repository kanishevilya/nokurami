import { FilesIcon, Users } from "lucide-react";
import { NavItem } from "./NavItem";
import { Route } from "@/components/layout/sidebar/types/Route";
import { useTranslations } from "next-intl";

export function Nav() {
  const t = useTranslations("navigation");

  const routes: Route[] = [
    {
      label: t("following"),
      href: "/directory/following",
      icon: Users,
    },
    {
      label: t("browse"),
      href: "/directory",
      icon: FilesIcon,
    },
  ];

  return (
    <div className="ml-16 -mr-60 flex w-40 items-center gap-x-4">
      {routes.map((route) => (
        <NavItem key={route.href} route={route} />
      ))}
    </div>
  );
}
