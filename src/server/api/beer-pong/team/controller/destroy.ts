import { Controller } from "~/server/api/trpc";

import { db } from "~/server/db";
import { z } from "zod";
import { protectedProcedure } from "../../../trpc";
import { assertHasTournamentControl } from "../../middleware";

const InputSchema = z.object({
  teamId: z.number().int(),
  tournamentId: z.string().cuid(),
});

const OutputSchema = z.void();

const handler: Controller<
  z.infer<typeof InputSchema>,
  z.infer<typeof OutputSchema>
> = async ({ input, ctx }) => {
  await assertHasTournamentControl({ ctx, tournamentId: input.tournamentId });

  await db.beerPongTeam.delete({
    where: {
      id_tournamentId: {
        id: input.teamId,
        tournamentId: input.tournamentId,
      },
    },
  });
};

export default protectedProcedure
  .input(InputSchema)
  .output(OutputSchema)
  .mutation(handler);
