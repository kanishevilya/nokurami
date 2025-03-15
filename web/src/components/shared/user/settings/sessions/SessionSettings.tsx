"use client";

import { useState } from "react";
import { toast } from "sonner";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/shadcn/Button";
import { Heading } from "@/components/ui/items/Heading";
import { Separator } from "@/components/ui/shadcn/Separator";
import { Card } from "@/components/ui/shadcn/Card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/shadcn/Dialog";
import {
  useGetSessionsByUserQuery,
  useRemoveSessionMutation,
  useClearSessionMutation,
} from "@/graphql/generated/output";
import { useTranslations } from "next-intl";
import { CurrentSession } from "./elements/CurrentSession";
import { SessionsList } from "./elements/SessionsList";

// Define the Session interface based on the GraphQL query response
interface Session {
  __typename?: "SessionModel";
  id: string;
  userId: string;
  createdAt: string;
  metadata: {
    __typename?: "SessionMetadataModel";
    ip: string;
    device: {
      __typename?: "DeviceModel";
      browser: string;
      os: string;
      type: string;
    };
    location: {
      __typename?: "LocationModel";
      city: string;
      country: string;
      latitude: string;
      longitude: string;
    };
  };
  // Add this property to track the current session
  isCurrent?: boolean;
}

export function SessionSettings() {
  const t = useTranslations("settings");
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  const { data, loading: isLoading, refetch } = useGetSessionsByUserQuery();

  const [removeSession, { loading: isRemoving }] = useRemoveSessionMutation({
    onCompleted() {
      toast.success(t("sessionRemoveSuccess"));
      refetch();
      setIsDetailsOpen(false);
    },
    onError(error: Error) {
      toast.error(`${t("sessionRemoveError")}: ${error.message}`);
    },
  });

  const [terminateAllOtherSessions, { loading: isTerminating }] =
    useClearSessionMutation({
      onCompleted() {
        toast.success(t("allSessionsTerminatedSuccess"));
        refetch();
      },
      onError(error: Error) {
        toast.error(`${t("allSessionsTerminateError")}: ${error.message}`);
      },
    });

  const handleShowDetails = (session: Session) => {
    setSelectedSession(session);
    setIsDetailsOpen(true);
  };

  const handleRemoveSession = () => {
    if (!selectedSession) return;

    removeSession({
      variables: {
        id: selectedSession.id,
      },
    });
  };

  const handleTerminateAllOtherSessions = () => {
    terminateAllOtherSessions();
  };

  // Process sessions data and mark the current session
  const rawSessions = data?.getSessionsByUser || [];

  // We need to determine which session is the current one
  // For now, we'll assume the most recent session is the current one
  // This should be replaced with actual logic based on your application's requirements
  const sessions: Session[] = rawSessions.map((session, index) => ({
    ...session,
    isCurrent: index === 0, // Assuming the first session is the current one
  }));

  const currentSession = sessions.find((session) => session.isCurrent);
  const otherSessions = sessions.filter((session) => !session.isCurrent) || [];

  return (
    <Card className="space-y-6 p-6">
      <Heading title={t("sessions")} description={t("sessionsDescription")} />
      <Separator />

      <div className="space-y-6">
        <CurrentSession
          currentSession={currentSession}
          isLoading={isLoading}
          onShowDetails={handleShowDetails}
        />

        <SessionsList
          sessions={otherSessions}
          currentSessionId={currentSession?.id}
          isLoading={isLoading}
          isRemoving={isRemoving}
          onShowDetails={handleShowDetails}
          onTerminateAll={handleTerminateAllOtherSessions}
        />
      </div>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("sessionDetails")}</DialogTitle>
            <DialogDescription>
              {t("sessionDetailsDescription")}
            </DialogDescription>
          </DialogHeader>

          {selectedSession && (
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="font-medium">{t("device")}</p>
                <p className="text-sm text-muted-foreground">
                  {selectedSession.metadata?.device?.type || t("unknownDevice")}
                </p>
              </div>

              <div className="space-y-2">
                <p className="font-medium">{t("browser")}</p>
                <p className="text-sm text-muted-foreground">
                  {selectedSession.metadata?.device?.browser ||
                    t("unknownBrowser")}
                </p>
              </div>

              <div className="space-y-2">
                <p className="font-medium">{t("operatingSystem")}</p>
                <p className="text-sm text-muted-foreground">
                  {selectedSession.metadata?.device?.os || t("unknownOS")}
                </p>
              </div>

              <div className="space-y-2">
                <p className="font-medium">{t("location")}</p>
                <p className="text-sm text-muted-foreground">
                  {selectedSession.metadata?.location?.city &&
                  selectedSession.metadata?.location?.country
                    ? `${selectedSession.metadata.location.city}, ${selectedSession.metadata.location.country}`
                    : t("unknownLocation")}
                </p>
              </div>

              <div className="space-y-2">
                <p className="font-medium">{t("ip")}</p>
                <p className="text-sm text-muted-foreground">
                  {selectedSession.metadata?.ip || t("unknownIp")}
                </p>
              </div>
            </div>
          )}

          <DialogFooter>
            {selectedSession && !selectedSession.isCurrent && (
              <Button
                variant="destructive"
                onClick={handleRemoveSession}
                disabled={isRemoving}
                className="bg-red-500 hover:bg-red-400 text-white"
              >
                <XCircle className="h-4 w-4 mr-2" />
                {isRemoving ? t("removingSession") : t("removeSession")}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
