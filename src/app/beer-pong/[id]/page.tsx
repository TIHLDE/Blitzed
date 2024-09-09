import { api } from "../../../trpc/server";
import BeforePage from "./before";
import ActivePage from "./ongoing";
import ResultsPage from "./results";

export default async function TournamentPage({
  params,
}: {
  params: { id: string };
}) {
  const tournament = await api.beerPong.tournament.get({ id: params.id });

  if (tournament.status === "CREATED") {
    return <BeforePage tournament={tournament} />;
  } else if (tournament.status === "ACTIVE") {
    return <ActivePage tournament={tournament} />;
  }

  return <ResultsPage tournament={tournament} />;
}
