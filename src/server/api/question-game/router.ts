import { createTRPCRouter } from "../trpc";
import { gameRouter } from "./game/router";

export const questionGameRouter = createTRPCRouter({
    game: gameRouter
});