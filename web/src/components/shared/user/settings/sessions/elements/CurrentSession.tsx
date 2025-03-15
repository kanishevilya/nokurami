import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/Card";
import { SessionItem } from "../data/SessionItem";
import { SessionSkeleton } from "./SessionSkeleton";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("settings");

  return (
    <Card className="shadow-lg rounded-xl border border-border">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          {t("currentSession")}
        </CardTitle>
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
          <p className="text-muted-foreground">{t("noCurrentSessionData")}</p>
        )}
      </CardContent>
    </Card>
  );
}
