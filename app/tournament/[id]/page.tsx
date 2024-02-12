import Before from './before';

interface TournamentPageProps {
  params: {
    id: string;
  };
}

export default function TournamentPage(props: TournamentPageProps) {
  return <Before />;
}
