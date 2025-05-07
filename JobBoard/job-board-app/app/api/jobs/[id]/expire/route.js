import dbConnect from '@/lib/mongoose';
import Job from '@/models/Job';
import { NextResponse } from 'next/server';

export async function PATCH(request, context) {
  try {
    // Safely extract id from params
    const { params } = context;
    // Use await to fix the warning
    const unwrappedParams = await params;
    const id = unwrappedParams.id;
    console.log(`API: Received request to expire job with ID: ${id}`);

    await dbConnect();
    console.log(`API: Connected to MongoDB for expiring job`);

    // Find the job first to check if it exists and if it's user-posted
    const job = await Job.findOne({
      $or: [
        { "Job ID (Numeric)": id },
        { id: id },
        { _id: id }
      ]
    }).lean();

    if (!job) {
      console.log(`Job not found with ID: ${id}`);
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }

    // Check if the job is user-posted (source: 'User Submitted')
    // In a real app, you'd also check user authentication/authorization here
    if (job.source !== 'User Submitted') {
      console.log(`Cannot expire job with ID: ${id} as it's not user-submitted`);
      return NextResponse.json(
        { error: 'Only user-submitted jobs can be expired' },
        { status: 403 }
      );
    }

    // Update the job to mark it as expired
    const result = await Job.updateOne(
      {
        $or: [
          { "Job ID (Numeric)": id },
          { id: id },
          { _id: id }
        ]
      },
      { $set: { expired: true } }
    );

    if (result.modifiedCount === 0) {
      console.log(`Failed to expire job with ID: ${id}`);
      return NextResponse.json(
        { error: 'Failed to expire job' },
        { status: 500 }
      );
    }

    console.log(`Successfully expired job with ID: ${id}`);
    return NextResponse.json(
      { success: true, message: 'Job successfully marked as expired' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error expiring job:', error);
    return NextResponse.json(
      { error: 'Failed to expire job' },
      { status: 500 }
    );
  }
}
