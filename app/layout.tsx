'use client';
import './globals.css';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/app/user/auth/context/AuthContext';

// components
import Navbar from '../components/layout/navbar';
import Footer from '../components/layout/footer';
import { ThemeProvider } from 'next-themes';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            {children}
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </AuthProvider>
  );
}
