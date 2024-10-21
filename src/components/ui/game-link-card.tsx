"use client";

import { useRouter } from "next/navigation";

interface GameLinkCardProps {
  title: string;
  img: string;
  url: string;
}

export default function GameLinkCard({ title, img, url }: GameLinkCardProps) {
  const router = useRouter();

  return (
    <div
      className={
        "relative aspect-square w-40 cursor-pointer select-none rounded-lg px-1 transition-all duration-100 [box-shadow:0_5px_0_0_#fff,0_15px_0_0_#aaa] hover:translate-y-[-5px] hover:[box-shadow:0_5px_0_0_#fff,0_20px_0_0_#aaa] active:translate-y-3 active:[box-shadow:0_0px_0_0_#444,0_0px_0_0_#aaa]"
      }
      onClick={() => router.push(url)}
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
