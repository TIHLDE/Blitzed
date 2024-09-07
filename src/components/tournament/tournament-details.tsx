"use client";

import { User as UserIcon, Users as TeamIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { AppRouterOutput } from "../../server/api/root";

interface TournamentCardProps {
  tournament: AppRouterOutput["beerPong"]["tournament"]["getAllPublic"][number];
}

export default function TournamentSummaryDetails(props: TournamentCardProps) {
  return (
    <div className="flex gap-3 text-end">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <span className="flex gap-1 text-lg font-medium">
              {props.tournament.playerCount} <UserIcon />
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p>Antall deltagere</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <div className="flex gap-1 text-lg font-medium">
              {props.tournament.teamCount} <TeamIcon />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Antall lag</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
