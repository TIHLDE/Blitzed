'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trash2Icon as DeleteIcon, PlusIcon } from 'lucide-react';
import { useState } from 'react';
import { Card } from '../ui/card';

export function CreateTeamDialog() {
  const [users, setUsers] = useState<string[]>([]);

  const handleAddUser = () => {
    const element = document.getElementById('username') as unknown as {
      value: string;
    };
    const text = element.value;
    setUsers((u) => [...u, text]);
    element.value = '';
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Opprett lag</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-left">Opprett et lag</DialogTitle>
          <DialogDescription className="text-left">
            Gi laget et navn og velg hvem som skal være med
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div>
            <Label htmlFor="name" className="text-right">
              Teamnavn
            </Label>
            <Input id="name" defaultValue="" className="mt-2" />
          </div>
          <div>
            <Label htmlFor="username" className="w-full">
              Legg til spiller
            </Label>
            <div className="flex flex-row gap-2 mt-2">
              <Input
                id="username"
                defaultValue=""
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAddUser();
                  }
                }}
              />
              <Button
                size="icon"
                variant="outline"
                className="aspect-square"
                onClick={handleAddUser}
              >
                <PlusIcon />
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-center w-full">
            {users.map((user, idx) => (
              <Card
                key={user}
                className="flex gap-2 items-center px-4 py-2 w-full"
              >
                <div>#{idx + 1}</div>
                <div className="p-2 flex-grow font-medium text-lg">{user}</div>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setUsers((u) => u.filter((_, i) => i !== idx))}
                >
                  <DeleteIcon />
                </Button>
              </Card>
            ))}
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Lagre</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
