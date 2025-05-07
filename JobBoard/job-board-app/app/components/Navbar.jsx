'use client';

import { useAuth } from '@/context/AuthContext';
import { Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { LoginForm, SignupForm } from './AuthForms';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [theme, setTheme] = useState('system');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);

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

  // Close user menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    setTheme(newTheme);
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
  };

  const toggleAuthMode = () => {
    setAuthMode(authMode === 'login' ? 'signup' : 'login');
  };

  return (
    <>
      <nav className="sticky top-0 z-50 px-4 py-3 shadow-md flex justify-between items-center
        bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-all duration-300">

        {/* Logo and Title */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <span className="text-white font-bold text-xl">JB</span>
          </div>
          <h1 className="font-bold text-xl md:text-2xl tracking-tight text-gray-900 dark:text-white">
            JobBoard
          </h1>
        </Link>

        <div className="flex items-center gap-3 md:gap-4">
          {/* User Profile or Auth Buttons */}
          {isAuthenticated ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold shadow-md hover:shadow-lg transition-all duration-200"
                title={user?.name}
              >
                {user?.name?.charAt(0).toUpperCase()}
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-1 z-10 animate-scaleIn border border-gray-200 dark:border-gray-700">
                  <div className="px-4 py-3 text-sm border-b dark:border-gray-700">
                    <p className="font-semibold text-gray-800 dark:text-white">{user?.name}</p>
                    <p className="text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
                    <div className="mt-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user?.role === 'jobseeker'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                          : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                      }`}>
                        {user?.role === 'jobseeker' ? 'Job Seeker' : 'Employer'}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={logout}
                    className="flex w-full items-center text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex space-x-2 md:space-x-4">
              <button
                onClick={() => {
                  setAuthMode('login');
                  setShowAuthModal(true);
                }}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Log In
              </button>
              <button
                onClick={() => {
                  setAuthMode('signup');
                  setShowAuthModal(true);
                }}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200"
              >
                Sign Up
              </button>
            </div>
          )}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-10 h-10 rounded-full
              bg-gray-100 text-gray-700 border border-gray-300
              hover:bg-gray-200 transition-all duration-200
              dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-700"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5 text-yellow-400" />
            ) : (
              <Moon className="h-5 w-5 text-gray-700" />
            )}
          </button>
        </div>
      </nav>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-scaleIn border border-gray-200 dark:border-gray-700">
            <div className="relative">
              {/* Header with gradient background */}
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 rounded-t-xl">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-white">
                    {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
                  </h2>
                  <button
                    onClick={() => setShowAuthModal(false)}
                    className="text-white hover:text-gray-200 transition-colors"
                    aria-label="Close"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <p className="text-blue-100 mt-2 text-sm">
                  {authMode === 'login'
                    ? 'Sign in to access your account'
                    : 'Join our platform to find your next opportunity'}
                </p>
              </div>

              {/* Form Content */}
              <div className="p-6">
                {authMode === 'login' ? (
                  <LoginForm onSuccess={handleAuthSuccess} />
                ) : (
                  <SignupForm onSuccess={handleAuthSuccess} />
                )}

                <div className="mt-6 text-center">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                        {authMode === 'login' ? 'New to JobBoard?' : 'Already have an account?'}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={toggleAuthMode}
                    className="mt-4 w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
                  >
                    {authMode === 'login' ? 'Create an account' : 'Sign in to your account'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
