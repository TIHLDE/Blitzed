import Image from 'next/image';
import Logo from '../Logo';

export default function Navbar() {
  return (
    <nav className="bg-slate-950">
      <div className='bg-dark flex justify-between p-3 align-middle content-center "ml-60 mr-60" shadow-xl'>
        <button className="bg-dark w-12 h-12 border-r-secondary float-left">
          <span className="material-icons-round text-primary text-6xl">
            menu
          </span>
        </button>
        <Logo
          className="fill-green-500 dark:fill-green-200"
          width={200}
          height={'auto'}
        />
        <div className="w-16 h-16" />
      </div>
      <div id="sideBar" className="h-screen w-32 bg-dark hidden"></div>
    </nav>
  );
}
