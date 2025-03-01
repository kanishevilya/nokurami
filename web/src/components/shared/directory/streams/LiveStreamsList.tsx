import { FindAllLiveStreamsQuery } from "@/graphql/generated/output";
import { StreamCard } from "../../stream/StreamCard";

interface LiveStreamsListProps {
  streamList: FindAllLiveStreamsQuery["findAllLiveStreams"];
}

export function LiveStreamsList({ streamList }: LiveStreamsListProps) {
  return (
    <div className="flex flex-wrap gap-12 ">
      {streamList.length === 0 ? (
        <div className="text-center text-2xl">
          Активных трансляций сейчас нет
        </div>
      ) : (
        streamList.map((stream) => (
          <StreamCard key={stream.user.username} stream={stream} />
        ))
      )}
    </div>
  );
}
