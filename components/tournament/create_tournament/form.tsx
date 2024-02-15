'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import formSchema from './schema';

export function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tournamentName: '',
      randomTeams: false,
      thildeExclusive: false,
      bronzeFinal: false,
      maxParticipants: false,
      maxParticipantsNumber: 8,
      privateTournament: false,
    },
  });
  const maxParticipantsWatch = form.watch('maxParticipants', false);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-full max-w-md"
      >
        <FormField
          control={form.control}
          name="tournamentName"
          render={({ field }) => (
            <FormItem>
              <FormLabel></FormLabel>
              <FormControl>
                <Input
                  className="text-4xl p-9 text-center pl-4 pr-2"
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
            <FormItem className="flex flex-row items-center justify-between p-4 gap-4">
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
            <FormItem className="flex flex-row items-center justify-between p-4 gap-4">
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
            <FormItem className="flex flex-row items-center justify-between p-4 gap-4">
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
            <FormItem className="flex flex-row items-center justify-between p-4 gap-4">
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
              <FormItem className="pl-4 pr-4 flex flex-col justify-between items-start gap-2 space-y-0 m-[0px!important]">
                <div className="flex w-full justify-between items-center">
                  <FormLabel className="text-lg text-white">Max: </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="8"
                      {...field}
                      className=" w-20 text-center text-4xl h-16"
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
            <FormItem className="flex flex-row items-center justify-between p-4 gap-4">
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
        <div className="text-center items-center font-bold text-xl w-full max-w-md gap-4">
          <Button
            type="submit"
            className="bg-primary w-full font-bold text-4xl h-full p-4"
          >
            Lag turnering
          </Button>
        </div>
      </form>
    </Form>
  );
}
