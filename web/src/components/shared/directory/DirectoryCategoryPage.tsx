"use client";

import { Skeleton } from "@/components/ui/shadcn/Skeleton";
import { useFindAllCategoriesQuery } from "@/graphql/generated/output";
import { CategoriesList } from "./category/CategoriesList";
import { Heading } from "@/components/ui/items/Heading";
import { useTranslations } from "next-intl";

export default function DirectoryCategoryPage() {
  const t = useTranslations("categories");
  const { data, loading } = useFindAllCategoriesQuery();

  return (
    <div className="space-y-8">
      <Heading title={t("title")} description={t("description")} />
      {loading ? (
        <CategoriesSkeleton />
      ) : (
        <CategoriesList categories={data?.findAllCategories!} />
      )}
    </div>
  );
}

function CategoriesSkeleton() {
  return (
    <div className="flex flex-wrap gap-12">
      {[...Array(12)].map((_, index) => (
        <Skeleton
          key={index}
          className="min-h-[320px] min-w-[240px] rounded-lg"
        />
      ))}
    </div>
  );
}
