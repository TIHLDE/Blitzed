'use client';

import { useUser } from '@/app/hooks/useUser';
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from "react";
import Input from '@/app/components/defaults/input';
import {getClientCookie } from '@/app/utils/stores/cookieStore';
import {useAuth} from "@/app/user/auth/context/AuthContext";

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useUser();
  const router = useRouter()

  // @ts-ignore
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    router.push('/');
    return <div>Loading...</div>;
  }

  const handleSubmit = () => {
    try{
      login(username, password).then(r => console.log(r));
      const success = getClientCookie('tokenDrinking');
      if(success){
        console.log('Logged in')
        router.push('/user/template/home')
      }
    }catch(e){
      setError('En feil oppsto under innloggingen.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="w-full max-w-md p-4 border rounded-md bg-white shadow-lg">
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Brukernavn
            </label>
            <Input
              id="email"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded shadow-sm"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Passord
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded shadow-sm"
            />
          </div>

          <div className="flex items-center justify-between mb-6">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Logg inn
            </button>
            <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
              Glemt passord?
            </a>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </form>
      </div>
    </div>
  );
};
