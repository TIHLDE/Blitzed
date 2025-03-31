import { z } from "zod";

export const InputSchema = z.object({
  question: z.string(),
  questGameId: z.number().int().nonnegative(),
});

export const OutputSchema = z.object({
  questionId: z.number().int().nonnegative(),
});

export const ManyInputSchema = z.object({
  questions: z.array(z.string()),
  questGameId: z.number().int().nonnegative(),
});

export const ManyOutputSchema = z.object({
  questionIds: z.array(z.number()),
});
