import { useState, useCallback } from 'react';
import { authenticate } from '@/app/api/user';
import { setClientCookie } from '@/app/utils/cookieStore';

export const useUser = () => {
  const [user, setUser] = useState<any | null>(null);

  const login = useCallback(async (username: string, password: string) => {
    try {
      const data = await authenticate(username, password);
      setClientCookie('tokenDrinking', data.token, { expires: 365 });
    } catch (error) {
      console.error('Failed to login:', error);
    }
  }, []);

  return {
    user,
    login,
  };
};
