import { FindChannelByUsernameQuery } from "@/graphql/generated/output";

interface AboutChannelProps {
  channel: FindChannelByUsernameQuery["findChannelByUsername"];
}

export function AboutChannel({ channel }: AboutChannelProps) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-foreground">О канале</h3>
      <p className="text-sm text-muted-foreground">
        {channel.information || "Описание канала отсутствует"}
      </p>
    </div>
  );
}
