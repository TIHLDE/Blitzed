import {
  createCallerFactory,
  createTRPCRouter,
  ProcedureCtx,
} from "~/server/api/trpc";
import { beerPongRouter } from "./beer-pong/router";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

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
 * Can be used to infer route type information
 */
export type AppRouter = typeof appRouter;

/**
 * Type definitions for tRPC route inputs (what is sent from the frontend)
 *
 * Useful for input type validation before calling an endpoint
 */
export type AppRouterInput = inferRouterInputs<AppRouter>;

/**
 * Type definitions for tRPC route outputs (return types)
 *
 * Useful for defining props types or similar on the frontend,
 * that is synchronized with the endpoint's type
 */
export type AppRouterOutput = inferRouterOutputs<AppRouter>;

export const createCaller = createCallerFactory(appRouter);
