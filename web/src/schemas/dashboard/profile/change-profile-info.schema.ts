import { z } from "zod";

export const changeProfileInfoSchema = z.object({
    username: z
        .string()
        .nonempty("Username is required")
        .regex(/^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/, "Username must contain only letters, numbers, and hyphens"),
    displayName: z.string().nonempty("Display name is required"),
    information: z.string().max(300, "Information must be less than 300 characters").default(""),
});

export type ChangeProfileInfoFormData = z.infer<typeof changeProfileInfoSchema>;