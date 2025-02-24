import { Card, CardContent } from "~/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import { api } from "~/trpc/server";
import { Button } from "~/components/ui/button";

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
    questionGameId: parseInt(params.id),
  });

  const shuffleArray = (arr: Question[]): Question[] => {
    const array = [...arr];

    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j] as Question, array[i] as Question];
    }

    return array;
  };

  const cardBackgroundImages = [
    "/img/backgroundImg1.jpg",
    "/img/backgroundImg2.jpg",
    "/img/backgroundImg3.jpg",
    "/img/backgroundImg4.jpg",
    "/img/backgroundImg5.jpg",
    "/img/backgroundImg6.jpg",
    "/img/backgroundImg7.jpg",
    "/img/backgroundImg8.jpg",
    "/img/backgroundImg9.jpg",
    "/img/backgroundImg10.jpg",
    "/img/backgroundImg11.jpg",
  ];

  const getRandomCardBackground = () => {
    return cardBackgroundImages[
      Math.floor(Math.random() * cardBackgroundImages.length)
    ];
  };

  return (
    <main className="h-screen">
      <Carousel className="mx-auto w-full max-w-sm">
        <CarouselContent>
          {shuffleArray(data.questions).map((question, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent
                  className="relative flex h-[600px] w-[400px] items-center justify-items-center px-10"
                  style={{
                    backgroundImage: `url(${getRandomCardBackground()})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <span className="relative w-[90%] break-words text-5xl font-semibold leading-relaxed">
                    {question.question}
                  </span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="mt-8 flex w-full items-center justify-center space-x-6 rounded-lg">
          <CarouselPrevious
            variant="default"
            className="relative w-full rounded-sm"
          />
          <CarouselNext
            variant="default"
            className="relative w-full rounded-sm"
          />
        </div>
      </Carousel>
      <div className="flex w-full justify-center">
        <Button variant={"outline"} asChild className="px-4 py-2 font-bold">
          <a href={`/question-game/${params.id}/add`}> Edit questions </a>
        </Button>
      </div>
    </main>
  );
};

export default QuestionGame;
