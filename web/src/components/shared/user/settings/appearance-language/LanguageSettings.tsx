"use client";

import { useLocale, useTranslations } from "next-intl";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { setLanguage } from "@/libs/i18n/language";
import { FormWrapper } from "@/components/ui/items/FormWrapper";
import { Skeleton } from "@/components/ui/shadcn/Skeleton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/shadcn/Form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/shadcn/Select";
import { Globe } from "lucide-react";
import {
  LanguageSettingsFormData,
  languageSettingsSchema,
} from "@/schemas/dashboard/settings/language-settings.schema";

const languages = {
  en: "English",
  ru: "Русский",
};

export function LanguageSettings() {
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();

  const form = useForm<LanguageSettingsFormData>({
    resolver: zodResolver(languageSettingsSchema),
    values: {
      language: locale as LanguageSettingsFormData["language"],
    },
  });

  const handleLanguageChange = (values: LanguageSettingsFormData) => {
    startTransition(async () => {
      try {
        await setLanguage(values.language);
      } catch (error) {
        toast.success("Language updated successfully");
      }
    });
  };

  return (
    <FormWrapper
      heading="Language"
      id="language-settings"
      description="Select your preferred language for the interface"
    >
      {isPending ? (
        <LanguageSettingsSkeleton />
      ) : (
        <div className="p-6">
          <Form {...form}>
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <Select
                  defaultValue={field.value}
                  onValueChange={(value) => {
                    field.onChange(value);
                    form.handleSubmit(handleLanguageChange)();
                  }}
                >
                  <SelectTrigger className="w-full">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      <SelectValue placeholder="Select language" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(languages).map(([code, name]) => (
                      <SelectItem
                        key={code}
                        value={code}
                        disabled={isPending}
                        className="cursor-pointer"
                      >
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </Form>
        </div>
      )}
    </FormWrapper>
  );
}

function LanguageSettingsSkeleton() {
  return (
    <div className="p-6">
      <Skeleton className="h-10 w-full rounded" />
    </div>
  );
}
