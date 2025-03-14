import { useFindFollowersCountByChannelQuery } from "@/graphql/generated/output";
import FollowingCard from "./FollowingCard";
import { Skeleton } from "@/components/ui/shadcn/Skeleton";

export default function FollowingCardWithFollowers({
  following,
  myId,
}: {
  following: {
    id: string;
    username: string;
    avatar?: string | null;
    isLive: boolean;
  };
  myId: string;
}) {
  const { data, loading } = useFindFollowersCountByChannelQuery({
    variables: { channelId: following.id },
  });

  const followersCount = data?.findFollowersCountByChannel || 0;

  if (loading) {
    return <Skeleton className="h-11 w-full rounded-lg" />;
  }

  console.log(data);
  console.log(following);

  return (
    <FollowingCard myId={myId} following={{ ...following, followersCount }} />
  );
}
