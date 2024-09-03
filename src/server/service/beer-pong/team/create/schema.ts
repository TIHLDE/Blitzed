import { z } from "zod";

export const CreateBeerPongTeamSchema = z.object({
  tournamentId: z.string(),
  teamName: z.string(),
  joinTeam: z.boolean().default(true),
});

export type CreateBeerPongTeamInput = z.infer<typeof CreateBeerPongTeamSchema>;
