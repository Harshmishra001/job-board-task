import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

// MongoDB connection string from environment variables
const uri = process.env.MONGODB_URI;

export async function GET(request) {
  try {
    // Connect to MongoDB
    const client = new MongoClient(uri);
    await client.connect();
    
    // Get the database and collection
    const database = client.db('jobboard');
    const jobs = database.collection('jobs');
    
    // Query parameters
    const { searchParams } = new URL(request.url);
    const query = {};
    
    // Apply filters if provided
    if (searchParams.has('search')) {
      const searchTerm = searchParams.get('search');
      query.$or = [
        { title: { $regex: searchTerm, $options: 'i' } },
        { company: { $regex: searchTerm, $options: 'i' } },
        { location: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } },
      ];
    }
    
    if (searchParams.has('location')) {
      const location = searchParams.get('location');
      query.location = { $regex: location, $options: 'i' };
    }
    
    if (searchParams.has('jobType')) {
      const jobType = searchParams.get('jobType');
      query.jobType = { $regex: jobType, $options: 'i' };
    }
    
    // Get all jobs matching the query
    const allJobs = await jobs.find(query).toArray();
    
    // Close the connection
    await client.close();
    
    // Return the jobs as JSON
    return NextResponse.json(allJobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch jobs' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    // Parse the request body
    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.company || !body.location) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Connect to MongoDB
    const client = new MongoClient(uri);
    await client.connect();
    
    // Get the database and collection
    const database = client.db('jobboard');
    const jobs = database.collection('jobs');
    
    // Add timestamp and source
    const newJob = {
      ...body,
      postedDateTime: { $date: new Date().toISOString() },
      source: 'User Submitted',
    };
    
    // Insert the new job
    const result = await jobs.insertOne(newJob);
    
    // Close the connection
    await client.close();
    
    // Return the new job as JSON
    return NextResponse.json(
      { message: 'Job created successfully', job: newJob, id: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating job:', error);
    return NextResponse.json(
      { error: 'Failed to create job' },
      { status: 500 }
    );
  }
}
