import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import TournamentDetails from './tournament_details';
import { Separator } from '../../components/ui/separator';
import JoinTournamentForm from '../../components/tournament/joinTournamentForm';

export default async function BrowseTournamentsPage() {
  return (
    <main className="flex flex-col justify-between items-center w-full gap-4 h-[calc(100svh-70px)] px-4">
      <div className="flex flex-col items-center justify-between w-full overflow-y-auto">
        <JoinForm />
        <div className="text-2xl ml-2 mb-2 font-bold mt-8">
          Åpne turneringer
        </div>
        <div className="flex flex-col justify-start items-center w-full max-w-md gap-2">
          {tournaments.map((t) => (
            <TournamentCard tournament={t} key={t.id} />
          ))}
        </div>
      </div>
      <Button className="w-full max-w-md h-20 text-4xl font-bold mb-4">
        Lag ny
      </Button>
    </main>
  );
}

interface TournameCardProps {
  tournament: Tournament;
}

function TournamentCard({ tournament }: TournameCardProps) {
  return (
    <Card className="flex flex-row justify-between items-center w-full px-4 py-2">
      <div className="text-2xl font-light flex h-full gap-2">
        #{tournament.id}
        <Separator orientation="vertical" className="m-0" />
      </div>
      <div className="text-xl font-bold">{tournament.name}</div>
      <TournamentDetails tournament={tournament} />
    </Card>
  );
}

export interface Tournament {
  id: string;
  numPlayers: number;
  teamCount: number;
  name: string;
}

const tournaments: Tournament[] = [
  {
    id: '8294',
    numPlayers: 7,
    teamCount: 2,
    name: 'Super tournament!',
  },
  {
    id: '8294',
    numPlayers: 7,
    teamCount: 2,
    name: 'Beer pong',
  },
];

function JoinForm() {
  return (
    <div className="flex flex-col items-center justify-start w-full">
      <div className="text-lg ml-2 mb-2 font-bold mt-4">Join med PIN-kode</div>
      <JoinTournamentForm />
    </div>
  );
}
