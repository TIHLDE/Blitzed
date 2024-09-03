import { db } from "~/server/db";

export default async function deleteBeerPongTournamentById(
  id: string,
): Promise<void> {
  await db.beerPongTournament.delete({
    where: {
      id: id,
    },
  });
}
