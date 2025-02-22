import { z } from "zod";

export const loginSchema = z.object({
    login: z.string().min(1, "Введите email или имя пользователя").regex(/^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/, { message: "Username can only contain letters, numbers and dashes" }),
    password: z.string().min(8, "Минимальная длина пароля 8 символов"),
    pin: z.string().min(6, "Введите 6-значный код").optional(),
});

export type TypeLoginSchema = z.infer<typeof loginSchema>; 