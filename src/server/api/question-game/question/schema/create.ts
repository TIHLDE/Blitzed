import { z } from "zod";

export const InputSchema = z.object({
    question: z.string(),
    questGameId: z.number().nonnegative(),
});

export const OutputSchema = z.object({
    questionId: z.number().int().nonnegative()
});