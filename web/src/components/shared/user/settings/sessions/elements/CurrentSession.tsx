import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/Card";
import { SessionItem } from "../data/SessionItem";
import { SessionSkeleton } from "./SessionSkeleton";

type CurrentSessionProps = {
  currentSession: any;
  isLoading: boolean;
  onShowDetails: (session: any) => void;
};

export function CurrentSession({
  currentSession,
  isLoading,
  onShowDetails,
}: CurrentSessionProps) {
  return (
    <Card className="shadow-lg rounded-xl border border-border">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Current Session</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <SessionSkeleton />
        ) : currentSession ? (
          <SessionItem
            session={currentSession}
            isCurrent={true}
            onShowDetails={onShowDetails}
          />
        ) : (
          <p className="text-muted-foreground">
            No current session data available.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
