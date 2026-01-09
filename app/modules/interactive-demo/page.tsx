'use client';

import React, { useState } from 'react';
import { LessonWorkspace } from '@/components/interactive/LessonWorkspace';
import { PromptGym, PromptChallenge } from '@/components/interactive/PromptGym';
import { ArrowRight, Lightbulb } from 'lucide-react';

const steps = [
  {
    id: 'intro',
    title: 'The Art of Prompting',
    content: (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Whatever you ask, be specific.</h2>
          <p className="text-gray-600 leading-relaxed">
            AI models are like brilliant interns who don't know your business context. If you ask vague questions, you get average answers.
          </p>
        </div>
        
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
          <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-blue-600" />
            The Golden Rule
          </h3>
          <p className="text-blue-800 text-sm">
            Always include <strong>Context</strong>, <strong>Instruction</strong>, and <strong>Output Format</strong>.
          </p>
        </div>

        <div className="border-l-4 border-gray-200 pl-4 py-1">
          <p className="text-sm text-gray-500 italic mb-1">Bad Prompt:</p>
          <p className="text-gray-800 font-medium">"Write an email."</p>
        </div>

        <div className="border-l-4 border-green-400 pl-4 py-1">
          <p className="text-sm text-green-600 italic mb-1">Good Prompt:</p>
          <p className="text-gray-800 font-medium">"Act as a Customer Support Manager. Write a polite email apologizing for a shipping delay. Keep it under 100 words."</p>
        </div>
      </div>
    ),
    challenge: null
  },
  {
    id: 'challenge-1',
    title: 'Challenge: The Angry Customer',
    content: (
      <div className="space-y-6">
        <div>
           <div className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold uppercase tracking-wide mb-3">
            Mission 1
           </div>
           <h2 className="text-2xl font-bold text-gray-900 mb-4">Draft a Response</h2>
           <p className="text-gray-600 mb-4">
             You received a complaint from a client, "TechCorp", who is upset their project is late.
           </p>
           <p className="text-gray-600">
             Your goal is to use AI to write a first draft. You need to verify the delay but maintain the relationship.
           </p>
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900">Requirements:</h3>
          <ul className="space-y-2">
            {[
              "Set the role (e.g., Project Manager)",
              "Mention the client name 'TechCorp'",
              "Ask for a specific tone (e.g., professional, empathetic)"
            ].map((req, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2" />
                {req}
              </li>
            ))}
          </ul>
        </div>
      </div>
    ),
    challenge: {
      id: 'c1',
      initialMessage: "I'm ready to help. What kind of email do you need me to write?",
      successResponse: "That's a perfect prompt! By specifying the role, client name, and tone, I can generate a much more effective draft immediately.",
      hint: "Make sure you explicitly include the client name 'TechCorp' and define your role (e.g., 'Act as a...').",
      gradingContext: {
        goal: "Write a prompt asking AI to draft an apology email to an upset client named TechCorp about a project delay.",
        criteria: [
          "Sets a clear role or persona (e.g., 'Act as a Project Manager')",
          "Mentions the specific client name 'TechCorp'",
          "Specifies the desired tone (e.g., professional, empathetic, apologetic)",
          "Provides context about the situation (project delay)",
          "Is specific enough that AI can generate a useful first draft"
        ],
        exampleGoodPrompt: "Act as a Project Manager. Write a professional and empathetic email to our client TechCorp apologizing for the delay in their project. Acknowledge their frustration, explain we're investigating the cause, and assure them of our commitment to resolving this quickly. Keep it under 150 words."
      },
      validation: {
        requiredKeywords: ['TechCorp'],
        minLength: 20
      }
    } as PromptChallenge
  },
  {
    id: 'challenge-2',
    title: 'Challenge: Summerize Meeting Notes',
    content: (
      <div className="space-y-6">
        <div>
           <div className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold uppercase tracking-wide mb-3">
            Mission 2
           </div>
           <h2 className="text-2xl font-bold text-gray-900 mb-4">Summarize for Executives</h2>
           <p className="text-gray-600 mb-4">
             You have a transcript of a 1-hour meeting. You need to create a summary for the CEO who only has 1 minute.
           </p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg border border-gray-200 text-sm font-mono text-gray-600 mb-4">
          [System]: Uploaded file "meeting_transcript.txt" (15kb)
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900">Requirements:</h3>
          <ul className="space-y-2">
            {[
              "Ask for bullet points",
              "Limit the length (e.g., 3 key points)",
              "Focus on 'Action Items'"
            ].map((req, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2" />
                {req}
              </li>
            ))}
          </ul>
        </div>
      </div>
    ),
    challenge: {
      id: 'c2',
      initialMessage: "I've analyzed the transcript. How would you like me to summarize it?",
      successResponse: "Excellent! Asking for specific constraints (bullet points, length limits) ensures the CEO gets exactly what they need without fluff.",
      hint: "Try asking for 'bullet points' and mention 'action items' to make the summary useful.",
      gradingContext: {
        goal: "Write a prompt asking AI to summarize a meeting transcript for a busy CEO in a concise, actionable format.",
        criteria: [
          "Requests a specific format (e.g., bullet points, numbered list)",
          "Sets length constraints (e.g., '3 key points', 'under 100 words')",
          "Focuses on actionable insights or 'action items'",
          "Considers the audience (busy executive with limited time)",
          "Is clear about what information to prioritize"
        ],
        exampleGoodPrompt: "Summarize this meeting transcript into 3-5 bullet points for the CEO. Focus on key decisions made and action items with owners. Keep it under 100 words and highlight anything requiring the CEO's attention."
      },
      validation: {
        requiredKeywords: ['bullet'],
        minLength: 15
      }
    } as PromptChallenge
  }
];

export default function InteractiveDemoPage() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  
  const currentStep = steps[currentStepIndex];
  const isLastStep = currentStepIndex === steps.length - 1;

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
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

  return (
    <LessonWorkspace
      title={currentStep.title}
      moduleTitle="Module 1: Prompt Engineering"
      currentStep={currentStepIndex + 1}
      totalSteps={steps.length}
      instructionContent={currentStep.content}
      onNext={handleNext}
      onPrev={handlePrev}
      playgroundContent={
        currentStep.challenge ? (
          <PromptGym 
            key={currentStep.id} // Reset state on step change
            challenge={currentStep.challenge}
            onSuccess={handleChallengeSuccess}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 text-center p-8">
            <div className="w-64 h-64 bg-white rounded-full flex items-center justify-center shadow-lg mb-8 relative">
               <div className="absolute inset-0 bg-blue-500/5 rounded-full animate-pulse"></div>
               <div className="w-48 h-48 bg-blue-100 rounded-full flex items-center justify-center">
                 <BotIcon className="w-24 h-24 text-blue-600" />
               </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Concept Visualization</h3>
            <p className="text-gray-500 max-w-sm">
              In this section, you'd normally see an interactive diagram or animation explaining the concept of LLM context windows.
            </p>
            <button 
              onClick={handleNext}
              className="mt-8 flex items-center gap-2 text-blue-600 font-semibold hover:underline"
            >
              Start First Challenge <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )
      }
    />
  );
}

function BotIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  );
}
