import { Controller } from "~/server/api/trpc";

import { z } from "zod";
import { protectedProcedure } from "~/server/api/trpc";
import {
  BeerPongTournamentAccessSchema,
  BeerPongTournamentStatusSchema,
} from "../../enum";
import { db } from "../../../../db";
import { TRPCError } from "@trpc/server";

const BeerPongTournamentTeamSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  members: z.array(
    z.object({
      id: z.string(),
      nickname: z.string(),
    }),
  ),
});

const BeerPongTournamentMatchTeamSchema = z.object({
  id: z.number().int(),
  name: z.string(),
});

const BeerPongTournamentMatchSchema = z.object({
  id: z.number().int().positive(),
  round: z.number().int().positive(),
  nextMatchId: z.number().nullable(),
  team1: BeerPongTournamentMatchTeamSchema.nullable(),
  team2: BeerPongTournamentMatchTeamSchema.nullable(),
  winnerTeam: BeerPongTournamentMatchTeamSchema.nullable(),
});

export const BeerPongTournamentSchema = z.object({
  id: z.string(),
  name: z.string().min(2).max(20),
  currentMatchId: z.number().nullable(),
  /**
   * Whether the current user is the creator of the tournament
   */
  isCreator: z.boolean(),
  creatorNickname: z.string(),
  access: BeerPongTournamentAccessSchema,
  pinCode: z.string().nullable(),
  status: BeerPongTournamentStatusSchema,
  teams: z.array(BeerPongTournamentTeamSchema),
  matches: z.array(BeerPongTournamentMatchSchema),
  randomizeTeams: z.boolean(),
  isTihldeExclusive: z.boolean(),
  maxTeamSize: z.number().int().positive().nullable(),
  maxTeamCount: z.number().int().positive().nullable(),
});

const InputSchema = z
  .object({
    pinCode: z.string().length(4).optional(),
    id: z.string().cuid().optional(),
    // Assert that one - and only one - is defined
  })
  .refine(({ id, pinCode }) => Boolean(id) !== Boolean(pinCode));

const OutputSchema = BeerPongTournamentSchema;

const handler: Controller<
  z.infer<typeof InputSchema>,
  z.infer<typeof OutputSchema>
> = async ({ input, ctx }) => {
  const tournament = await db.beerPongTournament.findUnique({
    where: {
      id: input.id,
      pinCode: input.pinCode,
    },
    include: {
      creator: true,
      teams: {
        include: {
          members: {
            include: {
              user: true,
            },
          },
        },
      },
      matches: {
        include: {
          team1: true,
          team2: true,
          winner: true,
          nextMatch: true,
        },
      },
    },
  });

  if (!tournament) {
    throw new TRPCError({
      message: "Turneringen ble ikke funnet",
      code: "NOT_FOUND",
    });
  }

  tournament.matches.sort((a, b) => a.id - b.id);

  const currentMatchId =
    tournament.matches.find((m) => !m.winnerTeamId)?.id ?? null;

  return {
    id: tournament.id,
    name: tournament.name,
    currentMatchId,
    creatorNickname: tournament.creator.nickname,
    isCreator: tournament.creatorId === ctx.session.user.id,
    access: tournament.access,
    pinCode: tournament.pinCode,
    status: tournament.status,
    isTihldeExclusive: tournament.isTihldeExclusive,
    maxTeamCount: tournament.maxTeamCount,
    maxTeamSize: tournament.maxTeamSize,
    randomizeTeams: tournament.randomizeTeams,
    teams: tournament.teams.map((team) => ({
      id: team.id,
      name: team.name,
      members: team.members.map((mem) => ({
        id: mem.userId,
        nickname: mem.user.nickname,
      })),
    })),
    matches: tournament.matches.map((m) => ({
      id: m.id,
      team1: m.team1 && {
        id: m.team1.id,
        name: m.team1.name,
      },
      team2: m.team2 && {
        id: m.team2.id,
        name: m.team2.name,
      },
      winnerTeam: m.winner,
      round: m.round,
      nextMatchId: m.nextMatch?.id ?? null,
    })),
  } satisfies z.infer<typeof OutputSchema>;
};

export default protectedProcedure
  .input(InputSchema)
  .output(OutputSchema)
  .query(handler);
