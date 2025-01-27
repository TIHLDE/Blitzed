"use client";

import { useMemo } from "react";
import { Card, CardDescription, CardTitle } from "../../../components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../components/ui/carousel";
import { AppRouterOutput } from "../../../server/api/root";
import { cn } from "../../../util/tailwind-cn";
import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { api } from "../../../trpc/react";
import { useRouter } from "next/navigation";

interface MatchCardProps {
  match: AppRouterOutput["beerPong"]["tournament"]["get"]["matches"][number];
}

const maxNameLength = 29;
const truncateName = (name?: string | null) => {
  if (!name) return "";
  return name.length > maxNameLength
    ? name.slice(0, maxNameLength) + "..."
    : name;
};

function MatchCard({ match }: MatchCardProps) {
  return (
    <div className="flex h-24 text-xs min-[400px]:text-sm min-[440px]:text-base min-[500px]:text-lg">
      <div
        className={cn(
          "flex h-full w-full border-[1px]",
          match.team1?.id == match.winnerTeam?.id ? "bg-green-600" : "bg-auto",
          "max-w-[50%] items-center justify-center overflow-hidden overflow-ellipsis text-wrap rounded-l-md p-1 text-center",
        )}
      >
        {truncateName(match.team1?.name)}
      </div>
      <div
        className={cn([
          "flex h-full w-full max-w-[50%] items-center justify-center overflow-hidden text-wrap break-all rounded-r-md border-[1px] p-1 text-center",
          match.team2?.id == match.winnerTeam?.id ? "bg-green-600" : "bg-auto",
        ])}
      >
        {truncateName(match.team2?.name)}
      </div>
    </div>
  );
}

interface MatchPagesProps {
  matches: AppRouterOutput["beerPong"]["tournament"]["get"]["matches"];
}

function MatchPages({ matches }: MatchPagesProps) {
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
              .filter((m) => m.round == i + 1)
              .map((m) => (
                <MatchCard match={m} key={1}></MatchCard>
              ))}
          </CarouselItem>
        );
      })}
    </>
  );
}

export interface TournamentProps {
  tournament: AppRouterOutput["beerPong"]["tournament"]["get"];
}

export default function ActivePage({ tournament }: TournamentProps) {
  return (
    <div className={"min-h-[100svh] w-full"}>
      <div className="mx-auto flex w-full flex-col items-center">
        <div className="mt-2 text-center text-xl font-bold">
          {tournament.name}
        </div>
        <Carousel
          className="my-10 w-full overflow-hidden px-10"
          opts={{ align: "start" }}
        >
          <CarouselPrevious />
          <CarouselContent>
            <MatchPages matches={tournament.matches} />
          </CarouselContent>
          <CarouselNext />
        </Carousel>
        <CurrentMatchCard tournament={tournament} />
      </div>
    </div>
  );
}

function CurrentMatchCard({ tournament }: TournamentProps) {
  const match = useMemo(
    () => tournament.matches.find((m) => m.id == tournament.currentMatchId),
    [tournament],
  );
  const router = useRouter();

  return (
    <>
      {Boolean(match) && (
        <Card className="flex w-full max-w-xs flex-col items-center px-4 py-2">
          <CardDescription>Nåværende kamp</CardDescription>
          <CardTitle>
            <span className="font-semibold">{match?.team1?.name}</span>
            <span className="text-base font-semibold"> mot </span>
            <span className="font-semibold">{match?.team2?.name}</span>
          </CardTitle>
          {tournament.isCreator && (
            <SelectWinnerDialog
              tournament={tournament}
              refetchTournament={() => router.refresh()}
            />
          )}
        </Card>
      )}
    </>
  );
}

interface SelectWinnerDialogProps {
  tournament: AppRouterOutput["beerPong"]["tournament"]["get"];
  refetchTournament: () => void;
}

function SelectWinnerDialog({
  refetchTournament,
  tournament,
}: SelectWinnerDialogProps) {
  const router = useRouter();
  const { mutateAsync: selectWinner } =
    api.beerPong.tournament.selectMatchWinner.useMutation({
      onSuccess: () => router.refresh(),
    });
  const match = useMemo(
    () => tournament.matches.find((m) => m.id == tournament.currentMatchId),
    [tournament],
  );

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={"outline"} className="mt-2 w-full">
          Avslutt kamp
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Velg vinneren av kampen</DialogTitle>
        <DialogDescription>
          Da går turneringen videre til neste kamp
        </DialogDescription>
        <Button
          variant={"outline"}
          onClick={() =>
            selectWinner({
              matchId: match!.id!,
              winnerTeamId: match!.team1!.id,
              tournamentId: tournament.id,
            })
          }
        >
          {match?.team1?.name}
        </Button>
        <Button
          variant={"outline"}
          onClick={() =>
            selectWinner({
              matchId: match!.id!,
              winnerTeamId: match!.team2!.id,
              tournamentId: tournament.id,
            })
          }
        >
          {match?.team2?.name}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
