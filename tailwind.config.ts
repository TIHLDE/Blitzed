import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F0F0F0',
        primaryDark: '#000F24',
        secondary: '#002B5C',
        secondaryDark: '#001830',
        text: '#000F44',
        textDark: '#F0F0F0',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
export default config;
