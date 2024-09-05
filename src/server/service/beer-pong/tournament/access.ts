import { TRPCError } from "@trpc/server";
import { db } from "~/server/db";
import { ProcedureCtx } from "../../../api/trpc";

/**
 * Check if the user is the owner of the beer pong tournament
 */
const isBeerPongTournamentOwner = async (
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
 * Input for `assertHasTournamentControl`
 */
export interface AssertIsTournamentOwnerProps {
  tournamentId: string;
  ctx: ProcedureCtx;
}

/**
 * Throws a TRPCError if the user is not the owner of the beer pong tournament
 *
 * `TRPCError { status: FORBIDDEN }`
 */
export const assertHasTournamentControl = async ({
  tournamentId,
  ctx,
}: AssertIsTournamentOwnerProps) => {
  const isOwner = await isBeerPongTournamentOwner(
    tournamentId,
    ctx.session.user.id,
  );
  if (!isOwner && ctx.session.user.role !== "ADMIN") {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Du er ikke eieren av denne turneringen eller administrator",
    });
  }
};
