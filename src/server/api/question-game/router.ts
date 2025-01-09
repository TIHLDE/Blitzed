import { createTRPCRouter } from "../trpc";
import { gameRouter } from "./game/router";
import { questionRouter } from "./question/router";

export const questionGameRouter = createTRPCRouter({
    game: gameRouter,
    question: questionRouter
});