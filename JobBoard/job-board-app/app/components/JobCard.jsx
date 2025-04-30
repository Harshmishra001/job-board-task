'use client';

import { getCompanyInitial, getCompanyLogo } from '@/utils/getCompanyLogo';
import Link from 'next/link';
import { useState } from 'react';

export default function JobCard({ job }) {
  // Determine the job ID to use for the link
  // Prefer Job ID (Numeric) as it's more reliable
  const jobId = job["Job ID (Numeric)"] || job.id || job._id;

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

  return (
    <Link href={`/jobs/${jobId}`}>
      <div className="rounded-2xl p-6 transition-all duration-300 ease-in-out transform hover:scale-[1.015] cursor-pointer
        bg-gradient-to-br from-[#d0f0e8] to-[#f0f9ff] text-[#1e293b] border border-[#b6e1c2]
        dark:from-[#0f1f17] dark:to-[#1a2e28] dark:text-white dark:border-[#2f4f4f] hover:shadow-2xl">

        <div className="flex items-start gap-4">
          {/* Company Logo */}
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-white flex-shrink-0 border border-gray-200 shadow-sm">
            {!imageError ? (
              <img
                src={logoUrl}
                alt={`${job.company} logo`}
                className="w-full h-full object-contain"
                onError={handleImageError}
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-700 text-xl font-bold">{getCompanyInitial(job.company)}</span>
              </div>
            )}
          </div>

          <div className="flex-1">
            {/* Title */}
            <h2 className="text-xl font-extrabold mb-2 text-[#0f172a] dark:text-white">
              {job.title}
            </h2>

            {/* Company + Location */}
            <p className="text-[#334155] dark:text-gray-300 mb-1">
              <span className="font-semibold">{job.company}</span> &bull; {job.location}
            </p>

            {/* Experience */}
            <p className="text-[#0d9488] dark:text-[#38bdf8] font-semibold mb-3">
              {job.experience || `${job.min_exp || 0}-${job.max_exp || 5} Years`}
            </p>

            {/* Employment Type & Source */}
            <div className="flex gap-2 flex-wrap mb-2">
              {job.employment_type && (
                <span className="bg-[#e0f2fe] text-[#1e40af] dark:bg-[#1e293b] dark:text-[#bae6fd] text-xs font-medium px-3 py-1 rounded-full shadow-sm">
                  {job.employment_type}
                </span>
              )}
              {job.source && (
                <span className="bg-[#e0f2fe] text-[#1e40af] dark:bg-[#1e293b] dark:text-[#bae6fd] text-xs font-medium px-3 py-1 rounded-full shadow-sm">
                  {job.source}
                </span>
              )}
              {job.country && (
                <span className="bg-[#e0f2fe] text-[#1e40af] dark:bg-[#1e293b] dark:text-[#bae6fd] text-xs font-medium px-3 py-1 rounded-full shadow-sm">
                  {job.country}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
