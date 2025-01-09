import { Controller } from "~/server/api/trpc";

import { db } from "~/server/db";
import { z } from "zod";
import { protectedProcedure } from "~/server/api/trpc";
import { assertHasTournamentControl } from "../../middleware";
import { TRPCError } from "@trpc/server";
import { beerPongRouter } from "../../router";
import next from "next";

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

  const currentMatch = await db.beerPongMatch.findUniqueOrThrow({
    where: {
      id_tournamentId: {
        id: input.matchId,
        tournamentId: input.tournamentId,
      },
    },
  });

  // Update current match to be winned by winnerTeamId
  await db.beerPongMatch.update({
    where: {
      id_tournamentId: {
        id: input.matchId,
        tournamentId: input.tournamentId,
      },
    },
    data: {
      winnerTeamId: input.winnerTeamId,
    },
  });

  // If no next team, we are done
  if (!currentMatch.nextMatchId) {
    await db.beerPongTournament.update({
      where: {
        id: input.tournamentId,
      },
      data: {
        status: "FINISHED",
      },
    });
    return;
  }

  // Grab the next match by following the link
  const nextMatch = await db.beerPongMatch.findUniqueOrThrow({
    where: {
      id_tournamentId: {
        id: currentMatch!.nextMatchId!,
        tournamentId: input.tournamentId,
      },
    },
  });

  // If team1 is null, set team1 to previous winner, else fill in team2
  const teamPosition = !Boolean(nextMatch.team1Id) ? "team1" : "team2";

  // Set next match team id for the winner of the current
  await db.beerPongMatch.update({
    where: {
      id_tournamentId: {
        id: nextMatch.id,
        tournamentId: input.tournamentId,
      },
    },
    data: {
      [teamPosition]: {
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
