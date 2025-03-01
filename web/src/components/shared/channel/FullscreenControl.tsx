import { Maximize2, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/shadcn/Button";

interface FullscreenControlProps {
  isFullscreen: boolean;
  onToggle: () => void;
}

export function FullscreenControl({
  isFullscreen,
  onToggle,
}: FullscreenControlProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onToggle}
      className="h-8 w-8 text-white hover:bg-white/10"
    >
      {isFullscreen ? (
        <Minimize2 className="h-5 w-5" />
      ) : (
        <Maximize2 className="h-5 w-5" />
      )}
    </Button>
  );
}
