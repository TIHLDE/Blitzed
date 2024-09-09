import { createTRPCRouter } from "../../trpc";
import create from "./controller/create";
import destroy from "./controller/destroy";
import get from "./controller/get";
import getAllPublic from "./controller/get-all-public";
import getOwned from "./controller/get-owned";
import getResults from "./controller/get-results";
import selectMatchWinner from "./controller/select-match-winner";
import start from "./controller/start";

/**
 * Procedures related to beer pong tournaments
 */
export const tournamentRouter = createTRPCRouter({
  /**
   * Create a new beer pong tournament
   *
   * The user that calls this endpoint will have tournament control
   *
   * Throws a `TRPCError` if
   * - the user is anonymous `{ status: UNAUTHORIZED }`
   */
  create,

  /**
   * Destroy a tournament
   *
   * Throws a `TRPCError` if
   * - the user does not have control over the tournament
   *   `{ status: FORBIDDEN }`
   */
  destroy,

  /**
   * Get a full beer pong tournament by its id or PIN code
   *
   * Specify either an id OR a pin code. Sending neither or both produces an error
   *
   * Should be used to display the tournament page to the user
   * while in "CREATED" or "ACTIVE" status
   *
   * For results with podium, use `getResults`
   *
   * Throws a `TRPCError` if
   * - the tournament is not found (id or wrong pin) `{ status: NOT_FOUND }`
   * - the tournament is only available to TIHLDE users,
   * - id and pin are sent, or none at all `{ status: BAD_REQUEST }`
   *   and the user does not meet this requirement `{ status: FORBIDDEN }`
   */
  get,

  /**
   * Get all public/open beer pong tournaments
   *
   * Shows all tournaments that are available to the current user
   */
  getAllPublic,

  /**
   * Get all owned tournaments (the ones you have created)
   */
  getOwned,

  /**
   * Retrieve a tournament's results
   *
   * This endpoint is only available for tournaments that are finished
   *
   * Throws a `TRPCError` if
   * - the tournament is not finished `{ status: PRECONDITION_FAILED }`
   * - the tournament does not exist `{ status: NOT_FOUND }`
   * - the user does not have tournament access `{ status: FORBIDDEN }`
   */
  getResults,

  /**
   * Start a beer pong tournament
   *
   * Should be called after all teams have been setup, and everyone is ready.
   * Can only be used by a person with tournament control
   *
   * This procedure uses the settings sent by the `create` endpoint to generate matches,
   * then sets the status to ACTIVE.
   *
   * Current status and matches can be retrieved using the `get` procedure as usual, populating
   * the matches array that was previously empty
   *
   * Throws a `TRPCError` if
   * - the tournament is already started `{ status: CONFLICT }`
   * - the the user does not have tournament control `{ status: FORBIDDEN }`
   * - there are less than two teams in the tournament `{ status: PRECONDITION_FAILED }`
   * - the tournament does not exist `{ status: NOT_FOUND }`
   */
  start,

  /**
   * Decide which team won in a beer pong tournament match
   *
   * The winner advances to the next round, and the next game is started
   *
   * Throws a `TRPCError` if
   * - the tournament is not active `{ status: CONFLICT }`
   * - the user does not have tournament control `{ status: FORBIDDEN }`
   * - the tournament or match does not exist `{ status: NOT_FOUND }`
   */
  selectMatchWinner,
});
