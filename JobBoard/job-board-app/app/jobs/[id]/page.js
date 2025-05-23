'use client';

import ShareJob from '@/app/components/ShareJob';
import SimilarJobs from '@/app/components/SimilarJobs';
import { useAuth } from '@/context/AuthContext';
import { getCompanyInitial, getCompanyLogo } from '@/utils/getCompanyLogo';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function JobDetailsPage({ params }) {
  const { user, isAuthenticated } = useAuth();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);

  // Create a local copy of params to avoid the async warning
  const jobId = params?.id;

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        console.log('JobDetailsPage: Fetching job with ID:', jobId);

        // Fetch job data
        const response = await fetch(`/api/jobs/${jobId}`, {
          cache: 'no-store'
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch job: ${response.statusText}`);
        }

        const jobData = await response.json();

        // Check if the response contains an error message
        if (jobData.error) {
          throw new Error(jobData.error);
        }

        if (!jobData) {
          throw new Error(`Job with ID ${jobId} not found`);
        }

        setJob(jobData);
        setLoading(false);
      } catch (err) {
        console.error('Error in JobDetailsPage:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  // Reset image error state when job changes
  useEffect(() => {
    setImageError(false);
  }, [job]);

  // Handle image loading error
  const handleImageError = () => {
    setImageError(true);
  };

  // Loading state
  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-6 mt-4">
        <div className="animate-pulse">
          <div className="flex items-start gap-6 mb-6">
            {/* Company Logo Placeholder */}
            <div className="w-24 h-24 rounded-lg bg-gray-300 dark:bg-gray-700"></div>

            <div className="flex-1">
              {/* Title Placeholder */}
              <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>

              {/* Company & Location Placeholder */}
              <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/2 mb-2"></div>

              {/* Experience Placeholder */}
              <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/3 mb-4"></div>
            </div>
          </div>

          {/* Job Details Placeholder */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-200 dark:bg-gray-700 p-4 rounded-lg h-48"></div>
            <div className="bg-gray-200 dark:bg-gray-700 p-4 rounded-lg h-48"></div>
          </div>

          {/* Buttons Placeholder */}
          <div className="flex gap-4">
            <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-32"></div>
            <div className="h-10 bg-gray-200 dark:bg-gray-600 rounded w-32"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-6 max-w-3xl mx-auto text-[#2f3e46] dark:text-white transition-colors duration-500">
        <h2 className="text-2xl font-bold">Error loading job details</h2>
        <p className="text-red-500 mt-2">{error}</p>
        <Link href="/" className="text-blue-600 dark:text-blue-300 underline mt-4 block">
          ← Back to Listings
        </Link>
      </div>
    );
  }

  // Get company logo URL
  const logoUrl = getCompanyLogo(job);

  // Success state
  return (
    <div className="max-w-4xl mx-auto p-4 mb-10">
      {/* Main Job Card with Animation */}
      <main className="p-6 rounded-xl mt-4 animate-fadeIn
        bg-gradient-to-br from-[#d0f0e8] to-[#f0f9ff] text-[#1e293b] border border-[#b6e1c2]
        dark:from-[#0f1f17] dark:to-[#1a2e28] dark:text-white dark:border-[#2f4f4f]
        transition-all duration-500 transform hover:shadow-xl">

        <div className="mb-6">
          {/* Job Title */}
          <h1 className="text-3xl font-bold mb-2">{job.title}</h1>

          {/* Company & Location */}
          <p className="text-gray-600 dark:text-gray-300 mb-1">
            {job.company} — {job.location}
          </p>

          {/* Experience */}
          <p className="text-green-700 dark:text-green-300 mb-4">
            Experience: {job.experience || `${job.min_exp || 0}-${job.max_exp || 5} Years`}
          </p>

          {/* Apply Button and Back Link */}
          <div className="flex flex-wrap gap-4 items-center">
            {job.job_link ? (
              <a
                href={job.job_link}
                target="_blank"
                className="bg-sky-600 dark:bg-sky-700 text-white font-semibold px-6 py-3 rounded shadow hover:bg-sky-700 dark:hover:bg-sky-600 transition-colors duration-300 text-center"
              >
                Apply Now
              </a>
            ) : (
              <button
                className="bg-gray-400 dark:bg-gray-600 text-white font-semibold px-6 py-3 rounded shadow cursor-not-allowed text-center"
                disabled
              >
                No Application Link Available
              </button>
            )}

            {/* Back Link */}
            <Link href="/" className="text-blue-600 dark:text-green-300 hover:underline text-center">
              ← Back to Listings
            </Link>

            {/* Job Actions - Only shown for user-submitted jobs and authenticated users */}
            {job.source === 'User Submitted' && isAuthenticated && (
              <div className="ml-auto flex flex-col gap-2">
                {/* Check if user is employer or the job creator */}
                {(user?.role === 'employer' || job.postedBy === user?.id) && (
                  <>
                    {/* Expire Job Button */}
                    {!job.expired && (
                      <button
                        onClick={() => {
                          if (window.confirm('Are you sure you want to mark this job as expired? It will no longer appear in job listings.')) {
                            fetch(`/api/jobs/${job.id || job["Job ID (Numeric)"] || job._id}/expire`, {
                              method: 'PATCH',
                              headers: {
                                'Content-Type': 'application/json',
                              },
                            })
                              .then(response => {
                                if (response.ok) {
                                  alert('Job marked as expired successfully');
                                  window.location.reload();
                                } else {
                                  throw new Error('Failed to expire job');
                                }
                              })
                              .catch(error => {
                                console.error('Error expiring job:', error);
                                alert('Error expiring job: ' + error.message);
                              });
                          }
                        }}
                        className="text-yellow-600 hover:text-yellow-800 dark:text-yellow-400 dark:hover:text-yellow-300 font-medium flex items-center gap-1"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Mark as Expired
                      </button>
                    )}

                    {/* Delete Job Button */}
                    <button
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete this job? This action cannot be undone.')) {
                          fetch(`/api/jobs/${job.id || job["Job ID (Numeric)"] || job._id}`, {
                            method: 'DELETE',
                            headers: {
                              'Content-Type': 'application/json',
                            },
                          })
                            .then(response => {
                              if (response.ok) {
                                alert('Job deleted successfully');
                                window.location.href = '/';
                              } else {
                                throw new Error('Failed to delete job');
                              }
                            })
                            .catch(error => {
                              console.error('Error deleting job:', error);
                              alert('Error deleting job: ' + error.message);
                            });
                        }
                      }}
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 font-medium flex items-center gap-1"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete Job
                    </button>
                  </>
                )}

                {/* Message for job seekers */}
                {user?.role === 'jobseeker' && (
                  <div className="text-sm text-gray-600 dark:text-gray-400 italic">
                    You can apply to this job but cannot modify or delete it.
                  </div>
                )}
              </div>
            )}

            {/* Expired Badge */}
            {job.expired && (
              <div className="ml-auto bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200 text-sm font-bold px-3 py-1 rounded-md">
                EXPIRED
              </div>
            )}
          </div>
        </div>

        {/* Job Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white/50 dark:bg-gray-800/30 p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Job Details</h2>
            <ul className="space-y-2">
              <li><span className="font-semibold">Employment Type:</span> {job.employment_type || "Not specified"}</li>
              <li><span className="font-semibold">Source:</span> {job.source || "Not specified"}</li>
              <li><span className="font-semibold">Country:</span> {job.country || "Not specified"}</li>
              {job.seniority_level && <li><span className="font-semibold">Seniority Level:</span> {job.seniority_level}</li>}
              {job.postedDateTime && <li><span className="font-semibold">Posted:</span> {
                (() => {
                  try {
                    if (job.postedDateTime.$date) {
                      return new Date(job.postedDateTime.$date).toLocaleDateString();
                    }
                    return "Date not available";
                  } catch (error) {
                    console.error("Error formatting date:", error);
                    return "Date format error";
                  }
                })()
              }</li>}
            </ul>
          </div>

          <div className="bg-white/50 dark:bg-gray-800/30 p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Company Info</h2>

            {/* Company Logo Section */}
            <div className="flex items-center gap-4 mb-4 p-3 bg-white/70 dark:bg-gray-800/50 rounded-lg">
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-white flex-shrink-0 border border-gray-200 shadow-sm">
                {!imageError ? (
                  <img
                    src={logoUrl}
                    alt={`${job.company} logo`}
                    className="w-full h-full object-contain p-1"
                    onError={handleImageError}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-700 text-xl font-bold">{getCompanyInitial(job.company)}</span>
                  </div>
                )}
              </div>

              <div>
                <h3 className="font-bold text-lg">{job.company}</h3>
                {job.companytype && <p className="text-sm text-gray-600 dark:text-gray-400">Size: {job.companytype}</p>}
                {job.company_url && (
                  <a
                    href={job.company_url}
                    target="_blank"
                    className="text-blue-600 dark:text-blue-400 hover:underline text-sm inline-flex items-center gap-1 mt-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Visit Website
                  </a>
                )}
              </div>
            </div>

            <ul className="space-y-2">
              <li><span className="font-semibold">Location:</span> {job.location}</li>
              {job.country && <li><span className="font-semibold">Country:</span> {job.country}</li>}
              {job.source && <li><span className="font-semibold">Source:</span> {job.source}</li>}
            </ul>
          </div>
        </div>

        {/* Share Job Component */}
        <ShareJob job={job} />

      </main>

      {/* Similar Jobs Section */}
      <div className="mt-8">
        <SimilarJobs currentJob={job} />
      </div>
    </div>
  );
}
