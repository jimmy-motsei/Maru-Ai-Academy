'use client';

import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, ArrowRight, CheckCircle, HelpCircle, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LessonWorkspaceProps {
  title: string;
  moduleTitle: string;
  currentStep: number;
  totalSteps: number;
  instructionContent: React.ReactNode;
  playgroundContent: React.ReactNode;
  isComplete?: boolean;
  onNext?: () => void;
  onPrev?: () => void;
  onComplete?: () => void;
}

export function LessonWorkspace({
  title,
  moduleTitle,
  currentStep,
  totalSteps,
  instructionContent,
  playgroundContent,
  isComplete = false,
  onNext,
  onPrev,
  onComplete
}: LessonWorkspaceProps) {
  
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
      {/* Header Bar */}
      <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6 flex-shrink-0 z-10">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-5 h-5" />
          </Button>
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">{moduleTitle}</span>
            <h1 className="text-lg font-bold text-gray-900 leading-tight">{title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col items-end mr-4">
            <span className="text-sm text-gray-600 mb-1">Step {currentStep} of {totalSteps}</span>
            <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary-600 transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <Button variant="outline" size="sm" className="hidden sm:flex gap-2">
            <HelpCircle className="w-4 h-4" />
            Get Help
          </Button>
        </div>
      </header>

      {/* Main Workspace - Split Screen */}
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        
        {/* Left Panel: Instructions */}
        <section className="w-full md:w-[40%] lg:w-[35%] bg-white border-r border-gray-200 flex flex-col h-full z-0 shadow-lg md:shadow-none">
          <div className="flex-1 overflow-y-auto p-6 lg:p-8 custom-scrollbar">
            {instructionContent}
          </div>
          
          {/* Navigation Controls (Mobile & Desktop) */}
          <div className="p-4 border-t border-gray-100 bg-white flex justify-between items-center sticky bottom-0">
            <Button 
              variant="outline" 
              onClick={onPrev} 
              disabled={currentStep === 1}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Previous</span>
            </Button>

            <div className="flex items-center gap-2 md:hidden">
              <span className="text-sm text-gray-600">{currentStep} / {totalSteps}</span>
            </div>

            {currentStep < totalSteps ? (
              <Button onClick={onNext} className="gap-2">
                <span className="hidden sm:inline">Next Step</span>
                <span className="sm:hidden">Next</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button onClick={onComplete} className="gap-2 bg-green-600 hover:bg-green-700 text-white">
                Complete Lesson
                <CheckCircle className="w-4 h-4" />
              </Button>
            )}
          </div>
        </section>

        {/* Right Panel: Interactive Playground */}
        <section className="flex-1 bg-gray-50 flex flex-col h-full relative overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
            <div className="h-full w-full max-w-5xl mx-auto rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden flex flex-col">
               {/* Toolbar / Tabs area could go here */}
               <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 flex items-center gap-2">
                 <div className="flex gap-1.5">
                   <div className="w-3 h-3 rounded-full bg-red-400"></div>
                   <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                   <div className="w-3 h-3 rounded-full bg-green-400"></div>
                 </div>
                 <div className="ml-4 text-xs font-mono text-gray-500 bg-white px-2 py-0.5 rounded border border-gray-200">
                   Interactive Workspace
                 </div>
               </div>
               
               {/* Actual Content */}
               <div className="flex-1 relative">
                 {playgroundContent}
               </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
