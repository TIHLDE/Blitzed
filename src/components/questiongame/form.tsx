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
    } = api.questionGame.game.create.useMutation({
            onError: (error) => {
                console.error("Feil ved opprettelse av spill:", error);
            },
            onSuccess: (data) => {
                console.log("Spill opprettet:", data); 
            }
        });

    const router = useRouter();

    useEffect(() => {
        if (status === "success") {
            console.log("Spill opprettet med ID:", game?.questionGameId);
            router.replace(`/question-game/${game.questionGameId}/questions`);
        }
    }, [status]);

    const onSubmit = (values: z.infer<typeof InputSchema>) => {
        console.log("Skjema verdier:", values); 
        createGame(values);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} 
                className="flex flex-col items-center justify-center w-full max-w-md mx-auto p-6 space-y-6 bg-white rounded-md shadow-lg">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tittel</FormLabel>
                            <FormControl>
                                <Input {...field} className="w-full border-gray-300 rounded-md" />
                            </FormControl>
                        </FormItem>
                    )}
                    />
                    <div className="w-full flex justify-center items-center">
                    <img
                        src="/100.jpg" 
                        alt="Default"
                        className="w-40 h-40 object-cover rounded-md"
                    />
                    </div>
                <Button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">Opprett</Button>
            </form>
        </Form>
    );
}

