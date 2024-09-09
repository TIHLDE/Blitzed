import { createTRPCRouter } from "../../trpc";
import create from "./controller/create";
import destroy from "./controller/destroy";
import join from "./controller/join";

/**
 * All procedures related to beer pong tournament teams
 */
export const teamRouter = createTRPCRouter({
  /**
   * Create a new team in a beer pong tournament, and join it if the user wants to
   *
   * Throws a `TRPCError` if
   * - the max cap for teams is reached in this tournament `{ status: CONFLICT }`
   * - the user does not have tournament access `{ status: FORBIDDEN }`
   * - the tournament does not exist `{ status: NOT_FOUND }`
   */
  create,

  /**
   * Delete a beer pong tournament team
   *
   * Throws a `TRPCError` if
   * - the user does not have tournament control
   */
  destroy,

  /**
   * Join a beer pong tournament team
   *
   * If the user is already in a team, they will be moved to the new one
   *
   * Throws a `TRPCError` if
   * - the max cap for users per team is reached `{ status: CONFLICT }`
   * - the user does not have tournament access `{ status: FORBIDDEN }`
   * - the tournament or team does not exist `{ status: NOT_FOUND }`
   */
  join,
});
