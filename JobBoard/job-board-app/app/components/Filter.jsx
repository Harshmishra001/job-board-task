'use client'

import { useState } from 'react'

export default function JobFilters({ onFilterChange, availableLocations }) {
  const [location, setLocation] = useState('')
  const [company, setCompany] = useState('')

  const handleFilter = () => {
    const filters = {
      location,
      company
    };

    console.log('Filter: Applying filters:', filters);
    onFilterChange(filters);
  }

  const handleReset = () => {
    setLocation('')
    setCompany('')
    onFilterChange({})
  }

  return (
    <div className="bg-green-100 dark:bg-[#0d1d1a] p-6 rounded-2xl shadow transition-colors duration-500 sticky top-6">
      <h3 className="text-xl font-bold mb-6 text-green-900 dark:text-white text-center">Filter Jobs</h3>

      <div className="flex flex-col gap-4">
        {/* Location Filter */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-green-800 dark:text-white">Location</label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="p-2 rounded border border-green-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">All Locations</option>
            {availableLocations.map((loc, idx) => (
              <option key={idx} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        {/* Company Filter */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-green-800 dark:text-white">Company</label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Search by company"
            className="p-2 rounded border border-green-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleFilter}
            className="mt-2 px-4 py-2 font-semibold bg-green-600 hover:bg-green-700 text-white rounded transition-colors duration-300 dark:bg-green-700 dark:hover:bg-green-600 flex-1"
          >
            Apply Filters
          </button>

          <button
            onClick={handleReset}
            className="mt-2 px-4 py-2 font-semibold bg-gray-300 hover:bg-gray-400 text-gray-800 rounded transition-colors duration-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}
