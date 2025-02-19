import { z } from "zod";

export const loginSchema = z.object({
    login: z.string().min(1, "Введите email или имя пользователя"),
    password: z.string().min(8, "Минимальная длина пароля 8 символов"),
    pin: z.string().min(6, "Введите 6-значный код").optional(),
});

export type TypeLoginSchema = z.infer<typeof loginSchema>; 