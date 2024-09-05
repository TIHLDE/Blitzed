import { db } from "~/server/db";
import { TRPCError } from "@trpc/server";
import { generateMatches } from "./generate_matches";

export default async function startBeerPongTournament(
  id: string,
): Promise<void> {
  const tournament = await db.beerPongTournament.findUniqueOrThrow({
    where: {
      id,
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
      id,
    },
    data: {
      status: "ACTIVE",
    },
  });

  await db.beerPongMatch.createMany({
    data: matches.map((match) => ({
      id: match.matchId,
      tournamentId: id,
      round: match.round,
      team1Id: match.team1Id,
      team2Id: match.team2Id,
      nextMatchId: match.nextMatchId,
    })),
  });
}
