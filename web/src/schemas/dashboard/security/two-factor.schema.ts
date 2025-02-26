import { z } from "zod";

export const twoFactorSchema = z.object({
    pin: z.string().length(6, "PIN must be exactly 6 digits"),
});

export type TwoFactorFormData = z.infer<typeof twoFactorSchema>; 