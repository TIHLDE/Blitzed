"use client";

import { User as UserIcon, Award, Users as TeamIcon } from "lucide-react";
import { AppRouterOutput } from "../../server/api/root";

interface TournamentCardProps {
  tournament: AppRouterOutput["beerPong"]["tournament"]["getAllPublic"][number];
}

export default function TournamentSummaryDetails(props: TournamentCardProps) {
  return (
    <div className="flex gap-3 text-end h-fit gap-3">
            <span className="gap-1 text-xs font-medium flex">
              <TeamIcon className="h-[0.9rem] w-fit"/> <p> {props.tournament.playerCount} deltakere </p>
            </span>
            <div className="gap-1 text-xs font-medium flex">
              <Award className="h-[0.9rem] w-fit"/> <p> {props.tournament.teamCount} lag </p>
            </div>
    </div>
  );
}
