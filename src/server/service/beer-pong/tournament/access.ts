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

export interface AssertIsTournamentOwnerProps {
  tournamentId: string;
  userId: string;
}

/**
 * Throws a TRPCError if the user is not the owner of the beer pong tournament
 *
 * `TRPCError { status: FORBIDDEN }`
 */
export const assertIsTournamentOwner = async ({
  tournamentId,
  userId,
}: AssertIsTournamentOwnerProps) => {
  const isOwner = await isBeerPongTournamentOwner(tournamentId, userId);
  if (!isOwner) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Du er ikke eieren av denne turneringen",
    });
  }
};
