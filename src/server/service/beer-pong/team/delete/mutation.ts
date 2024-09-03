import { db } from "~/server/db";

export const deleteBeerPongTeamById = async (id: string) => {
  await db.beerPongTeam.delete({
    where: {
      id,
    },
  });
};
