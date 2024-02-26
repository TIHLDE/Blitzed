'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getClientCookie } from '@/app/utils/stores/cookieStore';
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = () => {
    const token = getClientCookie('tokenDrinking');
    if (token) {
      setIsLoggedIn(true);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
