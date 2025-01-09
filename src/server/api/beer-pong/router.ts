import { createTRPCRouter } from "../trpc";
import { teamRouter } from "./team/router";
import { tournamentRouter } from "./tournament/router";

/**
 * Defines routes for the beer pong tournament game
 *
 *
 */
export const beerPongRouter = createTRPCRouter({
  team: teamRouter,
  tournament: tournamentRouter,
});
