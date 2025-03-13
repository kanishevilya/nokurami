"use client";

import { useState } from "react";
import { Button } from "@/components/ui/shadcn/Button";
import { Card, CardContent } from "@/components/ui/shadcn/Card";
import { Input } from "@/components/ui/shadcn/Input";
import { Skeleton } from "@/components/ui/shadcn/Skeleton";
import { Badge } from "@/components/ui/shadcn/Badge";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/shadcn/Avatar";
import { User, Send, Search, Clock } from "lucide-react";
import { format } from "date-fns";
import { useCurrent } from "@/hooks/useCurrent";

// Типы для TS
interface ChatMessage {
  id: string;
  content: string;
  senderId: string;
  createdAt: Date;
  isRead: boolean;
}

interface Chat {
  id: string;
  recipientId: string;
  recipient: {
    id: string;
    username: string;
    avatarUrl?: string;
  };
  messages: ChatMessage[];
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  unreadCount: number;
  lastMessage?: ChatMessage;
}

export default function MessagesPage() {
  const { user, isLoadingProfile } = useCurrent();
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Заглушки данных, позже заменить на данные из GraphQL
  const chats: Chat[] = [
    {
      id: "1",
      recipientId: "1",
      recipient: {
        id: "1",
        username: "NightStreamer",
        avatarUrl: "https://i.pravatar.cc/150?img=1",
      },
      messages: [
        {
          id: "1",
          content: "Hi there! I enjoy your streams a lot.",
          senderId: "current-user",
          createdAt: new Date("2023-05-10T14:00:00"),
          isRead: true,
        },
        {
          id: "2",
          content: "Thanks! I appreciate your support.",
          senderId: "1",
          createdAt: new Date("2023-05-10T14:05:00"),
          isRead: true,
        },
        {
          id: "3",
          content: "Will you be streaming tomorrow?",
          senderId: "current-user",
          createdAt: new Date("2023-05-10T14:10:00"),
          isRead: true,
        },
        {
          id: "4",
          content: "Yes, I'll be streaming at 8PM EST!",
          senderId: "1",
          createdAt: new Date("2023-05-10T14:15:00"),
          isRead: false,
        },
      ],
      status: "ACCEPTED",
      unreadCount: 1,
      lastMessage: {
        id: "4",
        content: "Yes, I'll be streaming at 8PM EST!",
        senderId: "1",
        createdAt: new Date("2023-05-10T14:15:00"),
        isRead: false,
      },
    },
    {
      id: "2",
      recipientId: "2",
      recipient: {
        id: "2",
        username: "TechGuru",
        avatarUrl: "https://i.pravatar.cc/150?img=2",
      },
      messages: [
        {
          id: "5",
          content: "I have a question about your setup.",
          senderId: "current-user",
          createdAt: new Date("2023-05-09T10:00:00"),
          isRead: true,
        },
      ],
      status: "PENDING",
      unreadCount: 0,
      lastMessage: {
        id: "5",
        content: "I have a question about your setup.",
        senderId: "current-user",
        createdAt: new Date("2023-05-09T10:00:00"),
        isRead: true,
      },
    },
  ];

  const filteredChats = chats.filter((chat) =>
    chat.recipient.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedChatData = chats.find((chat) => chat.id === selectedChat);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;

    // Здесь будет отправка сообщения через GraphQL
    console.log("Sending message:", newMessage, "to chat:", selectedChat);

    setNewMessage("");
  };

  // Рендеринг списка чатов
  const renderChatList = () => {
    if (isLoadingProfile) {
      return Array(3)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="p-2 border-b flex items-center">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="ml-3 flex-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-40 mt-1" />
            </div>
          </div>
        ));
    }

    if (!user) {
      return (
        <div className="p-4 text-center">
          <p className="text-muted-foreground mb-2">
            Sign in to access your messages
          </p>
          <Button>Sign In</Button>
        </div>
      );
    }

    if (filteredChats.length === 0) {
      return (
        <div className="p-4 text-center">
          <p className="text-muted-foreground">No chats found</p>
        </div>
      );
    }

    return filteredChats.map((chat) => (
      <div
        key={chat.id}
        className={`p-3 border-b flex items-center hover:bg-accent cursor-pointer ${
          selectedChat === chat.id ? "bg-accent/50" : ""
        }`}
        onClick={() => setSelectedChat(chat.id)}
      >
        <Avatar className="w-10 h-10">
          {chat.recipient.avatarUrl ? (
            <AvatarImage
              src={chat.recipient.avatarUrl}
              alt={chat.recipient.username}
            />
          ) : (
            <AvatarFallback>
              {chat.recipient.username.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          )}
        </Avatar>

        <div className="ml-3 flex-1 min-w-0">
          <div className="flex justify-between items-center">
            <p className="font-semibold text-sm truncate">
              {chat.recipient.username}
            </p>
            <span className="text-xs text-muted-foreground">
              {chat.lastMessage &&
                format(new Date(chat.lastMessage.createdAt), "HH:mm")}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-xs truncate text-muted-foreground">
              {chat.status === "PENDING" ? (
                <span className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" /> Request pending
                </span>
              ) : (
                chat.lastMessage?.content
              )}
            </p>

            {chat.unreadCount > 0 && (
              <Badge variant="secondary" className="ml-2 text-xs">
                {chat.unreadCount}
              </Badge>
            )}
          </div>
        </div>
      </div>
    ));
  };

  // Рендеринг сообщений
  const renderMessages = () => {
    if (!selectedChatData || selectedChatData.status !== "ACCEPTED") {
      return null;
    }

    return (
      <div className="flex flex-col space-y-3 px-4">
        {selectedChatData.messages.map((message) => {
          const isCurrentUser = message.senderId === "current-user";

          return (
            <div
              key={message.id}
              className={`flex ${
                isCurrentUser ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  isCurrentUser
                    ? "bg-primary text-primary-foreground rounded-tr-none"
                    : "bg-muted rounded-tl-none"
                }`}
              >
                <p>{message.content}</p>
                <div
                  className={`flex items-center justify-end mt-1 text-xs ${
                    isCurrentUser
                      ? "text-primary-foreground/70"
                      : "text-muted-foreground"
                  }`}
                >
                  {format(new Date(message.createdAt), "HH:mm")}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="container max-w-5xl py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Private Messages</h1>
        <p className="text-muted-foreground">Chat directly with streamers</p>
      </div>

      <Card className="flex h-[calc(100vh-200px)] overflow-hidden">
        {/* Левая панель - список чатов */}
        <div className="w-1/3 border-r flex flex-col">
          <div className="p-3 border-b">
            <Input
              placeholder="Search chats..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              prefix={<Search className="w-4 h-4 text-muted-foreground" />}
            />
          </div>

          <div className="flex-1 overflow-y-auto">{renderChatList()}</div>
        </div>

        {/* Правая панель - чат */}
        <div className="flex-1 flex flex-col">
          {selectedChatData ? (
            <>
              {/* Заголовок чата */}
              <div className="p-3 border-b flex items-center">
                <Avatar className="w-8 h-8">
                  {selectedChatData.recipient.avatarUrl ? (
                    <AvatarImage
                      src={selectedChatData.recipient.avatarUrl}
                      alt={selectedChatData.recipient.username}
                    />
                  ) : (
                    <AvatarFallback>
                      {selectedChatData.recipient.username
                        .substring(0, 2)
                        .toUpperCase()}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="ml-2">
                  <p className="font-semibold text-sm">
                    {selectedChatData.recipient.username}
                  </p>
                </div>

                {selectedChatData.status === "PENDING" && (
                  <Badge variant="outline" className="ml-auto">
                    Request Pending
                  </Badge>
                )}
              </div>

              {/* Сообщения */}
              <div className="flex-1 overflow-y-auto py-4">
                {selectedChatData.status === "PENDING" ? (
                  <div className="flex flex-col items-center justify-center h-full">
                    <Clock className="text-muted-foreground w-12 h-12 mb-2" />
                    <h3 className="text-lg font-semibold">
                      Chat request pending
                    </h3>
                    <p className="text-muted-foreground text-center max-w-xs mt-1">
                      {selectedChatData.messages[0].senderId === "current-user"
                        ? `Waiting for ${selectedChatData.recipient.username} to accept your chat request`
                        : `${selectedChatData.recipient.username} wants to chat with you`}
                    </p>

                    {selectedChatData.messages[0].senderId !==
                      "current-user" && (
                      <div className="space-x-2 mt-4">
                        <Button variant="default">Accept</Button>
                        <Button variant="outline">Decline</Button>
                      </div>
                    )}
                  </div>
                ) : (
                  renderMessages()
                )}
              </div>

              {/* Ввод сообщения */}
              {selectedChatData.status === "ACCEPTED" && (
                <div className="p-3 border-t">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleSendMessage()
                      }
                    />
                    <Button onClick={handleSendMessage} size="icon">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
              <User className="w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold">Select a chat</h3>
              <p className="text-muted-foreground max-w-xs mt-1">
                Choose a conversation from the list or start a new one
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
