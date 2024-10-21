import { Controller } from "~/server/api/trpc";

import { db } from "~/server/db";
import { z } from "zod";
import { protectedProcedure } from "~/server/api/trpc";

const QuestionGameSchema = z.object({
  id: z.number(),
  title: z.string(),
  imageUrl: z.string(),
});

const OutputSchema = z.object({
  questionGames: z.array(QuestionGameSchema),
});

const handler: Controller<void, z.infer<typeof OutputSchema>> = async () => {
  const questionGames = await db.questionGame.findMany({
    select: {
      id: true,
      title: true,
      imageUrl: true,
    },
  });

  return {
    questionGames,
  };
};

export default protectedProcedure.output(OutputSchema).query(handler);
