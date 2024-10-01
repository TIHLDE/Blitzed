import { Card, CardContent, CardTitle } from "../../components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
      <h1 className={"text-center text-3xl font-bold text-primary"}>
        Velg et spill for å fortsette
      </h1>
      <div className="mt-4 flex h-fit w-full flex-col items-center justify-center gap-4 md:flex-row">
        {games.map((cardData, index) => (
          <Link href={cardData.link} key={cardData.title}>
            <Card
              key={index}
              className={
                "w-96 overflow-hidden duration-100 hover:cursor-pointer hover:shadow-lg"
              }
            >
              <img
                src={cardData.svgSrc}
                alt={cardData.title}
                className={"mb-3 h-40 w-full object-cover"}
              />
              <CardContent>
                <CardTitle>{cardData.title}</CardTitle>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
