"use client";

import { useParams } from "next/navigation";
import { Card, CardHeader, CardTitle } from "../../../components/ui/card";

export interface Team {
  name: string;
  players: string[];
  wins?: number;
}
const teams: Team[] = [
  {
    name: "Embret sitt lag",
    players: ["Embret", "Mori", "Henrik", "Eirik"],
    wins: 3,
  },
  {
    name: "Henrik sitt lag",
    players: ["Henrik", "Mori", "Eirik", "Embret"],
    wins: 7,
  },
  {
    name: "Mori sitt lag",
    players: ["Henrik", "Mori", "Eirik", "Embret"],
    wins: 10,
  },
  {
    name: "Frida sitt lag",
    players: ["Henrik", "Mori", "Eirik", "Embret"],
    wins: 1,
  },
  {
    name: "Jarand sitt lag",
    players: ["Henrik", "Mori", "Eirik", "Embret"],
    wins: 15,
  },
];

export default function ResultsPage() {
  const { id } = useParams();
  const sortedTeams = teams.sort((a, b) => (a.wins || 0) - (b.wins || 0));

  return (
    <main className="[calc(100svh-70px)] mx-auto flex w-full max-w-xl flex-col items-center justify-center px-4">
      <div className="flex w-full flex-col items-center justify-center">
        <div className="mb-1 mt-4">My tournament title</div>
        <div className="text-3xl font-bold">Resultater</div>
        <Podium teams={sortedTeams} />
        <Losers teams={sortedTeams} />
      </div>
    </main>
  );
}

function TeamCard({ team, place }: { team: Team; place: number }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex flex-col items-start gap-2">
          <CardTitle className={"font-medium"}>
            #{place.toString()} {team.name}
          </CardTitle>
        </div>
      </CardHeader>
    </Card>
  );
}

function Losers({ teams }: { teams: Team[] }) {
  return (
    <div className="mt-4 flex w-full flex-col gap-4">
      {teams.slice(3).map((team, index) => (
        <TeamCard key={index} team={team} place={index + 4} />
      ))}
    </div>
  );
}

function Podium({ teams }: { teams: Team[] }) {
  return (
    <div
      className={
        "mt-12 flex h-96 w-full flex-row items-end justify-between gap-2"
      }
    >
      <div className="flex h-[70%] flex-1 flex-col items-center justify-end gap-2">
        <div className={"font-bold"}>{teams[1].name}</div>
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
        <div className={"text-center font-bold"}>{teams[0].name}</div>
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
        <div className={"font-bold"}>{teams[2].name}</div>
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
