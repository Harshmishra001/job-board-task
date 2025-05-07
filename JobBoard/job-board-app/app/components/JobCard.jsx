'use client';

import { getCompanyInitial, getCompanyLogo } from '@/utils/getCompanyLogo';
import Link from 'next/link';
import { useState } from 'react';

import { useAuth } from '@/context/AuthContext';

// Helper function to format dates
const formatDate = (dateString) => {
  try {
    const date = new Date(dateString);

    // Check if date is valid
    if (isNaN(date.getTime())) {
      return 'Recently';
    }

    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Recently';
  }
};

export default function JobCard({ job, onDelete }) {
  const { user, isAuthenticated } = useAuth();
  // Determine the job ID to use for the link
  // Prefer Job ID (Numeric) as it's more reliable
  const jobId = job["Job ID (Numeric)"] || job.id || (job._id ? job._id.toString() : '');

  // Log the job ID for debugging
  console.log('Job ID in JobCard:', jobId, 'Type:', typeof jobId);

  // State for image loading error
  const [imageError, setImageError] = useState(false);

  // Get company logo URL
  const logoUrl = getCompanyLogo(job);

  // Handle image loading error
  const handleImageError = () => {
    setImageError(true);
  };

  if (!jobId) {
    console.error(`JobCard: No ID found for job: ${job.title}`);
  }

  // Function to handle job deletion
  const handleDeleteJob = async (e) => {
    e.preventDefault(); // Prevent navigation to job details
    e.stopPropagation(); // Prevent event bubbling

    console.log('Delete button clicked for job ID:', jobId);

    if (window.confirm('Are you sure you want to delete this job? This action cannot be undone.')) {
      try {
        console.log('Sending DELETE request to:', `/api/jobs/${jobId}`);

        const response = await fetch(`/api/jobs/${jobId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log('Delete response status:', response.status);

        if (response.ok) {
          const data = await response.json();
          console.log('Delete response data:', data);

          // Call the onDelete callback if provided
          if (onDelete && typeof onDelete === 'function') {
            onDelete(jobId);
          }

          alert('Job deleted successfully');
        } else {
          const errorData = await response.json();
          console.error('Delete response error:', errorData);
          throw new Error(errorData.error || 'Failed to delete job');
        }
      } catch (error) {
        console.error('Error deleting job:', error);
        alert('Error deleting job: ' + error.message);
      }
    }
  };



  return (
    <div className="relative group">
      <Link href={`/jobs/${jobId}`} className="block">
        <div className="card rounded-xl p-6 transition-all duration-300 ease-in-out transform hover:translate-y-[-2px] cursor-pointer
          bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
          hover:shadow-lg">

          {/* Job expired badge */}
          {job.expired && (
            <div className="absolute top-3 left-3 bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300 text-xs font-medium px-2.5 py-1 rounded-full shadow-sm z-10">
              Expired
            </div>
          )}

          {/* New job indicator */}
          {job.postedDateTime && job.postedDateTime.$date &&
            (new Date() - new Date(job.postedDateTime.$date) < 86400000 * 2) && !job.expired && (
            <div className="absolute top-3 left-3 bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300 text-xs font-medium px-2.5 py-1 rounded-full shadow-sm z-10 animate-pulse-custom">
              New
            </div>
          )}

          {/* Subtle gradient overlay for hover effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-indigo-600/0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-xl"></div>

          <div className="flex items-start gap-4">
            {/* Company Logo */}
            <div className="w-16 h-16 rounded-lg overflow-hidden bg-white flex-shrink-0 border border-gray-200 dark:border-gray-700 shadow-sm">
              {!imageError ? (
                <img
                  src={logoUrl}
                  alt={`${job.company} logo`}
                  className="w-full h-full object-contain"
                  onError={handleImageError}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">{getCompanyInitial(job.company)}</span>
                </div>
              )}
            </div>

            <div className="flex-1">
              {/* Title */}
              <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                {job.title}
              </h2>

              {/* Company + Location */}
              <p className="text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                <span className="font-medium">{job.company}</span>
                <span className="mx-2 text-gray-400">•</span>
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {job.location}
                </span>
              </p>

              {/* Experience */}
              <p className="text-blue-600 dark:text-blue-400 font-medium mb-3 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {job.experience || `${job.min_exp || 0}-${job.max_exp || 5} Years`}
              </p>

              {/* Employment Type & Source */}
              <div className="flex gap-2 flex-wrap mb-2">
                {job.employment_type && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                    {job.employment_type}
                  </span>
                )}
                {job.source && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                    {job.source}
                  </span>
                )}
                {job.country && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600">
                    {job.country}
                  </span>
                )}
              </div>

              {/* Posted date */}
              <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {job.postedDateTime && job.postedDateTime.$date ? (
                  <time dateTime={new Date(job.postedDateTime.$date).toISOString()}>
                    Posted {formatDate(job.postedDateTime.$date)}
                  </time>
                ) : (
                  'Recently posted'
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* Action buttons based on authentication and permissions */}
      <div className="absolute top-3 right-3 flex gap-2 z-20">
        {/* Apply button for job seekers */}
        {isAuthenticated && user?.role === 'jobseeker' && (
          <a
            href={job.job_link || '#'}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              if (job.job_link) {
                window.open(job.job_link, '_blank');
              } else {
                alert('No application link available for this job.');
              }
            }}
            className="bg-green-100 text-green-600 hover:bg-green-200 dark:bg-green-900/40 dark:text-green-300 dark:hover:bg-green-800/60 p-2 rounded-full shadow-sm transition-all duration-200 hover:scale-105"
            title={job.job_link ? "Apply for this job" : "No application link available"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </a>
        )}

        {/* Delete button only for employers or if the job was posted by the current user */}
        {isAuthenticated && (
          (user?.role === 'employer' ||
           (job.source === 'User Submitted' && job.postedBy === user?.id)) && (
            <button
              onClick={handleDeleteJob}
              className="bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/40 dark:text-red-300 dark:hover:bg-red-800/60 p-2 rounded-full shadow-sm transition-all duration-200 hover:scale-105"
              title="Delete Job"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )
        )}
      </div>
    </div>
  );
}
