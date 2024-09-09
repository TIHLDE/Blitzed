import { Controller } from "~/server/api/trpc";

import { db } from "~/server/db";
import { z } from "zod";
import { protectedProcedure } from "~/server/api/trpc";
import { assertHasTournamentControl } from "../../middleware";

const InputSchema = z.object({
  tournamentId: z.string().cuid(),
});

const OutputSchema = z.void();

const handler: Controller<
  z.infer<typeof InputSchema>,
  z.infer<typeof OutputSchema>
> = async ({ input, ctx }) => {
  await assertHasTournamentControl({ tournamentId: input.tournamentId, ctx });
  await db.beerPongTournament.delete({
    where: {
      id: input.tournamentId,
    },
  });
};

export default protectedProcedure
  .input(InputSchema)
  .output(OutputSchema)
  .mutation(handler);
