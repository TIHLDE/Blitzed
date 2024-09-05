import { db } from "~/server/db";

export const deleteBeerPongTournament = async (
  tournamentId: string,
): Promise<void> => {
  await db.beerPongTournament.delete({
    where: {
      id: tournamentId,
    },
  });
};
