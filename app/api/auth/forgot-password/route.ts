import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendPasswordResetEmail } from '@/lib/email';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    // Always return success to prevent email enumeration attacks
    if (!user) {
      console.log(`Password reset requested for non-existent user: ${email}`);
      return NextResponse.json({
        message: 'If an account exists with this email, a password reset link has been sent.',
      });
    }

    // Generate secure random token
    const token = crypto.randomBytes(32).toString('hex');
    
    // Set expiry to 1 hour from now
    const expires = new Date();
    expires.setHours(expires.getHours() + 1);

    // Delete any existing tokens for this email
    await prisma.passwordResetToken.deleteMany({
      where: { email: user.email! },
    });

    // Create new reset token
    await prisma.passwordResetToken.create({
      data: {
        email: user.email!,
        token,
        expires,
      },
    });

    // Send email
    const result = await sendPasswordResetEmail(user.email!, token);

    if (!result.success) {
      console.error('Failed to send reset email:', result.error);
      // Still return success to user to prevent email enumeration
    }

    return NextResponse.json({
      message: 'If an account exists with this email, a password reset link has been sent.',
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'An error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
