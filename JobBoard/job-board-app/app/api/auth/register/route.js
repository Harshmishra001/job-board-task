import dbConnect from '@/lib/mongoose';
import User from '@/models/User';
import { NextResponse } from 'next/server';
import { createJWT } from '@/utils/jwt';

export async function POST(request) {
  try {
    console.log('API route /api/auth/register called');
    
    // Parse the request body
    const body = await request.json();
    console.log('Received registration data:', { 
      email: body.email, 
      name: body.name,
      role: body.role 
    });
    
    // Connect to the database
    await dbConnect();
    console.log('Connected to MongoDB');
    
    // Check if user already exists
    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'Email already in use' },
        { status: 400 }
      );
    }
    
    // Create a new user
    const user = await User.create({
      name: body.name,
      email: body.email,
      password: body.password,
      role: body.role || 'jobseeker',
    });
    
    // Create JWT token
    const token = createJWT({
      payload: {
        userId: user._id,
        name: user.name,
        role: user.role,
      },
    });
    
    // Return success response with token and user info
    return NextResponse.json(
      {
        success: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error registering user:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to register user' },
      { status: 500 }
    );
  }
}
