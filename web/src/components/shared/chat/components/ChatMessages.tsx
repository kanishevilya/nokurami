import { useRef, useEffect } from "react";
import { User } from "lucide-react";
import { ChatMessage, MessageProps } from "./ChatMessage";
import { ChatStatus } from "@/graphql/generated/output";

interface ChatMessagesProps {
  messages: Array<Omit<MessageProps, "isCurrentUser">>;
  status: ChatStatus;
  currentUserId: string;
}

export function ChatMessages({
  messages,
  status,
  currentUserId,
}: ChatMessagesProps) {
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  if (!messages || messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center text-center">
        <div>
          <User className="mx-auto h-12 w-12 text-muted-foreground" />
          <p className="mt-2 text-muted-foreground">
            {status === ChatStatus.Pending
              ? "Chat request is pending"
              : "No messages yet. Start a conversation!"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex-1 overflow-y-auto p-4 space-y-3"
      ref={messagesContainerRef}
    >
      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          {...message}
          isCurrentUser={message.sender.id === currentUserId}
        />
      ))}
    </div>
  );
}
