'use client';

import { Card, CardContent, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from "@/app/user/auth/context/AuthContext";
import { useEffect } from "react";

interface Game {
  link: string;
  title: string;
  svgSrc: string;
  alt: string;
}

const games: Game[] = [
  {
    link: 'string1',
    title: '100 Spørsmål',
    svgSrc: '/100.jpg',
    alt: 'folk som tar shots',
  },
  {
    link: 'string1',
    title: 'Beer pong turnering',
    svgSrc: '/beerpong.png',
    alt: 'beer pong tournament poster',
  },
];

export default function UserHomePage() {
  const router = useRouter();
  const {login} = useAuth();

  useEffect(() => {
    login();
  }, []);
  return (
    <div className={'flex flex-col w-full h-[90vh] justify-center'}>
      <h1 className={'text-3xl font-bold text-center text-primary'}>
        Velg et spill for å fortsette
      </h1>
      <div className="flex flex-col md:flex-row w-full justify-center items-center gap-4 mt-4 h-fit">
        {games.map((cardData, index) => (
          <Link href={cardData.link}>
            <Card
              key={index}
              className={
                'w-96 overflow-hidden duration-100 hover:shadow-lg hover:cursor-pointer'
              }
            >
              <img
                src={cardData.svgSrc}
                alt={cardData.title}
                className={'w-full h-40 mb-3 object-cover'}
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
