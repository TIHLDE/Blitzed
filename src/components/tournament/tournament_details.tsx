"use client";

import { User as UserIcon, Users as TeamIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { type Tournament } from "../../app/beer-pong/page";

interface TournamentCardProps {
  tournament: Tournament;
}

export default function TournamentDetails(props: TournamentCardProps) {
  return (
    <div className="flex gap-3 text-end">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <span className="flex gap-1 text-lg font-medium">
              {props.tournament.numPlayers} <UserIcon />
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
