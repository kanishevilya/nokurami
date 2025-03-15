"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { Button } from "@/components/ui/shadcn/Button";

export default function NotFound() {
  const t = useTranslations("errors");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <h2 className="mt-4 text-3xl font-semibold">{t("pageNotFound")}</h2>
        <p className="mt-2 text-lg text-muted-foreground">
          {t("somethingWentWrong")}. {t("tryAgain")}
        </p>
        <Button className="mt-8" asChild>
          <Link href="/">{t("backToHome")}</Link>
        </Button>
      </div>
    </div>
  );
}
