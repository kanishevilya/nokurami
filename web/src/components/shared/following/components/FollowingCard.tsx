import { ChannelAvatar } from "@/components/ui/items/ChannelAvatar";

import FollowUnfollowButton from "./FollowUnfollowButton";
import Link from "next/link";

interface FollowingCardProps {
  following: {
    username: string;
    avatar?: string | null;
    isLive: boolean;
    followersCount: number;
    id: string;
  };
}

export default function FollowingCard({ following }: FollowingCardProps) {
  const { username, isLive, followersCount, id } = following;
  console.log(following);

  return (
    <div className="group relative block w-full max-w-[400px] rounded-lg shadow-md bg-card overflow-hidden">
      <Link href={`/${username}`}>
        <div className="relative flex flex-col items-center justify-center w-full h-[200px] dark:bg-zinc-800 light:bg-zinc-100 rounded-t-lg">
          <ChannelAvatar
            channel={following}
            className={`w-16 h-16 ${isLive ? "border-2 border-red-500" : ""}`}
          />
          {isLive && (
            <span className="absolute top-3 right-3 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          )}
          <h3 className="text-md font-semibold text-foreground pt-4">
            {username}
          </h3>
        </div>
      </Link>

      <div className="absolute h-6 flex items-center justify-between left-0 right-0 bottom-0 p-4 pr-0 bg-card text-muted-foreground transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-10">
        <p className="text-sm">Подписчиков: {followersCount}</p>
        <FollowUnfollowButton channelId={id} />
      </div>
    </div>
  );
}
