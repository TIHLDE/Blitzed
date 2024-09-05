import { z } from "zod";

import {
  createTRPCRouter,
  ProcedureCtx,
  protectedProcedure,
} from "~/server/api/trpc";
import getAllPublicBeerPongTournaments from "~/server/service/beer-pong/tournament/get-all-public/query";
import { BeerPongTournamentSummarySchema } from "~/server/service/beer-pong/tournament/get-all-public/schema";
import { BeerPongTournamentSchema } from "~/server/service/beer-pong/tournament/get/schema";
import getBeerPongTournamentById from "~/server/service/beer-pong/tournament/get/by-id-query";
import getBeerPongTournamentByPin from "~/server/service/beer-pong/tournament/get/by-pin-query";
import { CreateBeerPongTournamentInputSchema } from "~/server/service/beer-pong/tournament/create/schema";
import createBeerPongTournament from "~/server/service/beer-pong/tournament/create/mutation";
import { assertHasTournamentControl as assertHasTournamentControlAccess } from "~/server/service/beer-pong/tournament/access";
import startBeerPongTournament from "~/server/service/beer-pong/tournament/start/mutation";
import { CreateBeerPongTeamSchema } from "~/server/service/beer-pong/team/create/schema";
import { createBeerPongTeam } from "~/server/service/beer-pong/team/create/mutation";
import { joinBeerPongTournament } from "~/server/service/beer-pong/team/join/mutation";
import { deleteBeerPongTeamById } from "~/server/service/beer-pong/team/delete/mutation";
import { selectBeerPongMatchWinner } from "~/server/service/beer-pong/match/select-winner/mutation";
import { SelectBeerPongMatchWinnerInputSchema } from "~/server/service/beer-pong/match/select-winner/schema";
import { TRPCError } from "@trpc/server";
import { db } from "../../db";
import { BeerPongTournamentTeamResultSchema } from "../../service/beer-pong/tournament/get-results/schema";
import { deleteBeerPongTournament } from "../../service/beer-pong/tournament/delete/mutation";
import { isUserRoleTihldeOrHigher } from "../../auth";

/**
 * Routes related to the beer pong tournament game
 */
export const beerPongRouter = createTRPCRouter({
  /**
   * Get all public/open beer pong tournaments
   * This endpoint is open to all users
   */
  getAllPublicTournaments: protectedProcedure
    .output(z.array(BeerPongTournamentSummarySchema))
    .query(getAllPublicBeerPongTournaments),

  /**
   * Get a full beer pong tournament by its id
   *
   * Should be used to display the tournament page to the user
   * while in "CREATED" or "ACTIVE" status
   *
   * For results, use `getTournamentResults`
   *
   * Throws a `TRPCError` if
   * - the tournament is not found `{ status: NOT_FOUND }`
   * - the tournament is only available to TIHLDE users,
   *   and the user does not meet this requirement `{ status: FORBIDDEN }`
   */
  getTournamentById: protectedProcedure
    .input(z.string())
    .output(BeerPongTournamentSchema)
    .query(async ({ input, ctx }) => {
      const tournament = await getBeerPongTournamentById(
        input,
        ctx.session.user.id,
      );

      assertHasTournamentAccess(tournament, ctx);

      return tournament;
    }),

  /**
   * Get a full beer pong tournament by its pin
   * This is used to join a private tournament
   */
  getTournamentByPin: protectedProcedure
    .input(z.string())
    .output(BeerPongTournamentSchema)
    // use mutation to make it easier to use in the frontend
    .mutation(({ input, ctx }) =>
      getBeerPongTournamentByPin(input, ctx.session.user.id),
    ),

  /**
   * Create a new beer pong tournament
   *
   * Throws a `TRPCError` if
   * - the user is anonymous
   * `{ status: UNAUTHORIZED }`
   * - the session user is not the owner of the tournament
   *   `{ status: FORBIDDEN }`
   */
  createTournament: protectedProcedure
    .input(CreateBeerPongTournamentInputSchema)
    .output(z.object({ id: z.string() }))
    .mutation(({ input, ctx }) => {
      if (ctx.session.user.role === "ANONYMOUS") {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Anonyme brukere kan ikke opprette turneringer",
        });
      }

      return createBeerPongTournament(input, ctx.session.user.id);
    }),

  /**
   * Delete a tournament, by tournamentId
   *
   * Throws a `TRPCError` if
   * -  the session does not have control over the tournament
   *   `{ status: FORBIDDEN }`
   */
  deleteTournamentById: protectedProcedure
    .input(z.string())
    .mutation(async ({ input: tournamentId, ctx }) => {
      await assertHasTournamentControlAccess({
        userId: ctx.session.user.id,
        tournamentId,
      });

      return deleteBeerPongTournament(tournamentId);
    }),

  /**
   * Start a tournament
   *
   * Throws a `TRPCError` if
   * - the tournament is already started
   * `{ status: FORBIDDEN }`
   * - the the user is not logged in
   *   `{ status: UNAUTHENTICATED }`
   * - the the user is not the owner of the tournament
   *  `{ status: CONFLICT }`
   * - there are less than two teams in the tournament
   *  `{ status: PRECONDITION_FAILED }`
   */
  startTournament: protectedProcedure
    .input(z.object({ tournamentId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await assertHasTournamentControlAccess({
        tournamentId: input.tournamentId,
        ctx,
      });
      await startBeerPongTournament(input.tournamentId);
    }),

  /**
   * Get the results of a tournament
   *
   * Throws a `TRPCError` if
   * - the tournament is not finished
   * `{ status: PRECONDITION_FAILED }`
   * - the the user is not logged in
   *   `{ status: UNAUTHENTICATED }`
   */
  getTournamentResults: protectedProcedure
    .input(
      z.object({
        tournamentId: z.string(),
      }),
    )
    .output(z.array(BeerPongTournamentTeamResultSchema))
    .query(async ({ input, ctx }) => {
      const tournament = await db.beerPongTournament.findUniqueOrThrow({
        where: {
          id: input.tournamentId,
        },
        select: {
          status: true,
        },
      });

      if (tournament.status !== "FINISHED") {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "Turneringen er ikke ferdig enda",
        });
      }

      assertHasTournamentControlAccess({
        tournamentId: input.tournamentId,
        userId: ctx.session.user.id,
      });

      // TODO implement this
      return [];
    }),

  createTeam: protectedProcedure
    .input(CreateBeerPongTeamSchema)
    .mutation(async ({ input, ctx }) => {
      const teamId = await createBeerPongTeam(input);
      if (input.joinTeam) {
        await joinBeerPongTournament(teamId, ctx.session.user.id);
      }
    }),

  joinTeamById: protectedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      await joinBeerPongTournament(input, ctx.session.user.id);
    }),

  deleteTeamById: protectedProcedure
    .input(z.string())
    .mutation(({ input }) => deleteBeerPongTeamById(input)),

  selectWinner: protectedProcedure
    .input(SelectBeerPongMatchWinnerInputSchema)
    .mutation(async ({ ctx, input }) => {
      await assertHasTournamentControlAccess({
        tournamentId: input.tournamentId,
        ctx,
      });

      await selectBeerPongMatchWinner(input);
    }),
});
function assertHasTournamentAccess(
  tournament: {
    id: string;
    status: "CREATED" | "ACTIVE" | "FINISHED";
    isCreator: boolean;
    access: "PUBLIC" | "PIN";
    pinCode: string | null;
    isTihldeExclusive: boolean;
  },
  ctx: ProcedureCtx,
) {
  if (
    tournament.isTihldeExclusive &&
    !isUserRoleTihldeOrHigher(ctx.session.user.role)
  ) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Denne turneringen er kun tilgjengelig for TIHLDE-brukere",
    });
  }
}
