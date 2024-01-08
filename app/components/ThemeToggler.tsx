'use client';

import classNames from 'classnames';
import { useEffect, useState } from 'react';
import useMediaQuery from '../hooks/useMediaQuery';
import { getClientCookie, setClientCookie } from '../utils/cookieStore';

export default function ThemeToggler(): JSX.Element {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const isDarkModeFromBrowser = useMediaQuery('(prefers-color-scheme: dark)');

  useEffect(() => {
    let cookieValue;
    if (getClientCookie('theme') == 'dark') {
      cookieValue = true;
    } else if (getClientCookie('theme') == 'light') {
      cookieValue = false;
    }
    handleSetTheme(cookieValue ?? isDarkModeFromBrowser);
  }, []);

  const handleSetTheme = (isDarkMode: boolean) => {
    setIsDarkMode(isDarkMode);

    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      setClientCookie('theme', 'dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      setClientCookie('theme', 'light');
      localStorage.theme = 'light';
    }
  };

  return (
    <div
      className="flex items-center justify-center duration-100 cursor-pointer"
      onClick={() => handleSetTheme(!isDarkMode)}
    >
      <div className="relative">
        <input type="checkbox" name="toggle" id="toggle" className="sr-only" />
        <div
          className={classNames({
            'block bg-gray-600 w-14 h-8 rounded-full duration-300 shadow-inner shadow-gray-800':
              isDarkMode,
            'block bg-white w-14 h-8 rounded-full duration-300 shadow-inner shadow-gray-300':
              !isDarkMode,
          })}
        ></div>
        <div
          className={classNames({
            'dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition duration-300':
              isDarkMode,
            'dot absolute left-1 top-1 bg-gray-600 w-6 h-6 rounded-full transition translate-x-6 duration-300':
              !isDarkMode,
          })}
        ></div>
      </div>
    </div>
  );
}
