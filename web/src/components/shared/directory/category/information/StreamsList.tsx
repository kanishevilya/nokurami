import { FindCategoryBySlugQuery } from "@/graphql/generated/output";
import { StreamItem } from "./StreamItem";
import { Heading } from "@/components/ui/items/Heading";

interface StreamsListProps {
  streams: FindCategoryBySlugQuery["findCategoryBySlug"]["streams"];
}

export function StreamsList({ streams }: StreamsListProps) {
  return (
    <div className="flex flex-col gap-4">
      <Heading title="Streams" size="lg" />
      <div className="mt-6 flex flex-wrap gap-12">
        {streams.map((stream) => (
          <StreamItem
            key={stream.user.username}
            previewUrl={stream.previewUrl ?? ""}
            title={stream.title}
            username={stream.user.username}
            isLive={stream.isLive}
            user={stream.user}
            category={stream.category}
          />
        ))}
      </div>
    </div>
  );
}
