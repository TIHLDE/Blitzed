import { adminProcedure, Controller } from "~/server/api/trpc";
import { ManyInputSchema, ManyOutputSchema } from "../schema/create";
import { db } from "~/server/db";
import { z } from "zod";
import type { Prisma } from "@prisma/client";

const handler: Controller<
  z.infer<typeof ManyInputSchema>,
  z.infer<typeof ManyOutputSchema>
> = async ({ input }) => {
  const created = await db.$transaction(async (tx: Prisma.TransactionClient) => {
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

    return (tx.question.findMany({
      where: {
        questionGameId: input.questGameId,
        question: {
          in: input.questions,
        },
      },
      select: { id: true },
    })) as Promise<{ id: number }[]>;
  });

  return {
    questionIds: created.map((q: { id: number }) => q.id),
  };
};

export default adminProcedure
  .input(ManyInputSchema)
  .output(ManyOutputSchema)
  .mutation(handler);
