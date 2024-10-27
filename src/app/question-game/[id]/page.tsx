import { Card, CardContent } from "~/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "~/components/ui/carousel";
import { api } from "~/trpc/server";


interface QuestionGameProps {
    params: {
        id: string;
    };
}

interface Question {
    id: number;
    question: string;
}

const QuestionGame = async ({ params }: QuestionGameProps) => {
    const data = await api.questionGame.question.getAll({
        questionGameId: parseInt(params.id)
    });

    const shuffleArray = (arr: Question[]): Question[] => {
        // Clone the array to avoid mutating the original
        const array = [...arr];

        // Loop through the array from the last to the second element
        for (let i = array.length - 1; i > 0; i--) {
            // Generate a random index from 0 to i
            const j = Math.floor(Math.random() * (i + 1));

            // Use type assertions to satisfy TypeScript
            [array[i], array[j]] = [array[j] as Question, array[i] as Question];
        }

        return array;
    }

    return (
        <main className="h-screen">
            <Carousel className="w-full max-w-xs">
                <CarouselContent>
                    {shuffleArray(data.questions).map((question, index) => (
                        <CarouselItem className="md:basis-1/2 lg:basis-1/3" key={index}>
                            <div className="p-1">
                                <Card>
                                    <CardContent className="flex aspect-square items-center justify-center p-6">
                                        <span className="text-4xl font-semibold">{question.question}</span>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div className="flex mt-8 w-full items-center justify-center space-x-6">
                    <CarouselPrevious variant="default" className="relative rounded-sm w-full" />
                    <CarouselNext variant="default" className="relative rounded-sm w-full" />
                </div>
            </Carousel>
        </main>
    )
};


export default QuestionGame;