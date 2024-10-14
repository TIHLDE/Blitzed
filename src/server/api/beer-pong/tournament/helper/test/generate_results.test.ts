import { expect, test, describe } from "vitest";
import { generateMatches } from "../generate_matches";
import generateResults from "../generate_results";

describe("generates match results from a set of team data", () => {
  test("should generate correct", () => {
    // Arrange
    const inputs = [
      {
        id: 1,
        name: "Bruh",
        tournamentId: "cm1p61b900000aw3yxtm40ele",
        team1Matches: [
          {
            id: 1,
            createdAt: new Date("2024-10-07T16:40:03.846Z"),
            updatedAt: new Date("2024-10-07T19:28:02.959Z"),
            tournamentId: "cm1p61b900000aw3yxtm40ele",
            round: 1,
            team1Id: 1,
            team2Id: 3,
            winnerTeamId: 1,
            nextMatchId: 3,
          },
          {
            id: 3,
            createdAt: new Date("2024-10-07T16:40:03.846Z"),
            updatedAt: new Date("2024-10-07T19:32:28.995Z"),
            tournamentId: "cm1p61b900000aw3yxtm40ele",
            round: 2,
            team1Id: 1,
            team2Id: 7,
            winnerTeamId: 1,
            nextMatchId: null,
          },
        ],
        team2Matches: [],
        winnerMatches: [
          {
            id: 1,
            createdAt: new Date("2024-10-07T16:40:03.846Z"),
            updatedAt: new Date("2024-10-07T19:28:02.959Z"),
            tournamentId: "cm1p61b900000aw3yxtm40ele",
            round: 1,
            team1Id: 1,
            team2Id: 3,
            winnerTeamId: 1,
            nextMatchId: 3,
          },
          {
            id: 3,
            createdAt: new Date("2024-10-07T16:40:03.846Z"),
            updatedAt: new Date("2024-10-07T19:32:28.995Z"),
            tournamentId: "cm1p61b900000aw3yxtm40ele",
            round: 2,
            team1Id: 1,
            team2Id: 7,
            winnerTeamId: 1,
            nextMatchId: null,
          },
        ],
        members: [
          {
            userId: "cm1z6c04v0003tv7ws13xrmwn",
            beerPongTeamId: 1,
            tournamentId: "cm1p61b900000aw3yxtm40ele",
          },
          {
            userId: "cm1z6cw2l0004tv7wf4mtla1h",
            beerPongTeamId: 1,
            tournamentId: "cm1p61b900000aw3yxtm40ele",
          },
          {
            userId: "cm1z6m01o0006tv7ws2va2ll0",
            beerPongTeamId: 1,
            tournamentId: "cm1p61b900000aw3yxtm40ele",
          },
        ],
      },
      {
        id: 3,
        name: "Nytt lag",
        tournamentId: "cm1p61b900000aw3yxtm40ele",
        team1Matches: [],
        team2Matches: [
          {
            id: 1,
            createdAt: new Date("2024-10-07T16:40:03.846Z"),
            updatedAt: new Date("2024-10-07T19:28:02.959Z"),
            tournamentId: "cm1p61b900000aw3yxtm40ele",
            round: 1,
            team1Id: 1,
            team2Id: 3,
            winnerTeamId: 1,
            nextMatchId: 3,
          },
        ],
        winnerMatches: [],
        members: [
          {
            userId: "anmorill",
            beerPongTeamId: 3,
            tournamentId: "cm1p61b900000aw3yxtm40ele",
          },
          {
            userId: "cm1z6lxm80005tv7womo167kx",
            beerPongTeamId: 3,
            tournamentId: "cm1p61b900000aw3yxtm40ele",
          },
        ],
      },
      {
        id: 6,
        name: "Henriks fantastiske lag",
        tournamentId: "cm1p61b900000aw3yxtm40ele",
        team1Matches: [
          {
            id: 2,
            createdAt: new Date("2024-10-07T16:40:03.846Z"),
            updatedAt: new Date("2024-10-07T19:28:10.371Z"),
            tournamentId: "cm1p61b900000aw3yxtm40ele",
            round: 1,
            team1Id: 6,
            team2Id: 7,
            winnerTeamId: 7,
            nextMatchId: 3,
          },
        ],
        team2Matches: [],
        winnerMatches: [],
        members: [
          {
            userId: "cm1z6asgv0002tv7wcp7ol3jq",
            beerPongTeamId: 6,
            tournamentId: "cm1p61b900000aw3yxtm40ele",
          },
        ],
      },
      {
        id: 7,
        name: "Kult",
        tournamentId: "cm1p61b900000aw3yxtm40ele",
        team1Matches: [],
        team2Matches: [
          {
            id: 2,
            createdAt: new Date("2024-10-07T16:40:03.846Z"),
            updatedAt: new Date("2024-10-07T19:28:10.371Z"),
            tournamentId: "cm1p61b900000aw3yxtm40ele",
            round: 1,
            team1Id: 6,
            team2Id: 7,
            winnerTeamId: 7,
            nextMatchId: 3,
          },
          {
            id: 3,
            createdAt: new Date("2024-10-07T16:40:03.846Z"),
            updatedAt: new Date("2024-10-07T19:32:28.995Z"),
            tournamentId: "cm1p61b900000aw3yxtm40ele",
            round: 2,
            team1Id: 1,
            team2Id: 7,
            winnerTeamId: 1,
            nextMatchId: null,
          },
        ],
        winnerMatches: [
          {
            id: 2,
            createdAt: new Date("2024-10-07T16:40:03.846Z"),
            updatedAt: new Date("2024-10-07T19:28:10.371Z"),
            tournamentId: "cm1p61b900000aw3yxtm40ele",
            round: 1,
            team1Id: 6,
            team2Id: 7,
            winnerTeamId: 7,
            nextMatchId: 3,
          },
        ],
        members: [
          {
            userId: "cm1z677zr0000tv7wx8tb9mh0",
            beerPongTeamId: 7,
            tournamentId: "cm1p61b900000aw3yxtm40ele",
          },
        ],
      },
    ];

    const expected = [
      {
        teamId: "1",
        teamName: "Bruh",
        wins: 2,
        losses: 0,
        matches: 2,
        players: [
          "cm1z6c04v0003tv7ws13xrmwn",
          "cm1z6cw2l0004tv7wf4mtla1h",
          "cm1z6m01o0006tv7ws2va2ll0",
        ],
        rank: 1,
      },
      {
        teamId: "7",
        teamName: "Kult",
        wins: 1,
        losses: 1,
        matches: 2,
        players: ["cm1z677zr0000tv7wx8tb9mh0"],
        rank: 2,
      },
      {
        teamId: "3",
        teamName: "Nytt lag",
        wins: 0,
        losses: 1,
        matches: 1,
        players: ["anmorill", "cm1z6lxm80005tv7womo167kx"],
        rank: 3,
      },
      {
        teamId: "6",
        teamName: "Henriks fantastiske lag",
        wins: 0,
        losses: 1,
        matches: 1,
        players: ["cm1z6asgv0002tv7wcp7ol3jq"],
        rank: 4,
      },
    ];

    // Act
    const results = generateResults(inputs);

    // Assert
    expect(results).toEqual(expected);
  });
});
