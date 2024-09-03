import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import getAllPublicBeerPongTournaments from "~/server/service/beer-pong/tournament/get-all-public/query";
import { BeerPongTournamentSummarySchema } from "~/server/service/beer-pong/tournament/get-all-public/schema";
import { BeerPongTournamentSchema } from "~/server/service/beer-pong/tournament/get/schema";
import getBeerPongTournamentById from "~/server/service/beer-pong/tournament/get/by-id-query";
import getBeerPongTournamentByPin from "~/server/service/beer-pong/tournament/get/by-pin-query";
import { CreateBeerPongTournamentInputSchema } from "~/server/service/beer-pong/tournament/create/schema";
import createBeerPongTournament from "~/server/service/beer-pong/tournament/create/mutation";
import deleteBeerPongTournamentById from "~/server/service/beer-pong/tournament/delete/mutation";
import { assertIsTournamentOwner } from "~/server/service/beer-pong/is-tournament-owner";
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

export const beerPongRouter = createTRPCRouter({
  getAllPublicTournaments: protectedProcedure
    .output(z.array(BeerPongTournamentSummarySchema))
    .query(getAllPublicBeerPongTournaments),

  getTournamentById: protectedProcedure
    .input(z.string())
    .output(BeerPongTournamentSchema)
    .query(({ input, ctx }) =>
      getBeerPongTournamentById(input, ctx.session.user.id),
    ),

  getTournamentByPin: protectedProcedure
    .input(z.string())
    .output(BeerPongTournamentSchema)
    // use mutation to make it easier to use in the frontend
    .mutation(({ input, ctx }) =>
      getBeerPongTournamentByPin(input, ctx.session.user.id),
    ),

  createTournament: protectedProcedure
    .input(CreateBeerPongTournamentInputSchema)
    .output(z.object({ id: z.string() }))
    .mutation(({ input, ctx }) => {
      if (ctx.session.user.role === "ANONYMOUS") {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Anonymous users cannot create a tournament",
        });
      }

      return createBeerPongTournament(input, ctx.session.user.id);
    }),

  deleteTournamentById: protectedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      await assertIsTournamentOwner(ctx.session.user.id, input);
      return deleteBeerPongTournamentById(input);
    }),

  startTournamentById: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      await assertIsTournamentOwner(ctx.session.user.id, input);
      await startBeerPongTournament(input);
    }),

  getTournamentResults: protectedProcedure
    .input(
      z.object({
        tournamentId: z.string(),
      }),
    )
    .output(z.array(BeerPongTournamentTeamResultSchema))
    .query(async ({ ctx, input }) => {
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
          code: "FORBIDDEN",
          message: "Tournament is not finished",
        });
      }

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
      await assertIsTournamentOwner(ctx.session.user.id, input.tournamentId);
      await selectBeerPongMatchWinner(input.matchId, input.winnerTeamId);
    }),
});
