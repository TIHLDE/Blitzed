"use client";

import { useEffect } from "react";
import { useState } from "react";

interface ThemeTogglerProps {}

export default function ThemeToggler(props: ThemeTogglerProps): JSX.Element {
  const [isToggled, setIsToggled] = useState(false);

  useEffect(() => {
    const theme = localStorage.theme;
    if (theme === "dark") {
      handleSetTheme(true);
    } else {
      handleSetTheme(false);
    }
  }, []);

  const handleSetTheme = (isDarkMode: boolean) => {
    setIsToggled(isDarkMode);

    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  };

  const getClassName = () => {
    if (isToggled) {
      return "block bg-gray-600 w-14 h-8 rounded-full duration-300";
    } else {
      return "block bg-green-400 w-14 h-8 rounded-full duration-300";
    }
  };

  const getDotClassName = () => {
    if (isToggled) {
      return "dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition duration-300";
    } else {
      return "dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition translate-x-6 duration-300";
    }
  };

  return (
    <div
      className='flex items-center justify-center duration-100 cursor-pointer'
      onClick={() => handleSetTheme(!isToggled)}
    >
      <div className='relative'>
        <input type='checkbox' name='toggle' id='toggle' className='sr-only' />
        <div className={getClassName()}></div>
        <div className={getDotClassName()}></div>
      </div>
    </div>
  );
}
