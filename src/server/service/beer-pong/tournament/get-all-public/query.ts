import { db } from "~/server/db";
import { type BeerPongTournamentSummary } from "./schema";

export default async function getAllPublicTournaments(): Promise<
  BeerPongTournamentSummary[]
> {
  const tournaments = await db.beerPongTournament.findMany({
    where: {
      access: "PUBLIC",
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
}
