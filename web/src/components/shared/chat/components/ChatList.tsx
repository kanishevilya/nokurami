import { useState } from "react";
import { format } from "date-fns";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/shadcn/Avatar";
import { Skeleton } from "@/components/ui/shadcn/Skeleton";
import { Badge } from "@/components/ui/shadcn/Badge";
import { MessageSquare, AlertCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/shadcn/Button";
import { getMediaSource } from "@/utils/get-media-source";
import { ChatStatus } from "@/graphql/generated/output";

export interface ChatListItemProps {
  id: string;
  creatorId: string;
  recipientId: string;
  status: ChatStatus;
  unreadCount?: number;
  messages: Array<{
    id: string;
    content: string;
    senderId: string;
    isRead: boolean;
    createdAt: string;
  }>;
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
  currentUserId: string;
  selected: boolean;
  onClick: () => void;
}

export function ChatListItem({
  id,
  creatorId,
  recipientId,
  status,
  unreadCount,
  messages,
  creator,
  recipient,
  currentUserId,
  selected,
  onClick,
}: ChatListItemProps) {
  // Определяем, кто другой пользователь в чате
  const otherUser = creatorId === currentUserId ? recipient : creator;
  const isCreator = creatorId === currentUserId;

  return (
    <div
      className={`p-3 border-b flex items-center hover:bg-accent cursor-pointer ${
        selected ? "bg-accent/50" : ""
      }`}
      onClick={() => {
        onClick();
      }}
    >
      <Avatar className="w-10 h-10">
        <AvatarImage
          src={getMediaSource(otherUser.avatar)}
          alt={otherUser.username}
        />
        <AvatarFallback>
          {otherUser.username.substring(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <div className="ml-3 flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <p className="font-semibold text-sm truncate">
            {otherUser.displayName || otherUser.username}
          </p>
          <span className="text-xs text-muted-foreground">
            {messages &&
              messages[messages.length - 1] &&
              format(
                new Date(messages[messages.length - 1].createdAt),
                "HH:mm"
              )}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-xs truncate text-muted-foreground">
            {status === ChatStatus.Pending ? (
              <span className="flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {isCreator ? "Request pending" : "Chat request"}
              </span>
            ) : messages && messages[messages.length - 1] ? (
              messages[messages.length - 1].content
            ) : (
              "No messages yet"
            )}
          </p>

          {(unreadCount || 0) > 0 && (
            <Badge variant="secondary" className="ml-2 text-xs">
              {unreadCount}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}

interface ChatListProps {
  chats: any[];
  loading: boolean;
  error: any;
  currentUserId: string;
  selectedChatId: string | null;
  onChatSelect: (chatId: string) => void;
  onRetry: () => void;
  searchTerm: string;
}

export function ChatList({
  chats,
  loading,
  error,
  currentUserId,
  selectedChatId,
  onChatSelect,
  onRetry,
  searchTerm,
}: ChatListProps) {
  // Фильтруем чаты по поисковому запросу
  const filteredChats = chats.filter((chat) => {
    const otherUser =
      chat.creatorId === currentUserId ? chat.recipient : chat.creator;
    return (
      otherUser.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (otherUser.displayName &&
        otherUser.displayName.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  if (loading) {
    return (
      <div className="flex-1 overflow-y-auto">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="border-b p-3 flex items-center">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div className="ml-3 flex-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-40 mt-1" />
              </div>
            </div>
          ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center">
        <AlertCircle className="mx-auto mb-2 h-6 w-6 text-destructive" />
        <p className="text-sm text-destructive">Error loading conversations</p>
        <Button variant="outline" size="sm" className="mt-2" onClick={onRetry}>
          Retry
        </Button>
      </div>
    );
  }

  if (filteredChats.length === 0) {
    return (
      <div className="p-4 text-center">
        <p className="text-muted-foreground">No conversations found</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      {filteredChats.map((chat) => (
        <ChatListItem
          key={chat.id}
          {...chat}
          currentUserId={currentUserId}
          selected={selectedChatId === chat.id}
          onClick={() => onChatSelect(chat.id)}
        />
      ))}
    </div>
  );
}
