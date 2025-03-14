"use client";

import { useState, useEffect, FormEvent, useRef } from "react";
import {
  useFindMessagesByStreamQuery,
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

interface ChatProps {
  streamId: string;
  isLive: boolean;
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

export function Chat({ streamId, isLive }: ChatProps) {
  const { user: currentUser } = useCurrent();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const { data, loading, error } = useFindMessagesByStreamQuery({
    variables: { streamId },
    skip: !streamId,
  });

  const [sendMessage, { loading: sending }] = useSendMessageMutation({
    onError: (error) => console.error("Error sending message:", error.message),
  });

  console.log("Stream ID:", streamId);
  console.log("Is Live:", isLive);

  // Подписка на новые сообщения без skip параметра
  const { data: subscriptionData } = useNewMessageAddedSubscription({
    variables: {
      streamId: streamId,
    },
  });

  console.log("Current subscription data:", subscriptionData);

  // Handle subscription data
  useEffect(() => {
    console.log("Subscription effect running, data:", subscriptionData);

    if (subscriptionData?.newMessageAdded) {
      const newMessage = subscriptionData.newMessageAdded;
      console.log("🔥 NEW MESSAGE RECEIVED:", newMessage);

      // Важно: проверяем, есть ли это сообщение уже в списке
      setMessages((prev) => {
        // Проверка на дубликаты
        const messageExists = prev.some((msg) => msg.id === newMessage.id);
        if (messageExists) {
          console.log("Message already exists in list, skipping...");
          return prev;
        }

        console.log("Adding new message to list");
        // Добавляем новое сообщение в начало списка
        return [newMessage as unknown as Message, ...prev];
      });

      // Прокручиваем чат
      setTimeout(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = 0;
        }
      }, 100);
    }
  }, [subscriptionData]);

  // Load initial messages
  useEffect(() => {
    if (!loading && data?.findMessagesByStream) {
      console.log("Loaded initial messages:", data.findMessagesByStream);

      // Сортируем сообщения в обратном хронологическом порядке (новые сверху)
      const sortedMessages = [
        ...data.findMessagesByStream,
      ] as unknown as Message[];
      sortedMessages.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      setMessages(sortedMessages);

      // Прокручиваем к началу списка
      setTimeout(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = 0;
        }
      }, 100);
    }
  }, [data, loading]);

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !isLive) return;

    try {
      console.log("Sending message:", message, "to stream:", streamId);
      const result = await sendMessage({
        variables: {
          data: {
            text: message,
            streamId,
          },
        },
      });

      console.log("Message sent successfully:", result.data);

      // Очищаем поле ввода, НЕ добавляем сообщение в список - оно должно прийти через подписку
      setMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const startEditMessage = (msg: Message) => {
    setEditingMessageId(msg.id);
    setEditText(msg.text);
  };

  const cancelEdit = () => {
    setEditingMessageId(null);
    setEditText("");
  };

  const saveEdit = () => {
    // This would be implemented in Stage 2 with the actual mutation
    setEditingMessageId(null);
  };

  const formatMessageTime = (timestamp: string) => {
    return format(new Date(timestamp), "HH:mm");
  };

  return (
    <div className="flex h-full w-full flex-col rounded-lg bg-card shadow-md">
      <div className="flex items-center justify-between border-b border-border p-4">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Live Chat</h3>
          {isLive && (
            <div className="ml-2 inline-flex items-center rounded-full border border-transparent bg-emerald-500 px-2.5 py-0.5 text-xs font-semibold text-emerald-50">
              Live
            </div>
          )}
        </div>
        {!isLive && (
          <div className="inline-flex items-center rounded-full border border-transparent bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
            <AlertCircle className="mr-1 h-3 w-3" /> Offline
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
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={msg.user?.avatar || ""} />
                      <AvatarFallback>
                        {msg.user?.username?.[0]?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-foreground">
                      {msg.user?.username}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {formatMessageTime(msg.createdAt)}
                    </span>

                    {currentUser?.id === msg.user.id && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 opacity-0 group-hover:opacity-100"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => startEditMessage(msg)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                </div>

                {editingMessageId === msg.id ? (
                  <div className="mt-2 flex items-center gap-2">
                    <Input
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={saveEdit}>Save</Button>
                    <Button variant="ghost" onClick={cancelEdit}>
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <p className="text-sm text-foreground break-words">
                    {msg.text}
                  </p>
                )}

                <div className="mt-2 flex items-center gap-2 text-xs opacity-0 transition group-hover:opacity-100">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <ThumbsUp className="h-3 w-3" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Like</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <ThumbsDown className="h-3 w-3" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Dislike</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center">
            <MessageSquare className="mb-2 h-12 w-12 text-muted-foreground" />
            <p className="text-center text-muted-foreground">No messages yet</p>
            {isLive && (
              <p className="mt-1 text-center text-sm text-muted-foreground">
                Be the first to say hello!
              </p>
            )}
          </div>
        )}
      </div>

      <div className="border-t border-border p-4">
        {isLive ? (
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
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
              {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send"}
            </Button>
          </form>
        ) : (
          <div className="flex h-10 items-center justify-center rounded-md bg-muted/30">
            <p className="text-sm text-muted-foreground">
              Chat is unavailable while the stream is offline
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
