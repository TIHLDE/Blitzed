'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../../../components/ui/carousel';
import { cn } from '@/lib/utils';

interface Team {
  name: string;
  players: string[];
  wins?: number;
}

interface Match {
  team1: Team;
  team2: Team;
  winner?: Team;
  round: number;
}

interface TeamCardProps {
  team: Team;
}

const teams: Team[] = [
  { name: '', players: [''] },
  {
    name: 'Anders Morille Beer Pong Fighter Gang Victorioussssssssssssssssssssssssssss',
    players: ['Ola', 'Per', 'Kari'],
  },
  {
    name: 'Det beste laget',
    players: ['Ola', 'Per', 'Kari'],
    wins: 1,
  },
  { name: 'Team 3', players: ['Ola', 'Per', 'Kari'] },
  { name: 'Team 4', players: ['Ola', 'Per', 'Kari', 'Jon', 'Jonny'] },
  { name: 'Team 5', players: ['Ola', 'Per', 'Kari', 'Jon', 'Jonny'] },
  { name: 'Team 6', players: ['Ola', 'Per', 'Kari', 'Jon', 'Jonny'] },
  { name: 'Team 7', players: ['Ola', 'Per', 'Kari', 'Jon', 'Jonny'] },
  { name: 'Team 8', players: ['Ola', 'Per', 'Kari', 'Jon', 'Jonny'] },
  { name: 'Team 9', players: ['Ola', 'Per', 'Kari', 'Jon', 'Jonny'] },
  { name: 'Team 10', players: ['Ola', 'Per', 'Kari', 'Jon', 'Jonny'] },
];
const matches: Match[] = [
  { team1: teams[1], team2: teams[2], winner: teams[1], round: 1 },
  { team1: teams[3], team2: teams[4], winner: teams[3], round: 1 },
  { team1: teams[5], team2: teams[6], winner: teams[6], round: 1 },
  { team1: teams[7], team2: teams[8], round: 1 },
  { team1: teams[1], team2: teams[3], round: 2 },
  { team1: teams[6], team2: teams[9], round: 2 },
  { team1: teams[10], team2: teams[0], round: 3 },
];
const pagesAmount = Math.floor(Math.log2(matches.length)) + 1;

export function MatchCard({ match }: { match: Match }) {
  const maxTeamNameLength = 29;
  return (
    <div className="flex h-24 min-[500px]:text-lg min-[440px]:text-base min-[400px]:text-sm text-xs">
      <div
        className={
          'flex w-full h-full border-[1px] ' +
          (match.team1 == match.winner ? 'bg-green-600' : 'bg-auto') +
          ' rounded-l-md items-center justify-center text-wrap text-center p-1'
        }
      >
        {match.team1.name.length > maxTeamNameLength
          ? match.team1.name.slice(0, maxTeamNameLength) + '...'
          : match.team1.name}
      </div>
      <div
        className={
          cn({
          'flex w-full h-full border-[1px] rounded-r-md items-center justify-center text-wrap break-all overflow-hidden text-center p-1': true,
            'bg-green-600': match.team2 == match.winner,
            'bg-auto': match.team2 != match.winner,
          })
        }
      >
        {match.team2.name.length > maxTeamNameLength
          ? match.team2.name.slice(0, maxTeamNameLength) + '...'
          : match.team2.name}
      </div>
    </div>
  );
}

function TeamCard({ team }: TeamCardProps) {
  return (
    <div className="max-h-60 border-[1px] p-2 rounded-md flex flex-col w-full">
      <div className="font-bold truncate">{team.name}</div>
      <div className="truncate">
        {team.players.reduce(
          (p, c, i) => p + (i == team.players.length - 1 ? ' og ' : ', ') + c,
        )}
      </div>
    </div>
  );
}

function MatchPages() {
  console.log('pagesAmount', pagesAmount);
  return (
    <>
      {Array.from({ length: pagesAmount }, (i) => i).map((_, i) => {
        return (
          <CarouselItem
            className={'basis-1/2 flex flex-col justify-evenly gap-2 mt-10 '}
            key={i.toString()}
          >
          <h1 className="top-2 absolute self-center font-bold whitespace-nowrap">Runde {i + 1} </h1>
            {matches
              .filter((_) => _.round == i + 1)
              .map((t) => (
                <MatchCard match={t} key={1}></MatchCard>
              ))}
          </CarouselItem>
        );
      })}
    </>
  );
}

export default function OnGoing() {
  return (
    <div className={'w-screen'}>
      <div className="max-w-2xl mx-auto">
        <div className="mt-2 text-xl font-bold text-center">
          Min turnering #4329
        </div>
        <div>
          <Carousel className="my-10 overflow-hidden px-10" opts={{ align: 'start' }}>
            <CarouselPrevious />
            <CarouselContent className="">
              <MatchPages />
            </CarouselContent>
            <CarouselNext />
          </Carousel>
          <div className="flex flex-col gap-5 w-full mt-5 px-4">
            {teams.slice(1).map((t) => (
              <TeamCard team={t} key={t.name}></TeamCard>
            ))}
          </div>
        </div>
      </div>
    </div>

  );
}
