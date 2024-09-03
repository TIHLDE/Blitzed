import { z } from "zod";
import { BeerPongTournamentStatusSchema } from "../../schema";

export const BeerPongTournamentSummarySchema = z.object({
  id: z.string(),
  creatorNickname: z.string(),
  teamCount: z.number(),
  playerCount: z.number(),
  createdAt: z.date(),
  status: BeerPongTournamentStatusSchema,
  name: z.string(),
});

export type BeerPongTournamentSummary = z.infer<
  typeof BeerPongTournamentSummarySchema
>;
