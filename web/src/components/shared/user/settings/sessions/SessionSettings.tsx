// src/components/sessions/SessionSettings.tsx
"use client";

import { useState } from "react";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import { X } from "lucide-react";
import { Icon } from "@iconify/react";

import { Heading } from "@/components/ui/items/Heading";
import { Button } from "@/components/ui/shadcn/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/Card";
import { Separator } from "@/components/ui/shadcn/Separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/shadcn/Dialog";
import {
  useGetCurrentSessionQuery,
  useGetSessionsByUserQuery,
  useRemoveSessionMutation,
} from "@/graphql/generated/output";
import { getBrowserIcon } from "./SessionIcons";
import { getOSIcon } from "./SessionIcons";
import { getDeviceIcon } from "./SessionIcons";

export function SessionSettings() {
  const { data: currentSessionData, loading: currentLoading } =
    useGetCurrentSessionQuery();
  const {
    data: sessionsData,
    loading: sessionsLoading,
    refetch,
  } = useGetSessionsByUserQuery();
  const [removeSession, { loading: isRemoving }] = useRemoveSessionMutation({
    onCompleted: () => {
      refetch();
      toast.success("Session removed successfully");
    },
    onError: (error) => toast.error(`Error removing session: ${error.message}`),
  });

  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentSession = currentSessionData?.getCurrentSession;
  const sessions = sessionsData?.getSessionsByUser || [];

  const handleRemoveSession = (id: string) => {
    setSelectedSessionId(id);
    setIsModalOpen(true);
  };

  const confirmRemoveSession = () => {
    if (selectedSessionId) {
      removeSession({ variables: { id: selectedSessionId } });
      setIsModalOpen(false);
      setSelectedSessionId(null);
    }
  };

  const handleTerminateAllOtherSessions = () => {
    const otherSessions = sessions.filter(
      (session) => session.id !== currentSession?.id
    );
    Promise.all(
      otherSessions.map((session) =>
        removeSession({ variables: { id: session.id } })
      )
    )
      .then(() => {
        refetch();
        toast.success("All other sessions terminated");
      })
      .catch((error) =>
        toast.error(`Error terminating sessions: ${error.message}`)
      );
  };

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-0">
      <Heading
        title="Sessions"
        description="Manage your active sessions across devices."
        size="lg"
      />

      <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent shadow-lg rounded-xl border border-border">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Current Session
          </CardTitle>
        </CardHeader>
        <CardContent>
          {currentLoading ? (
            <SessionSkeleton />
          ) : currentSession ? (
            <SessionItem session={currentSession} isCurrent />
          ) : (
            <p className="text-muted-foreground">
              No current session data available.
            </p>
          )}
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent shadow-lg rounded-xl border border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-semibold">
            Other Sessions
          </CardTitle>
          {sessions.length > 0 && (
            <Button
              className="bg-red-500 hover:bg-red-400 text-white"
              onClick={handleTerminateAllOtherSessions}
              disabled={isRemoving || sessionsLoading}
            >
              <X className="h-4 w-4 mr-2" />
              Terminate All Other Sessions
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {sessionsLoading ? (
            <div className="space-y-4">
              <SessionSkeleton />
              <SessionSkeleton />
            </div>
          ) : sessions.length > 0 ? (
            sessions.map((session) => (
              <div
                key={session.id}
                className="group cursor-pointer border-b last:border-b-0 py-4 px-6 -mx-6 transition-colors duration-200 hover:bg-white/10 active:bg-red-200"
                onClick={() => handleRemoveSession(session.id)}
              >
                <SessionItem session={session} isRemoving={isRemoving} />
              </div>
            ))
          ) : (
            <p className="text-muted-foreground">No other active sessions.</p>
          )}
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Session</DialogTitle>
            <DialogDescription>
              Are you sure you want to terminate this session? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsModalOpen(false)}
              disabled={isRemoving}
            >
              Cancel
            </Button>
            <Button
              className="bg-red-500 hover:bg-red-400 text-white"
              onClick={confirmRemoveSession}
              disabled={isRemoving}
            >
              {isRemoving ? "Removing..." : "Remove"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function SessionItem({
  session,
  isCurrent,
  isRemoving,
}: {
  session: any;
  isCurrent?: boolean;
  isRemoving?: boolean;
}) {
  const { metadata, createdAt } = session;
  const { device, location } = metadata || {};

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          {getDeviceIcon(device?.type)}
          {getOSIcon(device?.os)}
          {getBrowserIcon(device?.browser)}
        </div>
        <div className="space-y-1">
          <p className="font-medium group-hover:text-red-500 transition-colors duration-200">
            {device?.type || "Unknown Device"} •{" "}
            {device?.browser || "Unknown Browser"} on{" "}
            {device?.os || "Unknown OS"}
          </p>
          <p className="text-sm text-muted-foreground group-hover:text-red-400 transition-colors duration-200">
            {location?.city && location?.country
              ? `${location.city}, ${location.country}`
              : "Unknown Location"}{" "}
            • {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
          </p>
        </div>
      </div>
    </div>
  );
}

function SessionSkeleton() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 bg-gray-300 rounded-full" />
          <div className="h-5 w-5 bg-gray-300 rounded-full" />
          <div className="h-5 w-5 bg-gray-300 rounded-full" />
        </div>
        <div className="space-y-2">
          <div className="h-5 w-64 bg-gray-300 rounded" />
          <div className="h-4 w-48 bg-gray-300 rounded" />
        </div>
      </div>
    </div>
  );
}
