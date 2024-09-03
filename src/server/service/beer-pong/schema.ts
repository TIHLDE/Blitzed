import { z } from "zod";

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

export const BeerPongTournamentAccessSchema = z.enum(["PUBLIC", "PIN"]);

/**
 * The access level for a beer pong tournament, designated by the creator
 */
export type BeerPongTournamentAccess = z.infer<
  typeof BeerPongTournamentAccessSchema
>;
