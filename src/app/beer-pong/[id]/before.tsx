"use client";

import { CreateTeamDialog } from "../../../components/tournament/create-team-dialog";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { AppRouterOutput } from "../../../server/api/root";
import { api } from "../../../trpc/react";
import { useParams } from "next/navigation";
import { cn } from "../../../util/tailwind-cn";
import { useSession } from "next-auth/react";

interface TeamCardProps {
  team: AppRouterOutput["beerPong"]["tournament"]["get"]["teams"][number];
  refetchTournament: () => void;
}

function TeamCard({ team, refetchTournament }: TeamCardProps) {
  const { mutateAsync: joinTeam } = api.beerPong.team.join.useMutation({
    onSuccess: refetchTournament,
  });
  const { id } = useParams();
  const { data } = useSession();
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <div className="flex flex-col items-start gap-1">
          <CardTitle>{team.name}</CardTitle>
          <CardDescription>
            {team.members.map((m) => (
              <div>{m.nickname}</div>
            ))}
          </CardDescription>
        </div>
        <Button
          className={cn(
            "z-50 mt-[0px!important]",
            team.members.some((m) => m.id == data?.user.id) ? "hidden" : "",
          )}
          variant={"outline"}
          onClick={() =>
            joinTeam({
              teamId: team.id,
              tournamentId: id as string,
            })
          }
        >
          Bli med
        </Button>
      </CardHeader>
    </Card>
  );
}

export interface BeforePageProps {
  tournament: AppRouterOutput["beerPong"]["tournament"]["get"];
  refetchTournament: () => void;
}

export default function BeforePage({
  tournament,
  refetchTournament,
}: BeforePageProps) {
  const { mutateAsync: startTournament } =
    api.beerPong.tournament.start.useMutation({ onSuccess: refetchTournament });

  return (
    <div className="mx-auto w-screen max-w-sm">
      <main className="flex w-full flex-col items-center justify-between gap-4 px-2">
        <div className="flex w-full flex-row items-center justify-between">
          <div className="flex w-full flex-col justify-center">
            <div className="mb-1 mt-4 text-xl">{tournament.name}</div>
            <div className="mb-4 flex flex-row items-center justify-between">
              {Boolean(tournament.pinCode) && (
                <div className="text-3xl font-bold">
                  Kode: {tournament.pinCode}
                </div>
              )}
            </div>
            <CreateTeamDialog refetchTournament={refetchTournament} />
          </div>
        </div>
        <div className="flex h-full w-full flex-col gap-2">
          {tournament.teams.map((t) => (
            <TeamCard
              team={t}
              key={t.name}
              refetchTournament={refetchTournament}
            />
          ))}
        </div>
        <Button
          className="mb-4 h-20 w-full max-w-md text-4xl font-bold text-white"
          onClick={() => startTournament({ tournamentId: tournament.id })}
        >
          Start!
        </Button>
      </main>
    </div>
  );
}
