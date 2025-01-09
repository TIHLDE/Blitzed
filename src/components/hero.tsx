"use client";

import * as React from "react";
import { signIn, signOut } from "next-auth/react";
import { useMemo } from "react";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Separator } from "@radix-ui/react-separator";
import { Facebook, Instagram, Twitter } from "lucide-react";

/// Main card displayed with login buttons etc
export default function HeroCard() {
  return (
    <Card
      className={"absolute left-3 right-3 my-20 ml-auto mr-auto max-w-[372px]"}
    >
      <CardHeader>
        <CardDescription className={"text-center text-lg lg:text-xl"}>
          Tihldes nettside for
        </CardDescription>
        <CardTitle
          className={
            "mt-0 space-y-0 text-center text-2xl font-bold lg:text-3xl"
          }
        >
          DRIKKELEKER
        </CardTitle>
      </CardHeader>
      <CardContent
        className={"flex w-full flex-col items-center justify-evenly gap-2"}
      >
        <ActionButtons />
        <Separator className={"my-6 min-w-[60%]"} />
        <CardDescription className={"text-md mb-2 text-center"}>
          Følg oss på sosiale medier
        </CardDescription>
        <div className="flex place-content-center items-center gap-x-6 gap-y-4 md:flex md:justify-center md:gap-x-0 md:gap-y-0 md:space-x-4">
          <Link
            href="https://www.facebook.com/tihlde/"
            target="_blank"
            className="flex justify-center"
          >
            <Button variant={"outline"} size={"icon"}>
              <Facebook />
            </Button>
          </Link>

          <a
            href="https://www.instagram.com/tihlde/"
            target="_blank"
            className="flex justify-center"
          >
            <Button variant={"outline"} size={"icon"}>
              <Instagram />
            </Button>
          </a>

          <a
            href="https://twitter.com/tihlde"
            target="_blank"
            className="flex justify-center"
          >
            <Button variant={"outline"} size={"icon"}>
              <Twitter />
            </Button>
          </a>
        </div>
      </CardContent>
    </Card>
  );
}

function ActionButtons() {
  const { status, data } = useSession();

  return (
    <>
      {status === "authenticated" && (
        <Button className={"h-12 w-full max-w-full lg:w-[80%]"} asChild>
          <Link href={"/home"}>Fortsett som {data!.user.nickname}</Link>
        </Button>
      )}
      <div className={"flex w-full flex-row justify-between gap-2 lg:w-[80%]"}>
        {status === "loading" ? (
          <Skeleton className={"h-10 w-full"} />
        ) : status === "authenticated" ? (
          <Button
            variant={"outline"}
            className={"w-full"}
            onClick={() => signOut()}
          >
            Logg ut
          </Button>
        ) : (
          <>
            <Button
              variant={"default"}
              className={"w-full"}
              onClick={() => signIn()}
            >
              Logg inn
            </Button>
            <Button variant={"outline"} className={"w-full"} asChild>
              <Link href={"https://tihlde.org/ny-bruker/"}>Registrer deg</Link>
            </Button>
          </>
        )}
      </div>
    </>
  );
}
