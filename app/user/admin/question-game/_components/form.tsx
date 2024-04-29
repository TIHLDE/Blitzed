'use client';

import { createDrinkingGame } from "@/app/api/drinking_game";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreateQuestionGameForm = () => {
    const router = useRouter();
    const [imagePreview, setImagePreview] = useState('');


    const handleFileUpload = async (event) => {
        const file = event.target.files && event.target.files[0];
         
        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result as string;
            setImagePreview(result)
        } 
        reader.readAsDataURL(file);

        const formData = new FormData();
        formData.append('image', file);
        
        try {
            const response = await fetch('upload', {
                method: 'POST',
                body: formData,
            });

        } catch (error) {
            console.error('Feil ved opplasting av fil:', error);
        }
    };

    const submit = async (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const name = event.target.name.value;
        const description = event.target.description.value;
        const icon = event.target.icon.value;

        const data = {
            name,
            description,
            icon,
        }

        try {
            const response = await createDrinkingGame(data);
            const id = await response.id;
            
            router.push(`/user/admin/question-game/${id}`)
        } catch (e) {
            //TODO: add error 
            console.log(e)
        }
    }

    return (
        <form 
            onSubmit={submit}
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
                    <div className="flex flex-col space-y-1.5 ">
                        <Label htmlFor="name">Tittel</Label>
                        <Input name="name" placeholder="Velg navn" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="description">Beskrivelse</Label>
                        <Textarea name="description" placeholder="Gi en kort beskrivelse." />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Input type="file" accept="image/*" onChange={handleFileUpload}></Input>
                        <div className="w-48 h-48 overflow-hidden">
                            {imagePreview && <img src={imagePreview} alt="Forhåndsvisning av bilde" className="w-full h-auto" />}
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button variant="outline">Opprett</Button>
                </CardFooter>
            </Card>
        </form>
    )
} 

export default CreateQuestionGameForm;