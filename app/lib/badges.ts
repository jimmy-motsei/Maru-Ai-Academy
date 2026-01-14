import prisma from '@/lib/prisma';
import { STREAMS } from '@/types/modules';

// Badge definitions
export const BADGE_DEFINITIONS = {
  'first-flight': {
    slug: 'first-flight',
    name: 'First Flight',
    description: 'Complete your first lesson',
    requirement: 'Complete 1 lesson'
  },
  'trainee-pilot': {
    slug: 'trainee-pilot',
    name: 'Trainee Pilot',
    description: 'Complete the Beginner Stream and provide feedback',
    requirement: 'Complete all 4 Beginner modules + submit feedback'
  },
  'certified-pilot': {
    slug: 'certified-pilot',
    name: 'Certified Pilot',
    description: 'Complete the Intermediate Stream and provide feedback',
    requirement: 'Complete all 4 Intermediate modules + submit feedback'
  },
  'master-pilot': {
    slug: 'master-pilot',
    name: 'Master Pilot',
    description: 'Complete both streams and provide all feedback',
    requirement: 'Complete all modules + submit all feedback'
  }
};

export async function checkBadgeEligibility(userId: string) {
  // 1. Get user's completed lessons
  const userProgress = await prisma.lessonProgress.findMany({
    where: { 
      userId,
      completed: true
    }
  });
  const completedLessonSlugs = new Set(userProgress.map(p => p.lessonSlug));

  // 2. Get user's submitted feedback (by module)
  const userFeedback = await (prisma as any).lessonFeedback.findMany({
    where: { userId }
  });
  const feedbackByModule = new Set(userFeedback.map((f: any) => f.moduleSlug));

  const newBadges: any[] = [];

  // Helper function to award badge
  async function awardBadge(slug: string) {
    const badge = await prisma.badge.findUnique({ where: { slug } });
    if (!badge) return null;

    // Check if user already has this badge
    const hasBadge = await prisma.userBadge.findUnique({
      where: {
        userId_badgeId: {
          userId,
          badgeId: badge.id
        }
      }
    });

    if (!hasBadge) {
      const awarded = await prisma.userBadge.create({
        data: {
          userId,
          badgeId: badge.id
        },
        include: { badge: true }
      });
      newBadges.push(awarded.badge);
      return awarded;
    }
    return null;
  }

  // Get stream data
  const beginnerStream = STREAMS.find(s => s.id === 'beginner');
  const intermediateStream = STREAMS.find(s => s.id === 'intermediate');

  // 3. First Flight: Complete at least one lesson
  if (completedLessonSlugs.size >= 1) {
    await awardBadge('first-flight');
  }

  // 4. Trainee Pilot: Complete ALL Beginner lessons + submit feedback on final module
  if (beginnerStream) {
    const beginnerModuleSlugs = beginnerStream.modules.map(m => m.slug);
    const beginnerLessonIds = beginnerStream.modules.flatMap(m => 
      m.lessons?.map(l => l.id) || []
    );
    
    const hasCompletedAllBeginnerLessons = beginnerLessonIds.length > 0 && 
      beginnerLessonIds.every(id => completedLessonSlugs.has(id));
    
    // Require feedback on at least the capstone module (last module)
    const capstoneModule = beginnerStream.modules[beginnerStream.modules.length - 1];
    const hasFeedbackOnCapstone = capstoneModule && feedbackByModule.has(capstoneModule.slug);
    
    if (hasCompletedAllBeginnerLessons && hasFeedbackOnCapstone) {
      await awardBadge('trainee-pilot');
    }
  }

  // 5. Certified Pilot: Complete ALL Intermediate lessons + submit feedback on final module
  if (intermediateStream) {
    const intermediateLessonIds = intermediateStream.modules.flatMap(m => 
      m.lessons?.map(l => l.id) || []
    );
    
    const hasCompletedAllIntermediateLessons = intermediateLessonIds.length > 0 && 
      intermediateLessonIds.every(id => completedLessonSlugs.has(id));
    
    // Require feedback on at least the capstone module (last module)
    const capstoneModule = intermediateStream.modules[intermediateStream.modules.length - 1];
    const hasFeedbackOnCapstone = capstoneModule && feedbackByModule.has(capstoneModule.slug);
    
    if (hasCompletedAllIntermediateLessons && hasFeedbackOnCapstone) {
      await awardBadge('certified-pilot');
    }
  }

  // 6. Master Pilot: Complete BOTH streams + all feedback
  if (beginnerStream && intermediateStream) {
    const allLessonIds = [
      ...beginnerStream.modules.flatMap(m => m.lessons?.map(l => l.id) || []),
      ...intermediateStream.modules.flatMap(m => m.lessons?.map(l => l.id) || [])
    ];
    
    const hasCompletedAll = allLessonIds.length > 0 && 
      allLessonIds.every(id => completedLessonSlugs.has(id));
    
    // Require feedback on all 8 modules
    const allModuleSlugs = [
      ...beginnerStream.modules.map(m => m.slug),
      ...intermediateStream.modules.map(m => m.slug)
    ];
    const hasAllFeedback = allModuleSlugs.every(slug => feedbackByModule.has(slug));
    
    if (hasCompletedAll && hasAllFeedback) {
      await awardBadge('master-pilot');
    }
  }

  return newBadges;
}

export async function getUserBadges(userId: string) {
  return await prisma.userBadge.findMany({
    where: { userId },
    include: { badge: true },
    orderBy: { earnedAt: 'desc' }
  });
}

// Get badge progress for a user (how close they are to each badge)
export async function getBadgeProgress(userId: string) {
  const userProgress = await prisma.lessonProgress.findMany({
    where: { userId, completed: true }
  });
  const completedLessonSlugs = new Set(userProgress.map(p => p.lessonSlug));

  const userFeedback = await (prisma as any).lessonFeedback.findMany({
    where: { userId }
  });
  const feedbackByModule = new Set(userFeedback.map((f: any) => f.moduleSlug));

  const beginnerStream = STREAMS.find(s => s.id === 'beginner');
  const intermediateStream = STREAMS.find(s => s.id === 'intermediate');

  const progress: Record<string, { completed: number; total: number; hasFeedback: boolean }> = {};

  // Trainee Pilot progress
  if (beginnerStream) {
    const lessonIds = beginnerStream.modules.flatMap(m => m.lessons?.map(l => l.id) || []);
    const completedCount = lessonIds.filter(id => completedLessonSlugs.has(id)).length;
    const capstoneModule = beginnerStream.modules[beginnerStream.modules.length - 1];
    
    progress['trainee-pilot'] = {
      completed: completedCount,
      total: lessonIds.length,
      hasFeedback: capstoneModule ? feedbackByModule.has(capstoneModule.slug) : false
    };
  }

  // Certified Pilot progress
  if (intermediateStream) {
    const lessonIds = intermediateStream.modules.flatMap(m => m.lessons?.map(l => l.id) || []);
    const completedCount = lessonIds.filter(id => completedLessonSlugs.has(id)).length;
    const capstoneModule = intermediateStream.modules[intermediateStream.modules.length - 1];
    
    progress['certified-pilot'] = {
      completed: completedCount,
      total: lessonIds.length,
      hasFeedback: capstoneModule ? feedbackByModule.has(capstoneModule.slug) : false
    };
  }

  return progress;
}
