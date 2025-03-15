import { X } from "lucide-react";
import { Button } from "@/components/ui/shadcn/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/Card";
import { SessionItem } from "../data/SessionItem";
import { SessionSkeleton } from "./SessionSkeleton";
import { useTranslations } from "next-intl";

type SessionsListProps = {
  sessions: any[];
  currentSessionId: string | undefined;
  isLoading: boolean;
  isRemoving: boolean;
  onShowDetails: (session: any) => void;
  onTerminateAll: () => void;
};

export function SessionsList({
  sessions,
  currentSessionId,
  isLoading,
  isRemoving,
  onShowDetails,
  onTerminateAll,
}: SessionsListProps) {
  const t = useTranslations("settings");

  return (
    <Card className="shadow-lg rounded-xl border border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold">
          {t("otherSessions")}
        </CardTitle>
        {sessions.length > 0 && (
          <Button
            className="bg-red-500 hover:bg-red-400 text-white"
            onClick={onTerminateAll}
            disabled={isRemoving || isLoading}
          >
            <X className="h-4 w-4 mr-2" />
            {t("terminateAllOtherSessions")}
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            <SessionSkeleton />
            <SessionSkeleton />
          </div>
        ) : sessions.length > 0 ? (
          sessions.map((session) => (
            <div
              key={session.id}
              className="group border-b last:border-b-0 py-4 px-6 -mx-6 duration-200 hover:bg-white/10  cursor-pointer"
              onClick={() => onShowDetails(session)}
            >
              <SessionItem session={session} isRemoving={isRemoving} />
            </div>
          ))
        ) : (
          <p className="text-muted-foreground">{t("noOtherActiveSessions")}</p>
        )}
      </CardContent>
    </Card>
  );
}
