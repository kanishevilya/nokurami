import { format } from "date-fns";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/shadcn/Avatar";
import { getMediaSource } from "@/utils/get-media-source";
import Link from "next/link";
import { useTranslations } from "next-intl";

export interface MessageProps {
  id: string;
  content: string;
  createdAt: string;
  isRead?: boolean;
  isCurrentUser: boolean;
  sender: {
    id: string;
    username: string;
    displayName?: string;
    avatar?: string | null;
  };
}

export function ChatMessage({
  id,
  content,
  createdAt,
  isRead,
  isCurrentUser,
  sender,
}: MessageProps) {
  const t = useTranslations("chat");

  const formatMessageTime = (timestamp: string) => {
    return format(new Date(timestamp), "HH:mm");
  };

  return (
    <div
      key={id}
      className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
    >
      {!isCurrentUser && (
        <Avatar className="h-8 w-8 mr-2 self-end">
          <AvatarImage
            src={getMediaSource(sender.avatar)}
            alt={sender.username}
          />
          <AvatarFallback>
            {sender.username.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      )}

      <div
        className={`max-w-[70%] p-3 rounded-lg ${
          isCurrentUser ? "bg-primary text-primary-foreground" : "bg-muted"
        }`}
      >
        <p className="break-words">{content}</p>
        <p
          className={`text-xs mt-1 ${
            isCurrentUser
              ? "text-primary-foreground/70"
              : "text-muted-foreground"
          }`}
        >
          {formatMessageTime(createdAt)}
          {isCurrentUser && isRead !== undefined && (
            <span className="ml-1">
              {isRead ? `• ${t("read")}` : `• ${t("sent")}`}
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
