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
  useFindChannelsContainingUsernameQuery,
} from "@/graphql/generated/output";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/shadcn/Avatar";
import { getMediaSource } from "@/utils/get-media-source";
import { useTranslations } from "next-intl";

export function ChatRequestPage({ usernameParam }: { usernameParam: string }) {
  const { isAuthenticated } = useAuth();
  const { user } = useCurrent();
  const router = useRouter();
  const t = useTranslations("privateMessages");
  const tChat = useTranslations("chat");
  const tCommon = useTranslations("common");
  const tAuth = useTranslations("auth");

  const [username, setUsername] = useState(usernameParam);
  const debouncedUsername = useDebounce(username, 500);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const { data: channelsData, loading: loadingChannels } =
    useFindChannelsContainingUsernameQuery({
      variables: { username: debouncedUsername },
      skip: !debouncedUsername || debouncedUsername.length < 3,
    });

  const [requestChat, { loading: isRequesting }] = useRequestChatMutation({
    onCompleted: (data) => {
      toast.success(tChat("chatRequestSent"));
      router.push("/messages");
    },
    onError: (error) => {
      toast.error(`${tCommon("error")}: ${error.message}`);
    },
  });

  const handleRequestChat = async (e: FormEvent) => {
    e.preventDefault();

    if (!selectedUserId) {
      toast.error(t("pleaseSelectUser"));
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

  const handleSelectUser = (userId: string) => {
    setSelectedUserId(userId);
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-12">
            <User className="mb-4 h-16 w-16 text-muted-foreground" />
            <h2 className="mb-2 text-xl font-bold">{tCommon("signIn")}</h2>
            <p className="mb-4 text-center text-muted-foreground">
              {tChat("loginToAccessMessages")}
            </p>
            <Button asChild>
              <Link href="/account/login">{tCommon("signIn")}</Link>
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
            {t("requestChat")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRequestChat} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">
                  {t("findUserToChat")}
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={t("searchByUsername")}
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      setSelectedUserId(null);
                    }}
                    className="pl-9"
                  />
                </div>
              </div>

              {}
              <div className="border rounded-md overflow-hidden">
                <div className="p-3 bg-muted/50 border-b">
                  <h3 className="font-medium text-sm">{t("searchResults")}</h3>
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  {loadingChannels ? (
                    <div className="flex justify-center items-center p-6">
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    </div>
                  ) : !debouncedUsername || debouncedUsername.length < 3 ? (
                    <div className="p-6 text-center text-muted-foreground">
                      <p>{t("enterAtLeast3Characters")}</p>
                    </div>
                  ) : channelsData?.findChannelsContainingUsername.length ===
                    0 ? (
                    <div className="p-6 text-center text-muted-foreground">
                      <p>{t("noUsersFound")}</p>
                    </div>
                  ) : (
                    <div>
                      {channelsData?.findChannelsContainingUsername.map(
                        (foundChannel) => (
                          <div
                            key={foundChannel.id}
                            className={`p-3 flex items-center hover:bg-accent cursor-pointer ${
                              selectedUserId === foundChannel.id
                                ? "bg-accent/50"
                                : ""
                            }`}
                            onClick={() => handleSelectUser(foundChannel.id)}
                          >
                            <Avatar className="h-10 w-10 mr-3">
                              <AvatarImage
                                src={getMediaSource(foundChannel.avatar)}
                                alt={foundChannel.username}
                              />
                              <AvatarFallback>
                                {foundChannel.username
                                  .substring(0, 2)
                                  .toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">
                                {foundChannel.displayName ||
                                  foundChannel.username}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                @{foundChannel.username}
                              </p>
                            </div>
                          </div>
                        )
                      )}
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
                {tCommon("cancel")}
              </Button>
              <Button type="submit" disabled={!selectedUserId || isRequesting}>
                {isRequesting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t("sendingRequest")}
                  </>
                ) : (
                  t("sendChatRequest")
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
