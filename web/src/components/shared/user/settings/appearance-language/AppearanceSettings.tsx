"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "next-themes";
import { RadioGroup } from "@headlessui/react";
import { CheckIcon, Moon, Sun, Monitor } from "lucide-react";
import { toast } from "sonner";
import { FormWrapper } from "@/components/ui/items/FormWrapper";
import { Skeleton } from "@/components/ui/shadcn/Skeleton";
import { Form, FormField } from "@/components/ui/shadcn/Form";
import {
  appearanceSettingsSchema,
  type AppearanceSettingsFormData,
} from "@/schemas/dashboard/settings/appearance-settings.schema";
import { Switch } from "@/components/ui/shadcn/Switch";
import { Label } from "@/components/ui/shadcn/Label";

export function AppearanceSettings() {
  const { theme, setTheme } = useTheme();

  const form = useForm<AppearanceSettingsFormData>({
    resolver: zodResolver(appearanceSettingsSchema),
    values: {
      theme: theme === "dark" ? "dark" : "light",
    },
  });

  function onChange(value: boolean) {
    const newTheme = value ? "dark" : "light";

    setTheme(newTheme);
    form.setValue("theme", newTheme);
    toast.success("Theme updated successfully");
  }

  return (
    <FormWrapper
      heading="Appearance"
      id="appearance-settings"
      description="Customize the look and feel of the interface"
      alwaysOpen={true}
    >
      <Form {...form}>
        <div className="p-6 pt-0 space-y-6">
          <FormField
            control={form.control}
            name="theme"
            render={({ field }) => (
              <div className="flex items-center space-x-2">
                <Label className="text-xl font-medium">Dark Mode</Label>
                <Switch
                  checked={field.value === "dark"}
                  onCheckedChange={onChange}
                />
              </div>
            )}
          />
        </div>
      </Form>
    </FormWrapper>
  );
}

function AppearanceSettingsSkeleton() {
  return (
    <div className="p-6 space-y-4">
      <Skeleton className="h-16 w-full bg-gray-300 rounded" />
      <Skeleton className="h-16 w-full bg-gray-300 rounded" />
      <Skeleton className="h-16 w-full bg-gray-300 rounded" />
    </div>
  );
}
