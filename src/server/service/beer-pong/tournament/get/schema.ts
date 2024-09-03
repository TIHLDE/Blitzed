import { z } from "zod";
import {
  BeerPongTournamentAccessSchema,
  BeerPongTournamentStatusSchema,
} from "../../schema";

export const BeerPongTournamentTeamSchema = z.object({
  id: z.string(),
  name: z.string(),
  members: z.array(
    z.object({
      id: z.string(),
      nickname: z.string(),
    }),
  ),
});

export type BeerPongTournamentTeam = z.infer<
  typeof BeerPongTournamentTeamSchema
>;

export const BeerPongTournamentMatchTeamSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type BeerPongTournamentMatchTeam = z.infer<
  typeof BeerPongTournamentMatchTeamSchema
>;

export const BeerPongTournamentMatchSchema = z.object({
  id: z.string(),
  round: z.number().int().positive(),
  nextMatchId: z.string().optional(),
  team1: BeerPongTournamentMatchTeamSchema,
  team2: BeerPongTournamentMatchTeamSchema,
  winnerTeamId: z.string().nullable(),
});

export type BeerPongTournamentMatch = z.infer<
  typeof BeerPongTournamentMatchSchema
>;

export const BeerPongTournamentSchema = z.object({
  id: z.string(),
  name: z.string(),
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
});

export type BeerPongTournament = z.infer<typeof BeerPongTournamentSchema>;
