import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import TournamentSummaryDetails from "../../components/tournament/tournament-details";
import JoinTournamentForm from "../../components/tournament/join-tournament/form";
import Link from "next/link";
import { api } from "../../trpc/server";
import { AppRouterOutput } from "../../server/api/root";
import { EmptyCard } from "../../components/ui/empty-card";
import LogoSmall from '~/components/logo-small';

export default async function BrowseTournamentsPage() {
  const publicTournaments = await api.beerPong.tournament.getAllPublic();
  const ownedTournaments = await api.beerPong.tournament.getOwned();

  return (
    <main className="mx-auto flex h-[calc(100svh-70px)] w-full max-w-sm flex-col justify-between px-4">
      <div className="flex w-full flex-col items-start justify-between overflow-y-auto">
        <div className="mb-2 ml-2 mt-8 text-2xl font-bold">
          Mine turneringer
        </div>
        <div className="flex w-full max-w-md flex-row flex-wrap items-center justify-start gap-2">
          {ownedTournaments.map((t) => (
            <TournamentCard tournament={t} key={t.id} />
          ))}
          {!Boolean(ownedTournaments.length) && (
            <EmptyCard
              title={"Ingen eide turneringer"}
              description={"Lag en ny nå!"}
            />
          )}
        </div>
        <div className="mb-2 ml-2 mt-8 text-2xl font-bold">
          Åpne turneringer
        </div>
        <div className="flex w-full max-w-md flex-col items-center justify-start gap-2">
          {publicTournaments.map((t) => (
            <TournamentCard tournament={t} key={t.id} />
          ))}
          {!Boolean(ownedTournaments.length) && (
            <EmptyCard
              title={"Ingen offentlige turneringer"}
              description={"Kanskje du trenger en PIN-kode?"}
            />
          )}
        </div>
      </div>
      <div className="flex flex-col justify-end gap-4">
        <div className="flex w-full flex-col items-start justify-end">
          <div className="mb-2 ml-2 mt-4 text-lg font-bold">
            Join med PIN-kode
          </div>
          <JoinTournamentForm />
        </div>
        <Button
          asChild
          className="mb-4 h-20 w-full max-w-md text-4xl font-bold text-white"
        >
          <Link href="/beer-pong/create">Lag ny</Link>
        </Button>
      </div>
    </main>
  );
}

export interface TournameCardProps {
  tournament: AppRouterOutput["beerPong"]["tournament"]["getAllPublic"][number];
}

function TournamentCard({ tournament }: TournameCardProps) {
  return (
    <Link href={`/beer-pong/${tournament.id}`} className="w-fit">
      <Card className="flex h-24 gap-2 flex-col px-2 py-2 w-full">
        <div className="flex justify-between w-full">
          <div className="h-fit text-lg font-bold">{tournament.name}</div>
          <LogoSmall className="w-fit"></LogoSmall>
        </div>
        <TournamentSummaryDetails tournament={tournament} />
        <div className="border h-20 mt-1"></div>
      </Card>
    </Link>
  );
}
