import { FindChannelByUsernameQuery } from "@/graphql/generated/output";
import FollowUnfollowButton from "../../following/components/FollowUnfollowButton";
import { useTranslations } from "next-intl";

interface StreamInfoProps {
  channel: FindChannelByUsernameQuery["findChannelByUsername"];
  isCurrentUser: boolean;
  myId: string;
}

export function StreamInfo({ channel, isCurrentUser, myId }: StreamInfoProps) {
  const stream = channel.stream;
  const t = useTranslations("streams");

  return (
    <div className="mb-6 flex items-start">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-foreground">
          {channel.displayName || channel.username}
        </h2>
        <h3 className="text-lg text-foreground">
          {stream?.title || t("noTitle")}
        </h3>
        <p className="text-sm text-muted-foreground">
          {stream?.isLive ? t("live") : t("offline")}
        </p>
        {!isCurrentUser && (
          <FollowUnfollowButton channelId={channel.id} myId={myId} />
        )}
      </div>
    </div>
  );
}
