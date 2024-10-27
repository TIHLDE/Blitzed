
import { Card, CardContent } from "../ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";

export function QuestionCard() {
    
  return (
    <Carousel className="w-full max-w-xs">
        <CarouselContent>
                <CarouselItem >
                    <div className="p-1">
                        <Card>
                            <CardContent className="flex aspect-square items-center justify-center p-6">
                                <span className="text-4xl font-semibold">{1}</span>
                            </CardContent>
                        </Card>
                    </div>
                </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext className="" />
    </Carousel>
    )
}
