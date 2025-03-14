import { FormEvent } from "react";
import { Button } from "@/components/ui/shadcn/Button";
import { Input } from "@/components/ui/shadcn/Input";
import { Loader2, Send } from "lucide-react";
import { ChatStatus } from "@/graphql/generated/output";

interface ChatInputProps {
  status: ChatStatus;
  message: string;
  onChange: (value: string) => void;
  onSend: (e: FormEvent) => void;
  isSending: boolean;
}

export function ChatInput({
  status,
  message,
  onChange,
  onSend,
  isSending,
}: ChatInputProps) {
  if (status === ChatStatus.Accepted) {
    return (
      <form onSubmit={onSend} className="flex items-center gap-2">
        <Input
          placeholder="Type a message..."
          value={message}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1"
          disabled={isSending}
        />
        <Button type="submit" disabled={!message.trim() || isSending}>
          {isSending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </form>
    );
  }

  if (status === ChatStatus.Pending) {
    return (
      <div className="flex items-center justify-center h-10 bg-muted/30 rounded-md">
        <p className="text-sm text-muted-foreground">
          Waiting for chat request to be accepted
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-10 bg-muted/30 rounded-md">
      <p className="text-sm text-muted-foreground">Chat request was rejected</p>
    </div>
  );
}
