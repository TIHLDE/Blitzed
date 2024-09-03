import { z } from "zod";

export const BeerPongTournamentTeamResultSchema = z.object({
  teamId: z.string(),
  teamName: z.string(),
  wins: z.number().int(),
  losses: z.number().int(),
  matches: z.number().int().positive(),
  players: z.array(z.string()),
  rank: z.number().int().positive(),
});

export type BeerPongTournamentTeamResult = z.infer<
  typeof BeerPongTournamentTeamResultSchema
>;
