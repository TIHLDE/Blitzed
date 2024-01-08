import React from 'react';
import { cn } from "@/app/utils/tailwindCN";
import Image from "next/image";


type CardProps = {
  link: string;
  title: string;
  svgSrc: string;
} & React.HTMLProps<HTMLDivElement>;

function Card({
  link,
  title,
  svgSrc,
  className = '',
  ...restProps
}: CardProps) {
  return (
    <div className={cn('mt-1 p-4 w-11/12 h-[250px] border rounded-md bg-white shadow-[rgba(0,_0,_0,_0.25)_0px_4px_12px]', className)}>
      <a href={link}>
        <div className={cn('flex flex-col items-center justify-center', className)}>
           <div className={cn('text-2xl', className)}>
             <h2>{title}</h2>
          </div>
          <div className={cn('', className)}>
            <Image width={200} height={100} src={svgSrc} alt={title} />
          </div>
        </div>
      </a>
    </div>
  );
}

export default Card;

