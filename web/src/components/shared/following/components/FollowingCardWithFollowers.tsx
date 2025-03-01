import { useFindFollowersCountByChannelQuery } from "@/graphql/generated/output";
import FollowingCard from "./FollowingCard";

export default function FollowingCardWithFollowers({
  following,
}: {
  following: {
    id: string;
    username: string;
    avatar?: string | null;
    isLive: boolean;
  };
}) {
  const { data } = useFindFollowersCountByChannelQuery({
    variables: { channelId: following.id },
  });

  console.log(data);

  const followersCount = data?.findFollowersCountByChannel || 0;

  return <FollowingCard following={{ ...following, followersCount }} />;
}
