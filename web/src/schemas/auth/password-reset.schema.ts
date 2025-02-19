import { z } from "zod";

export const resetPasswordSchema = z.object({
    email: z.string().email().min(3, { message: 'Email must be at least 3 characters long' }),
});

export type TypeResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
