'use client';

import { TeamDetailsDialog } from '@/components/tournament/teamDetailsDialog';
import { useParams } from 'next/navigation';
import { CreateTeamDialog } from '../../../components/tournament/create_team_dialog';
import { Button } from '../../../components/ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';

export interface Team {
  name: string;
  players: string[];
  wins?: number;
}

const teams: Team[] = [
  {
    name: 'Embret sitt lag',
    players: ['Embret', 'Mori', 'Henrik', 'Eirik'],
    wins: 3,
  },
  {
    name: 'Henrik sitt lag',
    players: ['Henrik', 'Mori', 'Eirik', 'Embret'],
    wins: 7,
  },
];

interface TeamCardProps {
  team: Team;
}

function TeamCard({ team }: TeamCardProps) {
  return (
    <TeamDetailsDialog team={team}>
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <div className="flex flex-col gap-1 items-start">
            <CardTitle>{team.name}</CardTitle>
            <CardDescription>
              Antall spillere: {team.players.length}
            </CardDescription>
          </div>
          <Button className="mt-[0px!important] z-50" variant={'outline'}>
            Bli med
          </Button>
        </CardHeader>
      </Card>
    </TeamDetailsDialog>
  );
}

export default function Before() {
  const { id } = useParams();

  return (
    <div>
      <main className="flex flex-col justify-between items-center w-full gap-4 h-[calc(100svh-70px)] px-4">
        <div className="w-full flex flex-col justify-center">
          <div className="mb-1 mt-4">My tournament title</div>
          <div className="flex flex-row items-center justify-between mb-4">
            <div className="text-3xl font-bold">Kode: {id}</div>
            <CreateTeamDialog />
          </div>
          <div className="flex flex-col gap-2">
            {teams.map((t) => (
              <TeamCard team={t} key={t.name} />
            ))}
          </div>
        </div>
        <Button className="w-full max-w-md h-20 text-4xl font-bold mb-4 text-foreground">
          Start!
        </Button>
      </main>
    </div>
  );
}
