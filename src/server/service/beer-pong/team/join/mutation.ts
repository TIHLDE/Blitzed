import { db } from "~/server/db";

export const joinBeerPongTournament = async (
  teamId: string,
  userId: string,
) => {
  await db.userBeerPongTeam.create({
    data: {
      beerPongTeam: {
        connect: {
          id: teamId,
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
};
