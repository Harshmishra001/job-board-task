import Link from 'next/link';
import Image from 'next/image';
import { getCompanyLogo, getCompanyInitial } from '@/utils/getCompanyLogo';

export default function JobCard({ job }) {
  const companyLogo = getCompanyLogo(job);
  
  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };
  
  const postedDate = job.postedDateTime?.$date 
    ? formatDate(job.postedDateTime.$date)
    : 'Unknown date';
  
  return (
    <Link href={`/jobs/${job._id}`}>
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 mr-4 relative flex-shrink-0">
            {companyLogo ? (
              <Image
                src={companyLogo}
                alt={job.company || 'Company logo'}
                width={48}
                height={48}
                className="rounded-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div 
              className={`w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold ${companyLogo ? 'hidden' : ''}`}
            >
              {getCompanyInitial(job.company)}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold">{job.title}</h3>
            <p className="text-gray-600">{job.company}</p>
          </div>
        </div>
        <div className="mb-4">
          <p className="text-gray-700 mb-2">
            <span className="font-medium">Location:</span> {job.location}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Job Type:</span> {job.jobType || 'Full-time'}
          </p>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>Posted: {postedDate}</span>
          {job.source === 'User Submitted' && (
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
              New
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
