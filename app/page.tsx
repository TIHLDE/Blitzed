"use client"

import Image from "next/image";
import cvExample from '../public/100.jpg';
import React, { useEffect, useMemo, useState } from "react";
import {getClientCookie, removeClientCookie} from '@/app/utils/stores/cookieStore';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  function checkIfLoggedIn() {
    const token = getClientCookie('tokenDrinking');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    setIsLoading(false);
  }

  const handleLogout = () => {
    removeClientCookie("tokenDrinking")
  }

  const authButtons = useMemo(() => {
    if (isLoading) {
      return null;
    } else if (isLoggedIn) {
      return (
        <>
          <button className="bg-red-200 shadow-[rgba(0,0,0,0.4)_0px_30px_90px] px-4 py-2 rounded-lg">
            <a className="text-xl" href="/user/template/home">
              Spill
            </a>
          </button>
          <button className="bg-red-200 shadow-[rgba(0,0,0,0.4)_0px_30px_90px] px-4 py-2 rounded-lg">
            <a onClick={handleLogout} className="text-xl" href="/">
              Logg ut
            </a>
          </button>
        </>
      );
    } else {
      return (
        <>
          <button className="bg-red-200 shadow-[rgba(0,0,0,0.4)_0px_30px_90px] px-4 py-2 rounded-lg">
            <a className="text-xl" href="/user/template/home">
            Spill
            </a>
          </button>
          <button className="bg-red-200 shadow-[rgba(0,0,0,0.4)_0px_30px_90px] px-4 py-2 rounded-lg">
            <a className="text-xl" href="user/auth/login">
              Logg inn
            </a>
          </button>
          <button className="bg-red-200 shadow-[rgba(0,0,0,0.4)_0px_30px_90px] px-4 py-2 rounded-lg">
            <a className="text-xl" href="https://tihlde.org/ny-bruker/">
              Register
            </a>
          </button>
        </>
      );
    }
  }, [isLoading, isLoggedIn]);

  return (
    <div className={'flex flex-col'}>
      <div className="flex justify-center items-center h-screen px-4 py-2">
        <div className="flex flex-col justify-center items-start mr-8">
          <div className={''}>
            <p className="text-3xl text-cyan-600">
              Tihldes egen nettside for drikkeleker,
            </p>
            <br />
            <p className="text-2xl text-cyan-600">
              {isLoading
                ? 'Laster...'
                : isLoggedIn
                ? ''
                : 'Register eller login for å starte'}
            </p>
          </div>
          <div className="flex mt-4">{authButtons}</div>
        </div>
        <div className="rotate-12 relative">
          <div className="mt-1 p-2 w-11/12 h-full border rounded-md bg-white shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]">
            <div className="flex flex-col items-center justify-center">
              <div className={''}>
                <Image src={cvExample} alt={'cv'} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
}
