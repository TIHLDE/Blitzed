import { Card, CardContent, CardTitle } from "../../components/ui/card";
import Link from "next/link";

interface Game {
  link: string;
  title: string;
  svgSrc: string;
  alt: string;
}

const games: Game[] = [
  {
    link: "/question-game",
    title: "100 Spørsmål",
    svgSrc: "/100.jpg",
    alt: "folk som tar shots",
  },
  {
    link: "/beer-pong",
    title: "Beer pong turnering",
    svgSrc: "/beerpong.png",
    alt: "beer pong tournament poster",
  }, 
];

export default function UserHomePage() {
  return (
    <div className={"flex h-[90vh] w-full flex-col justify-center"}>
      <h1 className={"text-center text-3xl font-bold"}>
        Velg et spill for å fortsette
      </h1>
      <div className="mt-4 flex h-fit w-full flex-col items-center justify-center gap-6 md:flex-row">
        {games.map((cardData, index) => (
          <Link href={cardData.link} key={index}>
            <Card
              className={
                "w-96 transform overflow-hidden transition-transform duration-300 hover:scale-105 hover:cursor-pointer"
              }
            >
              <div className="relative w-full">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="rounded bg-black bg-opacity-50 px-4 py-2 text-xl font-bold text-white">
                    {cardData.title}
                  </span>
                </div>
                <div>
                  <img
                    src={cardData.svgSrc}
                    alt={cardData.alt}
                    className={"h-40 w-full"}
                  />
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
