import { db } from "~/server/db";
import { TRPCError } from "@trpc/server";

export default async function startBeerPongTournament(
  id: string,
): Promise<void> {
  const tournament = await db.beerPongTournament.findUniqueOrThrow({
    where: {
      id,
    },
  });

  if (tournament.status !== "CREATED") {
    throw new TRPCError({
      message: "Tournament is already started",
      code: "FORBIDDEN",
    });
  }

  await db.beerPongTournament.update({
    where: {
      id,
    },
    data: {
      status: "ACTIVE",
    },
  });
}
