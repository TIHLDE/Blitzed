"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Check as CheckIcon } from "lucide-react";
import formSchema from "./schema";

export default function TournamentPinForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  // function handleFieldChange(e: React.ChangeEvent<HTMLInputElement>) {}

  function onSubmit(values: z.infer<typeof formSchema>) {}

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex w-full flex-col items-center justify-start">
          <div className="mb-2 ml-2 mt-4 text-lg font-bold">
            Join med PIN-kode
          </div>
          <div className="flex h-14 w-full max-w-md flex-row items-center justify-between gap-2">
            <FormField
              control={form.control}
              name={"one"}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        className="h-full flex-1 text-center text-2xl font-medium"
                        type="text"
                        maxLength={1}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name={"two"}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        className="h-full flex-1 text-center text-2xl font-medium"
                        type="text"
                        maxLength={1}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name={"three"}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        className="h-full flex-1 text-center text-2xl font-medium"
                        type="text"
                        maxLength={1}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name={"four"}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        className="h-full flex-1 text-center text-2xl font-medium"
                        type="text"
                        maxLength={1}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <Button
              type="submit"
              className="flex h-full flex-1 items-center justify-center"
              variant="default"
              size="icon"
            >
              <CheckIcon size={36} />
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
