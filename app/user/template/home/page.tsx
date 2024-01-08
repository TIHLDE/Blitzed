'use client';

import Card from '@/app/components/template/Card';
import { useAuth } from "@/app/user/auth/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from 'next/navigation'


const games = [
  {
    link: 'string1',
    title: '100 Spørsmål',
    svgSrc: '/100.jpg',
  },
  {
    link: 'string1',
    title: 'Beer pong turnering',
    svgSrc: '/beerpong.png',
  }

];







export default function UserHomePage() {
  const router = useRouter()

  return (
    <div className="flex flex-col w-full justify-center items-center">
      {games.map((cardData, index) => (
        <Card key={index} {...cardData} />
      ))}
    </div>
  );
}
