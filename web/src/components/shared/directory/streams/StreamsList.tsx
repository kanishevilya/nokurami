import {
  FindAllLiveStreamsQuery,
  FindAllStreamsQuery,
} from "@/graphql/generated/output";
import { StreamCard } from "../../stream/StreamCard";

interface StreamsListProps {
  message?: string;
  streamList: FindAllStreamsQuery["findAllStreams"];
}

export function StreamsList({
  streamList,
  message = "No streams",
}: StreamsListProps) {
  return (
    <div className="flex flex-wrap gap-12 ">
      {streamList.length === 0 ? (
        <div className="text-center text-2xl">{message}</div>
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
