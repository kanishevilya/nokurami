import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/shadcn/Tabs";
import DirectoryCategoryPage from "./DirectoryCategoryPage";
import DirectoryLiveStreamsPage from "./DirectoryLiveStreamsPage";
import { useTranslations } from "next-intl";

export function DirectoryTabsPage() {
  const categoriesT = useTranslations("categories");
  const streamsT = useTranslations("streams");

  return (
    <Tabs defaultValue="categories">
      <TabsList>
        <TabsTrigger value="categories">{categoriesT("title")}</TabsTrigger>
        <TabsTrigger value="live">{streamsT("title")}</TabsTrigger>
      </TabsList>
      <TabsContent className="pt-4" value="categories">
        <DirectoryCategoryPage />
      </TabsContent>
      <TabsContent className="pt-4" value="live">
        <DirectoryLiveStreamsPage />
      </TabsContent>
    </Tabs>
  );
}
