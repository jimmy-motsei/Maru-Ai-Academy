'use client';

import React from 'react';
import Link from 'next/link';
import { beginnerCurriculum } from '@/types/curriculum';
import { Clock, ChevronRight, BookOpen, Zap, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <header className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex items-center gap-2 text-primary-400 text-sm font-medium mb-4">
            <Zap className="w-4 h-4" />
            Interactive Learning
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Master AI Productivity
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Learn by doing. No videos, no lectures — just hands-on challenges 
            powered by real AI feedback. Complete the beginner curriculum in under 3 hours.
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-8">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary-400" />
              <span className="text-gray-300">{beginnerCurriculum.reduce((acc, m) => acc + m.lessons.length, 0)} Lessons</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary-400" />
              <span className="text-gray-300">~3 hours total</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-primary-400" />
              <span className="text-gray-300">Certificate on completion</span>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Beginner Stream */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              <span className="text-2xl">🌱</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Beginner Stream</h2>
              <p className="text-gray-600">Start here if you're new to AI productivity</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {beginnerCurriculum.map((module, index) => (
              <Link
                key={module.id}
                href={`/learn/${module.slug}`}
                className="bg-white rounded-2xl border border-gray-200 p-6 hover:border-primary-300 hover:shadow-lg transition-all group relative overflow-hidden"
              >
                {/* Module number badge */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-500 group-hover:bg-primary-100 group-hover:text-primary-700 transition-colors">
                  {index + 1}
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{module.icon}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-700 transition-colors mb-1 pr-8">
                      {module.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">{module.description}</p>
                    
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {module.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        {module.lessons.length} lessons
                      </span>
                    </div>
                    
                    <div className="mt-4 flex items-center gap-1 text-primary-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      Start learning <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
        
        {/* Intermediate Stream Teaser */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
              <span className="text-2xl">🔮</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Intermediate Stream</h2>
              <p className="text-gray-600">Advanced automation, governance, and team workflows</p>
            </div>
            <span className="ml-auto text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">
              Unlocks after Beginner
            </span>
          </div>
          
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl border border-purple-100 p-8 text-center">
            <p className="text-gray-600 mb-4">
              Complete the Beginner Stream to unlock 4 advanced modules on 
              scaling AI across teams, governance, and enterprise automation.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-purple-700">
              <span className="bg-white px-3 py-1 rounded-full border border-purple-200">From Ad-Hoc to Repeatable</span>
              <span className="bg-white px-3 py-1 rounded-full border border-purple-200">Semantic Search & RAG</span>
              <span className="bg-white px-3 py-1 rounded-full border border-purple-200">No-Code Automations</span>
              <span className="bg-white px-3 py-1 rounded-full border border-purple-200">Governance & Handover</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
