import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';

// MongoDB connection string from environment variables
const uri = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;

export async function GET(request) {
  try {
    // Get the authorization header
    const authHeader = request.headers.get('authorization');
    
    // Check if the header exists and starts with 'Bearer '
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authentication invalid' },
        { status: 401 }
      );
    }
    
    // Extract the token
    const token = authHeader.split(' ')[1];
    
    // Verify the token
    const payload = jwt.verify(token, JWT_SECRET);
    
    // Connect to MongoDB
    const client = new MongoClient(uri);
    await client.connect();
    
    // Get the database and collection
    const database = client.db('jobboard');
    const users = database.collection('users');
    
    // Find the user
    const user = await users.findOne({ _id: new ObjectId(payload.userId) });
    
    // Close the connection
    await client.close();
    
    // If user not found
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Return the user info (without password)
    return NextResponse.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Error verifying token:', error);
    return NextResponse.json(
      { error: 'Authentication invalid' },
      { status: 401 }
    );
  }
}
