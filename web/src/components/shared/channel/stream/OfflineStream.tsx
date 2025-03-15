import { FindChannelByUsernameQuery } from "@/graphql/generated/output";
import { ChannelAvatar } from "@/components/ui/items/ChannelAvatar";
import Image from "next/image";
import { getMediaSource } from "@/utils/get-media-source";
interface OfflineStreamProps {
  channel: FindChannelByUsernameQuery["findChannelByUsername"];
}

export function OfflineStream({ channel }: OfflineStreamProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-card p-4 text-center">
      <ChannelAvatar
        channel={channel}
        status="offline"
        className="mb-4 h-16 w-16"
      />
      <h3 className="text-lg font-semibold text-white">
        {channel.username} не в сети
      </h3>
      <p className="text-sm text-muted-foreground">
        Этот канал сейчас не проводит трансляцию.
      </p>
    </div>
  );
}
