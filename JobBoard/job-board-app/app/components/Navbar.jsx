'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function Navbar() {
  const [theme, setTheme] = useState('system');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setTheme('dark');
    } else if (savedTheme === 'light') {
      document.documentElement.classList.remove('dark');
      setTheme('light');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark', prefersDark);
      setTheme('system');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    setTheme(newTheme);
  };

  return (
    <nav className="p-4 shadow-md flex justify-between items-center 
      bg-gradient-to-br from-[#d0f0e8] to-[#f0f9ff] text-[#1e293b] 
      dark:from-[#0f1f17] dark:to-[#1e293b] transition-colors duration-300">
      
      {/* Title */}
      <h1 className="font-extrabold text-2xl tracking-tight text-black drop-shadow-sm dark:text-white">
        JobBoard
      </h1>

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="flex items-center gap-2 px-4 py-2 rounded-full 
          bg-white text-[#1e293b] border border-black 
          hover:bg-[#f1f5f9] transition-all duration-200 ease-in-out
          dark:bg-[#1c2d25] dark:text-white dark:border-green-300 dark:hover:bg-[#243b32]"
      >
        {theme === 'dark' ? (
          <>
            <Sun className="h-4 w-4 text-yellow-300" /> Light Mode
          </>
        ) : (
          <>
            <Moon className="h-4 w-4 text-black" /> Dark Mode
          </>
        )}
      </button>
    </nav>
  );
}
