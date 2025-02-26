import { Heading } from "@/components/ui/items/Heading";
import { Separator } from "@/components/ui/shadcn/Separator";
import { Card, CardContent } from "@/components/ui/shadcn/Card";
import { ChangePasswordForm } from "./ChangePasswordForm";
import { ChangeEmailForm } from "./ChangeEmailForm";

export function SecuritySettings() {
  return (
    <div className="flex flex-col gap-6">
      <Heading
        title="Security"
        description="Manage your security settings"
        size="lg"
      />
      <ChangePasswordForm />
      <Separator />
      <ChangeEmailForm />
      <Separator />
    </div>
  );
}
