import { db } from "../../../db";
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
    },
  });

  return tournaments.map((t) => ({
    id: t.id,
    creatorNickname: t.creator.nickname,
    teamCount: t._count.teams,
    createdAt: t.createdAt,
    status: t.status,
  }));
}
