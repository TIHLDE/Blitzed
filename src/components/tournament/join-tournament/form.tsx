"use client";

import { type z } from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { useEffect, useState } from "react";
import formSchema from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../../../trpc/react";
import { useRouter } from "next/navigation";

export default function JoinTournamentForm() {
  const [pinCode, setPinCode] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // Callback version of watch.  It's your responsibility to unsubscribe when done.
  useEffect(() => {
    const subscription = form.watch((data) => {
      // Find the next formfield that is empty, and focus it
      // this way the user automatically traverses all of the input fields :)
      const values = [data.first, data.second, data.third, data.fourth];
      const ids = ["first", "second", "third", "fourth"];
      const indexNextEmpty = values.findIndex((v) => !v);

      if (indexNextEmpty !== -1) {
        const id = ids[indexNextEmpty];
        document.getElementById(id!)?.focus();
      } else {
        // We should submit the form since all fields have been filled out
        form.handleSubmit(onSubmit)();
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const { data: tournament, error } = api.beerPong.tournament.get.useQuery(
    { pinCode },
    { enabled: pinCode.length === 4 },
  );
  const router = useRouter();

  useEffect(() => {
    if (error) {
      console.error(error);
    }

    if (tournament) {
      router.push(`/beer-pong/${tournament.id}`);
    }
  }, [tournament, error]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const code = [
      values.first,
      values.second,
      values.third,
      values.fourth,
    ].join("");

    setPinCode(code);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex h-14 w-full max-w-md flex-row items-center justify-between gap-2">
          <div className="h-full basis-[100%]">
            <FormField
              control={form.control}
              rules={{}}
              name="first"
              render={({ field }) => (
                <FormItem className="h-full">
                  <FormControl>
                    <Input
                      id="first"
                      className="h-full text-center text-2xl font-medium"
                      type="number"
                      maxLength={1}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="h-full basis-[100%]">
            <FormField
              control={form.control}
              name="second"
              render={({ field }) => (
                <FormItem className="h-full">
                  <FormControl>
                    <Input
                      id="second"
                      className="h-full text-center text-2xl font-medium"
                      type="number"
                      maxLength={1}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="h-full basis-[100%]">
            <FormField
              control={form.control}
              name="third"
              render={({ field }) => (
                <FormItem className="h-full">
                  <FormControl>
                    <Input
                      id="third"
                      className="h-full text-center text-2xl font-medium"
                      type="number"
                      maxLength={1}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="h-full basis-[100%]">
            <FormField
              control={form.control}
              name="fourth"
              render={({ field }) => (
                <FormItem className="h-full">
                  <FormControl>
                    <Input
                      id="fourth"
                      className="h-full text-center text-2xl font-medium"
                      type="number"
                      maxLength={1}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  );
}
