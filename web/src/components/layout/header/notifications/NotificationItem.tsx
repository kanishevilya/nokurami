import { Video, UserPlus, Lock } from "lucide-react";
import parse from "html-react-parser";
import { NotificationType } from "@/graphql/generated/output";
import { Fragment } from "react";

interface NotificationItemProps {
  id: string;
  type: NotificationType;
  message: string;
  date: string;
}

const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case "STREAM_START":
      return <Video className="size-6 text-foreground" />;
    case "NEW_FOLLOWER":
      return <UserPlus className="size-6 text-foreground " />;
    case "ENABLE_TWO_FACTOR":
      return <Lock className="size-6 text-foreground" />;
  }
};

export const NotificationItem = ({
  id,
  type,
  message,
  date,
}: NotificationItemProps) => {
  return (
    <Fragment key={id}>
      <div className="flex items-start gap-3 rounded-lg bg-background-light p-3 group hover:bg-background-lighter">
        <div className="mt-1">{getNotificationIcon(type)}</div>
        <div className="flex flex-col gap-1">
          <div className="flex flex-col text-sm text-foreground gap-y-1">
            {parse(message)}
          </div>
          <span className="text-xs text-muted-foreground">
            {new Date(date).toLocaleDateString("ru-RU", {
              day: "numeric",
              month: "numeric",
              hour: "numeric",
              minute: "numeric",
            })}
          </span>
        </div>
      </div>
    </Fragment>
  );
};
