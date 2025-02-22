import { Heading } from "@/components/ui/items/Heading";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/shadcn/Tabs";

export function UserDashboardSettings() {
  return (
    <div className="lg:px-10">
      <Heading
        title={"Settings"}
        description={"Manage your account settings and preferences"}
        size="lg"
      />
      <Tabs defaultValue="profile" className="mt-3 w-full">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
          <TabsTrigger value="appearance">Appearance & Language</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">Profile</TabsContent>
        <TabsContent value="security">Security</TabsContent>
        <TabsContent value="notifications">Notifications</TabsContent>
        <TabsContent value="sessions">Sessions</TabsContent>
        <TabsContent value="appearance">Appearance & Language</TabsContent>
      </Tabs>
    </div>
  );
}
