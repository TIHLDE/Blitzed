import { z } from "zod";
import { BeerPongTournamentAccessSchema } from "../../schema";

export const CreateBeerPongTournamentInputSchema = z.object({
  access: BeerPongTournamentAccessSchema,
  name: z.string(),
  randomTeams: z.boolean(),
  thildeExclusive: z.boolean(),
  maxTeamCount: z.number().int().positive(),
  maxTeamSize: z.number().int().positive(),
});

export type CreateBeerPongTournamentInput = z.infer<
  typeof CreateBeerPongTournamentInputSchema
>;
