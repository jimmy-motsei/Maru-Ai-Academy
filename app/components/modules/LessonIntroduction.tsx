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
      <div className="bg-gradient-to-r from-primary-50 to-white p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <Badge variant="primary" size="lg">
            Lesson {lessonNumber} of {totalLessons}
          </Badge>
          <div className="flex items-center text-gray-500 text-sm">
            <Clock size={16} className="mr-1" />
            {estimatedTime}
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      </div>

      {/* Content Grid */}
      <div className="p-6 grid md:grid-cols-3 gap-6">
        
        {/* Learning Objectives */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-primary-600">
            <Target size={20} />
            <h3 className="font-semibold">Learning Objectives</h3>
          </div>
          <p className="text-sm text-gray-500 mb-3">By the end of this lesson, you'll be able to:</p>
          <ul className="space-y-2">
            {objectives.map((objective, i) => (
              <li key={i} className="flex items-start text-sm text-gray-700">
                <span className="w-5 h-5 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-xs mr-2 mt-0.5 flex-shrink-0">
                  {i + 1}
                </span>
                {objective}
              </li>
            ))}
          </ul>
        </div>

        {/* Key Concepts */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-secondary-600">
            <BookOpen size={20} />
            <h3 className="font-semibold">Key Concepts</h3>
          </div>
          <p className="text-sm text-gray-500 mb-3">Core ideas you'll explore:</p>
          <ul className="space-y-2">
            {concepts.map((concept, i) => (
              <li key={i} className="flex items-start text-sm text-gray-700">
                <span className="w-2 h-2 rounded-full bg-secondary-400 mr-2 mt-2 flex-shrink-0" />
                {concept}
              </li>
            ))}
          </ul>
        </div>

        {/* Why This Matters */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-green-600">
            <Lightbulb size={20} />
            <h3 className="font-semibold">Why This Matters</h3>
          </div>
          <p className="text-sm text-gray-500 mb-3">Real-world benefits:</p>
          <ul className="space-y-2">
            {benefits.map((benefit, i) => (
              <li key={i} className="flex items-start text-sm text-gray-700">
                <span className="text-green-500 mr-2">✓</span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="px-6 pb-4">
        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-primary-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${(lessonNumber / totalLessons) * 100}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-2 text-center">
          {Math.round((lessonNumber / totalLessons) * 100)}% through this module
        </p>
      </div>
    </Card>
  );
}
