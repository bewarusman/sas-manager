'use client';

import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <SessionProvider>
      <div className={darkMode ? 'dark' : ''}>
        <Header
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          toggleSidebar={toggleSidebar}
        />
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />

        <main className="min-h-screen text-gray-500 bg-gray-100 p-4 sm:ml-64 flex gap-2 flex-col lg:flex-row translate-full duration-300 mt-14 mr-5 dark:bg-gray-800">
          <div className="flex-1 flex flex-col gap-5">
            {children}
          </div>
        </main>
      </div>
    </SessionProvider>
  )
}
