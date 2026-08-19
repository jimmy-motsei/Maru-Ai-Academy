'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Lock, Award } from 'lucide-react';

interface Badge {
  id: string;
  slug: string;
  name: string;
  description: string;
  imageUrl: string;
  users?: any[]; // In a real app, this would be typed
}

interface UserBadge {
  id: string;
  badge: Badge;
  earnedAt: Date | string;
}

interface BadgeShowcaseProps {
  userBadges: UserBadge[];
}

const ALL_BADGES = [
  // Main Progression Badges
  {
    slug: 'ground-crew',
    name: 'Ground Crew',
    description: 'Completed onboarding and setup. Ready for takeoff!',
    color: 'bg-maru-grey',
    borderColor: 'border-maru-navy-700'
  },
  {
    slug: 'trainee-pilot',
    name: 'Trainee Pilot',
    description: 'Mastered the controls! Completed the Beginner Stream.',
    color: 'bg-maru-blue',
    borderColor: 'border-maru-blue'
  },
  {
    slug: 'solo-aviator',
    name: 'Solo Aviator',
    description: 'Flying independently! Completed the Intermediate Stream.',
    color: 'bg-maru-teal',
    borderColor: 'border-maru-teal-600'
  },
  {
    slug: 'wing-commander',
    name: 'Wing Commander',
    description: 'Leading the squadron! Enterprise-scale mastery.',
    color: 'bg-maru-blue',
    borderColor: 'border-maru-blue-700'
  },
  {
    slug: 'sky-captain',
    name: 'Sky Captain',
    description: 'Reached the pinnacle! Full mastery achieved.',
    color: 'bg-atrisk',
    borderColor: 'border-atrisk'
  },
  
  // Achievement Badges
  {
    slug: 'first-flight',
    name: 'First Flight',
    description: 'Completed your first lesson. Welcome aboard!',
    color: 'bg-verified',
    borderColor: 'border-verified'
  },
  {
    slug: 'turbulence-tamer',
    name: 'Turbulence Tamer',
    description: 'Successfully debugged 10+ AI prompts.',
    color: 'bg-atrisk',
    borderColor: 'border-atrisk'
  },
  {
    slug: 'mach-one',
    name: 'Mach 1',
    description: 'Completed a module in record time with perfect scores.',
    color: 'bg-overdue',
    borderColor: 'border-overdue'
  },
  {
    slug: 'night-flyer',
    name: 'Night Flyer',
    description: 'Completed 5+ lessons between 10 PM - 6 AM.',
    color: 'bg-maru-blue',
    borderColor: 'border-maru-blue-700'
  },
  {
    slug: 'streak-master',
    name: 'Streak Master',
    description: 'Maintained a 7-day learning streak.',
    color: 'bg-maru-blue',
    borderColor: 'border-maru-blue'
  },
  {
    slug: 'perfect-landing',
    name: 'Perfect Landing',
    description: 'Achieved 100% on all quizzes in a module.',
    color: 'bg-verified',
    borderColor: 'border-verified'
  }
];

export function BadgeShowcase({ userBadges }: BadgeShowcaseProps) {
  const earnedSlugs = new Set(userBadges.map(ub => ub.badge.slug));

  return (
    <div className="bg-white rounded-2xl border border-maru-line p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Award className="w-5 h-5 text-maru-blue-700" />
          My Badges
        </h2>
        <span className="text-sm text-maru-grey">
          {userBadges.length} / {ALL_BADGES.length} Unlocked
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {ALL_BADGES.map((badge) => {
          const isUnlocked = earnedSlugs.has(badge.slug);
          const userBadge = userBadges.find(ub => ub.badge.slug === badge.slug);

          return (
            <div
              key={badge.slug}
              className={`relative rounded-xl border-2 p-4 transition-all ${
                isUnlocked
                  ? `${badge.borderColor} bg-opacity-5`
                  : 'border-maru-line bg-maru-cloud opacity-70'
              }`}
            >
              {!isUnlocked && (
                <div className="absolute inset-0 flex items-center justify-center z-10 bg-maru-cloud backdrop-blur-[1px] rounded-xl">
                  <Lock className="w-6 h-6 text-maru-grey" />
                </div>
              )}

              <div className="flex flex-col items-center text-center">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 shadow-lg overflow-hidden ${
                    isUnlocked ? badge.color : 'bg-maru-line grayscale'
                  }`}
                >
                  <Image
                    src={`/badges/${badge.slug}.png`}
                    alt=""
                    width={64}
                    height={64}
                    className="h-11 w-11 object-contain"
                  />
                </div>
                
                <h3 className="font-bold text-maru-navy mb-1">{badge.name}</h3>
                <p className="text-xs text-maru-grey mb-3 line-clamp-2">
                  {badge.description}
                </p>
                
                {isUnlocked ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-verified-bg text-verified-fg">
                    Earned {new Date(userBadge?.earnedAt || '').toLocaleDateString()}
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-maru-line text-maru-grey">
                    Locked
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
