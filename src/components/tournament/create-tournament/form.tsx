"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Switch } from "~/components/ui/switch";
import { api } from "../../../trpc/react";
import { useRouter } from "next/navigation";
import { InputSchema as FormSchema } from "../../../server/api/beer-pong/tournament/controller/create-schema";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { useEffect } from "react";

export function CreateTournamentForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      access: "PUBLIC",
      name: "",
      randomTeams: false,
      thildeExclusive: false,
      maxTeamCount: 5,
      maxTeamSize: 5,
    },
  });

  const {
    mutate: createTournament,
    status,
    data: tournament,
  } = api.beerPong.tournament.create.useMutation();
  const router = useRouter();

  useEffect(() => {
    if (status === "success") {
      router.replace(`/beer-pong/${tournament.id}`);
    }
  }, [status]);

  const onSubmit = (values: z.infer<typeof FormSchema>) =>
    createTournament(values);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Navn</FormLabel>
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
          name="randomTeams"
          render={({ field }) => (
            <FormItem className="mt-4 flex flex-row items-center justify-between gap-4">
              <div className="">
                <FormLabel className="text-base">
                  Tilfeldig rekkefølge?
                </FormLabel>
                <FormDescription>
                  Lagene blir satt i tilfeldig rekkefølge når kamper settes opp
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
        <FormField
          control={form.control}
          name="thildeExclusive"
          render={({ field }) => (
            <FormItem className="mt-4 flex flex-row items-center justify-between gap-4">
              <div>
                <FormLabel className="text-base">THILDE-exclusive?</FormLabel>
                <FormDescription>
                  Bare THILDE-medlemmer kan delta
                </FormDescription>
              </div>
              <FormControl className="h-20 w-20">
                <Switch
                  className="h-20 w-20"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="maxTeamSize"
          render={({ field }) => (
            <FormItem className="mt-4 flex flex-col items-start justify-between gap-2 space-y-0">
              <div className="flex w-full items-center justify-between">
                <FormLabel className="text-lg text-white">
                  Maks lagstørrelse
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="5"
                    {...field}
                    className="h-16 w-20 text-center text-4xl"
                  />
                </FormControl>
              </div>

              <FormMessage className="" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="maxTeamSize"
          render={({ field }) => (
            <FormItem className="mt-4 flex flex-col items-start justify-between gap-2 space-y-0">
              <div className="flex w-full items-center justify-between">
                <FormLabel className="text-lg text-white">
                  Maks antall spillere per lag
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="5"
                    {...field}
                    className="h-16 w-20 text-center text-4xl"
                  />
                </FormControl>
              </div>
              <FormMessage className="" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="access"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-lg font-semibold">Synlighet</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col gap-4 space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0 border-4 p-4">
                    <FormControl>
                      <RadioGroupItem value="PUBLIC" />
                    </FormControl>
                    <FormLabel className="font-normal">Åpen for alle</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="PIN" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Beskyttet med PIN kode
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full max-w-md items-center gap-4 text-center text-xl font-bold">
          <Button
            type="submit"
            className="h-full w-full bg-primary p-4 text-4xl font-bold"
          >
            Lag turnering
          </Button>
        </div>
      </form>
    </Form>
  );
}
