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
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/shadcn/Button";

export function CategoryInfo() {
  const router = useRouter();
  const params = useParams<{ slug: string }>();

  const slug = params.slug;

  const { data, loading } = useFindCategoryBySlugQuery({
    variables: {
      slug: slug,
    },
  });

  return (
    <div className="flex flex-col gap-8 p-6">
      <Button className="w-fit" variant="ghost" onClick={() => router.back()}>
        <ArrowLeft />
        Back
      </Button>
      {!data || loading ? (
        <div className="flex flex-col">
          <CategoryCardSkeleton />
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}

function CategoryCardSkeleton() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-6">
        <Skeleton className="relative min-w-[240px] h-[320px] rounded-xl" />
        <div className="flex flex-col gap-4 flex-1">
          <Skeleton className="h-8 w-3/4 rounded-md" />
          <Skeleton className="h-24 w-full rounded-md" />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Skeleton className="h-6 w-32 rounded-md" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="aspect-video rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
