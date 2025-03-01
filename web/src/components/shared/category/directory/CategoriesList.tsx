import { FindAllCategoriesQuery } from "@/graphql/generated/output";
import { CategoryCard } from "./CategoryCard";

interface CategoriesListProps {
  categories: FindAllCategoriesQuery["findAllCategories"];
}

export function CategoriesList({ categories }: CategoriesListProps) {
  return (
    <div className="flex flex-wrap gap-12">
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
}
