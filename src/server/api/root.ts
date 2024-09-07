import {
  createCallerFactory,
  createTRPCRouter,
  ProcedureCtx,
} from "~/server/api/trpc";
import { beerPongRouter } from "./beer-pong/router";

/**
 * This is the primary router
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  beerPong: beerPongRouter,
});

/**
 * Type definitions of the root app router
 *
 * Can be used to infer input and output types of all procedures
 */
export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
