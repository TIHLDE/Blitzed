import { TRPCError } from "@trpc/server";
import { log } from "console";

export interface Match {
  round: number;
  matchId: number;
  team1Id: string | null;
  team2Id: string | null;
  nextMatchId: number | null;
}

// ["team1", "team2", "team3"]
export const generateMatches = (teamIds: string[]): Match[] => {
  if (teamIds.length < 2) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "At least two teams are required to generate matches.",
    });
  }

  const matchCount = teamIds.length - 1;

  const array: (null | string)[] = new Array(teamIds.length + matchCount).fill(
    null,
  );

  for (let i = 1; i < teamIds.length + 1; i++) {
    const element = array[array.length - i] ?? null;
    array[array.length - i] = "team" + i;
  }

  for (let match = 1; match <= matchCount; match++) {
    const matchIndex = matchCount - match;
    const lag1index = (matchIndex + 1) * 2;
    const lag2index = (matchIndex + 1) * 2 - 1;
    console.log(
      "For match",
      match,
      "skal lag",
      array[lag1index],
      "møte lag",
      array[lag2index],
      "vinneren går til match",
      matchCount - lag1index / 2 + 2,
    );
  }

  console.log(array);

  return [];
};
