import { Controller } from "~/server/api/trpc";

import { db } from "~/server/db";
import { z } from "zod";
import { protectedProcedure } from "../../../trpc";

const InputSchema = z.object({
  teamId: z.string(),
});

const OutputSchema = z.void();

const handler: Controller<
  z.infer<typeof InputSchema>,
  z.infer<typeof OutputSchema>
> = async ({ input, ctx }) => {
  await db.userBeerPongTeam.create({
    data: {
      beerPongTeam: {
        connect: {
          id: input.teamId,
        },
      },
      user: {
        connect: {
          id: ctx.session.user.id,
        },
      },
    },
  });
};

export default protectedProcedure
  .input(InputSchema)
  .output(OutputSchema)
  .mutation(handler);
