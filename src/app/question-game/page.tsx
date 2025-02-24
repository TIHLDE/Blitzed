import GameLinkCard from "../../components/ui/game-link-card";
import { api } from "../../trpc/server";
import { Button } from "~/components/ui/button";

export default async function QuestionGamesPage() {
  const games = await api.questionGame.game.getAll();

  return (
    <div className="mt-6 min-h-[100svh]">
  
      <div className="flex justify-end pb-3">
        <Button variant={"outline"}> Create New </Button>
      </div>
      <div className="grid grid-cols-2 gap-6">
        {games.map((g) => (
          <GameLinkCard
            key={g.id}
            title={g.title}
            img={g.imageUrl}
            url={`/question-game/${g.id}`}
          />
        ))}
      </div>
    </div>
  );
}
