import OnGoing from './ongoing';

interface TournamentPageProps {
  params: {
    id: string;
  };
}

export default function TournamentPage(props: TournamentPageProps) {
  return <OnGoing />;
}
