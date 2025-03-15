import { useState, useEffect, FormEvent } from "react";
import { Card } from "@/components/ui/shadcn/Card";
import { Loader2, AlertCircle, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/shadcn/Button";
import { ChatHeader } from "../components/ChatHeader";
import { ChatMessages } from "../components/ChatMessages";
import { ChatInput } from "../components/ChatInput";
import {
  ChatStatus,
  useGetPrivateChatQuery,
  useSendPrivateMessageMutation,
  useUpdateChatStatusMutation,
  useMarkMessagesAsReadMutation,
  usePrivateMessageSentSubscription,
  useOnChatMessageSubscription,
} from "@/graphql/generated/output";

interface PrivateChatProps {
  chatId: string | null;
  currentUserId: string;
  onRefetchChats: () => void;
}

export function PrivateChat({
  chatId,
  currentUserId,
  onRefetchChats,
}: PrivateChatProps) {
  const [newMessage, setNewMessage] = useState("");

  const {
    data: selectedChatData,
    loading: loadingSelectedChat,
    error: selectedChatError,
    refetch: refetchSelectedChat,
  } = useGetPrivateChatQuery({
    variables: { id: chatId! },
  });

  const [sendMessage, { loading: isSendingMessage }] =
    useSendPrivateMessageMutation({
      onCompleted: () => {
        setNewMessage("");
        refetchSelectedChat(); // Обновляем только текущий чат
      },
      onError: (error) => {
        console.error(`Failed to send message: ${error.message}`);
      },
    });

  const [updateChatStatus, { loading: isUpdatingStatus }] =
    useUpdateChatStatusMutation({
      onCompleted: () => {
        onRefetchChats(); // Обновляем список чатов только при изменении статуса
        refetchSelectedChat(); // Обновляем текущий чат
      },
      onError: (error) => {
        console.error(`Failed to update chat status: ${error.message}`);
      },
    });

  const { data: newMessageData } = useOnChatMessageSubscription({
    variables: { chatId: chatId!, userId: currentUserId! },
  });

  useEffect(() => {
    if (newMessageData?.onChatMessage) {
      if (chatId === newMessageData.onChatMessage.chatId) {
        refetchSelectedChat(); // Обновляем только текущий чат при новом сообщении
      }
    }
  }, [newMessageData, chatId, refetchSelectedChat]);

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !chatId) return;

    try {
      await sendMessage({
        variables: {
          input: {
            chatId,
            content: newMessage,
          },
        },
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleAcceptChat = async () => {
    if (!chatId) return;
    try {
      await updateChatStatus({
        variables: {
          input: {
            chatId,
            status: ChatStatus.Accepted,
          },
        },
      });
    } catch (error) {
      console.error("Error accepting chat:", error);
    }
  };

  const handleRejectChat = async () => {
    if (!chatId) return;
    try {
      await updateChatStatus({
        variables: {
          input: {
            chatId,
            status: ChatStatus.Rejected,
          },
        },
      });
    } catch (error) {
      console.error("Error rejecting chat:", error);
    }
  };

  const selectedChatDetails = selectedChatData?.privateChat;

  if (loadingSelectedChat) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (selectedChatError) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
        <AlertCircle className="h-10 w-10 text-destructive mb-2" />
        <h3 className="font-semibold mb-1">Failed to load conversation</h3>
        <p className="text-sm text-muted-foreground mb-4">
          {selectedChatError.message}
        </p>
        <Button onClick={() => refetchSelectedChat()}>Try Again</Button>
      </div>
    );
  }

  if (!selectedChatDetails) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-muted-foreground">Chat not found</p>
      </div>
    );
  }

  const formattedMessages = (selectedChatDetails.messages || []).map((msg) => {
    const sender =
      msg.senderId === selectedChatDetails.creatorId
        ? selectedChatDetails.creator
        : selectedChatDetails.recipient;

    return {
      id: msg.id,
      content: msg.content,
      createdAt: msg.createdAt,
      isRead: msg.isRead,
      sender,
    };
  });

  return (
    <Card className="h-[650px] flex flex-col">
      <ChatHeader
        status={selectedChatDetails.status as ChatStatus}
        creatorId={selectedChatDetails.creatorId}
        recipientId={selectedChatDetails.recipientId}
        currentUserId={currentUserId}
        creator={selectedChatDetails.creator}
        recipient={selectedChatDetails.recipient}
        onAccept={handleAcceptChat}
        onReject={handleRejectChat}
        isUpdatingStatus={isUpdatingStatus}
      />
      <ChatMessages
        messages={formattedMessages}
        status={selectedChatDetails.status as ChatStatus}
        currentUserId={currentUserId}
      />
      <div className="border-t p-3">
        <ChatInput
          status={selectedChatDetails.status as ChatStatus}
          message={newMessage}
          onChange={setNewMessage}
          onSend={handleSendMessage}
          isSending={isSendingMessage}
        />
      </div>
    </Card>
  );
}
