'use client';

import { useState } from 'react';
import { Button, Card } from '@/components/ui';
import { Lightbulb, CheckCircle, XCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface Hint {
  content: string;
}

interface ExerciseProps {
  id: string;
  title: string;
  instructions: string;
  hints: Hint[];
  moduleSlug: string;
  lessonSlug: string;
  onComplete?: (attempts: number, hintsUsed: number) => void;
  children: React.ReactNode; // The actual exercise content
}

export function ExerciseWithHints({
  id,
  title,
  instructions,
  hints,
  moduleSlug,
  lessonSlug,
  onComplete,
  children
}: ExerciseProps) {
  const [hintsRevealed, setHintsRevealed] = useState(0);
  const [showHintPanel, setShowHintPanel] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const trackHint = async () => {
    try {
      await fetch('/api/progress/track', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          moduleSlug,
          lessonSlug,
          action: 'hint'
        })
      });
    } catch (error) {
      console.error('Failed to track hint:', error);
    }
  };

  const trackAttempt = async () => {
    try {
      await fetch('/api/progress/track', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          moduleSlug,
          lessonSlug,
          action: 'attempt'
        })
      });
    } catch (error) {
      console.error('Failed to track attempt:', error);
    }
  };

  const revealNextHint = () => {
    if (hintsRevealed < hints.length) {
      setHintsRevealed(prev => prev + 1);
      trackHint();
    }
  };

  const handleAttempt = (correct: boolean) => {
    setAttempts(prev => prev + 1);
    setIsCorrect(correct);
    trackAttempt();

    if (correct && onComplete) {
      onComplete(attempts + 1, hintsRevealed);
    }
  };

  return (
    <Card className="mb-6 overflow-hidden">
      {/* Exercise Header */}
      <div className="bg-gray-50 p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-gray-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-primary-100 text-primary-600 flex items-center justify-center text-sm">
              Ex
            </span>
            {title}
          </h3>
          {isCorrect !== null && (
            <div className={`flex items-center gap-1 text-sm ${isCorrect ? 'text-green-600' : 'text-orange-500'}`}>
              {isCorrect ? (
                <>
                  <CheckCircle size={16} />
                  <span>Correct!</span>
                </>
              ) : (
                <>
                  <XCircle size={16} />
                  <span>Try again</span>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="p-6 border-b border-gray-100">
        <p className="text-gray-700">{instructions}</p>
      </div>

      {/* Exercise Content (passed as children) */}
      <div className="p-6">
        {children}
      </div>

      {/* Hint Panel */}
      {hints.length > 0 && (
        <div className="border-t border-gray-100">
          {/* Hint Toggle Button */}
          <button
            onClick={() => setShowHintPanel(!showHintPanel)}
            className="w-full px-6 py-3 flex items-center justify-between bg-amber-50 hover:bg-amber-100 transition-colors"
          >
            <div className="flex items-center gap-2 text-amber-700">
              <Lightbulb size={18} />
              <span className="font-medium">
                {hintsRevealed === 0 ? 'Stuck? Get a hint' : `Hints (${hintsRevealed}/${hints.length})`}
              </span>
            </div>
            {showHintPanel ? <ChevronUp size={18} className="text-amber-600" /> : <ChevronDown size={18} className="text-amber-600" />}
          </button>

          {/* Expanded Hints */}
          {showHintPanel && (
            <div className="px-6 py-4 bg-amber-50 border-t border-amber-100">
              {hintsRevealed === 0 ? (
                <div className="text-center py-4">
                  <p className="text-amber-700 mb-4">
                    Need some help? We'll reveal hints one at a time.
                  </p>
                  <Button
                    variant="outline"
                    onClick={revealNextHint}
                    className="border-amber-300 text-amber-700 hover:bg-amber-100"
                  >
                    <Lightbulb size={16} className="mr-2" />
                    Show First Hint
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {hints.slice(0, hintsRevealed).map((hint, i) => (
                    <div 
                      key={i} 
                      className="bg-white rounded-lg p-4 border border-amber-200 animate-fade-in"
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-amber-200 text-amber-700 flex items-center justify-center text-sm font-bold flex-shrink-0">
                          {i + 1}
                        </span>
                        <p className="text-gray-700">{hint.content}</p>
                      </div>
                    </div>
                  ))}

                  {hintsRevealed < hints.length && (
                    <div className="text-center pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={revealNextHint}
                        className="border-amber-300 text-amber-700 hover:bg-amber-100"
                      >
                        <Lightbulb size={14} className="mr-1" />
                        Show Another Hint ({hints.length - hintsRevealed} remaining)
                      </Button>
                    </div>
                  )}

                  {hintsRevealed === hints.length && (
                    <p className="text-center text-amber-600 text-sm">
                      💡 All hints revealed. Still stuck? Try asking the AI Assistant!
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Attempt Counter */}
      {attempts > 0 && (
        <div className="px-6 py-2 bg-gray-50 border-t border-gray-100 text-xs text-gray-500 text-center">
          Attempts: {attempts} | Hints used: {hintsRevealed}
        </div>
      )}
    </Card>
  );
}

// Export a simplified wrapper for validation
export function useExerciseValidation() {
  const [result, setResult] = useState<boolean | null>(null);

  const validate = (isCorrect: boolean) => {
    setResult(isCorrect);
    return isCorrect;
  };

  const reset = () => setResult(null);

  return { result, validate, reset };
}
