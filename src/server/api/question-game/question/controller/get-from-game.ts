import { Controller } from '~/server/api/trpc';

import { db } from '~/server/db';
import { z } from 'zod';
import { protectedProcedure } from '~/server/api/trpc';
import { TRPCError } from '@trpc/server';

const QuestionSchema = z.object({
  id: z.number(),
  question: z.string(),
});

const InputSchema = z.object({
  questionGameId: z.number(),
});

const OutputSchema = z.object({
  questions: z.array(QuestionSchema),
});

const handler: Controller<
  z.infer<typeof InputSchema>,
  z.infer<typeof OutputSchema>
> = async ({ input, ctx }) => {
  const questions = await db.question.findMany({
    where: {
      id: input.questionGameId,
    },
  })

  if (!questions) {
    throw new TRPCError({
      message: "Ingen spørsmål funnet",
      code: "NOT_FOUND",
    });
  }

  return {
    questions: questions,
  }
};

export default protectedProcedure
  .input(InputSchema)
  .output(OutputSchema)
  .query(handler);