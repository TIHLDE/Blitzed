import { z } from "zod";

/**
 * The current status for a beer pong tournament
 */
export const BeerPongTournamentStatusSchema = z.enum([
  "CREATED",
  "ACTIVE",
  "FINISHED",
]);

/**
 * The current status for a beer pong tournament
 */
export type BeerPongTournamentStatus = z.infer<
  typeof BeerPongTournamentStatusSchema
>;

/**
 * The access level for a beer pong tournament, designated by the creator
 */
export const BeerPongTournamentAccessSchema = z.enum(["PUBLIC", "PIN"]);

/**
 * The access level for a beer pong tournament, designated by the creator
 */
export type BeerPongTournamentAccess = z.infer<
  typeof BeerPongTournamentAccessSchema
>;
