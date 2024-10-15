"use client";

import { Card, CardHeader, CardTitle } from "../../../components/ui/card";
import { AppRouterOutput } from "../../../server/api/root";
import { api } from "../../../trpc/react";

export interface ResultsPageProps {
  tournament: AppRouterOutput["beerPong"]["tournament"]["get"];
}

export default function ResultsPage({ tournament }: ResultsPageProps) {
  const { data: results } = api.beerPong.tournament.getResults.useQuery({
    tournamentId: tournament.id,
  });

  if (!results) {
    return <div>Loading...</div>;
  }

  const sortedTeams = results.sort((a, b) => b.rank - a.rank);

  return (
    <main className="[calc(100svh-70px)] mx-auto flex w-full max-w-xl flex-col items-center justify-center px-4">
      <div className="flex w-full flex-col items-center justify-center">
        <div className="mb-1 mt-4">{tournament.name}</div>
        <div className="text-3xl font-bold">Resultater</div>
        <Podium teams={sortedTeams} />
        <Losers teams={sortedTeams} />
      </div>
    </main>
  );
}

type Teams = AppRouterOutput["beerPong"]["tournament"]["getResults"];

function TeamCard({ team }: { team: Teams[number] }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex flex-col items-start gap-2">
          <CardTitle className={"font-medium"}>
            #{team.teamName.toString()} {team.rank}
          </CardTitle>
        </div>
      </CardHeader>
    </Card>
  );
}

function Losers({ teams }: { teams: Teams }) {
  return (
    <div className="mt-4 flex w-full flex-col gap-4">
      {teams.slice(3).map((team, index) => (
        <TeamCard key={index} team={team} />
      ))}
    </div>
  );
}

function Podium({ teams }: { teams: Teams }) {
  const firstPlace = teams.find((team) => team.rank === 1);
  const secondPlace = teams.find((team) => team.rank === 2);
  const thirdPlace = teams.find((team) => team.rank === 3);

  return (
    <div
      className={
        "mt-12 flex h-96 w-full flex-row items-end justify-between gap-2"
      }
    >
      <div className="flex h-[70%] flex-1 flex-col items-center justify-end gap-2">
        <div className={"font-bold"}>{secondPlace?.teamName}</div>
        <div>Icon</div>
        <Card
          className={
            "flex h-[70%] flex-1 flex-col items-center justify-end bg-primary pb-2 text-3xl" +
            " w-full" +
            " font-extrabold"
          }
        >
          #2
        </Card>
      </div>
      <div className="flex h-full flex-1 flex-col items-center justify-end gap-2">
        <div className={"text-center font-bold"}>{firstPlace?.teamName}</div>
        <div>Icon</div>
        <Card
          className={
            "flex h-full w-full flex-col items-center justify-end bg-primary pb-2 text-5xl" +
            " font-black"
          }
        >
          #1
        </Card>
      </div>
      <div className="flex h-[50%] flex-1 flex-col items-center justify-end gap-2">
        <div className={"font-bold"}>{thirdPlace?.teamName}</div>
        <div>Icon</div>
        <Card
          className={
            "flex h-[50%] w-full flex-col items-center justify-end bg-primary pb-2 text-2xl"
          }
        >
          #3
        </Card>
      </div>
    </div>
  );
}
