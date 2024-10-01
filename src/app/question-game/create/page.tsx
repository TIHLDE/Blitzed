'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Form } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { InputSchema } from "~/server/api/question-game/game/controller/create";
import { api } from "~/trpc/react";

export default function CreateQuestionPage() {
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
        <main className="w-full h-[80vh] py-12 px-2 space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-2xl font-bold">
                    Opprett en ny 100 spørsmål
                </h1>
                <p className="text-sm text-secondary-foreground">
                    Her kan du lage din personlige “100 spørsmål”
                </p>
            </div>
            
            <Form {...form}>
                <form
                onSubmit={form.handleSubmit(onSubmit)}
                >

                
                </form>
            </Form>

            {/* <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Opprett en ny 100 spørsmål</CardTitle>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="title">Tittel</Label>
                                <Input id="title" placeholder="Feks Tihlde Plask" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="icon">Ikon</Label>
                            </div>
                        </div> 
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button>Deploy</Button>
                </CardFooter>
            </Card> */}
        </main>
    )
}