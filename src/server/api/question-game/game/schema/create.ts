import { z } from "zod";

export const InputSchema = z.object({
  title: z.string().min(2).max(10),
  imageUrl: z.string().url(),
});

export const OutputSchema = z.object({
  questionGameId: z.number().int().nonnegative(),
});
