import { AppearanceSettings } from "./AppearanceSettings";
import { LanguageSettings } from "./LanguageSettings";
import { Heading } from "@/components/ui/items/Heading";
import { Separator } from "@/components/ui/shadcn/Separator";
import { useTranslations } from "next-intl";

const AppearanceLanguageSettings = () => {
  const t = useTranslations("settings");

  return (
    <div className="flex flex-col gap-6">
      <Heading
        title={t("appearance")}
        description={t("appearanceDescription")}
        size="lg"
      />
      <AppearanceSettings />
      <Separator />
      <LanguageSettings />
    </div>
  );
};

export default AppearanceLanguageSettings;
