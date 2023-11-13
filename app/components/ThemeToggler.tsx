'use client';

import { use, useEffect } from 'react';
import { useState } from 'react';
import useMediaQuery from '../hooks/useMediaQuery';
import Cookies from 'js-cookie';
import classNames from 'classnames';

export default function ThemeToggler(): JSX.Element {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const isDarkModeFromBrowser = useMediaQuery('(prefers-color-scheme: dark)');

  useEffect(() => {
    handleSetTheme(isDarkModeFromBrowser);
  }, []);

  const handleSetTheme = (isDarkMode: boolean) => {
    setIsDarkMode(isDarkMode);

    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      Cookies.set('theme', 'dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      Cookies.set('theme', 'light');
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
            'block bg-gray-600 w-14 h-8 rounded-full duration-300': isDarkMode,
            'block bg-green-400 w-14 h-8 rounded-full duration-300':
              !isDarkMode,
          })}
        ></div>
        <div
          className={classNames({
            'dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition duration-300':
              isDarkMode,
            'dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition translate-x-6 duration-300':
              !isDarkMode,
          })}
        ></div>
      </div>
    </div>
  );
}
