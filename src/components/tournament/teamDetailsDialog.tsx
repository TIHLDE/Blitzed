"use client";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Label } from "~/components/ui/label";
import React, { type ReactNode } from "react";
import { type Team } from "~/app/beer-pong/[id]/before";

interface TeamCard {
  team: Team;
  children: ReactNode;
}

export function TeamDetailsDialog({ team, children }: TeamCard) {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-left">{team.name}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Label>Spillere</Label>
          {team.players.map((player) => (
            <li key={player}>{player}</li>
          ))}
        </div>
        <DialogFooter>
          <Button type="submit">Bli med</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
