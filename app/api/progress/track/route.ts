import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const body = await req.json();
    
    const { moduleSlug, lessonSlug, action } = body;

    if (!moduleSlug || !lessonSlug || !action) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get or create lesson progress
    const progress = await (prisma as any).lessonProgress.upsert({
      where: {
        userId_moduleSlug_lessonSlug: {
          userId,
          moduleSlug,
          lessonSlug
        }
      },
      update: {
        hintsViewed: action === 'hint' ? { increment: 1 } : undefined,
        attemptsCount: action === 'attempt' ? { increment: 1 } : undefined,
        reviewCompleted: action === 'review' ? true : undefined,
        updatedAt: new Date()
      },
      create: {
        userId,
        moduleSlug,
        lessonSlug,
        hintsViewed: action === 'hint' ? 1 : 0,
        attemptsCount: action === 'attempt' ? 1 : 0,
        reviewCompleted: action === 'review' ? true : false
      }
    });

    return NextResponse.json({ 
      success: true, 
      progress 
    });

  } catch (error) {
    console.error('Progress tracking error:', error);
    return NextResponse.json(
      { error: 'Failed to update progress' },
      { status: 500 }
    );
  }
}
