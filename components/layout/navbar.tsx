import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import { ThemeModeToggler } from '@/components/ui/theme-mode-toggler';
import { AlignJustify } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-background">
      <div className="flex justify-between items-center p-3 shadow-xl">
        <Button size={'icon'} variant={'ghost'}>
          <AlignJustify size={30} className="fill-primary stroke-[2px]" />
        </Button>
        <Logo className="fill-primary" width={200} height={'auto'} />
        <ThemeModeToggler />
      </div>
      <div id="sideBar" className="h-screen w-32 bg-dark hidden"></div>
    </nav>
  );
}
