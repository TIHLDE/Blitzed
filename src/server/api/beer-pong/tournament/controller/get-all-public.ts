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

type TournamentRow = {
  id: string;
  name: string;
  createdAt: Date;
  status: z.infer<typeof BeerPongTournamentStatusSchema>;
  creator: { nickname: string };
  _count: { teams: number };
  teams: { _count: { members: number } }[];
};

const handler: Controller<
  z.infer<typeof InputSchema>,
  z.infer<typeof OutputSchema>
> = async ({ ctx }) => {
  const isTihldeUser = ctx.session.user.role === "USER";

  const tournaments = (await db.beerPongTournament.findMany({
    where: {
      access: "PUBLIC",
      isTihldeExclusive: isTihldeUser ? undefined : false,
      NOT: { creatorId: ctx.session.user.id },
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
  })) as TournamentRow[];

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
