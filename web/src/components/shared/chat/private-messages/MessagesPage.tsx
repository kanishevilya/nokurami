import { useState, useEffect } from "react";
import { Button } from "@/components/ui/shadcn/Button";
import { Card, CardContent } from "@/components/ui/shadcn/Card";
import { Input } from "@/components/ui/shadcn/Input";
import { Search, User, MessageSquare } from "lucide-react";
import { useCurrent } from "@/hooks/useCurrent";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useGetPrivateChatsQuery,
  useChatRequestedSubscription,
  useChatStatusUpdatedSubscription,
  ChatStatus,
  useMarkMessagesAsReadMutation,
} from "@/graphql/generated/output";
import { ChatList } from "../components/ChatList";
import { PrivateChat } from "./PrivateChat";

export function MessagesPage() {
  const { isAuthenticated } = useAuth();
  const { user, isLoadingProfile } = useCurrent();
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const {
    data: chatsData,
    loading: loadingChats,
    error: chatsError,
    refetch: refetchChats,
  } = useGetPrivateChatsQuery({
    skip: !isAuthenticated || !user?.id,
    fetchPolicy: "network-only",
  });

  console.log(isAuthenticated, user?.id);

  const { data: newChatRequestData } = useChatRequestedSubscription({
    skip: !isAuthenticated || !user?.id,
  });

  const { data: chatStatusUpdateData } = useChatStatusUpdatedSubscription({
    skip: !isAuthenticated || !user?.id,
  });

  useEffect(() => {
    if (newChatRequestData?.chatRequested) {
      refetchChats();
      toast.info(
        `New chat request from ${newChatRequestData.chatRequested.creator.username}`
      );
    }
  }, [newChatRequestData, refetchChats]);

  useEffect(() => {
    if (chatStatusUpdateData?.chatStatusUpdated) {
      const chat = chatStatusUpdateData.chatStatusUpdated;

      if (chat.status === ChatStatus.Accepted) {
        refetchChats();
        toast.success("Chat request accepted");
      } else if (chat.status === ChatStatus.Rejected) {
        toast.error("Chat request rejected");

        if (selectedChat === chat.id) {
          setSelectedChat(null);
        }
        refetchChats();
      }
    }
  }, [chatStatusUpdateData, refetchChats, selectedChat]);

  const [markMessagesAsRead] = useMarkMessagesAsReadMutation({
    onError: (error) => {
      console.error("Error marking messages as read:", error);
    },
  });

  const markAsRead = async (chatId: string) => {
    try {
      await markMessagesAsRead({
        variables: {
          input: {
            chatId,
          },
        },
      });
    } catch (error) {
      console.error("Error marking messages as read:", error);
    }
  };

  useEffect(() => {
    if (selectedChat) {
      markAsRead(selectedChat);
    }
  }, [selectedChat]);

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-12">
            <User className="mb-4 h-16 w-16 text-muted-foreground" />
            <h2 className="mb-2 text-xl font-bold">
              Sign in to access messages
            </h2>
            <p className="mb-4 text-center text-muted-foreground">
              You need to be signed in to view and send messages
            </p>
            <Button asChild>
              <Link href="/account/login">Sign In</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        {}
        <div className="md:col-span-4">
          <Card className="h-[650px] flex flex-col">
            <div className="border-b p-4">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search conversations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 pl-9"
                  />
                </div>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => router.push("/messages/request")}
                  title="New chat request"
                >
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <ChatList
              chats={chatsData?.privateChats || []}
              loading={loadingChats || isLoadingProfile}
              error={chatsError}
              currentUserId={user?.id || ""}
              selectedChatId={selectedChat}
              onChatSelect={setSelectedChat}
              onRetry={refetchChats}
              searchTerm={searchTerm}
            />
          </Card>
        </div>

        {/* Окно чата */}
        {selectedChat && user?.id !== null ? (
          <div className="md:col-span-8">
            <PrivateChat
              chatId={selectedChat}
              currentUserId={user?.id || ""}
              onRefetchChats={refetchChats}
            />
          </div>
        ) : (
          <div className="flex flex-1 w-full items-center justify-center text-center md:col-span-6">
            <div>
              <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 font-semibold">Your Messages</h3>
              <p className="mt-1 text-muted-foreground">
                Select a conversation or start a new one.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
