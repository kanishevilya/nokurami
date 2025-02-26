import { AppearanceSettings } from "./AppearanceSettings";
import { LanguageSettings } from "./LanguageSettings";
import { Heading } from "@/components/ui/items/Heading";
import { Separator } from "@/components/ui/shadcn/Separator";

const AppearanceLanguageSettings = () => {
  return (
    <div className="flex flex-col gap-6">
      <Heading
        title="Appearance & Language"
        description="Customize your interface and language preferences"
        size="lg"
      />
      <AppearanceSettings />
      <Separator />
      <LanguageSettings />
    </div>
  );
};

export default AppearanceLanguageSettings;
