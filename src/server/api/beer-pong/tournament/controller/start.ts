import { Controller } from "~/server/api/trpc";

import { db } from "~/server/db";
import { z } from "zod";
import { protectedProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { generateMatches } from "../helper/generate_matches";
import { assertHasTournamentControl } from "../../middleware";

const InputSchema = z.object({
  tournamentId: z.string().cuid(),
});

const OutputSchema = z.void();

const handler: Controller<
  z.infer<typeof InputSchema>,
  z.infer<typeof OutputSchema>
> = async ({ input, ctx }) => {
  assertHasTournamentControl({ ctx, tournamentId: input.tournamentId });

  const tournament = await db.beerPongTournament.findUniqueOrThrow({
    where: {
      id: input.tournamentId,
    },
    select: {
      status: true,
      teams: {
        select: {
          id: true,
        },
      },
    },
  });

  if (tournament.status !== "CREATED") {
    throw new TRPCError({
      message: "Turneringen har allerede startet",
      code: "CONFLICT",
    });
  }

  const matches = generateMatches(tournament.teams.map((team) => team.id));

  await db.beerPongTournament.update({
    where: {
      id: input.tournamentId,
    },
    data: {
      status: "ACTIVE",
    },
  });

  await db.beerPongMatch.createMany({
    data: matches.map((match) => ({
      id: match.matchId,
      tournamentId: input.tournamentId,
      round: match.round,
      team1Id: match.team1Id,
      team2Id: match.team2Id,
      nextMatchId: match.nextMatchId,
    })),
  });
};

export default protectedProcedure
  .input(InputSchema)
  .output(OutputSchema)
  .mutation(handler);
