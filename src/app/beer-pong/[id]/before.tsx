"use client";

import { TeamDetailsDialog } from "../../../components/tournament/team-details-dialog";
import { CreateTeamDialog } from "../../../components/tournament/create-team-dialog";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  BeerPongTournament,
  BeerPongTournamentTeam,
} from "../../../server/service/beer-pong/tournament/get/schema";

interface TeamCardProps {
  team: BeerPongTournamentTeam;
}

function TeamCard({ team }: TeamCardProps) {
  return (
    <TeamDetailsDialog team={team}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex flex-col items-start gap-1">
            <CardTitle>{team.name}</CardTitle>
            <CardDescription>
              Antall spillere: {team.members.length}
            </CardDescription>
          </div>
          <Button className="z-50 mt-[0px!important]" variant={"outline"}>
            Bli med
          </Button>
        </CardHeader>
      </Card>
    </TeamDetailsDialog>
  );
}

export interface BeforePageProps {
  tournament: BeerPongTournament;
}

export default function BeforePage({ tournament }: BeforePageProps) {
  return (
    <div>
      <main className="flex h-[calc(100svh-70px)] w-full flex-col items-center justify-between gap-4 px-4">
        <div className="flex w-full flex-col justify-center">
          <div className="mb-1 mt-4">My tournament title</div>
          <div className="mb-4 flex flex-row items-center justify-between">
            {Boolean(tournament.pinCode) && (
              <div className="text-3xl font-bold">
                Kode: {tournament.pinCode}
              </div>
            )}
            <CreateTeamDialog />
          </div>
          <div className="flex flex-col gap-2">
            {tournament.teams.map((t) => (
              <TeamCard team={t} key={t.name} />
            ))}
          </div>
        </div>
        <Button className="mb-4 h-20 w-full max-w-md text-4xl font-bold text-foreground">
          Start!
        </Button>
      </main>
    </div>
  );
}
