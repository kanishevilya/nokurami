"use client";

import { useCurrent } from "@/hooks/useCurrent";
import { StreamKeyField } from "./StreamKeyField";
import { Skeleton } from "@/components/ui/shadcn/Skeleton";
import { useTranslations } from "next-intl";

export function StreamKeysList() {
  const { user, isLoadingProfile } = useCurrent();
  const t = useTranslations("profile");

  return isLoadingProfile ? (
    <StreamKeysSkeleton />
  ) : (
    <div className="space-y-6">
      <div className="space-y-4 rounded-lg">
        <StreamKeyField
          label={t("streamUrl")}
          value={user?.stream?.serverUrl || ""}
        />
        <StreamKeyField
          label={t("streamKey")}
          value={user?.stream?.streamKey || ""}
          isSecret
        />
      </div>
    </div>
  );
}

export function StreamKeysSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
    </div>
  );
}
