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
> = async ({ ctx }) => {
  const include = {
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
  };
  const publicTournaments = await db.beerPongTournament.findMany({
    where: {
      AND: [
        {
          access: "PUBLIC",
        },
        {
          isTihldeExclusive: false,
        },
        {
          NOT: {
            creatorId: ctx.session.user.id,
          },
        },
      ],
    },
    include,
  });

  if (ctx.session.user.role === "USER") {
    const tihldeTournaments = await db.beerPongTournament.findMany({
      where: {
        AND: [
          {
            access: "PUBLIC",
            isTihldeExclusive: true,
          },
          {
            NOT: {
              creatorId: ctx.session.user.id,
            },
          },
        ],
      },
      include,
    });

    publicTournaments.push(...tihldeTournaments);
  }

  return publicTournaments.map((t) => ({
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
