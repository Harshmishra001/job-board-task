import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// MongoDB connection string from environment variables
const uri = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_LIFETIME = process.env.JWT_LIFETIME || '30d';

export async function POST(request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { email, password } = body;
    
    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Please provide email and password' },
        { status: 400 }
      );
    }
    
    // Connect to MongoDB
    const client = new MongoClient(uri);
    await client.connect();
    
    // Get the database and collection
    const database = client.db('jobboard');
    const users = database.collection('users');
    
    // Find the user
    const user = await users.findOne({ email });
    
    // If user not found
    if (!user) {
      await client.close();
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    // If password is invalid
    if (!isPasswordValid) {
      await client.close();
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, name: user.name, email: user.email },
      JWT_SECRET,
      { expiresIn: JWT_LIFETIME }
    );
    
    // Close the connection
    await client.close();
    
    // Return the token and user info (without password)
    return NextResponse.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Error logging in:', error);
    return NextResponse.json(
      { error: 'Failed to log in' },
      { status: 500 }
    );
  }
}
