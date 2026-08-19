'use client';

import { QuizPlayground } from '@/components/interactive/QuizPlayground';
import { module1Lesson1Quiz } from '@/data/quizzes';

export default function QuizDemoPage() {
  const handleQuizComplete = (score: number, passed: boolean) => {
    console.log(`Quiz completed: ${score}% - ${passed ? 'PASSED' : 'FAILED'}`);
    
    // In a real lesson, you would:
    // - Mark the lesson as complete if passed
    // - Show a celebration animation
    // - Unlock the next lesson
    // - Update progress in the database
  };

  return (
    <div className="min-h-screen bg-maru-cloud">
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-maru-navy mb-2">
            Quiz system demo
          </h1>
          <p className="text-maru-grey">
            This is a working demonstration of the interactive quiz system. Try answering the questions!
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-maru-line h-[600px] overflow-hidden">
          <QuizPlayground
            questions={module1Lesson1Quiz.questions}
            passingScore={module1Lesson1Quiz.passingScore}
            moduleSlug="ai-made-simple"
            lessonSlug="what-is-ai"
            onComplete={handleQuizComplete}
          />
        </div>

        <div className="mt-6 p-4 bg-maru-blue-100 border border-maru-blue-100 rounded-lg">
          <h3 className="font-semibold text-maru-navy mb-2">Features demonstrated:</h3>
          <ul className="text-sm text-maru-blue-700 space-y-1">
            <li>Multiple choice questions with 4 options</li>
            <li>Check Answer button shows immediate feedback</li>
            <li>Explanations for correct/incorrect answers</li>
            <li>Progress tracking through questions</li>
            <li>Final score calculation and pass/fail status</li>
            <li>Review mode to see all answers</li>
            <li>Retry functionality for failed quizzes</li>
            <li>Score saved to database (if logged in)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
