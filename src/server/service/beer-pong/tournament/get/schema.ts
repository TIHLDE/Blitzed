import { z } from "zod";
import {
  BeerPongTournamentAccessSchema,
  BeerPongTournamentStatusSchema,
} from "../../schema";

export const BeerPongTournamentTeamSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(2).max(20),
  members: z.array(
    z.object({
      id: z.string().cuid(),
      nickname: z.string().min(2).max(20),
    }),
  ),
});

export type BeerPongTournamentTeam = z.infer<
  typeof BeerPongTournamentTeamSchema
>;

export type BeerPongTournamentTeamSummary = Pick<
  BeerPongTournamentTeam,
  "id" | "name"
>;

export const BeerPongTournamentMatchTeamSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type BeerPongTournamentMatchTeam = z.infer<
  typeof BeerPongTournamentMatchTeamSchema
>;

export const BeerPongTournamentMatchSchema = z.object({
  id: z.number().int().positive(),
  round: z.number().int().positive(),
  nextMatchId: z.number().nullable(),
  team1: BeerPongTournamentMatchTeamSchema.nullable(),
  team2: BeerPongTournamentMatchTeamSchema.nullable(),
  winnerTeamId: z.string().nullable(),
});

export type BeerPongTournamentMatch = z.infer<
  typeof BeerPongTournamentMatchSchema
>;

export const BeerPongTournamentSchema = z.object({
  id: z.string().cuid(),
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

export type BeerPongTournament = z.infer<typeof BeerPongTournamentSchema>;
