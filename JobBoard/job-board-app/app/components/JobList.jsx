// components/JobList.jsx
'use client'

import { useEffect, useState } from 'react'
import { getJobs } from '@/utils/getJobs'
import JobCard from './JobCard'
import JobFilters from './JobFilters'

export default function JobList() {
  const [jobs, setJobs] = useState([])
  const [filteredJobs, setFilteredJobs] = useState([])
  const [locations, setLocations] = useState([])
  const [tags, setTags] = useState([])

  useEffect(() => {
    getJobs().then(data => {
      setJobs(data)
      setFilteredJobs(data)

      setLocations([...new Set(data.map(job => job.location))])
      setTags([...new Set(data.flatMap(job => job.tags))])
    })
  }, [])

  const handleFilterChange = ({ location, tag }) => {
    let filtered = [...jobs]
    if (location) filtered = filtered.filter(job => job.location === location)
    if (tag) filtered = filtered.filter(job => job.tags.includes(tag))
    setFilteredJobs(filtered)
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <JobFilters
        onFilterChange={handleFilterChange}
        availableLocations={locations}
        availableTags={tags}
      />

      <div className="grid gap-6">
        {filteredJobs.length > 0 ? (
          filteredJobs.map(job => <JobCard key={job.id} job={job} />)
        ) : (
          <p className="text-gray-600 dark:text-gray-400">No jobs found.</p>
        )}
      </div>
    </div>
  )
}
