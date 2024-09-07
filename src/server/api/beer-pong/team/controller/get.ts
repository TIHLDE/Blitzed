import { Controller } from "~/server/api/trpc";

import { db } from "~/server/db";
import { z } from "zod";
import { protectedProcedure } from "../../../trpc";
import { TRPCError } from "@trpc/server";

const InputSchema = z.object({
  id: z.string(),
});

const OutputSchema = z.object({
  id: z.string(),
  name: z.string(),
  members: z.array(
    z.object({
      id: z.string(),
      nickname: z.string(),
    }),
  ),
  tournamentId: z.string(),
});

const handler: Controller<
  z.infer<typeof InputSchema>,
  z.infer<typeof OutputSchema>
> = async ({ input }) => {
  const team = await db.beerPongTeam.findUnique({
    where: {
      id: input.id,
    },
    include: {
      members: {
        include: {
          user: true,
        },
      },
    },
  });

  if (!team) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Dette laget finnes ikke",
    });
  }

  return {
    ...team,
    members: team.members.map((mem) => ({
      id: mem.userId,
      nickname: mem.user.nickname,
    })),
  };
};

export default protectedProcedure
  .input(InputSchema)
  .output(OutputSchema)
  .query(handler);
