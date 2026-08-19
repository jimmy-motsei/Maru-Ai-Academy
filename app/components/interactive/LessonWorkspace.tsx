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
    <div className="flex flex-col h-screen bg-maru-cloud overflow-hidden">
      {/* Header Bar */}
      <header className="h-16 bg-white border-b border-maru-line flex items-center justify-between px-4 lg:px-6 flex-shrink-0 z-10">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-5 h-5" />
          </Button>
          <div className="flex flex-col">
            <span className="text-xs text-maru-grey font-medium uppercase tracking-wider">{moduleTitle}</span>
            <h1 className="text-lg font-bold text-maru-navy leading-tight">{title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col items-end mr-4">
            <span className="text-sm text-maru-grey mb-1">Step {currentStep} of {totalSteps}</span>
            <div className="w-32 h-2 bg-maru-cloud rounded-full overflow-hidden">
              <div 
                className="h-full bg-maru-blue transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <Button variant="secondary" size="sm" className="hidden sm:flex gap-2">
            <HelpCircle className="w-4 h-4" />
            Get Help
          </Button>
        </div>
      </header>

      {/* Main Workspace - Split Screen */}
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        
        {/* Left Panel: Instructions */}
        <section className="w-full md:w-[40%] lg:w-[35%] bg-white border-r border-maru-line flex flex-col h-full z-0 shadow-lg md:shadow-none">
          <div className="flex-1 overflow-y-auto p-6 lg:p-8 custom-scrollbar">
            {instructionContent}
          </div>
          
          {/* Navigation Controls (Mobile & Desktop) */}
          <div className="p-4 border-t border-maru-line bg-white flex justify-between items-center sticky bottom-0">
            <Button 
              variant="secondary" 
              onClick={onPrev} 
              disabled={currentStep === 1}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Previous</span>
            </Button>

            <div className="flex items-center gap-2 md:hidden">
              <span className="text-sm text-maru-grey">{currentStep} / {totalSteps}</span>
            </div>

            {currentStep < totalSteps ? (
              <Button onClick={onNext} className="gap-2">
                <span className="hidden sm:inline">Next Step</span>
                <span className="sm:hidden">Next</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button onClick={onComplete} className="gap-2 bg-verified hover:bg-verified-fg text-white">
                Complete Lesson
                <CheckCircle className="w-4 h-4" />
              </Button>
            )}
          </div>
        </section>

        {/* Right Panel: Interactive Playground */}
        <section className="flex-1 bg-maru-cloud flex flex-col h-full relative overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
            <div className="h-full w-full max-w-5xl mx-auto rounded-xl border border-maru-line bg-white shadow-sm overflow-hidden flex flex-col">
               {/* Toolbar / Tabs area could go here */}
               <div className="bg-maru-cloud border-b border-maru-line px-4 py-2 flex items-center gap-2">
                 <div className="flex gap-1.5">
                   <div className="w-3 h-3 rounded-full bg-overdue"></div>
                   <div className="w-3 h-3 rounded-full bg-atrisk"></div>
                   <div className="w-3 h-3 rounded-full bg-verified"></div>
                 </div>
                 <div className="ml-4 text-xs font-mono text-maru-grey bg-white px-2 py-0.5 rounded border border-maru-line">
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
