import { z } from "zod";

export const chatSettingsSchema = z.object({
  isChatEnabled: z.boolean(),
  isChatFollowersOnly: z.boolean(),
});

export type ChatSettingsFormData = z.infer<typeof chatSettingsSchema>; 