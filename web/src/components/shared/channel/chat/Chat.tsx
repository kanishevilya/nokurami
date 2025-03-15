"use client";

import { useState, useEffect, FormEvent, useRef } from "react";
import {
  useFindMessagesByStreamQuery,
  useFindStreamByIdQuery,
  useNewMessageAddedSubscription,
  useSendMessageMutation,
} from "@/graphql/generated/output";
import { Button } from "@/components/ui/shadcn/Button";
import { Input } from "@/components/ui/shadcn/Input";
import { Skeleton } from "@/components/ui/shadcn/Skeleton";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/shadcn/Avatar";
import {
  Loader2,
  MessageSquare,
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
  MoreHorizontal,
  Edit,
  Trash2,
} from "lucide-react";
import { format } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/shadcn/Tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/shadcn/DropdownMenu";
import { useCurrent } from "@/hooks/useCurrent";
import { cn } from "@/utils/cn";
import { getMediaSource } from "@/utils/get-media-source";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useTranslations } from "next-intl";

interface ChatProps {
  streamId: string;
}

interface Message {
  id: string;
  text: string;
  createdAt: string;
  user: {
    id: string;
    username: string;
    displayName?: string;
    avatar?: string | null;
  };
}

export function Chat({ streamId }: ChatProps) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isLive, setIsLive] = useState(false);
  const { isAuthenticated } = useAuth();
  const t = useTranslations("chat");

  const { data: streamData, refetch } = useFindStreamByIdQuery({
    variables: { id: streamId },
  });

  useEffect(() => {
    if (streamData?.findStreamById) {
      setIsLive(streamData.findStreamById.isLive);
    }
  }, [streamData]);

  const { data, loading, error } = useFindMessagesByStreamQuery({
    variables: { streamId },
    skip: !streamId,
  });

  const [sendMessage, { loading: sending }] = useSendMessageMutation({
    onError: (error) => console.error("Error sending message:", error.message),
  });

  useEffect(() => {
    const handleScreenClick = () => {
      refetch().then((result) => {
        if (result.data?.findStreamById?.isLive) {
          setIsLive(true);
        }
      });
    };

    document.addEventListener("click", handleScreenClick);

    return () => {
      document.removeEventListener("click", handleScreenClick);
    };
  }, [isLive, refetch]);

  const { data: subscriptionData } = useNewMessageAddedSubscription({
    variables: {
      streamId: streamId,
    },
  });

  useEffect(() => {
    if (subscriptionData?.newMessageAdded) {
      setMessages((prev) => [
        ...prev,
        subscriptionData.newMessageAdded as unknown as Message,
      ]);
      setTimeout(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = 0;
        }
      }, 100);
    }
  }, [subscriptionData]);

  useEffect(() => {
    if (!loading && data?.findMessagesByStream) {
      setMessages(data.findMessagesByStream);
      setTimeout(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop =
            chatContainerRef.current.scrollHeight;
        }
      }, 100);
    }
  }, [data, loading]);

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !isLive) return;

    try {
      const result = await sendMessage({
        variables: {
          data: {
            text: message,
            streamId,
          },
        },
      });
      setMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const formatMessageTime = (timestamp: string) => {
    return format(new Date(timestamp), "HH:mm");
  };

  return (
    <div className="flex w-full flex-col rounded-lg bg-card shadow-md">
      <div className="flex items-center justify-between border-b border-border p-4">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">
            {t("title")}
          </h3>
          {isLive && (
            <div className="ml-2 inline-flex items-center rounded-full border border-transparent bg-emerald-500 px-2.5 py-0.5 text-xs font-semibold text-emerald-50">
              {t("live")}
            </div>
          )}
        </div>
        {!isLive && (
          <div className="inline-flex items-center rounded-full border border-transparent bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
            <AlertCircle className="mr-1 h-3 w-3" /> {t("offline")}
          </div>
        )}
      </div>

      <div className="h-[400px] overflow-auto p-4" ref={chatContainerRef}>
        {loading && !messages.length ? (
          <div className="space-y-4">
            <Skeleton className="h-12 w-full rounded-md" />
            <Skeleton className="h-12 w-3/4 rounded-md" />
            <Skeleton className="h-12 w-1/2 rounded-md" />
          </div>
        ) : messages.length > 0 ? (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="group relative rounded-lg bg-muted/30 p-3 transition hover:bg-muted/40"
              >
                <div className="mb-1 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Link href={`/${msg.user?.username}`}>
                      <p className="font-medium text-foreground">
                        {msg.user?.username}
                      </p>
                    </Link>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {formatMessageTime(msg.createdAt)}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-foreground opacity-70 break-words">
                  {msg.text}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center">
            <MessageSquare className="mb-2 h-12 w-12 text-muted-foreground" />
            <p className="text-center text-muted-foreground">
              {t("noMessagesYet")}
            </p>
            {isLive && (
              <p className="mt-1 text-center text-sm text-muted-foreground">
                {t("beTheFirstToSayHello")}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="border-t border-border p-4">
        {isLive && isAuthenticated ? (
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t("typeMessage")}
              className={cn(
                "flex-1 bg-background text-foreground placeholder-muted-foreground",
                !isLive && "cursor-not-allowed opacity-50"
              )}
              disabled={sending || !isLive}
            />
            <Button
              type="submit"
              disabled={sending || !message.trim() || !isLive}
            >
              {sending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                t("sendMessage")
              )}
            </Button>
          </form>
        ) : (
          <div className="flex h-10 items-center justify-center rounded-md bg-muted/30">
            <p className="text-sm text-muted-foreground">
              {t("chatUnavailableOffline")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
