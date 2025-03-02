import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/shadcn/Button";
import { Slider } from "@/components/ui/shadcn/Slider";

interface VolumeControlProps {
  onToggle: () => void;
  onChange: (value: number) => void;
  value: number;
}

export function VolumeControl({
  onToggle,
  onChange,
  value,
}: VolumeControlProps) {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggle}
        className="h-8 w-8 text-white hover:bg-white/10"
      >
        {value === 0 ? (
          <VolumeX className="h-5 w-5" />
        ) : (
          <Volume2 className="h-5 w-5" />
        )}
      </Button>
      <Slider
        min={0}
        max={100}
        step={1}
        value={[value]}
        onValueChange={(newValue) => onChange(newValue[0])}
        className="w-24 cursor-pointer"
      />
    </div>
  );
}
