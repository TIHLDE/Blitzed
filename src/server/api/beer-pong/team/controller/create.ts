import { Controller } from "~/server/api/trpc";

import { db } from "~/server/db";
import { z } from "zod";
import { protectedProcedure } from "../../../trpc";
import { assertHasTournamentAccess } from "../../middleware";
import { TRPCError } from "@trpc/server";

const InputSchema = z.object({
  tournamentId: z.string(),
  teamName: z.string(),
  joinTeam: z.boolean().default(true),
});

const OutputSchema = z.object({
  teamId: z.number().int(),
});

const handler: Controller<
  z.infer<typeof InputSchema>,
  z.infer<typeof OutputSchema>
> = async ({ input, ctx }) => {
  await assertHasTournamentAccess({ ctx, tournamentId: input.tournamentId });

  const tournament = await db.beerPongTournament.findUnique({
    where: {
      id: input.tournamentId,
    },
    select: {
      maxTeamCount: true,
      _count: {
        select: {
          teams: true,
        },
      },
    },
  });

  if (!tournament) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Turneringen finnes ikke",
    });
  }

  if (
    tournament.maxTeamCount &&
    tournament._count.teams >= tournament.maxTeamCount
  ) {
    throw new TRPCError({
      code: "CONFLICT",
      message: "Maks antall lag er nådd for denne turneringen",
    });
  }

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
