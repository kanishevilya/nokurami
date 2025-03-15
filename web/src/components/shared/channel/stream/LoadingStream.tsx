import { Loader2 } from "lucide-react";

export function LoadingStream() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-card rounded-lg">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
    </div>
  );
}
