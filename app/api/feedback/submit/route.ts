import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const body = await req.json();
    
    const {
      moduleSlug,
      lessonSlug,
      contentQuality,
      difficulty,
      relevance,
      overallRating,
      whatWorked,
      improvements,
      comments
    } = body;

    // Validate required fields
    if (!moduleSlug || !lessonSlug) {
      return NextResponse.json(
        { error: 'Module and lesson are required' },
        { status: 400 }
      );
    }

    // Validate ratings are in range 1-10
    const ratings = [contentQuality, difficulty, relevance, overallRating];
    if (ratings.some(r => r < 1 || r > 10)) {
      return NextResponse.json(
        { error: 'Ratings must be between 1 and 10' },
        { status: 400 }
      );
    }

    // Upsert feedback (allow users to update their feedback)
    const feedback = await (prisma as any).lessonFeedback.upsert({
      where: {
        userId_moduleSlug_lessonSlug: {
          userId,
          moduleSlug,
          lessonSlug
        }
      },
      update: {
        contentQuality,
        difficulty,
        relevance,
        overallRating,
        whatWorked: whatWorked || null,
        improvements: improvements || null,
        comments: comments || null
      },
      create: {
        userId,
        moduleSlug,
        lessonSlug,
        contentQuality,
        difficulty,
        relevance,
        overallRating,
        whatWorked: whatWorked || null,
        improvements: improvements || null,
        comments: comments || null
      }
    });

    return NextResponse.json({ 
      success: true, 
      feedback,
      message: 'Thank you for your feedback!'
    });

  } catch (error) {
    console.error('Feedback submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit feedback' },
      { status: 500 }
    );
  }
}
