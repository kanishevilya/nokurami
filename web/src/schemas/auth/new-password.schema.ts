import { z } from 'zod'

export const newPasswordSchema = z
    .object({
        newPassword: z.string().min(8),
        confirmPassword: z.string().min(8)
    })
    .refine(data => data.newPassword === data.confirmPassword, {
        path: ['confirmPassword']
    })

export type TypeNewPasswordSchema = z.infer<typeof newPasswordSchema>
