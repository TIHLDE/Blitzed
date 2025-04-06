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
        "relative aspect-square w-40 cursor-pointer select-none rounded-lg px-1 pt-1 dark:bg-[#24496b] transition-all duration-100 [box-shadow:0_5px_0_0_#fff,0_15px_0_0_#aaa] dark:[box-shadow:0_5px_0_0_#24496b,0_15px_0_0_#071f35] hover:translate-y-[-5px] hover:[box-shadow:0_5px_0_0_#fff,0_20px_0_0_#aaa] dark:hover:[box-shadow:0_5px_0_0_#24496b,0_20px_0_0_#071f35] active:translate-y-3 active:[box-shadow:0_0px_0_0_#444,0_0px_0_0_#aaa] dark:active:[box-shadow:0_0px_0_0_#444,0_0px_0_0_#aaa] dark:active:pb-1"
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
