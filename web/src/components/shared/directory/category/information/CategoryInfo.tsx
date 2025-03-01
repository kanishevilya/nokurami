"use client";
import { useParams } from "next/navigation";
import { useFindCategoryBySlugQuery } from "@/graphql/generated/output";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/shadcn/Skeleton";
import Image from "next/image";
import { getMediaSource } from "@/utils/get-media-source";
import { Heading } from "@/components/ui/items/Heading";
import { StreamsList } from "./StreamsList";

export function CategoryInfo() {
  const router = useRouter();
  const params = useParams<{ slug: string }>();

  const slug = params.slug;

  const { data, loading } = useFindCategoryBySlugQuery({
    variables: {
      slug: slug,
    },
  });

  return !data || loading ? (
    <div className="flex flex-col gap-8 p-6">
      <CategoryCardSkeleton />
    </div>
  ) : (
    <div className="flex flex-col gap-8 p-6">
      <div className="flex gap-6">
        <div className="relative min-w-[240px] h-[320px] rounded-xl overflow-hidden">
          {data?.findCategoryBySlug?.previewUrl && (
            <Image
              src={getMediaSource(data.findCategoryBySlug.previewUrl)}
              alt={data.findCategoryBySlug.title || "Category image"}
              fill
              className="object-cover"
              priority
            />
          )}
        </div>
        <Heading
          title={data.findCategoryBySlug.title}
          description={data.findCategoryBySlug.description ?? ""}
          size="xl"
        />
      </div>

      <StreamsList streams={data.findCategoryBySlug.streams} />
    </div>
  );
}

function CategoryCardSkeleton() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-6">
        <Skeleton className="w-full h-[300px] rounded-xl" />
        <div className="flex flex-col gap-4">
          <Skeleton className="w-2/3 h-10" />
          <Skeleton className="w-full h-20" />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Skeleton className="w-40 h-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <Skeleton key={index} className="aspect-video rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}
