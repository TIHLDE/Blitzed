import { db } from "~/server/db";
import { SelectBeerPongMatchWinnerInput } from "./schema";

export const selectBeerPongMatchWinner = async ({
  matchId,
  winnerTeamId,
  tournamentId,
}: SelectBeerPongMatchWinnerInput): Promise<void> => {
  await db.beerPongMatch.update({
    where: {
      id_tournamentId: {
        id: matchId,
        tournamentId: tournamentId,
      },
    },
    data: {
      winner: {
        connect: {
          id: winnerTeamId,
        },
      },
    },
  });
};
