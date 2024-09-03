import "../style/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { TRPCReactProvider } from "../trpc/react";
import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer";
import { ThemeProvider } from "next-themes";
import ContextProviders from "~/components/layout/theme-provider";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Blitzed",
  description: "TIHLDE's egen side for drikkeleker!",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <ContextProviders>
            <Navbar />
            {children}
            <Footer />
          </ContextProviders>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
