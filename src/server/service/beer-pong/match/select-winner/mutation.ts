import { db } from "~/server/db";

export const selectBeerPongMatchWinner = async (
  matchId: string,
  teamId: string,
): Promise<void> => {
  await db.beerPongMatch.update({
    where: {
      id: matchId,
    },
    data: {
      winner: {
        connect: {
          id: teamId,
        },
      },
    },
  });
};
