import GameLinkCard from "../../components/ui/game-link-card";
import { api } from "../../trpc/server";

export default async function QuestionGamesPage() {
  const games = await api.questionGame.game.getAll();

  return (
    <div className="mt-6 min-h-[100svh]">
  
      <div className="flex justify-end pb-6">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"> Create new </button>
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
