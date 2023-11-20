import Logo from '../Logo';
import ThemeToggler from '../ThemeToggler';

export default function Navbar() {
  return (
    <nav className="bg-primary dark:bg-primaryDark">
      <div className="flex justify-between items-center p-3 shadow-xl">
        <button className="w-12 h-12">
          <span className="material-icons-round text-text dark:text-textDark scale-150">
            menu
          </span>
        </button>
        <Logo
          className="fill-text dark:fill-textDark"
          width={200}
          height={'auto'}
        />
        <ThemeToggler />
      </div>
      <div id="sideBar" className="h-screen w-32 bg-dark hidden"></div>
    </nav>
  );
}
