'use client';

import { Card, CardContent, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useDrinkingGame } from '@/app/hooks/useDrinking_game';
import { useEffect } from 'react';
import { useUser } from '@/app/hooks/useUser';

export default function UserHomePage() {
  const { drinkingGame, getDrinkingGames } = useDrinkingGame();
  const { user } = useUser();

  useEffect(() => {
    getDrinkingGames();
    console.log(user);
  }, [getDrinkingGames]);

  return (
    <div className="flex flex-col w-full min-h-screen justify-between px-4">
      <div>
        <div className="absolute top-[80px] right-4 py-2">
          <Button className="lg:w-[100%] w-full max-w-full h-12" asChild>
            <Link href="/user/admin/question-game">LAG DRIKKELEK</Link>
          </Button>
        </div>
        <h1 className="text-3xl font-bold text-center text-primary mt-24 md:mt-12">
          Velg et spill for å fortsette
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 mr-6 ml-6 ">
          {drinkingGame &&
            drinkingGame.map((game) => (
              <Link href={`/game/${game.id}`} key={game.id}>
                <Card className="w-full overflow-hidden duration-100 hover:shadow-lg hover:cursor-pointer">
                  <img
                    src={'/100.jpg'}
                    alt={'abc'}
                    className="w-full h-40 mb-3 object-cover"
                  />
                  <CardContent>
                    <CardTitle>{game.name}</CardTitle>
                  </CardContent>
                </Card>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
