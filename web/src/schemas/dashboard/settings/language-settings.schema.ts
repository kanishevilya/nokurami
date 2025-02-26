import { z } from "zod";
import { languages } from "@/libs/i18n/config";


export const languageSettingsSchema = z.object({
    language: z.enum(languages),
});

export type LanguageSettingsFormData = z.infer<typeof languageSettingsSchema>;
