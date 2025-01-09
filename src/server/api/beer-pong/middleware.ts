import { TRPCError } from "@trpc/server";
import { db } from "~/server/db";
import { ProcedureCtx } from "../trpc";
import { isUserRoleTihldeOrHigher } from "../../auth";

/**
 * Input for `assertHasTournamentControl`
 */
export interface AssertIsTournamentOwnerProps {
  tournamentId: string;
  ctx: ProcedureCtx;
}

/**
 * Throws a TRPCError if the user does not have control over the tournamnet,
 * aka is admin or is tournament owner
 *
 * `TRPCError { status: FORBIDDEN }`
 */
export const assertHasTournamentControl = async ({
  tournamentId,
  ctx,
}: AssertIsTournamentOwnerProps) => {
  const tournament = await db.beerPongTournament.findUnique({
    where: {
      id: tournamentId,
    },
    select: {
      creatorId: true,
    },
  });

  if (!tournament) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Kunne ikke finne turneringen",
    });
  }

  const isOwner = tournament.creatorId === ctx.session.user.id;

  if (!isOwner && ctx.session.user.role !== "ADMIN") {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Du er ikke eieren av denne turneringen eller administrator",
    });
  }
};

/**
 * Input for `assertHasTournamentControl`
 */
export interface AssertHasTournamentAccessProps {
  tournamentId: string;
  ctx: ProcedureCtx;
}

/**
 * Throws an error if the user does not have access to the tournament
 * aka. can join the tournament or see it
 *
 * `TRPCError { status: FORBIDDEN }`
 */
export const assertHasTournamentAccess = async ({
  ctx,
  tournamentId,
}: AssertHasTournamentAccessProps) => {
  const tournament = await db.beerPongTournament.findUnique({
    where: {
      id: tournamentId,
    },
  });

  if (!tournament) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Kunne ikke finne turneringen",
    });
  }

  if (
    tournament.isTihldeExclusive &&
    !isUserRoleTihldeOrHigher(ctx.session.user.role)
  ) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Denne turneringen er kun tilgjengelig for TIHLDE-brukere",
    });
  }
};
