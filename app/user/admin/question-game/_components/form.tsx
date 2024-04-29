'use client';

import { createDrinkingGame } from "@/app/api/drinking_game";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { z } from "zod"

const formSchema = z.object({
    name: z.string().min(2, {
        message: 'Navnet må ha minst 2 bokstaver'
    }),
    description: z.string().min(5, {
        message: 'Beskrivelsen må være på minst 5 bokstaver'
    }),
    image: z.string().optional()
})

const CreateQuestionGameForm = () => {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            description: '',
            image: ''
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await createDrinkingGame(values);
            const id = await response.id;

            router.push(`/user/admin/question-game/${id}`);
        } catch (e) {
            //TODO: add error
            console.log(e);
        }
    };

    return (
        <Form {...form}>
            <form 
                onSubmit={form.handleSubmit(onSubmit)}
                className="max-w-lg w-full mt-32 "
            >
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Opprett 100 spørsmål
                        </CardTitle>
                        <CardDescription>
                            Her kan du lage din personlige 100 spørsmål
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <FormField 
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>
                                        Tittel
                                    </FormLabel>
                                    <FormControl>
                                        <Input required {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField 
                            control={form.control}
                            name="description"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>
                                        Tittel
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea required {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" variant="outline">Opprett</Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    )
} 

export default CreateQuestionGameForm;
