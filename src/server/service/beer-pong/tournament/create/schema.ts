import { z } from "zod";
import { BeerPongTournamentAccessSchema } from "../../schema";

export const CreateBeerPongTournamentInputSchema = z.object({
  access: BeerPongTournamentAccessSchema,
  name: z.string(),
  randomTeams: z.boolean(),
  thildeExclusive: z.boolean(),
  bronzeFinal: z.boolean(),
  maxParticipants: z.number().int().positive().nullable(),
});

export type CreateBeerPongTournamentInput = z.infer<
  typeof CreateBeerPongTournamentInputSchema
>;
