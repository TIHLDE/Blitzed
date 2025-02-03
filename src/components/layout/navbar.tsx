"use server";

import { ThemeModeToggler } from "~/components/ui/theme-mode-toggler";
import { getServerAuthSession } from "~/server/auth";
import AvatarDropdown from "./avatar-dropdown";

export default async function Navbar() {
  const user = await getServerAuthSession();

  return (
    <nav className="flex w-full flex-col content-start bg-background">
      <div className="flex w-full items-center justify-between gap-3 border-b-[1px] p-3">
        <a href={user ? "/home" : ""}>
          <div className="flex items-end">
            <img
              src="/img/blitzed-logo.svg"
              width={35}
              height={"auto"}
              alt="blitzed-logo"
            />
            <p className="ml-3 hidden self-center text-3xl font-bold text-primary md:flex">
              {" "}
              Blitzed{" "}
            </p>
          </div>
        </a>
        <div className="flex gap-3">
          <AvatarDropdown user={user} />
          <ThemeModeToggler />
        </div>
      </div>
    </nav>
  );
}
