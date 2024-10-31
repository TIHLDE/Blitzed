"use client";

import { Facebook, Instagram, Twitter } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { useSession } from "next-auth/react";
import LoginForm from "./login-form";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  return (
    <main className="relative h-[calc(100svh-4rem)] w-full">
      <img
        src="/img/login_background.png"
        alt="bakgrunn"
        className="absolute h-full w-full object-cover"
      />
      <div className="absolute z-10 flex h-full w-full items-center justify-center">
        <Card className="flex min-w-96 max-w-sm flex-col items-center justify-between gap-8 px-4 py-8">
          <div>
            <h2 className="font-md text-center text-xl">
              TIHLDE's nettside for
            </h2>
            <h1 className="text-center text-3xl font-bold uppercase">
              drikkeleker
            </h1>
          </div>
          <LoginButtons />
          <SocialMedia />
        </Card>
      </div>
    </main>
  );
}

function LoginButtons() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/home");
    }
  }, [status]);

  if (status === "loading") {
    return <div>Laster ...</div>;
  }

  if (status === "unauthenticated") {
    return <LoginForm />;
  }

  return (
    <>
      <Button className="h-12 w-52">Logg inn</Button>
      <Button className="h-12 w-52">Logg ut</Button>
    </>
  );
}

function SocialMedia() {
  return (
    <div>
      <div>følg oss på sosiale medier</div>
      <div className="mt-2 flex flex-row items-center justify-center gap-2">
        <Button type="button" variant={"outline"} className="bg-gray-200">
          <Facebook size={24} />
        </Button>
        <Button
          type="button"
          variant={"outline"}
          className="aspect-square bg-gray-200"
        >
          <Instagram size={24} />
        </Button>
        <Button type="button" variant={"outline"} className="bg-gray-200">
          <Twitter size={24} />
        </Button>
      </div>
    </div>
  );
}
