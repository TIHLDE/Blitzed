import { Controller } from "~/server/api/trpc";

import { db } from "~/server/db";
import { z } from "zod";
import { protectedProcedure } from "~/server/api/trpc";
import { BeerPongTournamentStatusSchema } from "../../enum";

const InputSchema = z.undefined();

const OutputSchema = z.array(
  z.object({
    id: z.string(),
    creatorNickname: z.string(),
    teamCount: z.number(),
    playerCount: z.number(),
    createdAt: z.date(),
    status: BeerPongTournamentStatusSchema,
    name: z.string(),
  }),
);

const handler: Controller<
  z.infer<typeof InputSchema>,
  z.infer<typeof OutputSchema>
> = async ({ input, ctx }) => {
  const tournaments = await db.beerPongTournament.findMany({
    where: {
      creator: {
        id: ctx.session.user.id,
      },
    },
    include: {
      _count: {
        select: {
          teams: true,
        },
      },
      creator: true,
      teams: {
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

  return tournaments.map((t) => ({
    name: t.name,
    id: t.id,
    creatorNickname: t.creator.nickname,
    createdAt: t.createdAt,
    status: t.status,
    teamCount: t._count.teams,
    playerCount: t.teams.reduce((acc, team) => acc + team._count.members, 0),
  }));
};

export default protectedProcedure
  .input(InputSchema)
  .output(OutputSchema)
  .query(handler);
