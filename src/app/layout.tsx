import "../style/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { TRPCReactProvider } from "../trpc/react";
import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer";
import ContextProviders from "~/components/layout/context-providers";
import { getServerAuthSession } from "~/server/auth";
import { Toaster } from "../components/ui/toaster";

export const metadata: Metadata = {
  title: "Blitzed",
  description: "TIHLDE's egen side for drikkeleker!",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerAuthSession();

  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <ContextProviders session={session}>
            <main className="flex w-full flex-col items-center justify-start">
              <Navbar />
              {children}
              <Footer />
            </main>
            <Toaster />
          </ContextProviders>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
