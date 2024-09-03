"use server";

import Logo from "~/components/logo";
import LogoSmall from "~/components/logo-small";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { ThemeModeToggler } from "~/components/ui/theme-mode-toggler";
import { UserRound } from "lucide-react";

export default async function Navbar() {
  return (
    <nav className="flex flex-col content-start bg-background">
      <div className="flex items-center justify-between border-b-[1px] p-3">
        <a href="/home">
          <Logo
            className="hidden fill-primary sm:block"
            width={200}
            height={"auto"}
          />
          <LogoSmall
            className="block fill-primary sm:hidden"
            width={200}
            height={"auto"}
          />
        </a>
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
