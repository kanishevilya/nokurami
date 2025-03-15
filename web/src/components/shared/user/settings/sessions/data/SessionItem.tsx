import { Info } from "lucide-react";
import { Button } from "@/components/ui/shadcn/Button";
import { getOSIcon, getBrowserIcon, getDeviceIcon } from "./SessionIcons";
import { formatDistanceToNow } from "date-fns";
import { useTranslations } from "next-intl";

type SessionItemProps = {
  session: any;
  isCurrent?: boolean;
  isRemoving?: boolean;
  onShowDetails?: (session: any) => void;
};

export function SessionItem({
  session,
  isCurrent,
  isRemoving,
  onShowDetails,
}: SessionItemProps) {
  const { metadata, createdAt } = session;
  const { device, location } = metadata || {};
  const t = useTranslations("settings");

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          {getDeviceIcon(device?.type)}
          {getOSIcon(device?.os)}
          {getBrowserIcon(device?.browser)}
        </div>
        <div className="space-y-1">
          <p className="font-medium group-hover:text-primary transition-colors duration-200">
            {device?.type || t("unknownDevice")} •{" "}
            {device?.browser || t("unknownBrowser")} {t("on")}{" "}
            {device?.os || t("unknownOS")}
          </p>
          <p className="text-sm text-muted-foreground group-hover:text-primary  transition-colors duration-200">
            {location?.city && location?.country
              ? `${location.city}, ${location.country}`
              : t("unknownLocation")}{" "}
            • {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
          </p>
        </div>
      </div>
      {isCurrent && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onShowDetails?.(session)}
          disabled={isRemoving}
          className="hover:bg-blue-100/20 hover:text-blue-500 transition-colors duration-200"
          aria-label={t("sessionInfo")}
        >
          <Info className="min-h-5 min-w-5" />
        </Button>
      )}
    </div>
  );
}
