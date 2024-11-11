"use client";

import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { UserRound } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Session } from "next-auth";
import { useMemo } from "react";
import { signIn, signOut } from "next-auth/react";

interface DropdownItem {
  name: string;
  href?: string;
  onClick?: () => void;
}

export default function AvatarDropdown({ user }: { user: Session | null }) {
  const solutions: DropdownItem[] = useMemo(() => {
    if (user === null) {
      return [
        {
          name: "Logg inn",
          onClick: () => signIn(),
        },
      ];
    }

    return [{ name: "Logg ut", onClick: () => signOut() }];
  }, [user]);

  return (
    <Popover className="relative">
      <PopoverButton as={Button} size={"icon"} variant={"ghost"}>
        <Avatar className="duration-100 hover:brightness-90">
          {Boolean(user?.user.image) && (
            <AvatarImage src={user!.user.image ?? undefined} alt="@profile" />
          )}
          <AvatarFallback>
            <UserRound className="text-foreground" />
          </AvatarFallback>
        </Avatar>
      </PopoverButton>

      <PopoverPanel
        transition
        className="absolute left-1/2 z-10 mt-5 flex w-fit max-w-40 -translate-x-1/2 px-2 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="w-56 shrink rounded-xl bg-white p-4 text-sm/6 font-semibold text-gray-900 shadow-lg ring-1 ring-gray-900/5">
          {solutions.map((item) =>
            Boolean(item.href) ? (
              <a
                key={item.name}
                href={item.href}
                className="block p-2 hover:text-indigo-600"
              >
                {item.name}
              </a>
            ) : (
              <span
                key={item.name}
                onClick={item.onClick!}
                className="block cursor-pointer p-2 hover:text-indigo-600"
              >
                {item.name}
              </span>
            ),
          )}
        </div>
      </PopoverPanel>
    </Popover>
  );
}
