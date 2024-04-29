'use client'

import { createDrinkingQuestion } from '@/app/api/drinking_question';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { z } from "zod"


const formSchema = z.object({
  text: z.string().min(5, {
    message: "Spørsmålet må ha minst 5 bokstaver"
  })
})

const AddQuestion = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            text: "",
        },
    });


    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const response = await createDrinkingQuestion(values);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Legg til spørsmål</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Skriv et spørsmål</DialogTitle>
                        <DialogDescription>
                            Feks "Hvem er den største forbrukeren av Tihlder?"
                        </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField 
                            control={form.control}
                            name="text"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>
                                        Spørsmål
                                    </FormLabel>
                                    <FormControl>
                                        <Input required {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit">
                            Legg til
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )

}

export default AddQuestion;
