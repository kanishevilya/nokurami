import * as z from "zod";

export const confirmChangedEmailSchema = z.object({
    token: z.string().uuid("Invalid token format"),
    newEmail: z.string().email("Please enter a valid email address"),
});

export const changeEmailSchema = z.object({
    token: z.string().uuid("Invalid token format"),
    email: z.string().email("Please enter a valid email address"),
});

export type ConfirmChangedEmailFormData = z.infer<typeof confirmChangedEmailSchema>;
export type ChangeEmailFormData = z.infer<typeof changeEmailSchema>;