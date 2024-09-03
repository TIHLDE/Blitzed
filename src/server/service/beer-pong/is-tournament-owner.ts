import { TRPCError } from "@trpc/server";
import { db } from "~/server/db";

/**
 * Check if the user is the owner of the beer pong tournament
 */
export const isBeerPongTournamentOwner = async (
  tournamentId: string,
  userId: string,
): Promise<boolean> => {
  const tournament = await db.beerPongTournament.findUnique({
    where: {
      id: tournamentId,
    },
    select: {
      creatorId: true,
    },
  });

  if (!tournament) {
    return false;
  }

  return tournament.creatorId === userId;
};

/**
 * Throws a TRPCError if the user is not the owner of the beer pong tournament
 */
export const assertIsTournamentOwner = async (
  tournamentId: string,
  userId: string,
) => {
  const isOwner = await isBeerPongTournamentOwner(tournamentId, userId);
  if (!isOwner) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "You are not the owner of this tournament",
    });
  }
};
