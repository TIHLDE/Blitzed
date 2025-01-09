import { z } from "zod";
import { BeerPongTournamentAccessSchema } from "../../enum";

export const InputSchema = z.object({
  access: BeerPongTournamentAccessSchema,
  name: z.string(),
  randomTeams: z.boolean(),
  thildeExclusive: z.boolean(),
  maxTeamCount: z.coerce.number().int().positive().min(2).max(10),
  maxTeamSize: z.coerce.number().int().positive().min(2).max(10),
});
