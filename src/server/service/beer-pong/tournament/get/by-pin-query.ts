import { TRPCError } from "@trpc/server";
import type { BeerPongTournament } from "./schema";
import getBeerPongTournamentById from "./by-id-query";
import { db } from "~/server/db";

export default async function getBeerPongTournamentByPin(
  id: string,
  userId: string,
): Promise<BeerPongTournament> {
  const tournament = await db.beerPongTournament.findUnique({
    where: {
      pinCode: id,
    },
    select: {
      id: true,
    },
  });

  if (!tournament) {
    throw new TRPCError({
      message: "Turneringen ble ikke funnet",
      code: "NOT_FOUND",
    });
  }

  return getBeerPongTournamentById(tournament.id, userId);
}
