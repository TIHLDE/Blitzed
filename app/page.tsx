'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import {
  getClientCookie,
  removeClientCookie,
} from '@/app/utils/stores/cookieStore';
import { Skeleton } from '@/components/ui/skeleton';

/// Main card displayed with login buttons etc
function HeroCard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  function checkIfLoggedIn() {
    const token: string = getClientCookie('tokenDrinking');
    setIsLoggedIn(!!token);
    setIsLoading(false);
  }

  const handleLogout = () => {
    setIsLoggedIn(false);
    removeClientCookie('tokenDrinking');
  };

  const loginButtons = useMemo(() => {
    if (isLoading) {
      return <Skeleton className={'w-full h-10'} />;
    }
    if (isLoggedIn) {
      return (
        <Button variant={'outline'} className={'w-full'} onClick={handleLogout}>
          Logg ut
        </Button>
      );
    }

    return (
      <>
        <Button variant={'outline'} className={'w-full'}>
          Logg inn
        </Button>
        <Button variant={'outline'} className={'w-full'}>
          Registrer deg
        </Button>
      </>
    );
  }, [isLoggedIn, isLoading]);

  return (
    <Card
      className={'my-20 absolute left-3 right-3 max-w-[372px] ml-auto mr-auto'}
    >
      <CardHeader>
        <CardDescription className={'lg:text-xl text-lg text-center'}>
          Tihldes nettside for
        </CardDescription>
        <CardTitle
          className={
            'text-center lg:text-3xl text-2xl mt-0 font-bold space-y-0'
          }
        >
          DRIKKELEKER
        </CardTitle>
      </CardHeader>
      <CardContent
        className={'flex gap-2 flex-col w-full items-center justify-evenly'}
      >
        <Button className={'lg:w-[80%] w-full max-w-full h-12'}>
          START NÅ
        </Button>
        <div
          className={'flex flex-row gap-2 justify-between w-full lg:w-[80%]'}
        >
          {loginButtons}
        </div>
        <Separator className={'my-6 min-w-[60%]'} />
        <CardDescription className={'mb-2 text-md text-center'}>
          Følg oss på sosiale medier
        </CardDescription>
        <div className="flex md:gap-x-0 md:gap-y-0 gap-x-6 gap-y-4 items-center md:flex md:justify-center md:space-x-4 place-content-center">
          <Link
            href="https://www.facebook.com/tihlde/"
            target="_blank"
            className="flex justify-center"
          >
            <Button variant={'outline'} size={'icon'}>
              <Facebook />
            </Button>
          </Link>

          <a
            href="https://www.instagram.com/tihlde/"
            target="_blank"
            className="flex justify-center"
          >
            <Button variant={'outline'} size={'icon'}>
              <Instagram />
            </Button>
          </a>

          <a
            href="https://twitter.com/tihlde"
            target="_blank"
            className="flex justify-center"
          >
            <Button variant={'outline'} size={'icon'}>
              <Twitter />
            </Button>
          </a>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Home() {
  return (
    <div className={'md:flex h-[90vh] flex-row justify-between'}>
      <div className="md:basis-2/5 md:bg-accent md:h-full md:flex relative flex-col md:items-center md:justify-center z-10 px-4">
        <HeroCard />
      </div>
      <div className="md:basis-3/5 h-full md:w-full z-0">
        <img
          src={
            'https://images.unsplash.com/photo-1558383409-ab7ef8db3e01?q=80&w=1786&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          }
          className={'object-cover h-full w-full'}
          alt={'People sharing drinks'}
        />
      </div>
    </div>
  );
}
