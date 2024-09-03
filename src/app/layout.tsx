import "../style/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { TRPCReactProvider } from "../trpc/react";
import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer";
import ContextProviders from "~/components/layout/context-providers";
import { getServerAuthSession } from "~/server/auth";

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
            <Navbar />
            {children}
            <Footer />
          </ContextProviders>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
