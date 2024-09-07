import { createTRPCRouter } from "../../trpc";
import create from "./controller/create";
import get from "./controller/get";
import destroy from "./controller/destroy";
import join from "./controller/join";

/**
 * All procedures related to beer pong tournament teams
 */
export const teamRouter = createTRPCRouter({
  create,
  get,
  destroy,
  join,
});
