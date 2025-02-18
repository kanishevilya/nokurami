import { z } from "zod"

export const createAccountSchema = z.object({
    username: z.string()
        .min(3, { message: 'Username must be at least 3 characters long' })
        .regex(/^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/),
    email: z.string().email().min(3, { message: 'Email must be at least 3 characters long' }),
    password: z.string().min(8),
})

export type TypeCreateAccountSchema = z.infer<typeof createAccountSchema>
