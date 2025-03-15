import { FindCategoryBySlugQuery } from "@/graphql/generated/output";
import { getMediaSource } from "@/utils/get-media-source";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface CategoryCardProps {
  category: FindCategoryBySlugQuery["findCategoryBySlug"];
}

export function CategoryCard({ category }: CategoryCardProps) {
  const t = useTranslations("categories");

  return (
    <div className="relative group w-full max-w-[240px] perspective-[1000px]">
      <div className="absolute inset-0 bg-primary rounded-lg shadow-lg h-[320px] z-0 flex flex-col items-start justify-end">
        <span className="px-4 py-2 text-primary-foreground text-md font-mono">
          {t("showMore")}
        </span>
      </div>
      <Link href={`/categories/${category.slug}`}>
        <div
          className="cursor-pointer relative w-full h-[320px] transition-transform duration-200 rounded-lg z-10"
          style={{
            transformStyle: "preserve-3d",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform =
              "translateY(-40px) rotateX(20deg) rotateY(15deg)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform =
              "translateY(0px) rotateX(0deg) rotateY(0deg)";
          }}
        >
          <Image
            src={getMediaSource(category.previewUrl)}
            alt={category.title}
            fill
            className="object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black/10 transition-opacity duration-400 group-hover:bg-black/30 rounded-lg" />
          <div className="absolute bottom-0 left-0 right-0 p-3 text-white bg-gradient-to-t from-black/60 to-transparent rounded-b-lg">
            <h3 className="text-base font-semibold">{category.title}</h3>
          </div>
        </div>
      </Link>
    </div>
  );
}
