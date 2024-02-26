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
import { CreateTeamDialog } from '../../../components/tournament/create_team_dialog';
import { TeamDetailsDialog } from '@/components/tournament/teamDetailsDialog';

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
  {
    name: 'Mori sitt lag',
    players: ['Henrik', 'Mori', 'Eirik', 'Embret'],
    wins: 10,
  },
  {
    name: 'Frida sitt lag',
    players: ['Henrik', 'Mori', 'Eirik', 'Embret'],
    wins: 1,
  },
  {
    name: 'Jarand sitt lag',
    players: ['Henrik', 'Mori', 'Eirik', 'Embret'],
    wins: 15,
  },
];

export default function ResultsPage() {
  const { id } = useParams();
  const sortedTeams = teams.sort((a, b) => (a.wins || 0) - (b.wins || 0));

  return (
    <main className="flex flex-col justify-center items-center max-w-xl mx-auto w-full [calc(100svh-70px)] px-4">
      <div className="w-full flex flex-col justify-center items-center">
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
      <CardHeader className="flex flex-row justify-between items-center">
        <div className="flex flex-col gap-2 items-start">
          <CardTitle className={'font-medium'}>
            #{place.toString()} {team.name}
          </CardTitle>
        </div>
      </CardHeader>
    </Card>
  );
}

function Losers({ teams }: { teams: Team[] }) {
  return (
    <div className="flex flex-col gap-4 w-full mt-4">
      {teams.slice(3).map((team, index) => (
        <TeamCard key={index} team={team} place={index + 4} />
      ))}
    </div>
  );
}

function Podium({ teams }: { teams: Team[] }) {
  return (
    <div
      className={'flex mt-12 flex-row justify-between gap-2 h-96 items-end w-full'}
    >
      <div className="flex flex-col gap-2 h-[70%] justify-end items-center flex-1">
        <div className={'font-bold'}>{teams[1].name}</div>
        <div>Icon</div>
        <Card
          className={
            'bg-primary flex flex-col justify-end h-[70%] items-center pb-2 text-3xl flex-1' +
            ' w-full' +
            ' font-extrabold'
          }
        >
          #2
        </Card>
      </div>
      <div className="flex flex-col gap-2 h-full items-center justify-end flex-1">
        <div className={'text-center font-bold'}>{teams[0].name}</div>
        <div>Icon</div>
        <Card
          className={
            'bg-primary flex flex-col justify-end h-full items-center pb-2 text-5xl w-full' +
            ' font-black'
          }
        >
          #1
        </Card>
      </div>
      <div className="flex flex-col gap-2 h-[50%] flex-1 items-center justify-end">
        <div className={'font-bold'}>{teams[2].name}</div>
        <div>Icon</div>
        <Card
          className={
            'bg-primary flex flex-col justify-end h-[50%] items-center pb-2 text-2xl w-full'
          }
        >
          #3
        </Card>
      </div>
    </div>
  );
}
