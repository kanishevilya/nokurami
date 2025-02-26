import { z } from "zod";

export const appearanceSettingsSchema = z.object({
    theme: z.enum(["light", "dark"]),
});

export type AppearanceSettingsFormData = z.infer<typeof appearanceSettingsSchema>; 