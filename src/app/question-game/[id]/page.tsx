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
        const array = [...arr];

        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j] as Question, array[i] as Question];
        }

        return array;
    }

    return (
        <main className="h-screen">
            <Carousel className="w-full max-w-xs">
                <CarouselContent>
                    {shuffleArray(data.questions).map((question, index) => (
                        <CarouselItem key={index}>
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