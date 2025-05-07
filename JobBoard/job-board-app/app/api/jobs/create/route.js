import dbConnect from '@/lib/mongoose';
import Job from '@/models/Job';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    console.log('API route /api/jobs/create called');

    // Parse the request body
    const body = await request.json();
    console.log('Received job data:', body);

    // Connect to the database
    await dbConnect();
    console.log('Connected to MongoDB');

    // Generate a unique Job ID (Numeric)
    const timestamp = new Date().getTime();
    const randomNum = Math.floor(Math.random() * 1000);
    const jobId = `JOB-${timestamp}-${randomNum}`;

    // Create a new job object with required fields
    const newJob = {
      "Job ID (Numeric)": jobId,
      id: jobId,
      title: body.title || 'Untitled Position',
      company: body.company || 'Unknown Company',
      location: body.location || 'Remote',
      job_link: body.job_link || '',
      employment_type: body.employment_type || 'Full-time',
      experience: body.experience || '0-5 years',
      source: 'User Submitted',
      country: body.country || 'Global',
      postedDateTime: {
        $date: new Date().toISOString()
      },
      companyImageUrl: body.companyImageUrl || '',
      min_exp: body.min_exp || 0,
      max_exp: body.max_exp || 5,
      seniority_level: body.seniority_level || 'Entry Level',
      company_url: body.company_url || '',
      companytype: body.companytype || 'Startup',
      description: body.description || '',
      postedBy: body.userId || null // Store the user ID who posted the job
    };

    // Save the new job to the database
    const createdJob = await Job.create(newJob);
    console.log('New job created:', createdJob);

    return NextResponse.json(
      { success: true, job: createdJob },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating job:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create job' },
      { status: 500 }
    );
  }
}
