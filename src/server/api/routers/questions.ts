import { createTRPCRouter } from "~/server/api/trpc";

export const questionsRouter = createTRPCRouter({
  createGame: {},
  getGame: {},
  deleteGame: {},
});
