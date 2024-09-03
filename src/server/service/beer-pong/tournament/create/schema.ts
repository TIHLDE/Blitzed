import { z } from "zod";
import { BeerPongTournamentAccessSchema } from "../../schema";

export const CreateBeerPongTournamentInputSchema = z.object({
  access: BeerPongTournamentAccessSchema,
  pinCode: z.string().nullable(),
});

export type CreateBeerPongTournamentInput = z.infer<
  typeof CreateBeerPongTournamentInputSchema
>;
