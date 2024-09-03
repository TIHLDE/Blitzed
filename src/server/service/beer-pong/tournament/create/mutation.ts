import type { CreateBeerPongTournamentInput } from "./schema";
import { db } from "~/server/db";
import { getUniquePinCode } from "./get-unique-pin-code";

export default async function createTournament(
  input: CreateBeerPongTournamentInput,
  userId: string,
): Promise<{ id: string }> {
  let pinCode: string | null = null;

  if (input.access === "PIN") {
    pinCode = await getUniquePinCode();
  }

  const { id } = await db.beerPongTournament.create({
    data: {
      access: input.access,
      hasBronzeFinal: input.bronzeFinal,
      isTihldeExclusive: input.thildeExclusive,
      maxParticipants: input.maxParticipants,
      randomizeTeams: input.randomTeams,
      creator: {
        connect: {
          id: userId,
        },
      },
      name: input.name,
      pinCode,
      status: "CREATED",
    },
    select: {
      id: true,
    },
  });

  return { id };
}
