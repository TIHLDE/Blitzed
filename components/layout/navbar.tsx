import Logo from '@/components/logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ThemeModeToggler } from '@/components/ui/theme-mode-toggler';
import { AlignJustify, UserRound } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-background flex flex-col content-start">
      <div className="flex justify-between items-center p-3 border-b-[1px]">
        <Sheet>
          <SheetTrigger asChild>
            <Button size={'icon'} variant={'ghost'}>
              <AlignJustify size={30} className="fill-primary stroke-[2px]" />
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
        <Logo
          className="fill-primary opacity-0 sm:opacity-100"
          width={200}
          height={'auto'}
        />
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
