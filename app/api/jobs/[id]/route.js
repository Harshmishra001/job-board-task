import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

// MongoDB connection string from environment variables
const uri = process.env.MONGODB_URI;

export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    // Connect to MongoDB
    const client = new MongoClient(uri);
    await client.connect();
    
    // Get the database and collection
    const database = client.db('jobboard');
    const jobs = database.collection('jobs');
    
    // Find the job by ID
    const job = await jobs.findOne({ _id: new ObjectId(id) });
    
    // Close the connection
    await client.close();
    
    // If job not found
    if (!job) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }
    
    // Return the job as JSON
    return NextResponse.json(job);
  } catch (error) {
    console.error('Error fetching job:', error);
    return NextResponse.json(
      { error: 'Failed to fetch job' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
    // Connect to MongoDB
    const client = new MongoClient(uri);
    await client.connect();
    
    // Get the database and collection
    const database = client.db('jobboard');
    const jobs = database.collection('jobs');
    
    // Delete the job by ID
    const result = await jobs.deleteOne({ _id: new ObjectId(id) });
    
    // Close the connection
    await client.close();
    
    // If job not found
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }
    
    // Return success message
    return NextResponse.json(
      { message: 'Job deleted successfully' },
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
