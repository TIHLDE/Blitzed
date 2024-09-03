import { db } from "~/server/db";

export const getBeerPongTeamBYId = async (id: string) => {
  const team = await db.beerPongTeam.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      members: {
        include: {
          user: true,
        },
      },
    },
  });

  return {
    ...team,
    members: team.members.map((mem) => ({
      id: mem.id,
      nickname: mem.user.nickname,
    })),
  };
};
