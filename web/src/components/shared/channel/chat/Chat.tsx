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

  const { data: subscriptionData } = useNewMessageAddedSubscription({
    variables: { streamId },
    skip: !streamId || !isLive,
  });

  // Handle subscription data
  useEffect(() => {
    if (subscriptionData?.newMessageAdded) {
      setMessages((prev) => [
        ...prev,
        subscriptionData.newMessageAdded as unknown as Message,
      ]);

      // Scroll to bottom when new message arrives
      setTimeout(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop =
            chatContainerRef.current.scrollHeight;
        }
      }, 100);
    }
  }, [subscriptionData]);

  // Load initial messages
  useEffect(() => {
    if (!loading && data?.findMessagesByStream) {
      setMessages(data.findMessagesByStream as unknown as Message[]);

      // Scroll to bottom when messages load
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

    await sendMessage({
      variables: {
        data: {
          text: message,
          streamId,
        },
      },
    });

    setMessage("");
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
