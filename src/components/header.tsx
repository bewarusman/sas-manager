import Link from 'next/link';
import { FaBars, FaMoon, FaSun } from 'react-icons/fa';
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { MdSpaceDashboard } from "react-icons/md";

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode, toggleSidebar }) => {
  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className='px-3 py-3 lg:px-5 lg:pl-3'>
        <div className='flex justify-between items-center'>
          <div className="flex items-center justify-start rtl:justify-end">
            <button
              className='inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400  dark:hover:bg-gray-700 dark:focus:ring-gray-600'
              onClick={toggleSidebar}
            >
              <HiOutlineMenuAlt2 className='text-2xl' />
            </button>
            <Link href="/" className='flex ms-2 md:me-24'>
              <MdSpaceDashboard className='h-8 me-3 textxl text-violet-500' />
              <span className='self-center textxl font-semibold sm:text-sm whitespace-nowrap dark:text-white '>DaxBod</span>
            </Link>
          </div>

          <button onClick={toggleDarkMode} className='dark:bg-slate-50 dark:text-slate-700 rounded-full p-2'>{darkMode ? <FaSun /> : <FaMoon />}</button>
        </div>
      </div>
    </nav>
  );
};

export default Header;