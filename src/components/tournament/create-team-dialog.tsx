"use client";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { api } from "../../trpc/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormControl,
  FormMessage,
  Form,
} from "../ui/form";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Switch } from "../ui/switch";

const InputSchema = z.object({
  tournamentId: z.string(),
  teamName: z.string(),
  joinTeam: z.boolean().default(true),
});

export interface CreateTeamDialogProps {
  refetchTournament: () => void;
}

export function CreateTeamDialog({ refetchTournament }: CreateTeamDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();
  const { mutateAsync: createTeam } = api.beerPong.team.create.useMutation({
    onSuccess: refetchTournament,
  });

  const form = useForm<z.infer<typeof InputSchema>>({
    resolver: zodResolver(InputSchema),
    defaultValues: {
      teamName: "",
      joinTeam: true,
      tournamentId: id as string,
    },
  });

  const onSubmit = async (values: z.infer<typeof InputSchema>) => {
    await createTeam(values);
    setIsOpen(false);
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">Opprett lag</Button>
      </DialogTrigger>
      <DialogContent className="w-full sm:max-w-[425px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full max-w-md space-y-4"
          >
            <DialogHeader>
              <DialogTitle className="text-left">Opprett et lag</DialogTitle>
              <DialogDescription className="text-left">
                Gi laget et navn og velg hvem som skal være med
              </DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name="teamName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teamnavn</FormLabel>
                  <FormControl>
                    <Input
                      className="p-9 pl-4 pr-2 text-center text-4xl"
                      placeholder="Min turnering"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="joinTeam"
              render={({ field }) => (
                <FormItem className="mt-4 flex flex-row items-center justify-between gap-4">
                  <div>
                    <FormLabel className="text-base">
                      Bli med i laget?
                    </FormLabel>
                    <FormDescription>
                      Hvis du er med i et annet lag allerede, blir du flyttet
                      til dette laget.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Lagre</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
