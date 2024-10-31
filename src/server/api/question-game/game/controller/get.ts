import { Controller } from "~/server/api/trpc";

import { db } from "~/server/db";
import { z } from "zod";
import { protectedProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

const QuestionSchema = z.object({
  id: z.number(),
  question: z.string(),
});

const InputSchema = z.object({
  id: z.number().nonnegative(),
});

const OutputSchema = z.object({
  id: z.number(),
  title: z.string(),
  imageUrl: z.string().url(),
  questions: z.array(QuestionSchema),
});

const handler: Controller<
  z.infer<typeof InputSchema>,
  z.infer<typeof OutputSchema>
> = async ({ input, ctx }) => {
  const questionGame = await db.questionGame.findUnique({
    where: {
      id: input.id,
    },
    select: {
      id: true,
      title: true,
      imageUrl: true,
      questions: true,
    },
  });

  if (!questionGame) {
    throw new TRPCError({
      message: "Spillet ble ikke funnet",
      code: "NOT_FOUND",
    });
  }

  return {
    id: questionGame.id,
    title: questionGame.title,
    imageUrl: questionGame.imageUrl,
    questions: questionGame.questions,
  };
};

export default protectedProcedure
  .input(InputSchema)
  .output(OutputSchema)
  .query(handler);
