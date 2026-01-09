'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getModuleBySlug } from '@/types/curriculum';
import { Clock, ChevronRight, CheckCircle, BookOpen, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ModulePage() {
  const params = useParams();
  const router = useRouter();
  const moduleSlug = params.moduleSlug as string;
  
  const module = getModuleBySlug(moduleSlug);
  
  if (!module) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Module Not Found</h1>
          <p className="text-gray-600 mb-4">The requested module doesn't exist.</p>
          <button 
            onClick={() => router.push('/learn')}
            className="text-blue-600 hover:underline"
          >
            ← Back to Curriculum
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <Link 
            href="/learn" 
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Curriculum
          </Link>
          
          <div className="flex items-start gap-4">
            <div className="text-5xl">{module.icon}</div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-primary-600 bg-primary-50 px-2 py-1 rounded">
                  {module.stream === 'beginner' ? 'Beginner' : 'Intermediate'}
                </span>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {module.duration}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{module.title}</h1>
              <p className="text-gray-600">{module.description}</p>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Lessons List */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Lessons ({module.lessons.length})
            </h2>
            
            {module.lessons.map((lesson, index) => (
              <Link
                key={lesson.id}
                href={`/learn/${moduleSlug}/${lesson.slug}`}
                className="block bg-white rounded-xl border border-gray-200 p-6 hover:border-primary-300 hover:shadow-md transition-all group"
              >
                <div className="flex items-start gap-4">
                  {/* Lesson Number */}
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 transition-colors",
                    "bg-gray-100 text-gray-600 group-hover:bg-primary-100 group-hover:text-primary-700"
                  )}>
                    {index + 1}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900 group-hover:text-primary-700 transition-colors">
                        {lesson.title}
                      </h3>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{lesson.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {lesson.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        {lesson.steps.length} steps
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          {/* Sidebar - Learning Outcomes */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                What You'll Learn
              </h3>
              <ul className="space-y-3">
                {module.learningOutcomes.map((outcome, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0"></span>
                    {outcome}
                  </li>
                ))}
              </ul>
              
              {/* Start Button */}
              <Link
                href={`/learn/${moduleSlug}/${module.lessons[0]?.slug}`}
                className="mt-6 w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
              >
                Start Module
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
