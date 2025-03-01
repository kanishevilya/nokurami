import { useRouter } from "next/navigation";

export default function CategoriesPage() {
  const router = useRouter();

  router.push("/directory");

  return <div>CategoriesPage</div>;
}
