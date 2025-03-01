import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/shadcn/Tabs";
import { StreamsList } from "../directory/category/information/StreamsList";
import FollowingChannelsPage from "./FollowingChannelsPage";
import FollowingStreamsPage from "./FollowingStreamsPage";

export default function FollowingTabsPage() {
  return (
    <Tabs defaultValue="channels">
      <TabsList>
        <TabsTrigger value="channels">Channels</TabsTrigger>
        <TabsTrigger value="streams">Streams</TabsTrigger>
      </TabsList>
      <TabsContent className="mt-6" value="channels">
        <FollowingChannelsPage />
      </TabsContent>
      <TabsContent className="mt-6" value="streams">
        <FollowingStreamsPage />
      </TabsContent>
    </Tabs>
  );
}
