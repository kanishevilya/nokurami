import { FindCategoryBySlugQuery } from "@/graphql/generated/output";
import { getMediaSource } from "@/utils/get-media-source";
import Image from "next/image";

interface CategoryCardProps {
  category: FindCategoryBySlugQuery["findCategoryBySlug"];
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <div className="relative group w-full max-w-[192px] perspective-[1000px]">
      <div className="absolute inset-0 bg-primary rounded-lg shadow-lg h-[256px] z-0 flex flex-col items-start justify-end">
        <span className="px-4 py-2 text-primary-foreground text-md font-mono">
          Open
        </span>
      </div>

      <div
        className="cursor-pointer relative w-full h-[256px] transition-transform duration-200 rounded-lg z-10"
        style={{
          transformStyle: "preserve-3d",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform =
            "translateY(-30px) rotateX(20deg) rotateY(15deg)";
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
    </div>
  );
}
