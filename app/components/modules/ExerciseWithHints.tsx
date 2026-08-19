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
      <div className="bg-maru-cloud p-4 border-b border-maru-line">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-maru-navy flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-maru-blue-100 text-maru-blue-700 flex items-center justify-center text-sm">
              Ex
            </span>
            {title}
          </h3>
          {isCorrect !== null && (
            <div className={`flex items-center gap-1 text-sm ${isCorrect ? 'text-verified-fg' : 'text-atrisk-fg'}`}>
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
      <div className="p-6 border-b border-maru-line">
        <p className="text-maru-grey">{instructions}</p>
      </div>

      {/* Exercise Content (passed as children) */}
      <div className="p-6">
        {children}
      </div>

      {/* Hint Panel */}
      {hints.length > 0 && (
        <div className="border-t border-maru-line">
          {/* Hint Toggle Button */}
          <button
            onClick={() => setShowHintPanel(!showHintPanel)}
            className="w-full px-6 py-3 flex items-center justify-between bg-atrisk-bg hover:bg-atrisk-bg transition-colors"
          >
            <div className="flex items-center gap-2 text-atrisk-fg">
              <Lightbulb size={18} />
              <span className="font-medium">
                {hintsRevealed === 0 ? 'Stuck? Get a hint' : `Hints (${hintsRevealed}/${hints.length})`}
              </span>
            </div>
            {showHintPanel ? <ChevronUp size={18} className="text-atrisk-fg" /> : <ChevronDown size={18} className="text-atrisk-fg" />}
          </button>

          {/* Expanded Hints */}
          {showHintPanel && (
            <div className="px-6 py-4 bg-atrisk-bg border-t border-atrisk-bg">
              {hintsRevealed === 0 ? (
                <div className="text-center py-4">
                  <p className="text-atrisk-fg mb-4">
                    Need some help? We'll reveal hints one at a time.
                  </p>
                  <Button
                    variant="secondary"
                    onClick={revealNextHint}
                    className="border-atrisk text-atrisk-fg hover:bg-atrisk-bg"
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
                      className="bg-white rounded-lg p-4 border border-atrisk-bg animate-fade-in"
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-atrisk-bg text-atrisk-fg flex items-center justify-center text-sm font-bold flex-shrink-0">
                          {i + 1}
                        </span>
                        <p className="text-maru-grey">{hint.content}</p>
                      </div>
                    </div>
                  ))}

                  {hintsRevealed < hints.length && (
                    <div className="text-center pt-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={revealNextHint}
                        className="border-atrisk text-atrisk-fg hover:bg-atrisk-bg"
                      >
                        <Lightbulb size={14} className="mr-1" />
                        Show Another Hint ({hints.length - hintsRevealed} remaining)
                      </Button>
                    </div>
                  )}

                  {hintsRevealed === hints.length && (
                    <p className="text-center text-atrisk-fg text-sm">
                      All hints revealed. Still stuck? Try asking the AI Assistant!
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
        <div className="px-6 py-2 bg-maru-cloud border-t border-maru-line text-xs text-maru-grey text-center">
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
