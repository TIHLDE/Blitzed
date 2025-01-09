"use client";

import { api } from "../../../trpc/react";
import BeforePage from "./before";
import ActivePage from "./ongoing";
import ResultsPage from "./results";

export default function TournamentPage({ params }: { params: { id: string } }) {
  const { data: tournament, refetch } = api.beerPong.tournament.get.useQuery(
    { id: params.id },
    { refetchInterval: 2000 },
  );

  if (!tournament) {
    return <div>Loading...</div>;
  }

  if (tournament.status === "CREATED") {
    return <BeforePage tournament={tournament} refetchTournament={refetch} />;
  } else if (tournament.status === "ACTIVE") {
    return <ActivePage tournament={tournament} />;
  }

  return <ResultsPage tournament={tournament} />;
}
