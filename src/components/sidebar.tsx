import Link from 'next/link';
import { FaHome, FaChartBar, FaUser, FaDatabase } from 'react-icons/fa';
import Logout from './logout-button';
import { Role, User } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { FcSettings } from 'react-icons/fc';

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, toggleSidebar }) => {
  const { data: session } = useSession();
  const user: User | undefined = session?.user as User | undefined;

  return (
    <>
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700 transition-transform ${isSidebarOpen ? " translate-x-0" : " -translate-x-full"}`}
      >
        <div className="h-full px-3 pb-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li>
              <Link href="/" className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700' >
                <FaHome className='mr-2' />
                <span className='flex-1 me-3'>Home</span>
              </Link>
            </li>

            <li>
              <Link href="/analytics" className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700' >
                <FaChartBar className='mr-2' />
                <span className='flex-1 me-3'>Analytics</span>
              </Link>
            </li>

            {user?.role === Role.SUPER_ADMIN &&
              <>
                <li>
                  <Link href="/audit-logs" className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700' >
                    <FaDatabase className='mr-2' />
                    <span className='flex-1 me-3'>Audit Logs</span>
                  </Link>
                </li>
                <li>
                  <Link href="/app-user" className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700' >
                    <FaUser className='mr-2' />
                    <span className='flex-1 me-3'>App Users</span>
                  </Link>
                </li>
                <li>
                  <Link href="/settings" className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700' >
                    <FcSettings className='mr-2' />
                    <span className='flex-1 me-3'>Settings</span>
                  </Link>
                </li>
              </>}

            <li className='min-w-full'>
              <Logout />
            </li>
          </ul>
        </div>
      </aside>

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black opacity-50 z-20 md:hidden" onClick={toggleSidebar}></div>
      )}
    </>
  );
};

export default Sidebar;