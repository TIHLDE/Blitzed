"use server";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { ThemeModeToggler } from "~/components/ui/theme-mode-toggler";
import { UserRound } from "lucide-react";

export default async function Navbar() {
  return (
    <nav className="flex w-full flex-col content-start bg-background">
      <div className="flex w-full items-center justify-between gap-3 border-b-[1px] p-3">
        <div className="flex items-end">
          <a href="/home">
            <img
              src="img/blitzed-logo.svg"
              width={35}
              height={"auto"}
              alt="blitzed-logo"
            />
          </a>
          <p className="hidden self-center text-3xl font-bold text-primary md:flex">
            {" "}
            Blitzed{" "}
          </p>
        </div>
        <div className="flex gap-3">
          <Button size={"icon"} variant={"ghost"}>
            <Avatar className="duration-100 hover:brightness-90">
              <AvatarImage src="https://github.com/shadcn.png" alt="@profile" />
              <AvatarFallback>
                <UserRound className="text-foreground" />
              </AvatarFallback>
            </Avatar>
          </Button>
          <ThemeModeToggler />
        </div>
      </div>
    </nav>
  );
}
