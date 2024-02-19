'use client';

import { User as UserIcon, Users as TeamIcon } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { Tournament } from '../../app/tournament/page';

interface TournamentCardProps {
  tournament: Tournament;
}

export default function TournamentDetails(props: TournamentCardProps) {
  return (
    <div className="text-end gap-3 flex">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <span className="text-lg flex gap-1 font-medium">
              {props.tournament.numPlayers} <UserIcon />
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p>Antall deltagere</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <div className="text-lg flex gap-1 font-medium">
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
