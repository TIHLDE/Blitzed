import {
  createCallerFactory,
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { beerPongRouter } from "./routers/beer-pong";
import { questionsRouter } from "./routers/questions";

/**
 * This is the primary router
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  beerPong: beerPongRouter,
  questions: questionsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
