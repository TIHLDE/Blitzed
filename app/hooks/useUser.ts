import { useState, useCallback } from 'react';
import { authenticate } from '@/app/api/user';
import { setClientCookie } from '@/app/utils/stores/cookieStore';

export const useUser = () => {
  const [user, setUser] = useState<any | null>(null);

  const login = useCallback(async (username: string, password: string) => {
    const data = await authenticate(username, password);
    setUser(data.user);
    setClientCookie('tokenDrinking', data.token, { expires: 365 });
  }, []);

  return {
    user,
    login,
  };
};
