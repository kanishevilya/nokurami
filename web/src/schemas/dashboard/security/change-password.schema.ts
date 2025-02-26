import * as z from "zod";

export const changePasswordSchema = z.object({
    oldPassword: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .max(100, "Password is too long"),
    newPassword: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .max(100, "Password is too long"),
});

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>; 