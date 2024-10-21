import { Controller } from '~/server/api/trpc';

import { db } from '~/server/db';
import { z } from 'zod';
import { protectedProcedure } from '~/server/api/trpc';
import { TRPCError } from '@trpc/server';

const QuestionGameSchema = z.object({
  id: z.number(),
  title: z.string(),
})

const InputSchema = z.object({});

const OutputSchema = z.object({
  questionGames: z.array(QuestionGameSchema),
});

const handler: Controller<
  z.infer<typeof InputSchema>,
  z.infer<typeof OutputSchema>
> = async ({ input, ctx }) => {
  const questionGames = await db.questionGame.findMany({
    select: {
      id: true,
      title: true,
    },
  },)

  if (!questionGames) {
    throw new TRPCError({
      message: "Ingen spill ble funnet",
      code: "NOT_FOUND",
    });
  }

  return {
    questionGames: questionGames
  }
};

export default protectedProcedure
  .input(InputSchema)
  .output(OutputSchema)
  .query(handler);