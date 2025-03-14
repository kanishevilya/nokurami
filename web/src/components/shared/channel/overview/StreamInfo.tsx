import { FindChannelByUsernameQuery } from "@/graphql/generated/output";
import FollowUnfollowButton from "../../following/components/FollowUnfollowButton";

interface StreamInfoProps {
  channel: FindChannelByUsernameQuery["findChannelByUsername"];
  isCurrentUser: boolean;
  myId: string;
}

export function StreamInfo({ channel, isCurrentUser, myId }: StreamInfoProps) {
  const stream = channel.stream;

  return (
    <div className="mb-6 flex items-start">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-foreground">
          {channel.displayName || channel.username}
        </h2>
        <h3 className="text-lg text-foreground">
          {stream?.title || "No title"}
        </h3>
        <p className="text-sm text-muted-foreground">
          {stream?.isLive ? "In live" : "Not in live"}
        </p>
        {!isCurrentUser && (
          <FollowUnfollowButton channelId={channel.id} myId={myId} />
        )}
      </div>
    </div>
  );
}
