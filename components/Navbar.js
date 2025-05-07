'use client';

import { LoginForm, SignupForm } from '@/app/components/AuthForms';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'

  const openAuthModal = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
  };

  const handleAuthSuccess = () => {
    closeAuthModal();
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          Job Board
        </Link>
        <div className="flex space-x-4 items-center">
          <Link href="/" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>
          <Link href="/jobs/post" className="text-gray-700 hover:text-blue-600">
            Post a Job
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">
                Hello, {user?.name || 'User'}
              </span>
              <button
                onClick={logout}
                className="text-gray-700 hover:text-blue-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex space-x-4">
              <button
                onClick={() => openAuthModal('login')}
                className="text-gray-700 hover:text-blue-600"
              >
                Login
              </button>
              <button
                onClick={() => openAuthModal('signup')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {authMode === 'login' ? 'Log In' : 'Sign Up'}
              </h2>
              <button
                onClick={closeAuthModal}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>

            {authMode === 'login' ? (
              <div>
                <LoginForm onSuccess={handleAuthSuccess} />
                <p className="mt-4 text-center">
                  Don't have an account?{' '}
                  <button
                    onClick={() => setAuthMode('signup')}
                    className="text-blue-600 hover:underline"
                  >
                    Sign up
                  </button>
                </p>
              </div>
            ) : (
              <div>
                <SignupForm onSuccess={handleAuthSuccess} />
                <p className="mt-4 text-center">
                  Already have an account?{' '}
                  <button
                    onClick={() => setAuthMode('login')}
                    className="text-blue-600 hover:underline"
                  >
                    Log in
                  </button>
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
