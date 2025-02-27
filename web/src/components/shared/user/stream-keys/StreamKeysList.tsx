"use client";

import { useCurrent } from "@/hooks/useCurrent";
import { StreamKeyField } from "./StreamKeyField";
import { Skeleton } from "@/components/ui/shadcn/Skeleton";

export function StreamKeysList() {
  const { user, isLoadingProfile } = useCurrent();

  return isLoadingProfile ? (
    <StreamKeysSkeleton />
  ) : (
    <div className="space-y-6">
      <div className="space-y-4 rounded-lg">
        <StreamKeyField
          label="Stream URL"
          value={user?.stream?.serverUrl || ""}
        />
        <StreamKeyField
          label="Stream Key"
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
