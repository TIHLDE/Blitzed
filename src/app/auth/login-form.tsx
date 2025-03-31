"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Separator } from "~/components/ui/separator";
import { toast } from "~/hooks/use-toast";

const FormSchema = z.object({
  tihldeUsername: z.string().optional(),
  tihldePassword: z.string().optional(),
  nickname: z.string().optional(),
});

export default function LoginForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      tihldeUsername: "",
      tihldePassword: "",
      nickname: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const isTihldeValid =
      Boolean(data.tihldeUsername?.length) &&
      Boolean(data.tihldePassword?.length);
    const isNicknamValid = Boolean((data.nickname?.length ?? 0) >= 2);

    if (!isNicknamValid && !isTihldeValid) {
      toast({
        title: "Du må fylle ut TIHLDE-innlogging eller kallenavn",
        variant: "destructive",
      });
      return;
    }

    const response = isTihldeValid
      ? await signIn("tihlde", {
          username: data.tihldeUsername,
          password: data.tihldePassword,
          callbackUrl: "/home",
        })
      : await signIn("anonymous", {
          nickname: data.nickname,
          callbackUrl: "/home",
        });

    if (response?.error) {
      toast({
        title: "Oops, noe gikk galt :(",
        description: response.error,
      });
      return;
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col"
      >
        <div className="flex w-full flex-col items-center justify-between gap-4">
          <div className="flex w-full flex-col gap-4">
            <div className="text-xl font-semibold">
              Logg inn med <span className="text-2xl font-black">TIHLDE</span>
            </div>
            <FormField
              control={form.control}
              name="tihldeUsername"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brukernavn</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tihldePassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Passord</FormLabel>
                  <FormControl>
                    <Input {...field} type={"password"} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex w-full items-center justify-between gap-4">
            <Separator orientation="horizontal" className="w-fit flex-grow" />
            <span className="text-2xl font-medium">eller</span>
            <Separator orientation="horizontal" className="w-fit flex-grow" />
          </div>
          <div className="w-full">
            <div className="text-xl font-semibold">Logg inn anonymt</div>
            <FormField
              control={form.control}
              name="nickname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kallenavn</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Dette velger du helt selv. Du blir en anonym bruker.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type="submit" className="mt-4">
          Send
        </Button>
      </form>
    </Form>
  );
}
