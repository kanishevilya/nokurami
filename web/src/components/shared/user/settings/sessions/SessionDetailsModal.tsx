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
import { getOSIcon, getBrowserIcon, getDeviceIcon } from "./SessionIcons";

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
  if (!session) return null;

  const { metadata, createdAt } = session;
  const { device, location, ip } = metadata || {};

  console.log("Session:", session);

  const isValidDate = (date: any) => {
    const parsedDate = new Date(date);
    return !isNaN(parsedDate.getTime());
  };

  const formattedCreatedAt =
    createdAt && isValidDate(createdAt)
      ? formatDistanceToNow(new Date(createdAt), { addSuffix: true })
      : "Unknown";
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Session Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            {getDeviceIcon(device?.type)}
            {getOSIcon(device?.os)}
            {getBrowserIcon(device?.browser)}
            <p className="font-medium">
              {device?.type || "Unknown Device"} •{" "}
              {device?.browser || "Unknown Browser"} on{" "}
              {device?.os || "Unknown OS"}
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            Location:{" "}
            {location?.city && location?.country
              ? `${location.city}, ${location.country}`
              : "Unknown Location"}
          </p>
          <p className="text-sm text-muted-foreground">
            Created:{" "}
            {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
          </p>
          <p className="text-sm text-muted-foreground">IP: {ip}</p>

          {location?.latitude && location?.longitude ? (
            <YMaps>
              <Map
                defaultState={{
                  center: [
                    parseFloat(location.latitude),
                    parseFloat(location.longitude),
                  ],
                  zoom: 10,
                }}
                width="100%"
                height="300px"
              >
                <Placemark
                  geometry={[
                    parseFloat(location.latitude),
                    parseFloat(location.longitude),
                  ]}
                />
              </Map>
            </YMaps>
          ) : (
            <p className="text-sm text-muted-foreground">
              Location coordinates not available.
            </p>
          )}
          {isCurrent && (
            <p className="text-sm text-red-500">
              This is your current session.
            </p>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isRemoving}>
            Close
          </Button>
          {!isCurrent && (
            <Button
              className="bg-red-500 hover:bg-red-400"
              onClick={onRemove}
              disabled={isRemoving}
            >
              {isRemoving ? "Removing..." : "Remove Session"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
