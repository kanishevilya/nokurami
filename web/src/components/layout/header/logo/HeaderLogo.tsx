import { Logo } from "@/components/ui/items/Logo";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import Link from "next/link";

const HeaderLogo = () => {
  const t = useTranslations("logo");

  return (
    <Link
      href="/"
      className="flex items-center gap-x-4 transition-opacity hover:opacity-75"
    >
      <Logo width={45} height={45} />
      <div className="hidden leading-tight lg:block">
        <h2 className="text-lg font-semibold tracking-wider text-accent-foreground">
          {t("title")}
        </h2>
        <p className="text-sm text-muted-foreground">{t("subtitle")}</p>
      </div>
    </Link>
  );
};

export default HeaderLogo;
