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
      <TabsContent value="categories">
        <DirectoryCategoryPage />
      </TabsContent>
      <TabsContent value="live">
        <DirectoryLiveStreamsPage />
      </TabsContent>
    </Tabs>
  );
}
