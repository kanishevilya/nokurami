"use client";

import { useState, useEffect, FormEvent } from "react";
import {
  useFindMessagesByStreamQuery,
  useNewMessageAddedSubscription,
  useSendMessageMutation,
} from "@/graphql/generated/output";
import { Button } from "@/components/ui/shadcn/Button";
import { Input } from "@/components/ui/shadcn/Input";
import { Skeleton } from "@/components/ui/shadcn/Skeleton";
import { Loader2 } from "lucide-react";

interface ChatProps {
  streamId: string;
  isLive: boolean;
}

export function Chat({ streamId, isLive }: ChatProps) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);

  const { data, loading, error } = useFindMessagesByStreamQuery({
    variables: { streamId },
  });

  const [sendMessage, { loading: sending }] = useSendMessageMutation({
    onError: (error) =>
      console.error("Ошибка отправки сообщения:", error.message),
  });

  const { data: subscriptionData, loading: subscriptionLoading } =
    useNewMessageAddedSubscription({
      variables: { streamId },
    });

  useEffect(() => {
    console.log(subscriptionData);
    // if (subscriptionData?.newMessageAdded) {
    //   setMessages((prev) => [...prev, subscriptionData.newMessageAdded]);
    // }
  }, [subscriptionData, subscriptionLoading]);

  useEffect(() => {
    if (!loading && data?.findMessagesByStream) {
      setMessages(data.findMessagesByStream);
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

  return (
    <div className="flex w-2/5 flex-col space-y-4 rounded-lg bg-card p-4">
      <h3 className="text-lg font-semibold text-foreground">Chat</h3>

      <div className="flex-1 overflow-y-auto space-y-2">
        {loading && !messages.length ? (
          <>
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
          </>
        ) : messages.length > 0 ? (
          messages.map((msg) => (
            <div key={msg.id} className="text-sm text-foreground">
              <span className="font-medium">{msg.userId}:</span> {msg.text}
            </div>
          ))
        ) : (
          <p className="text-sm text-foreground">No messages yet</p>
        )}
      </div>

      {isLive ? (
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message..."
            className="flex-1 bg-background text-foreground placeholder-muted-foreground"
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
        <p className="text-sm text-muted-foreground text-center">
          Chat is closed, the stream is offline
        </p>
      )}
    </div>
  );
}
