import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import fs from 'fs';
import path from 'path';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    // Only admins can access reports
    if (!session?.user || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const date = searchParams.get('date') || new Date().toISOString().split('T')[0];
    const moduleSlug = searchParams.get('module');

    // Query feedback for the specified date
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    const whereClause: any = {
      createdAt: {
        gte: startDate,
        lte: endDate
      }
    };

    if (moduleSlug) {
      whereClause.moduleSlug = moduleSlug;
    }

    const feedback = await (prisma as any).lessonFeedback.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });

    // Calculate aggregates
    const totalResponses = feedback.length;
    
    if (totalResponses === 0) {
      return NextResponse.json({
        date,
        totalResponses: 0,
        message: 'No feedback received for this period'
      });
    }

    const averageRatings = {
      contentQuality: feedback.reduce((sum: number, f: any) => sum + f.contentQuality, 0) / totalResponses,
      difficulty: feedback.reduce((sum: number, f: any) => sum + f.difficulty, 0) / totalResponses,
      relevance: feedback.reduce((sum: number, f: any) => sum + f.relevance, 0) / totalResponses,
      overall: feedback.reduce((sum: number, f: any) => sum + f.overallRating, 0) / totalResponses
    };

    // Group by module
    const byModule: any = {};
    feedback.forEach((f: any) => {
      if (!byModule[f.moduleSlug]) {
        byModule[f.moduleSlug] = {
          responses: 0,
          totalRating: 0,
          feedback: []
        };
      }
      byModule[f.moduleSlug].responses++;
      byModule[f.moduleSlug].totalRating += f.overallRating;
      byModule[f.moduleSlug].feedback.push({
        lessonSlug: f.lessonSlug,
        ratings: {
          contentQuality: f.contentQuality,
          difficulty: f.difficulty,
          relevance: f.relevance,
          overall: f.overallRating
        },
        whatWorked: f.whatWorked,
        improvements: f.improvements,
        comments: f.comments,
        userName: f.user.name,
        userEmail: f.user.email,
        createdAt: f.createdAt
      });
    });

    // Calculate average per module
    Object.keys(byModule).forEach(slug => {
      byModule[slug].averageRating = byModule[slug].totalRating / byModule[slug].responses;
    });

    const report = {
      date,
      totalResponses,
      averageRatings: {
        contentQuality: Math.round(averageRatings.contentQuality * 10) / 10,
        difficulty: Math.round(averageRatings.difficulty * 10) / 10,
        relevance: Math.round(averageRatings.relevance * 10) / 10,
        overall: Math.round(averageRatings.overall * 10) / 10
      },
      byModule,
      rawFeedback: feedback.map((f: any) => ({
        module: f.moduleSlug,
        lesson: f.lessonSlug,
        ratings: {
          contentQuality: f.contentQuality,
          difficulty: f.difficulty,
          relevance: f.relevance,
          overall: f.overallRating
        },
        text: {
          whatWorked: f.whatWorked,
          improvements: f.improvements,
          comments: f.comments
        },
        user: f.user.name,
        createdAt: f.createdAt
      }))
    };

    // Optionally save to file system
    const saveToFile = searchParams.get('save') === 'true';
    if (saveToFile) {
      const reportsDir = path.join(process.cwd(), 'reports', 'feedback');
      
      // Create directory if it doesn't exist
      if (!fs.existsSync(reportsDir)) {
        fs.mkdirSync(reportsDir, { recursive: true });
      }

      const filename = moduleSlug 
        ? `${date}-${moduleSlug}.json`
        : `${date}-all.json`;
      
      const filepath = path.join(reportsDir, filename);
      fs.writeFileSync(filepath, JSON.stringify(report, null, 2));
    }

    return NextResponse.json(report);

  } catch (error) {
    console.error('Report generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate report' },
      { status: 500 }
    );
  }
}
