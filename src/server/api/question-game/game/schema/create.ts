import { z } from "zod";

export const InputSchema = z.object({
    title: z.string()
});

export const OutputSchema = z.object({
    questionGameId: z.number().int().nonnegative()
});