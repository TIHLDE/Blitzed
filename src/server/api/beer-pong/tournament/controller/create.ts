import { z } from "zod";
import { Controller } from "~/server/api/trpc";

import { db } from "~/server/db";
import { protectedProcedure } from "~/server/api/trpc";
import { InputSchema } from "./create-schema";

const OutputSchema = z.object({
  id: z.string(),
});

const handler: Controller<
  z.infer<typeof InputSchema>,
  z.infer<typeof OutputSchema>
> = async ({ input, ctx }) => {
  let pinCode: string | null = null;

  if (input.access === "PIN") {
    pinCode = await getUniquePinCode();
  }

  const { id } = await db.beerPongTournament.create({
    data: {
      access: input.access,
      isTihldeExclusive: input.thildeExclusive,
      maxTeamCount: input.maxTeamCount,
      maxTeamSize: input.maxTeamSize,
      randomizeTeams: input.randomTeams,
      creator: {
        connect: {
          id: ctx.session.user.id,
        },
      },
      name: input.name,
      pinCode,
      status: "CREATED",
    },
    select: {
      id: true,
    },
  });

  return { id };
};

export default protectedProcedure
  .input(InputSchema)
  .output(OutputSchema)
  .mutation(handler);

/**
 * Genrates a unique 4 digit pin code for a tournament
 *
 * Checks if the pin code is already in use and generates a new one if it is
 * @returns A unique 4 digit pin code
 */
async function getUniquePinCode() {
  let tournamentExists = false;
  let pinCode = "";

  do {
    // Generate a random 4 digit pin code
    pinCode = Math.floor(1000 + Math.random() * 9000).toString();

    // Check if the code is in use
    const existingTournament = await db.beerPongTournament.findFirst({
      where: {
        pinCode,
      },
      select: {
        id: true,
      },
    });

    tournamentExists = Boolean(existingTournament);
  } while (tournamentExists);

  return pinCode;
}
