import { z } from "zod";

export const notificationSettingsSchema = z.object({
    siteNotificationsEnable: z.boolean(),
    telegramNotificationsEnable: z.boolean(),
});

export type NotificationSettingsFormData = z.infer<typeof notificationSettingsSchema>;