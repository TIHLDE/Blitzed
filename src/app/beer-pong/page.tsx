import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import TournamentDetails from "../../components/tournament/tournament-details";
import { Separator } from "../../components/ui/separator";
import JoinTournamentForm from "../../components/tournament/join-tournament/form";
import Link from "next/link";
import { BeerPongTournamentSummary } from "~/server/service/beer-pong/tournament/get-all-public/schema";
import { api } from "../../trpc/server";

export default async function BrowseTournamentsPage() {
  const tournaments = await api.beerPong.getAllPublicTournaments();

  return (
    <main className="flex h-[calc(100svh-70px)] w-full flex-col items-center justify-between gap-4 px-4">
      <div className="flex w-full flex-col items-center justify-between overflow-y-auto">
        <div className="flex w-full flex-col items-center justify-start">
          <div className="mb-2 ml-2 mt-4 text-lg font-bold">
            Join med PIN-kode
          </div>
          <JoinTournamentForm />
        </div>
        <div className="mb-2 ml-2 mt-8 text-2xl font-bold">
          Åpne turneringer
        </div>
        <div className="flex w-full max-w-md flex-col items-center justify-start gap-2">
          {tournaments.map((t) => (
            <TournamentCard tournament={t} key={t.id} />
          ))}
        </div>
      </div>
      <Button asChild className="mb-4 h-20 w-full max-w-md text-4xl font-bold">
        <Link href="/beer-pong/create">Lag ny</Link>
      </Button>
    </main>
  );
}

export interface TournameCardProps {
  tournament: BeerPongTournamentSummary;
}

function TournamentCard({ tournament }: TournameCardProps) {
  return (
    <Link href={`/beer-pong/${tournament.id}`} className="w-full">
      <Card className="flex w-full flex-col items-center justify-between gap-2 px-4 py-2 sm:flex-row">
        <div className="text-lg font-bold">{tournament.name}</div>
        <TournamentDetails tournament={tournament} />
      </Card>
    </Link>
  );
}
