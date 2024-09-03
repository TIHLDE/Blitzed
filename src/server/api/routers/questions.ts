import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const questionsRouter = createTRPCRouter({
  createGame: {},
  getGame: {},
  deleteGame: {},
});
