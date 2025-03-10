import GameLinkCard from "../../components/ui/game-link-card";
import { api } from "../../trpc/server";
import { Button } from "~/components/ui/button";
import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";

export default async function QuestionGamesPage() {
  const games = await api.questionGame.game.getAll();
  const session = await getServerAuthSession();
  if (!session) {
    return redirect(`/login`);
  }

  return (
    <div className="mt-6 flex min-h-[100svh] flex-col">
      <a href="/question-game/create">
        {session.user.role == "ADMIN" && (
          <div className="flex justify-center pb-6">
            <Button variant={"outline"}> Create New </Button>
          </div>
        )}
      </a>

      {games.length == 0 && (
        <p className="mt-10 h-full text-center">Ingen spill</p>
      )}

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
