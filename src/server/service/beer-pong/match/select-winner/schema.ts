import { z } from "zod";

export const SelectBeerPongMatchWinnerInputSchema = z.object({
  matchId: z.number().int().positive(),
  winnerTeamId: z.string().cuid(),
  tournamentId: z.string().cuid(),
});

export type SelectBeerPongMatchWinnerInput = z.infer<
  typeof SelectBeerPongMatchWinnerInputSchema
>;
