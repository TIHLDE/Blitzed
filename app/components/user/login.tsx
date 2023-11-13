'use client';

import { useUser } from '@/app/hooks/useUser';
import React, { useState } from 'react';
import Input from '@/app/components/defaults/input';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useUser();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="p-8 bg-white rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-5">Logg inn</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Brukernavn
            </label>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              id="username"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Passord
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200"
            >
              Logg inn
            </button>
          </div>
          <div className=" flex justify-between ">
            <button>Glemt passord?</button>
            <button>Registrer deg</button>
          </div>
        </form>
      </div>
    </main>
  );
}
