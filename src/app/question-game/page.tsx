import GameLinkCard from "../../components/ui/game-link-card";
import { api } from "../../trpc/server";

export default function QuestionGamesPage() {
  const questionGame = [];

  return (
    <div className="mt-6 min-h-[100svh]">
      <div className="grid grid-cols-2 gap-6">
        <GameLinkCard
          title={"Beerpong"}
          img={"/img/beer_pong_image.jpg"}
          url={"/"}
        />
        <GameLinkCard
          title={"100 spørsmål"}
          img={
            "https://images.unsplash.com/photo-1558383409-ab7ef8db3e01?q=80&w=1786&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          url={"/question-game"}
        />
      </div>
    </div>
  );
}
