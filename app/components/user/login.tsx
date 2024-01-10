'use client';

import { useUser } from '@/app/hooks/useUser';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { getClientCookie } from '@/app/utils/stores/cookieStore';
import { useAuth } from '@/app/user/auth/context/AuthContext';
import Input from '@/components/layout/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useUser();
  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    router.push('/');
    return <div>Loading...</div>;
  }

  const handleChange = (fieldType: 'username' | 'password') => (e: any) => {
    const setField = fieldType === 'username' ? setUsername : setPassword;
    setField(e.target.value);
    setError('');
  };

  const handleSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();
    try {
      const r = await login(username, password);
      console.log(r);
      const success = getClientCookie('tokenDrinking');
      if (success) {
        console.log('Logged in');
        router.push('/user/template/home');
      }
    } catch (e) {
      setError('En feil oppsto under innloggingen.');
    }
  };

  return (
    <div className="flex justify-center items-center my-52 w-full">
      <div className="w-full max-w-sm p-4 border rounded-md bg-white shadow-lg">
        <h2 className={'text-center text-2xl font-bold mb-6'}>
          Logg inn til Blitzed
        </h2>
        <form className="w-full flex flex-col" onSubmit={handleSubmit}>
          <Label htmlFor="username">Brukernavn</Label>
          <Input
            type="name"
            id="username"
            onChange={handleChange('username')}
            value={username}
          />
          <div className={'font-light text-xs mt-1 mb-3'}>
            Samme som Tihlde bruker
          </div>
          <Label htmlFor="password">Passord</Label>
          <Input
            type="name"
            id="password"
            onChange={handleChange('password')}
            value={password}
          />
          <Button className={'mt-4'} type={'submit'}>
            Logg inn
          </Button>
          <a
            className="inline-block font-medium text-sm underline text-end mt-3"
            href="#"
          >
            Glemt passord?
          </a>
          {error && (
            <Label
              className={
                'mt-3 text-center text-sm font-normal text-destructive'
              }
            >
              {error}
            </Label>
          )}
        </form>
      </div>
    </div>
  );
}
