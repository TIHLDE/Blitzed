import { TRPCError } from "@trpc/server";
import type { BeerPongTournament } from "./schema";
import { db } from "~/server/db";

export default async function getBeerPongTournamentById(
  id: string,
  userId: string,
): Promise<BeerPongTournament> {
  const tournament = await db.beerPongTournament.findUnique({
    where: {
      id: id,
    },
    include: {
      creator: true,
      teams: {
        include: {
          members: {
            include: {
              user: true,
            },
          },
        },
      },
      matches: {
        include: {
          team1: true,
          team2: true,
          nextMatch: true,
        },
      },
    },
  });

  if (!tournament) {
    throw new TRPCError({
      message: "Turneringen ble ikke funnet",
      code: "NOT_FOUND",
    });
  }

  tournament.matches.sort((a, b) => a.id - b.id);

  const currentMatchId =
    tournament.matches.find((m) => !m.winnerTeamId)?.id ?? null;

  return {
    id: tournament.id,
    name: tournament.name,
    currentMatchId,
    creatorNickname: tournament.creator.nickname,
    isCreator: tournament.creatorId === userId,
    access: tournament.access,
    pinCode: tournament.pinCode,
    status: tournament.status,
    isTihldeExclusive: tournament.isTihldeExclusive,
    maxTeamCount: tournament.maxTeamCount,
    maxTeamSize: tournament.maxTeamSize,
    randomizeTeams: tournament.randomizeTeams,
    teams: tournament.teams.map((team) => ({
      id: team.id,
      name: team.name,
      members: team.members.map((mem) => ({
        id: mem.userId,
        nickname: mem.user.nickname,
      })),
    })),
    matches: tournament.matches.map((m) => ({
      id: m.id,
      team1: m.team1 && {
        id: m.team1.id,
        name: m.team1.name,
      },
      team2: m.team2 && {
        id: m.team2.id,
        name: m.team2.name,
      },
      winnerTeamId: m.winnerTeamId,
      round: m.round,
      nextMatchId: m.nextMatch?.id ?? null,
    })),
  } satisfies BeerPongTournament;
}
