import "material-icons/iconfont/material-icons.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// components
import Footer from "./components/defaults/footer";
import Navbar from "./components/defaults/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
