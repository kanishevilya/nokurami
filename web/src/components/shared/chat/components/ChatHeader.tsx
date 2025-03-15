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
  const otherUser = creatorId === currentUserId ? recipient : creator;

  return (
    <div className="border-b p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage
              src={getMediaSource(otherUser.avatar)}
              alt={otherUser.username}
            />
            <AvatarFallback>
              {otherUser.username.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">
              {otherUser.displayName || otherUser.username}
            </h3>
            <p className="text-xs text-muted-foreground">
              @{otherUser.username}
            </p>
          </div>
        </div>

        {}
        {status === ChatStatus.Pending && recipientId === currentUserId && (
          <div className="flex gap-2">
            <Button
              size="sm"
              className="bg-green-600 hover:bg-green-700"
              onClick={onAccept}
              disabled={isUpdatingStatus}
            >
              <Check className="h-4 w-4 mr-1" />
              Accept
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={onReject}
              disabled={isUpdatingStatus}
            >
              <X className="h-4 w-4 mr-1" />
              Decline
            </Button>
          </div>
        )}
        {status === ChatStatus.Rejected && recipientId === currentUserId && (
          <Button
            size="sm"
            className="bg-blue-600 hover:bg-blue-700"
            onClick={onAccept}
            disabled={isUpdatingStatus}
          >
            <RefreshCw className="h-4 w-4 mr-1" />
            Accept after rejection
          </Button>
        )}

        {}
        {status === ChatStatus.Pending && creatorId === currentUserId && (
          <Badge
            variant="outline"
            className="text-yellow-600 border-yellow-600"
          >
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )}
      </div>
    </div>
  );
}
