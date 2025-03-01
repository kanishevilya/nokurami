"use client";

import { Skeleton } from "@/components/ui/shadcn/Skeleton";
import { useFindAllCategoriesQuery } from "@/graphql/generated/output";
import { CategoriesList } from "./CategoriesList";
import { Heading } from "@/components/ui/items/Heading";

export default function DirectoryCategoryPage() {
  const { data, loading } = useFindAllCategoriesQuery();

  return loading ? (
    <CategoriesSkeleton />
  ) : (
    <div className="space-y-8">
      <Heading
        title="Категории"
        description="Все категории, которые вы можете найти на нашей платформе"
      />
      <CategoriesList categories={data?.findAllCategories!} />
    </div>
  );
}

function CategoriesSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-y-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(12)].map((_, index) => (
        <Skeleton key={index} className="h-[256px] w-[192px] rounded-lg" />
      ))}
    </div>
  );
}
