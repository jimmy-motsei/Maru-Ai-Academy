'use client';

import { Card, Badge } from '@/components/ui';
import { BookOpen, Target, Lightbulb, Clock } from 'lucide-react';

interface LessonIntroductionProps {
  title: string;
  objectives: string[];
  concepts: string[];
  benefits: string[];
  estimatedTime: string;
  lessonNumber: number;
  totalLessons: number;
}

export function LessonIntroduction({
  title,
  objectives,
  concepts,
  benefits,
  estimatedTime,
  lessonNumber,
  totalLessons
}: LessonIntroductionProps) {
  return (
    <Card className="mb-8 overflow-hidden border-l-4 border-l-primary-500">
      {/* Header */}
      <div className="bg-maru-blue-100 p-6 border-b border-maru-line">
        <div className="flex items-center justify-between mb-4">
          <Badge variant="blue" size="lg">
            Lesson {lessonNumber} of {totalLessons}
          </Badge>
          <div className="flex items-center text-maru-grey text-sm">
            <Clock size={16} className="mr-1" />
            {estimatedTime}
          </div>
        </div>
        <h2 className="text-2xl font-bold text-maru-navy">{title}</h2>
      </div>

      {/* Content Grid */}
      <div className="p-6 grid md:grid-cols-3 gap-6">
        
        {/* Learning Objectives */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-maru-blue-700">
            <Target size={20} />
            <h3 className="font-semibold">Learning objectives</h3>
          </div>
          <p className="text-sm text-maru-grey mb-3">By the end of this lesson, you'll be able to:</p>
          <ul className="space-y-2">
            {objectives.map((objective, i) => (
              <li key={i} className="flex items-start text-sm text-maru-grey">
                <span className="w-5 h-5 rounded-full bg-maru-blue-100 text-maru-blue-700 flex items-center justify-center text-xs mr-2 mt-0.5 flex-shrink-0">
                  {i + 1}
                </span>
                {objective}
              </li>
            ))}
          </ul>
        </div>

        {/* Key Concepts */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-maru-blue-700">
            <BookOpen size={20} />
            <h3 className="font-semibold">Key concepts</h3>
          </div>
          <p className="text-sm text-maru-grey mb-3">Core ideas you'll explore:</p>
          <ul className="space-y-2">
            {concepts.map((concept, i) => (
              <li key={i} className="flex items-start text-sm text-maru-grey">
                <span className="w-2 h-2 rounded-full bg-maru-blue-300 mr-2 mt-2 flex-shrink-0" />
                {concept}
              </li>
            ))}
          </ul>
        </div>

        {/* Why This Matters */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-verified-fg">
            <Lightbulb size={20} />
            <h3 className="font-semibold">Why this matters</h3>
          </div>
          <p className="text-sm text-maru-grey mb-3">Real-world benefits:</p>
          <ul className="space-y-2">
            {benefits.map((benefit, i) => (
              <li key={i} className="flex items-start text-sm text-maru-grey">
                <span className="text-verified-fg mr-2"></span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="px-6 pb-4">
        <div className="w-full bg-maru-cloud rounded-full h-2 overflow-hidden">
          <div 
            className="bg-maru-blue h-full rounded-full transition-all duration-500"
            style={{ width: `${(lessonNumber / totalLessons) * 100}%` }}
          />
        </div>
        <p className="text-xs text-maru-grey-300 mt-2 text-center">
          {Math.round((lessonNumber / totalLessons) * 100)}% through this module
        </p>
      </div>
    </Card>
  );
}
