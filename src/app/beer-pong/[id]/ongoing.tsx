"use server";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../components/ui/carousel";
import { AppRouterOutput } from "../../../server/api/root";
import { cn } from "../../../util/tailwind-cn";

interface MatchCardProps {
  match: AppRouterOutput["beerPong"]["tournament"]["get"]["matches"][number];
}

function MatchCard({ match }: MatchCardProps) {
  const maxTeamNameLength = 29;

  return (
    <div className="flex h-24 text-xs min-[400px]:text-sm min-[440px]:text-base min-[500px]:text-lg">
      <div
        className={
          "flex h-full w-full border-[1px] " +
          (match.team1?.id == match.winnerTeam?.id
            ? "bg-green-600"
            : "bg-auto") +
          " items-center justify-center text-wrap rounded-l-md p-1 text-center"
        }
      >
        {(match.team1?.name?.length ?? 0 > maxTeamNameLength)
          ? match.team1!.name.slice(0, maxTeamNameLength) + "..."
          : match.team1!.name}
      </div>
      <div
        className={cn([
          "flex h-full w-full items-center justify-center overflow-hidden text-wrap break-all rounded-r-md border-[1px] p-1 text-center",
          match.team2?.id == match.winnerTeam?.id ? "bg-green-600" : "bg-auto",
        ])}
      >
        {(match.team2?.name?.length ?? 0 > maxTeamNameLength)
          ? match.team2!.name.slice(0, maxTeamNameLength) + "..."
          : match.team2!.name}
      </div>
    </div>
  );
}

interface TeamCardProps {
  team: AppRouterOutput["beerPong"]["tournament"]["get"]["teams"][number];
}

async function TeamCard({ team }: TeamCardProps) {
  return (
    <div className="flex max-h-60 w-full flex-col rounded-md border-[1px] p-2">
      <div className="truncate font-bold">{team.name}</div>
      <div className="truncate">
        {team.members.reduce(
          (p, c, i) =>
            p + (i == team.members.length - 1 ? " og " : ", ") + c.nickname,
          "",
        )}
      </div>
    </div>
  );
}

interface MatchPagesProps {
  matches: AppRouterOutput["beerPong"]["tournament"]["get"]["matches"];
}

async function MatchPages({ matches }: MatchPagesProps) {
  const pagesAmount = Math.floor(Math.log2(matches.length)) + 1;
  return (
    <>
      {Array.from({ length: pagesAmount }, (i) => i).map((_, i) => {
        return (
          <CarouselItem
            className={"mt-10 flex basis-1/2 flex-col justify-evenly gap-2"}
            key={i.toString()}
          >
            <h1 className="absolute top-2 self-center whitespace-nowrap font-bold">
              Runde {i + 1}{" "}
            </h1>
            {matches
              .filter((_) => _.round == i + 1)
              .map((t) => (
                <MatchCard match={t} key={1}></MatchCard>
              ))}
          </CarouselItem>
        );
      })}
    </>
  );
}

export interface ActivePageProps {
  tournament: AppRouterOutput["beerPong"]["tournament"]["get"];
}

export default async function ActivePage({ tournament }: ActivePageProps) {
  return (
    <div className={"w-screen"}>
      <div className="mx-auto max-w-2xl">
        <div className="mt-2 text-center text-xl font-bold">
          {tournament.name}
        </div>
        <div>
          <Carousel
            className="my-10 overflow-hidden px-10"
            opts={{ align: "start" }}
          >
            <CarouselPrevious />
            <CarouselContent>
              <MatchPages matches={tournament.matches} />
            </CarouselContent>
            <CarouselNext />
          </Carousel>
          <div className="mt-5 flex w-full flex-col gap-5 px-4">
            {tournament.teams.slice(1).map((t) => (
              <TeamCard team={t} key={t.name} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
