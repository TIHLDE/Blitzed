'use client';

import { useParams } from 'next/navigation';
import { Button } from '../../../components/ui/button';
import Link from 'next/link';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import { CreateTeamDialog } from './components/create_team_dialog';

interface Team {
  name: string;
  players: number;
}

const teams: Team[] = [
  {
    name: 'Embret sitt lag',
    players: 1,
  },
  {
    name: 'Henrik sitt lag',
    players: 4,
  },
];

interface TeamCardProps {
  team: Team;
}

function TeamCard({ team }: TeamCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <div className="flex flex-col gap-1">
          <CardTitle>{team.name}</CardTitle>
          <CardDescription>Antall spillere: {team.players}</CardDescription>
        </div>
        <Button className="mt-[0px!important]">Bli med</Button>
      </CardHeader>
    </Card>
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
        <Button
          asChild
          className="w-full max-w-md h-20 text-4xl font-bold mb-4"
        >
          <Link href="/tournament/create">Start!</Link>
        </Button>
      </main>
    </div>
  );
}
