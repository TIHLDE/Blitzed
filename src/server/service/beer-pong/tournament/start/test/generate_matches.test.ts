import { expect, test, describe } from "vitest";
import { generateMatches } from "../generate_matches";

describe("generate random beer pong tournament matches", () => {
  test("no teams should throw", () => {
    // Arrange
    const teamIds: string[] = [];

    // Act
    const fn = () => generateMatches(teamIds);

    // Assert
    expect(fn).toThrowError();
  });

  test("one team should throw", () => {
    // Arrange
    const teamIds = ["team1"];

    // Act
    const fn = () => generateMatches(teamIds);

    // Assert
    expect(fn).toThrowError();
  });

  test("only finale for 2 teams", () => {
    // Arrange
    const teamIds = ["team1", "team2"];

    // Act
    const matches = generateMatches(teamIds);

    // Assert
    expect(matches).toHaveLength(1);
    expect(matches[0]).toEqual({
      round: 1,
      matchId: 1,
      team1Id: "team1",
      team2Id: "team2",
      nextMatchId: null,
    });
  });

  test("two games for 3 teams, move team 3 to finale automatically", () => {
    // Arrange
    const teamIds = ["team1", "team2", "team3"];

    // Act
    const matches = generateMatches(teamIds);

    // Assert
    expect(matches).toHaveLength(2);
    expect(matches[0]).toEqual({
      round: 1,
      matchId: 1,
      team1Id: "team1",
      team2Id: "team2",
      nextMatchId: 2,
    });
    expect(matches[1]).toEqual({
      round: 2,
      matchId: 2,
      team1Id: "team3",
      team2Id: null,
      nextMatchId: null,
    });
  });

  test("3 games for 4 teams", () => {
    // Arrange
    const teamIds = ["team1", "team2", "team3", "team4"];

    // Act
    const matches = generateMatches(teamIds);

    // Assert
    expect(matches).toHaveLength(3);
    expect(matches[0]).toEqual({
      matchId: 1,
      round: 1,
      team1Id: "team1",
      team2Id: "team2",
      nextMatchId: 3,
    });
    expect(matches[1]).toEqual({
      matchId: 2,
      round: 1,
      team1Id: "team3",
      team2Id: "team4",
      nextMatchId: 3,
    });
    expect(matches[2]).toEqual({
      matchId: 3,
      round: 2,
      team1Id: null,
      team2Id: null,
      nextMatchId: null,
    });
  });

  test("4 games for 5 teams", () => {
    // Arrange
    const teamIds = ["team1", "team2", "team3", "team4", "team5"];

    // Act
    const matches = generateMatches(teamIds);

    // Assert
    expect(matches).toHaveLength(4);
    expect(matches[0]).toEqual({
      matchId: 1,
      round: 1,
      team1Id: "team1",
      team2Id: "team2",
      nextMatchId: 3,
    });
    expect(matches[1]).toEqual({
      matchId: 2,
      round: 1,
      team1Id: "team3",
      team2Id: "team4",
      nextMatchId: 4,
    });
    expect(matches[2]).toEqual({
      matchId: 3,
      round: 2,
      team1Id: "team5",
      team2Id: null,
      nextMatchId: 4,
    });
    expect(matches[3]).toEqual({
      matchId: 4,
      round: 3,
      team1Id: null,
      team2Id: null,
      nextMatchId: null,
    });
  });

  test("5 games for 6 teams", () => {
    // Arrange
    const teamIds = ["team1", "team2", "team3", "team4", "team5", "team6"];

    // Act
    const matches = generateMatches(teamIds);

    // Assert
    expect(matches).toHaveLength(4);
    expect(matches[0]).toEqual({
      matchId: 1,
      round: 1,
      team1Id: "team1",
      team2Id: "team2",
      nextMatchId: 4,
    });
    expect(matches[1]).toEqual({
      matchId: 2,
      round: 1,
      team1Id: "team3",
      team2Id: "team4",
      nextMatchId: 4,
    });
    expect(matches[2]).toEqual({
      matchId: 3,
      round: 2,
      team1Id: "team5",
      team2Id: "team6",
      nextMatchId: 5,
    });
    expect(matches[3]).toEqual({
      matchId: 4,
      round: 3,
      team1Id: null,
      team2Id: null,
      nextMatchId: null,
    });
    expect(matches[4]).toEqual({
      matchId: 5,
      round: 4,
      team1Id: null,
      team2Id: null,
      nextMatchId: null,
    });
  });
});
