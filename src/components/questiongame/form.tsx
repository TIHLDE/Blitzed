"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "~/trpc/react";
import { Form } from "../ui/form";
import { InputSchema } from "~/server/api/question-game/game/schema/create";


export const QuestionGameForm = () => {
    const form = useForm<z.infer<typeof InputSchema>>({
        resolver: zodResolver(InputSchema),
        defaultValues: {
            title: ""
        }
    });

    const {
        mutate: createGame,
        status,
        data: game
    } = api.questionGame.game.create.useMutation();
    const router = useRouter();

    useEffect(() => {
        if (status === "success") {
            router.replace(`/question-game/${game.questionGameId}/questions`);
        }
    }, [status]);

    const onSubmit = (values: z.infer<typeof InputSchema>) => 
        createGame(values);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>

            </form>
        </Form>
    );
}