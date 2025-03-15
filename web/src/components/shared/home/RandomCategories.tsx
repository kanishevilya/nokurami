"use client";

import { Heading } from "@/components/ui/items/Heading";
import { Skeleton } from "@/components/ui/shadcn/Skeleton";
import { useFindRandomCategoriesQuery } from "@/graphql/generated/output";
import { CategoryCard } from "../directory/category/CategoryCard";
import { useTranslations } from "next-intl";

export default function RandomCategories() {
  const t = useTranslations("home");
  const { data, loading } = useFindRandomCategoriesQuery();

  return loading ? (
    <RandomCategoriesSkeleton />
  ) : (
    <>
      <Heading title={t("recommendedCategories")} />
      <div className="mx-auto">
        <div className="flex flex-row gap-4">
          {data?.findRandomCategories.map((category) => (
            <div key={category.id} className="w-52">
              <CategoryCard category={category} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function RandomCategoriesSkeleton() {
  return (
    <div className="flex flex-row gap-4">
      <Skeleton className="h-[200px] w-full" />
      <Skeleton className="h-[200px] w-full" />
      <Skeleton className="h-[200px] w-full" />
      <Skeleton className="h-[200px] w-full" />
    </div>
  );
}
