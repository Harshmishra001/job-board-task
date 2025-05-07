'use client';

import { getCompanyLogo } from '@/utils/getCompanyLogo';
import { getJobs } from '@/utils/getJobs';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function SimilarJobs({ currentJob }) {
  const [similarJobs, setSimilarJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSimilarJobs = async () => {
      try {
        setLoading(true);
        // Fetch jobs with similar location or company
        const allJobs = await getJobs();

        // Filter jobs that are similar but not the current job
        let filtered = allJobs.filter(job => {
          const isSameJob = job["Job ID (Numeric)"] === currentJob["Job ID (Numeric)"] ||
                           job.id === currentJob.id ||
                           (job._id && job._id.toString() === currentJob._id?.toString());

          if (isSameJob) return false;

          // Check if job has similar attributes
          const hasSameLocation = job.location && currentJob.location &&
                                 job.location.toLowerCase().includes(currentJob.location.toLowerCase());
          const hasSameCompany = job.company && currentJob.company &&
                               job.company.toLowerCase() === currentJob.company.toLowerCase();
          const hasSimilarTitle = job.title && currentJob.title &&
                                 (job.title.toLowerCase().includes(currentJob.title.toLowerCase()) ||
                                  currentJob.title.toLowerCase().includes(job.title.toLowerCase()));

          return hasSameLocation || hasSameCompany || hasSimilarTitle;
        });

        // Limit to 4 similar jobs
        filtered = filtered.slice(0, 4);

        setSimilarJobs(filtered);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching similar jobs:', error);
        setLoading(false);
      }
    };

    if (currentJob) {
      fetchSimilarJobs();
    }
  }, [currentJob]);

  if (loading) {
    return (
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Similar Jobs</h2>
        <div className="animate-pulse">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="bg-gray-200 dark:bg-gray-700 h-24 rounded-lg mb-3"></div>
          ))}
        </div>
      </div>
    );
  }

  if (similarJobs.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 animate-fadeIn" style={{ animationDelay: '300ms' }}>
      <h2 className="text-2xl font-bold mb-4">Similar Jobs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {similarJobs.map((job, index) => {
          const jobId = job["Job ID (Numeric)"] || job.id || job._id;
          return (
            <Link href={`/jobs/${jobId}`} key={jobId}>
              <div
                className="bg-white/50 dark:bg-gray-800/30 p-4 rounded-lg hover:shadow-md transition-all duration-300 border border-green-100 dark:border-gray-700 animate-slideIn"
                style={{ animationDelay: `${(index + 1) * 150}ms` }}
              >
                <div className="flex items-center gap-3">
                  {/* Small company logo */}
                  <div className="w-10 h-10 rounded-md overflow-hidden bg-white flex-shrink-0 border border-gray-200">
                    <img
                      src={getCompanyLogo(job)}
                      alt={`${job.company} logo`}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(job.company)}&size=40&background=random&color=fff`;
                      }}
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{job.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{job.company} • {job.location}</p>
                    <p className="text-green-600 dark:text-green-400 text-sm mt-1">
                      {job.experience || `${job.min_exp || 0}-${job.max_exp || 5} Years`}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
