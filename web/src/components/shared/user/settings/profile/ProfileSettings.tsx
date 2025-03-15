import { Heading } from "@/components/ui/items/Heading";
import { Separator } from "@/components/ui/shadcn/Separator";
import { Card, CardContent } from "@/components/ui/shadcn/Card";
import { AvatarChangeForm } from "./avatar/AvatarChangeForm";
import { ProfileInfoChangeForm } from "./information/ProfileInfoChangeForm";
import { SocialLinksForm } from "./links/SocialLinkForm";
import { ChangePreviewForm } from "./stream-info/ChangePreviewForm";
import { ChangeStreamInfoForm } from "./stream-info/ChangeStreamInfoForm";
import { useTranslations } from "next-intl";

export function ProfileSettings() {
  const t = useTranslations("settings");

  return (
    <div className="flex flex-col gap-6">
      <Heading
        title={t("profile")}
        description={t("profileDescription")}
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
