import { Heading } from "@/components/ui/items/Heading";
import { ChangeAvatarForm } from "./AvatarChangeForm";

export function ProfileSettings() {
  return (
    <div>
      <Heading
        title="Profile"
        description="Manage your profile information"
        size="lg"
      />
      <ChangeAvatarForm />
    </div>
  );
}
