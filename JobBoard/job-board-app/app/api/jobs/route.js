import dbConnect from '@/lib/mongoose';
import Job from '@/models/Job';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    console.log('API route /api/jobs called');
    const { searchParams } = new URL(request.url);
    const location = searchParams.get('location');
    const company = searchParams.get('company');

    console.log('Filters:', { location, company });

    await dbConnect();
    console.log('Connected to MongoDB');

    // Get all jobs
    const allJobs = await Job.find().lean();
    console.log(`Total jobs in database: ${allJobs.length}`);

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

    return NextResponse.json(filteredJobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch jobs' },
      { status: 500 }
    );
  }
}
