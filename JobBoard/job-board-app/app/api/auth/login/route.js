import dbConnect from '@/lib/mongoose';
import User from '@/models/User';
import { NextResponse } from 'next/server';
import { createJWT } from '@/utils/jwt';

export async function POST(request) {
  try {
    console.log('API route /api/auth/login called');
    
    // Parse the request body
    const body = await request.json();
    console.log('Received login data:', { email: body.email });
    
    // Connect to the database
    await dbConnect();
    console.log('Connected to MongoDB');
    
    // Check if user exists
    const user = await User.findOne({ email: body.email }).select('+password');
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    // Check if password is correct
    const isPasswordCorrect = await user.comparePassword(body.password);
    if (!isPasswordCorrect) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
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
      { status: 200 }
    );
  } catch (error) {
    console.error('Error logging in user:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to login' },
      { status: 500 }
    );
  }
}
