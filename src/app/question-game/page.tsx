export default function QuestionGamesPage() {
  return (
    <div className="mt-6 min-h-[100svh]">
      <div className="grid grid-cols-2 gap-6">
        <QuestionGameCard title={"Beerpong"} img={"/img/beer_pong_image.jpg"} />
        <QuestionGameCard
          title={"100 spørsmål"}
          img={
            "https://images.unsplash.com/photo-1558383409-ab7ef8db3e01?q=80&w=1786&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
        />
      </div>
    </div>
  );
}

interface QuestionGameCardProps {
  title: string;
  img: string;
}

function QuestionGameCard({ title, img }: QuestionGameCardProps) {
  return (
    <div
      className={
        "relative aspect-square w-40 select-none rounded-lg border-b-[1px] px-1 transition-all duration-100 [box-shadow:0_5px_0_0_#fff,0_15px_0_0_#aaa] active:translate-y-3 active:border-b-[0px] active:[box-shadow:0_0px_0_0_#444,0_0px_0_0_#aaa]"
      }
    >
      <img
        src={img}
        className={"h-full w-full rounded-sm object-cover brightness-75"}
      />
      <span className="absolute bottom-2 left-2 text-2xl font-extrabold leading-6 text-white">
        {title}
      </span>
    </div>
  );
}
