import JobCard from '@/components/JobCard';
import { getJobs } from '@/utils/getJobs';

export default async function Home() {
  // Fetch jobs
  const jobs = await getJobs();

  return (
    <div>
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="container mx-auto py-20 px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Your Dream Job Today
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Browse thousands of job listings from top companies and apply with just a few clicks.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <p className="text-white text-xl animate-bounce">
              Scroll down to see jobs
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Latest Job Listings</h2>

        {jobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-xl text-gray-600">No jobs found. Check back later!</p>
          </div>
        )}
      </div>
    </div>
  );
}
