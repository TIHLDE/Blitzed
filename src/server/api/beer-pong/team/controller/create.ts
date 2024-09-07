import { Controller } from "~/server/api/trpc";

import { db } from "~/server/db";
import { z } from "zod";
import { protectedProcedure } from "../../../trpc";

const InputSchema = z.object({
  tournamentId: z.string(),
  teamName: z.string(),
  joinTeam: z.boolean().default(true),
});

const OutputSchema = z.object({
  teamId: z.string(),
});

const handler: Controller<
  z.infer<typeof InputSchema>,
  z.infer<typeof OutputSchema>
> = async ({ input }) => {
  const team = await db.beerPongTeam.create({
    data: {
      name: input.teamName,
      tournament: {
        connect: {
          id: input.tournamentId,
        },
      },
    },
    select: {
      id: true,
    },
  });

  return {
    teamId: team.id,
  };
};

export default protectedProcedure
  .input(InputSchema)
  .output(OutputSchema)
  .mutation(handler);
