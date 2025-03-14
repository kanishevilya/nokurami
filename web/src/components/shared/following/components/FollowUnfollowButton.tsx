import { useEffect, useState } from "react";
import {
  useFindFollowersCountByChannelQuery,
  useFindFollowingsCountByChannelQuery,
  useFindMyFollowersQuery,
  useFindMyFollowingsChannelsQuery,
  useFollowToChannelMutation,
  useUnfollowFromChannelMutation,
} from "@/graphql/generated/output";
import { toast } from "sonner";
import { HeartCrackIcon, HeartIcon } from "lucide-react";
import { Button } from "@/components/ui/shadcn/Button";

export default function FollowUnfollowButton({
  channelId,
  myId,
}: {
  channelId: string;
  myId: string;
}) {
  const [isFollowing, setIsFollowing] = useState(true);

  const { data: followingsCount, loading: followingsCountLoading } =
    useFindFollowingsCountByChannelQuery({
      variables: {
        channelId: myId!,
      },
    });

  const { data: myFollowings, loading: myFollowingsLoading } =
    useFindMyFollowingsChannelsQuery({
      variables: {
        data: {
          take: followingsCount?.findFollowingsCountByChannel,
          skip: 0,
        },
      },
      notifyOnNetworkStatusChange: true,
    });

  useEffect(() => {
    async function checkIsFollowing() {
      if (!myFollowings || !followingsCount) {
        setIsFollowing(false);
        return;
      }
      console.log(myFollowingsLoading, followingsCountLoading);

      const isFollowing = myFollowings?.findMyFollowings.followings.find(
        (following) => following.following.id === channelId
      );
      setIsFollowing(isFollowing ? true : false);
    }
    checkIsFollowing();
  }, [myFollowingsLoading, myFollowings]);

  const [followUser, { loading: following }] = useFollowToChannelMutation({
    onCompleted: () => {
      setIsFollowing(true);
      toast.success("Successfully followed");
    },
    onError: (error) => toast.error(`Error following`),
  });

  const [unfollowUser, { loading: unfollowing }] =
    useUnfollowFromChannelMutation({
      onCompleted: () => {
        setIsFollowing(false);
        toast.success("Successfully unfollowed");
      },
      onError: (error) => toast.error(`Error unfollowing`),
    });

  const handleFollow = () => {
    followUser({ variables: { channelId } });
  };

  const handleUnfollow = () => {
    unfollowUser({ variables: { channelId } });
  };

  return (
    <Button
      className="w-10 h-[30px] relative p-0"
      onClick={isFollowing ? handleUnfollow : handleFollow}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {isFollowing ? (
          <HeartCrackIcon className="w-5 h-5" />
        ) : (
          <HeartIcon className="w-5 h-5" />
        )}
      </div>
    </Button>
  );
}
