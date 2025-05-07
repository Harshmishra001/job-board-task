import dbConnect from '@/lib/mongoose';
import Job from '@/models/Job';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    console.log('API route /api/jobs called');
    const { searchParams } = new URL(request.url);
    const location = searchParams.get('location');
    const company = searchParams.get('company');
    const includeExpired = searchParams.get('includeExpired') === 'true';

    console.log('Filters:', { location, company, includeExpired });

    await dbConnect();
    console.log('Connected to MongoDB');

    // Get all jobs, excluding expired ones by default unless specifically requested

    let query = {};
    if (!includeExpired) {
      // Only include jobs that are not expired or where expired field doesn't exist
      query = { $or: [{ expired: { $ne: true } }, { expired: { $exists: false } }] };
    }

    const allJobs = await Job.find(query).lean();
    console.log(`Total jobs in database (${includeExpired ? 'including' : 'excluding'} expired): ${allJobs.length}`);

    // Filter jobs manually for more reliable filtering
    let filteredJobs = [...allJobs];

    // Apply location filter if provided
    if (location && location.trim() !== '') {
      console.log(`Filtering by location: ${location}`);
      filteredJobs = filteredJobs.filter(job =>
        job.location && job.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    // Apply company filter if provided
    if (company && company.trim() !== '') {
      console.log(`Filtering by company: ${company}`);
      filteredJobs = filteredJobs.filter(job =>
        job.company && job.company.toLowerCase().includes(company.toLowerCase())
      );
    }

    console.log(`Found ${filteredJobs.length} jobs after filtering`);

    // Sort jobs by posting date (newest first)
    filteredJobs.sort((a, b) => {
      // Try to get dates from postedDateTime
      let dateA, dateB;

      try {
        dateA = a.postedDateTime && a.postedDateTime.$date
          ? new Date(a.postedDateTime.$date)
          : new Date(0);
      } catch (e) {
        dateA = new Date(0);
      }

      try {
        dateB = b.postedDateTime && b.postedDateTime.$date
          ? new Date(b.postedDateTime.$date)
          : new Date(0);
      } catch (e) {
        dateB = new Date(0);
      }

      // Sort in descending order (newest first)
      return dateB - dateA;
    });

    return NextResponse.json(filteredJobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch jobs' },
      { status: 500 }
    );
  }
}
