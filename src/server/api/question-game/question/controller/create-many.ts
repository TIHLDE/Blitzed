import { adminProcedure, Controller } from "~/server/api/trpc";
import { ManyInputSchema, ManyOutputSchema } from "../schema/create";
import { db } from "~/server/db";
import { z } from "zod";

const handler: Controller<
  z.infer<typeof ManyInputSchema>,
  z.infer<typeof ManyOutputSchema>
> = async ({ input }) => {
  const created = await db.$transaction(async (tx) => {
    await tx.question.deleteMany({
      where: {
        questionGameId: input.questGameId,
      },
    });

    await tx.question.createMany({
      data: input.questions.map((q) => ({
        question: q,
        questionGameId: input.questGameId,
      })),
    });

    return tx.question.findMany({
      where: {
        questionGameId: input.questGameId,
        question: {
          in: input.questions,
        },
      },
      select: { id: true },
    });
  });

  return {
    questionIds: created.map((q) => q.id),
  };
};

export default adminProcedure
  .input(ManyInputSchema)
  .output(ManyOutputSchema)
  .mutation(handler);
