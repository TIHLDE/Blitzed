import { TRPCError } from "@trpc/server";
import type { CreateBeerPongTournamentInput } from "./schema";
import { db } from "~/server/db";

export default async function createTournament(
  input: CreateBeerPongTournamentInput,
  userId: string,
): Promise<{ id: string }> {
  if (input.access === "PIN" && !input.pinCode) {
    throw new TRPCError({
      message: "Pin code is required for PIN access",
      code: "BAD_REQUEST",
    });
  }

  const { id } = await db.beerPongTournament.create({
    data: {
      access: input.access,
      creator: {
        connect: {
          id: userId,
        },
      },
      pinCode: input.pinCode,
    },
    select: {
      id: true,
    },
  });

  return { id };
}
