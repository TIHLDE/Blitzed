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
import { AppRouterOutput } from "../../server/api/root";

interface TeamCard {
  team: AppRouterOutput["beerPong"]["tournament"]["get"]["teams"][number];
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
          {team.members.map((mem) => (
            <li key={mem.id}>{mem.nickname}</li>
          ))}
        </div>
        <DialogFooter>
          <Button type="submit">Bli med</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
