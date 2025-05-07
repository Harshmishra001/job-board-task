import { getCompanyInitial, getCompanyLogo } from '@/utils/getCompanyLogo';
import Image from 'next/image';
import Link from 'next/link';

async function getJobDetails(id) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch job: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching job details:', error);
    return null;
  }
}

export default async function JobDetail({ params }) {
  const { id } = params;
  const job = await getJobDetails(id);

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  const postedDate = job?.postedDateTime?.$date
    ? formatDate(job.postedDateTime.$date)
    : 'Unknown date';

  const companyLogo = job ? getCompanyLogo(job) : '';

  return (
    <div className="container mx-auto py-8 px-4">
      <Link href="/" className="text-blue-500 hover:underline mb-6 inline-block">
        &larr; Back to Jobs
      </Link>

      {job ? (
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 my-6">
          <div className="flex flex-col md:flex-row md:items-center mb-6">
            <div className="w-16 h-16 mr-6 relative flex-shrink-0 mb-4 md:mb-0">
              {companyLogo ? (
                <Image
                  src={companyLogo}
                  alt={job.company || 'Company logo'}
                  width={64}
                  height={64}
                  className="rounded-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div
                className={`w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold ${companyLogo ? 'hidden' : ''}`}
              >
                {getCompanyInitial(job.company)}
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
              <p className="text-xl text-gray-600 mb-1">{job.company}</p>
              <p className="text-gray-500">{job.location}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 pb-6 border-b border-gray-200">
            <div>
              <h3 className="font-semibold text-gray-700">Job Type</h3>
              <p>{job.jobType || 'Full-time'}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">Salary</h3>
              <p>{job.salary || 'Not specified'}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">Posted On</h3>
              <p>{postedDate}</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Job Description</h2>
            <div className="prose max-w-none">
              <p>{job.description || 'No description provided.'}</p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">How to Apply</h2>
            <div className="prose max-w-none">
              <p>{job.howToApply || 'Please contact the employer directly for application instructions.'}</p>
            </div>
          </div>

          {job.applyUrl && (
            <div className="mt-8">
              <a
                href={job.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg inline-block transition-colors"
              >
                Apply Now
              </a>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 my-6">
          <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
          <p className="text-gray-600 mb-4">Sorry, we couldn't find the job you're looking for.</p>
          <Link href="/" className="text-blue-500 hover:underline">
            Browse all jobs
          </Link>
        </div>
      )}
    </div>
  );
}
