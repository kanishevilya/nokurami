import { formatDistanceToNow } from "date-fns";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { Button } from "@/components/ui/shadcn/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/shadcn/Dialog";
import { getOSIcon, getBrowserIcon, getDeviceIcon } from "../data/SessionIcons";
import { SessionDetailItem } from "./SessionDetailItem";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

type SessionDetailsModalProps = {
  session: any;
  isOpen: boolean;
  onClose: () => void;
  onRemove: () => void;
  isRemoving: boolean;
  isCurrent: boolean;
};

export function SessionDetailsModal({
  session,
  isOpen,
  onClose,
  onRemove,
  isRemoving,
  isCurrent,
}: SessionDetailsModalProps) {
  const t = useTranslations("settings");

  if (!session) return null;

  const { metadata, createdAt, ip } = session;
  const { device, browser, os, location } = metadata || {};

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("sessionDetails")}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <SessionDetailItem
            label={t("device")}
            value={device?.type || t("unknown")}
            icon={getDeviceIcon(device?.type)}
          />
          <SessionDetailItem
            label={t("browser")}
            value={device?.browser || t("unknown")}
            icon={getBrowserIcon(device?.browser)}
          />
          <SessionDetailItem
            label={t("operatingSystem")}
            value={device?.os || t("unknown")}
            icon={getOSIcon(device?.os)}
          />
          <SessionDetailItem
            label={t("ipAddress")}
            value={ip || t("unknown")}
          />
          <SessionDetailItem
            label={t("location")}
            value={
              location?.city && location?.country
                ? `${location.city}, ${location.country}`
                : t("unknown")
            }
          />
          <SessionDetailItem
            label={t("createdAt")}
            value={formatDistanceToNow(new Date(createdAt), {
              addSuffix: true,
            })}
          />
          {isCurrent && (
            <div className="mt-2 rounded-md bg-green-500/10 border border-green-500/30 p-2 text-sm text-center">
              {t("thisIsYourCurrentSession")}
            </div>
          )}
        </div>
        <DialogFooter className="sm:justify-between">
          <Button variant="ghost" onClick={onClose}>
            {t("close")}
          </Button>
          <Button
            variant="destructive"
            onClick={onRemove}
            disabled={isRemoving}
          >
            {isRemoving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t("terminating")}
              </>
            ) : isCurrent ? (
              t("terminateThisSession")
            ) : (
              t("terminateSession")
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
