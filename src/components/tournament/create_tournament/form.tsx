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
import formSchema from "./schema";

export function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tournamentName: "",
      randomTeams: false,
      thildeExclusive: false,
      bronzeFinal: false,
      maxParticipants: false,
      maxParticipantsNumber: 8,
      privateTournament: false,
    },
  });
  const maxParticipantsWatch = form.watch("maxParticipants", false);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-4"
      >
        <FormField
          control={form.control}
          name="tournamentName"
          render={({ field }) => (
            <FormItem>
              <FormLabel></FormLabel>
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
            <FormItem className="flex flex-row items-center justify-between gap-4 p-4">
              <div className="">
                <FormLabel className="text-base">Tilfeldige lag?</FormLabel>
                <FormDescription>
                  Alle spillere blir fordelt på tilfeldige lag
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
            <FormItem className="flex flex-row items-center justify-between gap-4 p-4">
              <div className="">
                <FormLabel className="text-base">THILDE-exclusive?</FormLabel>
                <FormDescription>
                  Bare THILDE-medlemmer kan delta
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
          name="bronzeFinal"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between gap-4 p-4">
              <div className="">
                <FormLabel className="text-base">Bronsefinale?</FormLabel>
                <FormDescription>
                  Arranger bronsefinale for de som taper semifinalen
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
          name="maxParticipants"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between gap-4 p-4">
              <div className="">
                <FormLabel className="text-base">Max Spillere?</FormLabel>
                <FormDescription>
                  Begrens antall spillere som kan delta
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
        {maxParticipantsWatch && (
          <FormField
            control={form.control}
            name="maxParticipantsNumber"
            render={({ field }) => (
              <FormItem className="m-[0px!important] flex flex-col items-start justify-between gap-2 space-y-0 pl-4 pr-4">
                <div className="flex w-full items-center justify-between">
                  <FormLabel className="text-lg text-white">Max: </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="8"
                      {...field}
                      className="h-16 w-20 text-center text-4xl"
                    />
                  </FormControl>
                </div>

                <FormMessage className="" />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="privateTournament"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between gap-4 p-4">
              <div className="">
                <FormLabel className="text-base">Privat turnering?</FormLabel>
                <FormDescription>Kun invitasjoner kan delta</FormDescription>
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
