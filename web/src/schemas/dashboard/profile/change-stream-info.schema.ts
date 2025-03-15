// web/src/schemas/dashboard/stream/change-stream-info.schema.ts
import { z } from "zod";

export const changeStreamInfoSchema = z.object({
    title: z.string().max(100, "Title must be less than 100 characters"),
    categoryId: z.string().max(300, "Category must be less than 300 characters"),
});

export type ChangeStreamInfoFormData = z.infer<typeof changeStreamInfoSchema>;