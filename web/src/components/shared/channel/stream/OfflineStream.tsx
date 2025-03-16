import { FindChannelByUsernameQuery } from "@/graphql/generated/output";
import { ChannelAvatar } from "@/components/ui/items/ChannelAvatar";
import Image from "next/image";
import { getMediaSource } from "@/utils/get-media-source";
import { useTranslations } from "next-intl";
interface OfflineStreamProps {
  channel: FindChannelByUsernameQuery["findChannelByUsername"];
}

export function OfflineStream({ channel }: OfflineStreamProps) {
  const t = useTranslations("streams");
  return (
    <div className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-card p-4 text-center">
      <ChannelAvatar
        channel={channel}
        status="offline"
        className="mb-4 h-16 w-16"
      />
      <h3 className="text-lg font-semibold text-foreground">
        {channel.username} {t("offline")}
      </h3>
      <p className="text-sm text-muted-foreground">
        {t("thisChannelIsNotStreaming")}
      </p>
    </div>
  );
}
