"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "~/trpc/react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { InputSchema } from "~/server/api/question-game/game/schema/create";
import Input from "../layout/input";
import { Button } from "../ui/button";
import FileUploader from "../file-upload";

export const QuestionGameForm = () => {
  const form = useForm<z.infer<typeof InputSchema>>({
    resolver: zodResolver(InputSchema),
    defaultValues: {
      title: "",
      imageUrl: "",
    },
  });

  const {
    mutate: createGame,
    status,
    data: game,
  } = api.questionGame.game.create.useMutation({
    onError: (error) => {
      console.error("Feil ved opprettelse av spill:", error);
    },
    onSuccess: (data) => {
      console.log("Spill opprettet:", data);
    },
  });

  const router = useRouter();

  useEffect(() => {
    if (status === "success") {
      console.log("Spill opprettet med ID:", game?.questionGameId);
      router.replace(`/question-game/${game.questionGameId}/add`);
    }
  }, [status]);

  const onSubmit = (values: z.infer<typeof InputSchema>) => {
    console.log("Skjema verdier:", values);
    createGame(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto flex w-full max-w-md flex-col items-center justify-center space-y-6 rounded-md p-6 shadow-lg"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tittel</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="w-full rounded-md border-gray-300"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FileUploader onSelect={(file) => form.setValue("imageUrl", file)} />
        <Button
          type="submit"
          className="w-full rounded-md bg-blue-500 py-2 text-white"
        >
          Opprett
        </Button>
      </form>
    </Form>
  );
};
