import { db } from "~/server/db";
import type { CreateBeerPongTeamInput } from "./schema";

export const createBeerPongTeam = async (
  input: CreateBeerPongTeamInput,
): Promise<string> => {
  const team = await db.beerPongTeam.create({
    data: {
      name: input.teamName,
      tournament: {
        connect: {
          id: input.tournamentId,
        },
      },
    },
    select: {
      id: true,
    },
  });

  return team.id;
};
