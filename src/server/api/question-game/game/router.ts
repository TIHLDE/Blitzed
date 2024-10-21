import { createTRPCRouter } from "../../trpc";
import create from "./controller/create";
import getAll from '~/server/api/question-game/game/controller/get-all';
import get from '~/server/api/question-game/game/controller/get';

export const gameRouter = createTRPCRouter({
    create,
    get,
    getAll
})