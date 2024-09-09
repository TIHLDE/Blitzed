import { Controller } from "~/server/api/trpc";

import { z } from "zod";
import { protectedProcedure } from "~/server/api/trpc";
import { db } from "../../../../db";
import { TRPCError } from "@trpc/server";
import { assertHasTournamentAccess } from "../../middleware";

const InputSchema = z.object({
  tournamentId: z.string().cuid(),
});

const OutputSchema = z.array(
  z.object({
    teamId: z.string(),
    teamName: z.string(),
    wins: z.number().int(),
    losses: z.number().int(),
    matches: z.number().int().positive(),
    players: z.array(z.string()),
    rank: z.number().int().positive(),
  }),
);

const handler: Controller<
  z.infer<typeof InputSchema>,
  z.infer<typeof OutputSchema>
> = async ({ input, ctx }) => {
  await assertHasTournamentAccess({ ctx, tournamentId: input.tournamentId });

  const tournament = await db.beerPongTournament.findUnique({
    where: {
      id: input.tournamentId,
    },
  });

  if (!tournament) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Kunne ikke finne turneringen",
    });
  }

  if (tournament?.status !== "FINISHED") {
    throw new TRPCError({
      code: "PRECONDITION_FAILED",
      message: "Turneringen er ikke ferdig enda",
    });
  }
  // TODO implement
  return [];
};

export default protectedProcedure
  .input(InputSchema)
  .output(OutputSchema)
  .query(handler);
