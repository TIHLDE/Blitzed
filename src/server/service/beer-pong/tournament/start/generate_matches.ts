import { TRPCError } from "@trpc/server";

export interface Match {
  /**
   * Tournament round (column)
   */
  round: number;

  /**
   * Unique match id (games played in this order)
   */
  matchId: number;

  /**
   * Team 1 id (null if not yet decided)
   */
  team1Id: string | null;

  /**
   * Team 2 id (null if not yet decided)
   */
  team2Id: string | null;

  /**
   * Id of the next match in the tournament (null if this is the last match)
   * The winner team will be sent to that match
   */
  nextMatchId: number | null;
}

/**
 * Generates a tournament bracket based on the provided team ids.
 * @param teamIds List of team ids to generate matches for
 * @returns An array containing the generated tournament bracket matches
 *
 * @author Henrik Kvamme
 */
export const generateMatches = (teamIds: string[]): Match[] => {
  if (teamIds.length < 2) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "At least two teams are required to generate matches.",
    });
  }

  const matchCount = teamIds.length - 1;

  let winners = 0;
  let teamsLeft = teamIds.length;
  let round = 1;
  const matches: Match[] = [];
  for (let i = 1; i <= matchCount; i++) {
    const team1Index = (i - 1) * 2;
    const team1Id = getTeam(team1Index, teamIds);
    const team2Id = getTeam(team1Index + 1, teamIds);

    if (teamsLeft === 1) {
      round += 1;
      winners -= 1;
      teamsLeft += 1;
    }

    matches.push({
      matchId: i,
      round: round,
      team1Id,
      team2Id,
      nextMatchId: null,
    });

    winners += 1;
    teamsLeft -= 2;

    if (teamsLeft <= 0) {
      round += 1;
      teamsLeft += winners;
    }
  }

  for (let i = matches.length - 1; i >= 0; i--) {
    const match = matches[i];
    const oneIndex = matches.length - i;
    let appliedNextMatch = false;
    if (match?.team1Id === null) {
      const childLeft = oneIndex * 2;
      const childLeftIndex = matches.length - childLeft;
      matches[childLeftIndex]!.nextMatchId = match.matchId;
      appliedNextMatch = true;
    }
    if (match?.team2Id === null) {
      const childRight = oneIndex * 2 + (appliedNextMatch ? 1 : 0);
      const childRightIndex = matches.length - childRight;
      matches[childRightIndex]!.nextMatchId = match.matchId;
    }
  }

  return matches;
};

const getTeam = (i: number, teamIds: string[]): string | null => {
  if (i < teamIds.length) {
    return teamIds[i] ?? null;
  }
  return null;
};
