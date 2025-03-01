import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/shadcn/Tabs";
import DirectoryCategoryPage from "./DirectoryCategoryPage";
import DirectoryLiveStreamsPage from "./DirectoryLiveStreamsPage";

export function DirectoryTabsPage() {
  return (
    <Tabs defaultValue="categories">
      <TabsList>
        <TabsTrigger value="categories">Categories</TabsTrigger>
        <TabsTrigger value="live">Live Streams</TabsTrigger>
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
