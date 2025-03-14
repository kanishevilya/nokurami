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
  console.log(chatId);
  // Запрос на получение конкретного чата с сообщениями
  const {
    data: selectedChatData,
    loading: loadingSelectedChat,
    error: selectedChatError,
    refetch: refetchSelectedChat,
  } = useGetPrivateChatQuery({
    variables: { id: chatId! },
  });

  // Мутация для отправки сообщения
  const [sendMessage, { loading: isSendingMessage }] =
    useSendPrivateMessageMutation({
      onCompleted: () => {
        setNewMessage("");
        refetchSelectedChat();
      },
      onError: (error) => {
        console.error(`Failed to send message: ${error.message}`);
      },
    });

  // Мутация для обновления статуса чата (принять/отклонить)
  const [updateChatStatus, { loading: isUpdatingStatus }] =
    useUpdateChatStatusMutation({
      onCompleted: (data) => {
        onRefetchChats();
      },
      onError: (error) => {
        console.error(`Failed to update chat status: ${error.message}`);
      },
    });

  // Мутация для отметки сообщений как прочитанных

  console.log(chatId, currentUserId);
  // Подписка на новые сообщения
  const { data: newMessageData } = usePrivateMessageSentSubscription({
    skip: !chatId || !currentUserId,
  });

  // Обработка новых сообщений через подписку
  useEffect(() => {
    if (newMessageData?.privateMessageSent) {
      if (chatId === newMessageData.privateMessageSent.chatId) {
        refetchSelectedChat();
        // Отмечаем сообщения как прочитанные
        // markAsRead(chatId);
      }
      onRefetchChats();
    }
  }, [newMessageData, chatId, refetchSelectedChat, onRefetchChats]);

  // Отмечаем сообщения как прочитанные при выборе чата
  // useEffect(() => {
  //   if (chatId) {
  //     markAsRead(chatId);
  //   }
  // }, [chatId]);

  // Функция для отметки сообщений как прочитанных

  // Функция для отправки сообщения
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

  // Функция для принятия запроса на чат
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

  // Функция для отклонения запроса на чат
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

  console.log(selectedChatData);
  console.log(loadingSelectedChat);

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

  // Преобразуем сообщения в формат, ожидаемый компонентом ChatMessages
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
