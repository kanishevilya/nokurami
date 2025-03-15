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
import { useTranslations } from "next-intl";

export default function FollowUnfollowButton({
  channelId,
  myId,
}: {
  channelId: string;
  myId: string;
}) {
  const [isFollowing, setIsFollowing] = useState(true);
  const t = useTranslations("profile");

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
  }, [
    channelId,
    followingsCount,
    myFollowings,
    myFollowingsLoading,
    followingsCountLoading,
  ]);

  const [followUser, { loading: following }] = useFollowToChannelMutation({
    onCompleted: () => {
      setIsFollowing(true);
      toast.success(t("followSuccess"));
    },
    onError: (error) => toast.error(t("followError")),
  });

  const [unfollowUser, { loading: unfollowing }] =
    useUnfollowFromChannelMutation({
      onCompleted: () => {
        setIsFollowing(false);
        toast.success(t("unfollowSuccess"));
      },
      onError: (error) => toast.error(t("unfollowError")),
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
      title={isFollowing ? t("unfollow") : t("follow")}
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
