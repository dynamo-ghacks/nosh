import { z } from "zod";

export const reviewSchema = z.object({
  title: z.string().min(1, "Title is required"),
  body: z.string().min(1, "Comment is required"),
  tags: z.array(z.string()),
});

export type ReviewFormData = z.infer<typeof reviewSchema>;
