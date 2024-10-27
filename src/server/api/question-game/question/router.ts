import { createTRPCRouter } from "../../trpc";
import create from "./controller/create";
import getAll from "./controller/get-from-game";

export const questionRouter = createTRPCRouter({
    create,
    getAll
})