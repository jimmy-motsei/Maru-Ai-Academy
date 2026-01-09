'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { LessonWorkspace } from '@/components/interactive/LessonWorkspace';
import { PromptGym } from '@/components/interactive/PromptGym';
import { getLesson, getModuleBySlug, LessonStep } from '@/types/curriculum';
import { ArrowRight, CheckCircle, BookOpen, Lightbulb, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

// Render instruction content from the lesson schema
function InstructionContent({ step }: { step: LessonStep }) {
  const { instruction } = step;
  
  return (
    <div className="space-y-6">
      {/* Badge for step type */}
      {step.type === 'challenge' && (
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold uppercase tracking-wide">
          <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
          Challenge
        </div>
      )}
      {step.type === 'recap' && (
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold uppercase tracking-wide">
          <CheckCircle className="w-3 h-3" />
          Recap
        </div>
      )}
      
      {/* Heading */}
      <h2 className="text-2xl font-bold text-gray-900">{instruction.heading}</h2>
      
      {/* Body - parse simple markdown */}
      <div className="prose prose-gray max-w-none">
        {instruction.body.split('\n\n').map((paragraph, i) => (
          <p key={i} className="text-gray-600 leading-relaxed whitespace-pre-line">
            {paragraph.split(/(\*\*[^*]+\*\*)/).map((part, j) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={j} className="text-gray-900">{part.slice(2, -2)}</strong>;
              }
              return part;
            })}
          </p>
        ))}
      </div>
      
      {/* Tips */}
      {instruction.tips && instruction.tips.length > 0 && (
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
          <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-blue-600" />
            Pro Tips
          </h3>
          <ul className="space-y-2">
            {instruction.tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-blue-800">
                <span className="text-blue-400 mt-0.5">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Examples */}
      {instruction.examples && (
        <div className="space-y-3">
          {instruction.examples.bad && (
            <div className="border-l-4 border-red-300 pl-4 py-2 bg-red-50/50 rounded-r-lg">
              <p className="text-xs text-red-600 font-semibold mb-1 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                Bad Example
              </p>
              <p className="text-gray-700 text-sm italic">"{instruction.examples.bad}"</p>
            </div>
          )}
          {instruction.examples.good && (
            <div className="border-l-4 border-green-400 pl-4 py-2 bg-green-50/50 rounded-r-lg">
              <p className="text-xs text-green-600 font-semibold mb-1 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                Good Example
              </p>
              <p className="text-gray-700 text-sm italic">"{instruction.examples.good}"</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Visual placeholder for concept steps
function VisualPlaceholder({ step, onNext }: { step: LessonStep; onNext: () => void }) {
  const isRecap = step.type === 'recap';
  
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50/30 text-center p-8">
      <div className={cn(
        "w-48 h-48 rounded-full flex items-center justify-center shadow-lg mb-8 relative",
        isRecap ? "bg-gradient-to-br from-green-100 to-emerald-200" : "bg-gradient-to-br from-blue-100 to-indigo-200"
      )}>
        <div className="absolute inset-0 rounded-full animate-pulse opacity-30" 
             style={{ background: isRecap ? 'radial-gradient(circle, #22c55e 0%, transparent 70%)' : 'radial-gradient(circle, #3b82f6 0%, transparent 70%)' }}>
        </div>
        {isRecap ? (
          <CheckCircle className="w-20 h-20 text-green-600" />
        ) : (
          <BookOpen className="w-20 h-20 text-blue-600" />
        )}
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        {step.playground?.visual?.caption || (isRecap ? 'Well Done!' : 'Concept Visualization')}
      </h3>
      
      <p className="text-gray-500 max-w-sm mb-8">
        {isRecap 
          ? 'You\'ve completed this lesson! Click Next to continue your learning journey.'
          : 'An interactive diagram would appear here to visualize the concept.'}
      </p>
      
      <button 
        onClick={onNext}
        className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md"
      >
        {isRecap ? 'Complete Lesson' : 'Continue'} <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const moduleSlug = params.moduleSlug as string;
  const lessonSlug = params.lessonSlug as string;
  
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  
  const module = getModuleBySlug(moduleSlug);
  const lesson = getLesson(moduleSlug, lessonSlug);
  
  if (!lesson || !module) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Lesson Not Found</h1>
          <p className="text-gray-600 mb-4">The requested lesson doesn't exist.</p>
          <button 
            onClick={() => router.push('/learn')}
            className="text-blue-600 hover:underline"
          >
            ← Back to Lessons
          </button>
        </div>
      </div>
    );
  }
  
  const currentStep = lesson.steps[currentStepIndex];
  const isLastStep = currentStepIndex === lesson.steps.length - 1;
  
  const handleNext = () => {
    if (currentStepIndex < lesson.steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      // Lesson complete - go to next lesson or module page
      const currentLessonIndex = module.lessons.findIndex(l => l.slug === lessonSlug);
      if (currentLessonIndex < module.lessons.length - 1) {
        const nextLesson = module.lessons[currentLessonIndex + 1];
        router.push(`/learn/${moduleSlug}/${nextLesson.slug}`);
      } else {
        // Module complete
        router.push(`/learn/${moduleSlug}`);
      }
    }
  };
  
  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };
  
  const handleChallengeSuccess = () => {
    if (!completedSteps.includes(currentStep.id)) {
      setCompletedSteps(prev => [...prev, currentStep.id]);
    }
  };
  
  // Render playground content based on step type
  const renderPlayground = () => {
    if (!currentStep.playground) {
      return <VisualPlaceholder step={currentStep} onNext={handleNext} />;
    }
    
    switch (currentStep.playground.type) {
      case 'prompt-gym':
        if (currentStep.playground.promptChallenge) {
          return (
            <PromptGym
              key={currentStep.id}
              challenge={{
                id: currentStep.id,
                ...currentStep.playground.promptChallenge
              }}
              onSuccess={handleChallengeSuccess}
            />
          );
        }
        return <VisualPlaceholder step={currentStep} onNext={handleNext} />;
        
      case 'visual':
      default:
        return <VisualPlaceholder step={currentStep} onNext={handleNext} />;
    }
  };
  
  return (
    <LessonWorkspace
      title={currentStep.title}
      moduleTitle={`${module.title} • Lesson ${lesson.order}`}
      currentStep={currentStepIndex + 1}
      totalSteps={lesson.steps.length}
      instructionContent={<InstructionContent step={currentStep} />}
      playgroundContent={renderPlayground()}
      onNext={handleNext}
      onPrev={handlePrev}
    />
  );
}
