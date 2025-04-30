import dbConnect from '@/lib/mongoose';
import Job from '@/models/Job';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    console.log(`API: Received request for job with ID: ${id}`);

    await dbConnect();
    console.log(`API: Connected to MongoDB`);

    // Get all jobs and find the one with matching ID
    const allJobs = await Job.find().lean();
    console.log(`API: Found ${allJobs.length} total jobs in database`);

    // Find the job with the matching ID
    const job = allJobs.find(job =>
      job["Job ID (Numeric)"] === id ||
      job.id === id ||
      (job._id && job._id.toString() === id)
    );

    if (job) {
      console.log(`API: Found job: ${job.title} by ${job.company}`);
    } else {
      console.log(`Job not found with either Job ID (Numeric) or id: ${id}`);
    }

    if (!job) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(job);
  } catch (error) {
    console.error('Error fetching job:', error);
    return NextResponse.json(
      { error: 'Failed to fetch job' },
      { status: 500 }
    );
  }
}
