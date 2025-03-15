import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/shadcn/Button";
import { Input } from "@/components/ui/shadcn/Input";
import { Send, Loader2 } from "lucide-react";
import { ChatStatus } from "@/graphql/generated/output";
import { useTranslations } from "next-intl";

interface ChatInputProps {
  status: ChatStatus;
  message: string;
  onChange: (message: string) => void;
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
  const t = useTranslations("chat");
  const isAccepted = status === ChatStatus.Accepted;

  if (status === ChatStatus.Accepted) {
    return (
      <form onSubmit={onSend} className="flex space-x-2">
        <Input
          type="text"
          placeholder={t("typeMessage")}
          value={message}
          onChange={(e) => onChange(e.target.value)}
          disabled={!isAccepted || isSending}
          className="flex-1"
        />
        <Button
          type="submit"
          disabled={!isAccepted || !message.trim() || isSending}
        >
          {isSending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
          <span className="sr-only">{t("sendMessage")}</span>
        </Button>
      </form>
    );
  }

  if (status === ChatStatus.Pending) {
    return (
      <div className="flex items-center justify-center h-10 bg-muted/30 rounded-md">
        <p className="text-sm text-muted-foreground">
          {t("waitingForChatRequestToBeAccepted")}
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-10 bg-muted/30 rounded-md">
      <p className="text-sm text-muted-foreground">
        {t("chatRequestWasRejected")}
      </p>
    </div>
  );
}
