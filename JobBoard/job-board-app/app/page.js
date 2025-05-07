'use client'

import AnimatedHero from '@/app/components/AnimatedHero'
import JobFilters from '@/app/components/Filter'
import JobCard from '@/app/components/JobCard'
import PostJobForm from '@/app/components/PostJobForm'
import { getJobs } from '@/utils/getJobs'
import { useEffect, useState } from 'react'

export default function HomePage() {
  const [jobs, setJobs] = useState([])
  const [filters, setFilters] = useState({})
  const [loading, setLoading] = useState(true)
  const [allLocations, setAllLocations] = useState([])

  // Fetch all jobs on initial load
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getJobs()
        setJobs(data)

        // Extract unique locations
        setAllLocations([...new Set(data.map((job) => job.location))])

        setLoading(false)
      } catch (error) {
        console.error('Failed to fetch jobs:', error)
        setLoading(false)
      }
    }

    fetchJobs()
  }, [])

  // Fetch filtered jobs when filters change
  useEffect(() => {
    const fetchFilteredJobs = async () => {
      try {
        setLoading(true)
        const data = await getJobs(filters)
        setJobs(data)
        setLoading(false)
      } catch (error) {
        console.error('Failed to fetch filtered jobs:', error)
        setLoading(false)
      }
    }

    fetchFilteredJobs()
  }, [filters])

  const handleFilterChange = (newFilters) => {
    console.log('HomePage: Applying filters:', newFilters);
    setFilters(newFilters);
  }

  // Handle job deletion
  const handleJobDelete = (jobId) => {
    console.log('HomePage: Deleting job with ID:', jobId);
    // Remove the job from the state
    setJobs(prevJobs => prevJobs.filter(job => {
      const currentJobId = job["Job ID (Numeric)"] || job.id || (job._id ? job._id.toString() : '');
      return currentJobId !== jobId;
    }));
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-500">
      {/* Animated Hero Section */}
      <AnimatedHero />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 animate-fadeIn delay-200">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 text-center">
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{jobs.length}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Available Jobs</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 text-center">
            <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{allLocations.length}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Locations</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 text-center">
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {[...new Set(jobs.map(job => job.company))].length}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Companies</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 text-center">
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
              {jobs.filter(job => job.postedDateTime && job.postedDateTime.$date &&
                (new Date() - new Date(job.postedDateTime.$date) < 86400000 * 7)).length}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">New This Week</p>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters on the Left (1/4 width on large screens) */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <JobFilters
                onFilterChange={handleFilterChange}
                availableLocations={allLocations}
              />
            </div>
          </div>

          {/* Job Cards (3/4 width on large screens) */}
          <div className="lg:col-span-3">
            {/* Job Posting Form */}
            <PostJobForm />

            {/* Job Listings Header */}
            <div id="jobs-section" className="flex justify-between items-center mb-6 scroll-mt-20">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {jobs.length} {jobs.length === 1 ? 'Job' : 'Jobs'} Available
              </h2>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Showing {jobs.length} of {jobs.length} results
              </div>
            </div>

            {loading ? (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 text-center animate-pulse-custom">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-blue-200 dark:bg-blue-900/40 animate-pulse"></div>
                  <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                  <div className="h-3 w-36 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                  <p className="text-gray-500 dark:text-gray-400 mt-2">Loading available jobs...</p>
                </div>
              </div>
            ) : (
              <>
                {jobs.length > 0 ? (
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {jobs.map((job, index) => (
                      <JobCard
                        key={job["Job ID (Numeric)"] || job.id || job._id || Math.random().toString(36).substring(7)}
                        job={job}
                        onDelete={handleJobDelete}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 text-center border border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">No jobs found</h3>
                      <p className="text-gray-500 dark:text-gray-400">Try adjusting your filters to find more opportunities</p>
                      <button
                        onClick={() => setFilters({})}
                        className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200"
                      >
                        Clear Filters
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  )

}
