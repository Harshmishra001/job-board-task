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
    const { name, email, password } = body;
    
    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Please provide name, email, and password' },
        { status: 400 }
      );
    }
    
    // Connect to MongoDB
    const client = new MongoClient(uri);
    await client.connect();
    
    // Get the database and collection
    const database = client.db('jobboard');
    const users = database.collection('users');
    
    // Check if user already exists
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      await client.close();
      return NextResponse.json(
        { error: 'Email already in use' },
        { status: 400 }
      );
    }
    
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create the user
    const newUser = {
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    };
    
    // Insert the user
    const result = await users.insertOne(newUser);
    
    // Create JWT token
    const token = jwt.sign(
      { userId: result.insertedId, name, email },
      JWT_SECRET,
      { expiresIn: JWT_LIFETIME }
    );
    
    // Close the connection
    await client.close();
    
    // Return the token and user info (without password)
    return NextResponse.json(
      {
        token,
        user: {
          id: result.insertedId,
          name,
          email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error registering user:', error);
    return NextResponse.json(
      { error: 'Failed to register user' },
      { status: 500 }
    );
  }
}
