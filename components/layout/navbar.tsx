import Logo from '@/components/logo';
import LogoSmall from '@/components/logo-small';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ThemeModeToggler } from '@/components/ui/theme-mode-toggler';
import { UserRound } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-background flex flex-col content-start">
      <div className="flex justify-between items-center p-3 border-b-[1px]">
        {/*
        <Sheet>
          <SheetTrigger asChild>
            <Button size={'icon'} variant={'ghost'}>
              <HamburgerMenuIcon
                size={30}
                className="fill-primary stroke-[2px]"
              />
            </Button>
          </SheetTrigger>
          <SheetContent side={'left'}>
            <SheetHeader>
              <SheetTitle>Side menu</SheetTitle>
              <SheetDescription>
                This is a really cool side menu.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
*/}
        <a href="/user/template/home">
          <Logo
            className="fill-primary hidden sm:block"
            width={200}
            height={'auto'}
          />
          <LogoSmall
            className="fill-primary sm:hidden block"
            width={200}
            height={'auto'}
          />
        </a>
        <div className="flex gap-3">
          <Button size={'icon'} variant={'ghost'}>
            <Avatar className=" hover:brightness-90 duration-100">
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
