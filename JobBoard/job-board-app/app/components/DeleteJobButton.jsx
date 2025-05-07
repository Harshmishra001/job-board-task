'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DeleteJobButton({ jobId, isUserSubmitted }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Only show the delete button for user-submitted jobs
  if (!isUserSubmitted) {
    return null;
  }

  const handleDeleteClick = () => {
    setShowConfirmation(true);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  const handleConfirmDelete = async () => {
    try {
      setIsDeleting(true);
      setError(null);

      const response = await fetch(`/api/jobs/${jobId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete job');
      }

      // Redirect to home page after successful deletion
      router.push('/');
      router.refresh(); // Refresh the page to update the job listings
    } catch (err) {
      console.error('Error deleting job:', err);
      setError(err.message);
      setIsDeleting(false);
      setShowConfirmation(false);
    }
  };

  return (
    <div>
      {!showConfirmation ? (
        <button
          onClick={handleDeleteClick}
          className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 font-medium flex items-center gap-1"
          disabled={isDeleting}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Delete Job
        </button>
      ) : (
        <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg border border-red-200 dark:border-red-800 mt-4">
          <p className="text-red-700 dark:text-red-300 mb-4">
            Are you sure you want to delete this job? This action cannot be undone.
          </p>
          <div className="flex gap-3">
            <button
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Yes, Delete'}
            </button>
            <button
              onClick={handleCancelDelete}
              className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-md"
              disabled={isDeleting}
            >
              Cancel
            </button>
          </div>
          {error && (
            <p className="text-red-600 dark:text-red-400 mt-2">{error}</p>
          )}
        </div>
      )}
    </div>
  );
}
