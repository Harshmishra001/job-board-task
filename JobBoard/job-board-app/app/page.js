'use client'

import JobFilters from '@/app/components/Filter'
import JobCard from '@/app/components/JobCard'
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

  return (
    <div className="min-h-screen dark:from-[#000000] dark:via-[#0b2e22] dark:to-[#09281e] text-[#2f3e46] dark:text-white transition-colors duration-500">
      <main className="mx-auto px-4 py-12 max-w-7xl">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-12 text-center tracking-tight text-black dark:text-white drop-shadow-md">
          Discover Your Next Role
        </h1>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters on the Left (1/4 width on large screens) */}
          <div className="lg:col-span-1">
            <JobFilters
              onFilterChange={handleFilterChange}
              availableLocations={allLocations}
            />
          </div>

          {/* Job Cards (3/4 width on large screens) */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <p className="text-lg">Loading jobs...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {jobs.length > 0 ? (
                  jobs.map((job) => <JobCard key={job["Job ID (Numeric)"] || job.id || job._id || Math.random().toString(36).substring(7)} job={job} />)
                ) : (
                  <p className="text-center col-span-full text-gray-700 dark:text-gray-300">No jobs match your filters.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )

}
