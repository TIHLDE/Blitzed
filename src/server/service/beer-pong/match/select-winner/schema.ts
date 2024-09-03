import { z } from "zod";

export const SelectBeerPongMatchWinnerInputSchema = z.object({
  matchId: z.string(),
  winnerTeamId: z.string(),
  tournamentId: z.string(),
});

export type SelectBeerPongMatchWinnerInput = z.infer<
  typeof SelectBeerPongMatchWinnerInputSchema
>;
