import Before from './before';
import ResultsPage from '@/app/tournament/[id]/results';

interface TournamentPageProps {
  params: {
    id: string;
  };
}

export default function TournamentPage(props: TournamentPageProps) {
  return <ResultsPage />;
}
