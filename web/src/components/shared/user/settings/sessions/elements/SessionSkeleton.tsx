import { Skeleton } from "@/components/ui/shadcn/Skeleton";

export function SessionSkeleton() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-5 bg-gray-300 rounded-full" />
          <Skeleton className="h-5 w-5 bg-gray-300 rounded-full" />
          <Skeleton className="h-5 w-5 bg-gray-300 rounded-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-5 w-64 bg-gray-300 rounded" />
          <Skeleton className="h-4 w-48 bg-gray-300 rounded" />
        </div>
      </div>
      <div className="h-8 w-8 bg-gray-300 rounded-full" />
    </div>
  );
}
