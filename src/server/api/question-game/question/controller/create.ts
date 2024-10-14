import { z } from "zod";
import { adminProcedure, Controller } from '~/server/api/trpc';
import { InputSchema, OutputSchema } from "../schema/create";
import { db } from "~/server/db";

const handler: Controller<
  z.infer<typeof InputSchema>,
  z.infer<typeof OutputSchema>
> = async ({input, ctx}) => {

  const question = await db.question.create({
    data: {
      question: input.question,
      questionGameId: input.questGameId
    },
    select: {
      id: true
    }
  });

  return {
    questionId: question.id
  }
}

export default adminProcedure
  .input(InputSchema)
  .output(OutputSchema)
  .mutation(handler);


