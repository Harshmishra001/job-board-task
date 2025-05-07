import dbConnect from '@/lib/mongoose';
import Job from '@/models/Job';
import { NextResponse } from 'next/server';

export async function GET(request, context) {
  try {
    // Safely extract id from params
    const { params } = context;
    // Use await to fix the warning
    const unwrappedParams = await params;
    const id = unwrappedParams.id;
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

export async function DELETE(request, context) {
  try {
    // Safely extract id from params
    const { params } = context;
    // Use await to fix the warning
    const unwrappedParams = await params;
    const id = unwrappedParams.id;
    console.log(`API: Received DELETE request for job with ID: ${id}`);

    await dbConnect();
    console.log(`API: Connected to MongoDB for deletion`);

    // Find the job first to check if it exists and if it's user-posted
    console.log(`API: Looking for job with ID: ${id}`);

    // Create a query that safely handles different ID formats
    const query = { $or: [{ "Job ID (Numeric)": id }, { id: id }] };

    // Try to add ObjectId to the query if it's a valid ObjectId
    try {
      const mongoose = require('mongoose');
      if (mongoose.Types.ObjectId.isValid(id)) {
        query.$or.push({ _id: new mongoose.Types.ObjectId(id) });
      }
    } catch (err) {
      console.log('Not a valid ObjectId, skipping _id query');
    }

    console.log('Query:', JSON.stringify(query));

    // Try to find the job with various ID formats
    const job = await Job.findOne(query).lean();

    console.log('API: Job found:', job ? 'Yes' : 'No');

    if (!job) {
      console.log(`Job not found with ID: ${id}`);
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }

    // Check if the job is user-posted (source: 'User Submitted')
    // In a real app, you'd also check user authentication/authorization here
    console.log(`API: Job source is: "${job.source}"`);

    // For testing purposes, let's allow deletion of any job
    // Comment out the check below to allow deletion of any job
    /*
    if (job.source !== 'User Submitted') {
      console.log(`Cannot delete job with ID: ${id} as it's not user-submitted`);
      return NextResponse.json(
        { error: 'Only user-submitted jobs can be deleted' },
        { status: 403 }
      );
    }
    */

    // Delete the job
    console.log('API: Attempting to delete job with ID:', id);

    // Use the same query we used to find the job
    const result = await Job.deleteOne(query);

    console.log('API: Delete result:', result);

    if (result.deletedCount === 0) {
      console.log(`Failed to delete job with ID: ${id}`);
      return NextResponse.json(
        { error: 'Failed to delete job' },
        { status: 500 }
      );
    }

    console.log(`Successfully deleted job with ID: ${id}`);
    return NextResponse.json(
      { success: true, message: 'Job successfully deleted' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting job:', error);
    return NextResponse.json(
      { error: 'Failed to delete job' },
      { status: 500 }
    );
  }
}
