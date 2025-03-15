import {
  FindAllLiveStreamsQuery,
  FindAllStreamsQuery,
} from "@/graphql/generated/output";
import { StreamCard } from "../../stream/StreamCard";
import { useTranslations } from "next-intl";

interface StreamsListProps {
  message?: string;
  streamList: FindAllStreamsQuery["findAllStreams"];
}

export function StreamsList({ streamList, message }: StreamsListProps) {
  const t = useTranslations("streams");
  const defaultMessage = t("noStreams");

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
