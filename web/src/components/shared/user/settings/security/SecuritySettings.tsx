import { Heading } from "@/components/ui/items/Heading";
import { Separator } from "@/components/ui/shadcn/Separator";
import { Card } from "@/components/ui/shadcn/Card";
import { TwoFactorSettings } from "./two-factor/TwoFactorSettings";
import { ChangePasswordForm } from "./password/ChangePasswordForm";
import { ChangeEmailForm } from "./email-change/ChangeEmailForm";
import { useTranslations } from "next-intl";

export function SecuritySettings() {
  const t = useTranslations("settings");

  return (
    <Card className="space-y-6 p-6">
      <Heading title={t("security")} description={t("securityDescription")} />
      <Separator />
      <div className="space-y-4">
        <ChangePasswordForm />
        <ChangeEmailForm />
        <TwoFactorSettings />
      </div>
    </Card>
  );
}
