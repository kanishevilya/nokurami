import { FindAllLiveStreamsQuery } from "@/graphql/generated/output";
import { StreamCard } from "../../stream/StreamCard";
import { useTranslations } from "next-intl";

interface LiveStreamsListProps {
  message?: string;
  streamList: FindAllLiveStreamsQuery["findAllLiveStreams"];
}

export function LiveStreamsList({ streamList, message }: LiveStreamsListProps) {
  const t = useTranslations("streams");
  const defaultMessage = t("noActiveStreams");

  return (
    <div className="flex flex-wrap gap-12 ">
      {streamList.length === 0 ? (
        <div className="text-center text-2xl">{message || defaultMessage}</div>
      ) : (
        streamList.map((stream, index) => (
          <StreamCard
            key={`${stream.user.username}-${index}`}
            stream={stream}
          />
        ))
      )}
    </div>
  );
}
