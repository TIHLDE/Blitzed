import { Controller } from "~/server/api/trpc";

import { db } from "~/server/db";
import { z } from "zod";
import { protectedProcedure } from "../../../trpc";
import { assertHasTournamentAccess } from "../../middleware";
import { TRPCError } from "@trpc/server";

const InputSchema = z.object({
  teamId: z.number().int(),
  tournamentId: z.string().cuid(),
});

const OutputSchema = z.void();

const handler: Controller<
  z.infer<typeof InputSchema>,
  z.infer<typeof OutputSchema>
> = async ({ input, ctx }) => {
  await assertHasTournamentAccess({ ctx, tournamentId: input.tournamentId });

  // Check max cap and cancel operation if reached
  const tournament = await db.beerPongTournament.findUnique({
    where: {
      id: input.tournamentId,
    },
    select: {
      maxTeamSize: true,
      teams: {
        where: {
          id: input.teamId,
        },
        select: {
          _count: {
            select: {
              members: true,
            },
          },
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

  const team = tournament.teams[0];

  if (!team) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Laget finnes ikke",
    });
  }

  if (tournament.maxTeamSize && team._count.members >= tournament.maxTeamSize) {
    throw new TRPCError({
      code: "CONFLICT",
      message: "Dette laget er allerede fullt",
    });
  }

  // If the user is already in a team, remove the link to replace it
  await db.userBeerPongTeam.deleteMany({
    where: {
      userId: ctx.session.user.id,
      tournamentId: input.tournamentId,
    },
  });

  await db.userBeerPongTeam.create({
    data: {
      beerPongTeam: {
        connect: {
          id_tournamentId: {
            id: input.teamId,
            tournamentId: input.tournamentId,
          },
        },
      },
      user: {
        connect: {
          id: ctx.session.user.id,
        },
      },
    },
  });
};

export default protectedProcedure
  .input(InputSchema)
  .output(OutputSchema)
  .mutation(handler);
