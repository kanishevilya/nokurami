import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/shadcn/Avatar";
import { Badge } from "@/components/ui/shadcn/Badge";
import { Button } from "@/components/ui/shadcn/Button";
import { getMediaSource } from "@/utils/get-media-source";
import { ChatStatus } from "@/graphql/generated/output";
import { Check, Clock, X, RefreshCw } from "lucide-react";
import { useTranslations } from "next-intl";

interface ChatHeaderProps {
  status: ChatStatus;
  creatorId: string;
  recipientId: string;
  currentUserId: string;
  creator: {
    id: string;
    username: string;
    displayName?: string;
    avatar?: string | null;
  };
  recipient: {
    id: string;
    username: string;
    displayName?: string;
    avatar?: string | null;
  };
  onAccept?: () => void;
  onReject?: () => void;
  isUpdatingStatus?: boolean;
}

export function ChatHeader({
  status,
  creatorId,
  recipientId,
  currentUserId,
  creator,
  recipient,
  onAccept,
  onReject,
  isUpdatingStatus = false,
}: ChatHeaderProps) {
  const t = useTranslations("chat");
  const otherUser = creatorId === currentUserId ? recipient : creator;
  const isRecipient = currentUserId === recipientId;
  const isPending = status === ChatStatus.Pending;
  const isRejected = status === ChatStatus.Rejected;

  return (
    <div className="flex justify-between items-center border-b p-4">
      <div className="flex items-center space-x-2">
        <Avatar>
          <AvatarImage
            src={getMediaSource(otherUser.avatar)}
            alt={otherUser.username}
          />
          <AvatarFallback>
            {otherUser.username.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold">{otherUser.username}</h3>
          {isPending && isRecipient ? (
            <Badge variant="outline" className="text-xs font-normal gap-1">
              <Clock className="h-3 w-3" /> {t("pendingRequest")}
            </Badge>
          ) : isRejected ? (
            <Badge variant="destructive" className="text-xs font-normal gap-1">
              <X className="h-3 w-3" /> {t("chatRejected")}
            </Badge>
          ) : status === ChatStatus.Accepted ? (
            <Badge
              variant="outline"
              className="text-xs font-normal gap-1 bg-primary text-primary-foreground"
            >
              <Check className="h-3 w-3" /> {t("chatAccepted")}
            </Badge>
          ) : null}
        </div>
      </div>

      {isPending && isRecipient && (
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={onReject}
            disabled={isUpdatingStatus}
            className="text-destructive border-destructive hover:bg-destructive/10"
          >
            {isUpdatingStatus ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <X className="h-4 w-4 mr-1" />
            )}
            {t("reject")}
          </Button>
          <Button size="sm" onClick={onAccept} disabled={isUpdatingStatus}>
            {isUpdatingStatus ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <Check className="h-4 w-4 mr-1" />
            )}
            {t("accept")}
          </Button>
        </div>
      )}
    </div>
  );
}
