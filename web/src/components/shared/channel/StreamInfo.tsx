import { FindChannelByUsernameQuery } from "@/graphql/generated/output";

interface StreamInfoProps {
  channel: FindChannelByUsernameQuery["findChannelByUsername"];
}

export function StreamInfo({ channel }: StreamInfoProps) {
  const stream = channel.stream;

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-foreground">
        {stream?.title || "Без названия"}
      </h2>
      <p className="text-sm text-muted-foreground">
        {stream?.isLive ? "В прямом эфире" : "Не в сети"}
      </p>
    </div>
  );
}
