import { createTRPCRouter } from "../../trpc";
import create from "./controller/create";
import getAll from "./controller/get-from-game";
import createMany from "~/server/api/question-game/question/controller/create-many";

export const questionRouter = createTRPCRouter({
  create,
  createMany,
  getAll,
});
