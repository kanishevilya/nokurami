"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Heading } from "@/components/ui/items/Heading";
import { CurrentSession } from "./CurrentSession";
import { SessionsList } from "./SessionsList";
import { SessionDetailsModal } from "./SessionDetailsModal";
import {
  useGetCurrentSessionQuery,
  useGetSessionsByUserQuery,
  useRemoveSessionMutation,
  useClearSessionMutation,
} from "@/graphql/generated/output";
import { useAuth } from "@/hooks/useAuth";

export function SessionSettings() {
  const { data: currentSessionData, loading: currentLoading } =
    useGetCurrentSessionQuery();
  const {
    data: sessionsData,
    loading: sessionsLoading,
    refetch,
  } = useGetSessionsByUserQuery();
  const { unauthenticate } = useAuth();

  const [removeSession, { loading: isRemoving }] = useRemoveSessionMutation({
    onCompleted: () => {
      refetch();
      toast.success("Session removed successfully");
    },
    onError: (error) => toast.error(`Error removing session: ${error.message}`),
  });

  const [clearSession] = useClearSessionMutation({
    onCompleted: () => {
      unauthenticate();
      toast.success("Current session cleared");
    },
    onError: (error) => toast.error(`Error clearing session: ${error.message}`),
  });

  const [selectedSession, setSelectedSession] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentSession = currentSessionData?.getCurrentSession;
  const sessions = sessionsData?.getSessionsByUser || [];
  console.log("Current Session Data:", currentSession);
  const handleShowDetails = (session: any) => {
    setSelectedSession(session);
    setIsModalOpen(true);
  };

  const handleRemoveSession = async () => {
    if (selectedSession) {
      if (selectedSession.id === currentSession?.id) {
        await clearSession();
      } else {
        await removeSession({ variables: { id: selectedSession.id } });
      }
      setIsModalOpen(false);
      setSelectedSession(null);
    }
  };

  const handleTerminateAllOtherSessions = async () => {
    const otherSessions = sessions.filter(
      (session) => session.id !== currentSession?.id
    );
    try {
      await Promise.all(
        otherSessions.map((session) =>
          removeSession({ variables: { id: session.id } })
        )
      );
      toast.success("All other sessions terminated");
      refetch();
    } catch (error) {
      toast.error(`Error terminating sessions: ${(error as Error).message}`);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-0">
      <Heading
        title="Sessions"
        description="Manage your active sessions across devices."
        size="lg"
      />
      <CurrentSession
        currentSession={currentSession}
        isLoading={currentLoading}
        onShowDetails={handleShowDetails}
      />
      <SessionsList
        sessions={sessions}
        currentSessionId={currentSession?.id}
        isLoading={sessionsLoading}
        isRemoving={isRemoving}
        onShowDetails={handleShowDetails}
        onTerminateAll={handleTerminateAllOtherSessions}
      />
      <SessionDetailsModal
        session={selectedSession}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRemove={handleRemoveSession}
        isRemoving={isRemoving}
        isCurrent={selectedSession?.id === currentSession?.id}
      />
    </div>
  );
}
