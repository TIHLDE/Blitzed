import { Button } from "~/components/ui/button";
import GameLinkCard from "../../components/ui/game-link-card";
import { api } from "../../trpc/server";
import Link from "next/link";

export default async function QuestionGamesPage() {
  const games = await api.questionGame.game.getAll();

  return (
    <div className="mt-6 min-h-[100svh] space-y-4">
      <Button asChild>
        <Link
          href="/question-game/create"
        >
          Opprett spill
        </Link>
      </Button>
      <div className="grid grid-cols-2 gap-6">
        {games.map((g) => (
          <GameLinkCard
            title={g.title}
            img={g.imageUrl}
            url={`/question-game/${g.id}`}
          />
        ))}
      </div>
    </div>
  );
}
