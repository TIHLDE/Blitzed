/**
 * Compute all tournament results from a set of tournament teams joined with their matches and members
 * @param results The raw results from the database
 * @returns  The formatted results ready for UI
 */
export default function generateResults(results: TournamentResult[]): Output[] {
  const teams = results.map((result) => {
    const teamId = result.id.toString();
    const teamName = result.name;
    const wins = result.winnerMatches.length;
    const losses =
      result.team1Matches.length + result.team2Matches.length - wins;
    const matches = wins + losses;
    const players = result.members.map((member) => member.userId);
    return { teamId, teamName, wins, losses, matches, players };
  });

  const sortedTeams = teams.sort((a, b) => b.wins - a.wins);

  return sortedTeams.map((team, index) => ({ ...team, rank: index + 1 }));
}

export interface TournamentResult {
  id: number;
  name: string;
  tournamentId: string;
  team1Matches: Match[];
  team2Matches: Match[];
  winnerMatches: Match[];
  members: Member[];
}

export interface Member {
  userId: string;
  beerPongTeamId: number;
  tournamentId: string;
}

export interface Match {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  tournamentId: string;
  round: number;
  team1Id: number;
  team2Id: number;
  winnerTeamId: number;
  nextMatchId: number | null;
}

export interface Output {
  teamId: string;
  teamName: string;
  wins: number;
  losses: number;
  matches: number;
  players: string[];
  rank: number;
}
