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

    const cardBackgroundImages = [
                    '/img/backgroundImg1.jpg',
                    '/img/backgroundImg2.jpg',
                    '/img/backgroundImg3.jpg',
                    '/img/backgroundImg4.jpg',
                    '/img/backgroundImg5.jpg',
                    '/img/backgroundImg6.jpg',
                    '/img/backgroundImg7.jpg',
                    '/img/backgroundImg8.jpg',
                    '/img/backgroundImg9.jpg',
                    '/img/backgroundImg10.jpg',
                    '/img/backgroundImg11.jpg',
                ];
                
    const getRandomCardBackground = () => {
        return cardBackgroundImages[Math.floor(Math.random() * cardBackgroundImages.length)];
    }


    return (
        <main className="h-screen">
            <Carousel className="w-full max-w-xs">
                <CarouselContent>
                    {shuffleArray(data.questions).map((question, index) => (
                        <CarouselItem key={index}>
                            <div className="p-1">
                                <Card>
                                    <CardContent 
                                        className="relative flex items-center justify-items-center w-[400px] h-[600px] px-10"
                                            style={{
                                                backgroundImage: `url(${getRandomCardBackground()})`,
                                                backgroundSize: "cover",
                                                backgroundPosition: "center",
                                                backgroundRepeat: "no-repeat"
                                            }}
                                    >

                                        <span className="relative text-5xl font-semibold break-words w-[90%] leading-relaxed">{question.question}</span>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div className="flex mt-8 w-full items-center justify-center rounded-lg space-x-6">
                    <CarouselPrevious variant="default" className="relative rounded-sm w-full" />
                    <CarouselNext variant="default" className="relative rounded-sm w-full" />
                </div>
            </Carousel>
        </main>
    )
};


export default QuestionGame;