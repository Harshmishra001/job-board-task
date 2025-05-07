import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          Job Board
        </Link>
        <div className="flex space-x-4">
          <Link href="/" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>
          <Link href="/jobs/post" className="text-gray-700 hover:text-blue-600">
            Post a Job
          </Link>
        </div>
      </div>
    </nav>
  );
}
