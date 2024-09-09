import { Controller } from "~/server/api/trpc";

import { db } from "~/server/db";
import { z } from "zod";
import { protectedProcedure } from "~/server/api/trpc";
import { assertHasTournamentControl } from "../../middleware";
import { TRPCError } from "@trpc/server";

const InputSchema = z.object({
  matchId: z.number().int().positive(),
  tournamentId: z.string().cuid(),
  winnerTeamId: z.number().int(),
});

const OutputSchema = z.void();

const handler: Controller<
  z.infer<typeof InputSchema>,
  z.infer<typeof OutputSchema>
> = async ({ input, ctx }) => {
  assertHasTournamentControl({ ctx, tournamentId: input.tournamentId });

  const tournament = await db.beerPongTournament.findUnique({
    where: {
      id: input.tournamentId,
    },
    select: {
      status: true,
    },
  });

  if (!tournament) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Turneringen finnes ikke",
    });
  }

  if (tournament.status !== "ACTIVE") {
    throw new TRPCError({
      code: "CONFLICT",
      message: "Turneringen er ikke aktiv",
    });
  }

  await db.beerPongMatch.update({
    where: {
      id_tournamentId: {
        id: input.matchId,
        tournamentId: input.tournamentId,
      },
    },
    data: {
      winner: {
        connect: {
          id_tournamentId: {
            id: input.winnerTeamId,
            tournamentId: input.tournamentId,
          },
        },
      },
    },
  });
};

export default protectedProcedure
  .input(InputSchema)
  .output(OutputSchema)
  .mutation(handler);
