import { z } from "zod";

export const socialLinkSchema = z.object({
    title: z.string().nonempty("Title is required"),
    url: z.string().url("Must be a valid URL").nonempty("URL is required"),
});

export type SocialLinkFormData = z.infer<typeof socialLinkSchema>;