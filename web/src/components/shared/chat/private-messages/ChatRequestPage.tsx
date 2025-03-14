import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/shadcn/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/Card";
import { Input } from "@/components/ui/shadcn/Input";
import { Loader2, MessageSquare, Search, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useCurrent } from "@/hooks/useCurrent";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDebounce } from "@/hooks/useDebounce";
import {
  useRequestChatMutation,
  useFindChannelByUsernameQuery,
} from "@/graphql/generated/output";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/shadcn/Avatar";
import { getMediaSource } from "@/utils/get-media-source";

export function ChatRequestPage() {
  const { isAuthenticated } = useAuth();
  const { user } = useCurrent();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const debouncedUsername = useDebounce(username, 500);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  // Запрос на поиск пользователей по имени
  const { data: channelData, loading: loadingChannel } =
    useFindChannelByUsernameQuery({
      variables: { username: debouncedUsername },
      skip: !debouncedUsername || debouncedUsername.length < 3,
    });

  // Мутация для запроса чата
  const [requestChat, { loading: isRequesting }] = useRequestChatMutation({
    onCompleted: (data) => {
      toast.success("Chat request sent successfully");
      router.push("/messages");
    },
    onError: (error) => {
      toast.error(`Failed to send chat request: ${error.message}`);
    },
  });

  // Обработчик отправки запроса на чат
  const handleRequestChat = async (e: FormEvent) => {
    e.preventDefault();

    if (!selectedUserId) {
      toast.error("Please select a user to chat with");
      return;
    }

    try {
      await requestChat({
        variables: {
          input: {
            recipientId: selectedUserId,
          },
        },
      });
    } catch (error) {
      console.error("Error requesting chat:", error);
    }
  };

  // Выбор пользователя из результатов поиска
  const handleSelectUser = (userId: string) => {
    setSelectedUserId(userId);
  };

  // Если не аутентифицирован, показываем сообщение о необходимости входа
  if (!isAuthenticated) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-12">
            <User className="mb-4 h-16 w-16 text-muted-foreground" />
            <h2 className="mb-2 text-xl font-bold">
              Sign in to request a chat
            </h2>
            <p className="mb-4 text-center text-muted-foreground">
              You need to be signed in to request a private chat with other
              users
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
    <div className="container max-w-2xl mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Request a Private Chat
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRequestChat} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Find a user to chat with
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by username..."
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      setSelectedUserId(null); // Сбрасываем выбор при изменении поиска
                    }}
                    className="pl-9"
                  />
                </div>
              </div>

              {/* Результаты поиска */}
              <div className="border rounded-md overflow-hidden">
                <div className="p-3 bg-muted/50 border-b">
                  <h3 className="font-medium text-sm">Search Results</h3>
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  {loadingChannel ? (
                    <div className="flex justify-center items-center p-6">
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    </div>
                  ) : !debouncedUsername || debouncedUsername.length < 3 ? (
                    <div className="p-6 text-center text-muted-foreground">
                      <p>Enter at least 3 characters to search</p>
                    </div>
                  ) : !channelData?.findChannelByUsername ? (
                    <div className="p-6 text-center text-muted-foreground">
                      <p>No users found</p>
                    </div>
                  ) : (
                    <div>
                      {/* Показываем найденного пользователя */}
                      <div
                        className={`p-3 flex items-center hover:bg-accent cursor-pointer ${
                          selectedUserId ===
                          channelData.findChannelByUsername.id
                            ? "bg-accent/50"
                            : ""
                        }`}
                        onClick={() =>
                          handleSelectUser(channelData.findChannelByUsername.id)
                        }
                      >
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarImage
                            src={getMediaSource(
                              channelData.findChannelByUsername.avatar
                            )}
                            alt={channelData.findChannelByUsername.username}
                          />
                          <AvatarFallback>
                            {channelData.findChannelByUsername.username
                              .substring(0, 2)
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">
                            {channelData.findChannelByUsername.displayName ||
                              channelData.findChannelByUsername.username}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            @{channelData.findChannelByUsername.username}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                type="button"
                onClick={() => router.push("/messages")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={!selectedUserId || isRequesting}>
                {isRequesting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending Request...
                  </>
                ) : (
                  "Send Chat Request"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
