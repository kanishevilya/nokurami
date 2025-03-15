import { Heading } from "@/components/ui/items/Heading";
import { Separator } from "@/components/ui/shadcn/Separator";
import { Card, CardContent } from "@/components/ui/shadcn/Card";
import { AvatarChangeForm } from "./avatar/AvatarChangeForm";
import { ProfileInfoChangeForm } from "./information/ProfileInfoChangeForm";
import { SocialLinksForm } from "./links/SocialLinkForm";
import { ChangePreviewForm } from "./stream-info/ChangePreviewForm";
import { ChangeStreamInfoForm } from "./stream-info/ChangeStreamInfoForm";

export function ProfileSettings() {
  return (
    <div className="flex flex-col gap-6">
      <Heading
        title="Profile"
        description="Manage your profile information"
        size="lg"
      />
      <AvatarChangeForm />
      <Separator />
      <ProfileInfoChangeForm />
      <Separator />
      <SocialLinksForm />
      <Separator />
      <ChangePreviewForm />
      <Separator />
      <ChangeStreamInfoForm />
    </div>
  );
}
