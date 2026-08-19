'use client';

import { useState } from 'react';
import { Button, Card, Badge } from '@/components/ui';
import { CheckCircle, XCircle, HelpCircle, MessageSquare } from 'lucide-react';

interface ReviewQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

interface LessonReviewProps {
  lessonTitle: string;
  questions: ReviewQuestion[];
  passingScore?: number; // default 80%
  moduleSlug: string;
  lessonSlug: string;
  onComplete: (passed: boolean, score: number) => void;
  onRequestAIHelp?: (question: string) => void;
}

export function LessonReview({
  lessonTitle,
  questions,
  passingScore = 80,
  moduleSlug,
  lessonSlug,
  onComplete,
  onRequestAIHelp
}: LessonReviewProps) {
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(questions.length).fill(null)
  );
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanations, setShowExplanations] = useState(false);

  const handleAnswer = (questionIndex: number, optionIndex: number) => {
    if (submitted) return;
    const newAnswers = [...answers];
    newAnswers[questionIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    // Calculate score
    let correct = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.correctAnswer) correct++;
    });
    
    const percentage = Math.round((correct / questions.length) * 100);
    setScore(percentage);
    setSubmitted(true);
    setShowExplanations(true);

    // Track review completion
    try {
      await fetch('/api/progress/track', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          moduleSlug,
          lessonSlug,
          action: 'review'
        })
      });
    } catch (error) {
      console.error('Failed to track review:', error);
    }

    // Notify parent
    onComplete(percentage >= passingScore, percentage);
  };

  const handleRetry = () => {
    setAnswers(new Array(questions.length).fill(null));
    setSubmitted(false);
    setScore(0);
    setShowExplanations(false);
  };

  const allAnswered = answers.every(a => a !== null);
  const passed = score >= passingScore;

  return (
    <Card className="overflow-hidden border-2 border-maru-blue-100">
      {/* Header */}
      <div className="bg-maru-blue-100 p-6 border-b border-maru-blue-100">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="neutral" size="lg">
            <HelpCircle size={14} className="mr-1" />
            Lesson Review
          </Badge>
          {submitted && (
            <Badge variant={passed ? 'verified' : 'atrisk'}>
              Score: {score}%
            </Badge>
          )}
        </div>
        <h2 className="text-xl font-bold text-maru-navy">
          Check your understanding
        </h2>
        <p className="text-maru-grey text-sm mt-1">
          Review the key concepts from <strong>{lessonTitle}</strong>
        </p>
        <p className="text-xs text-maru-grey mt-2">
          Passing score: {passingScore}%
        </p>
      </div>

      {/* Result Banner (if submitted) */}
      {submitted && (
        <div className={`p-4 ${passed ? 'bg-verified-bg border-b border-verified-bg' : 'bg-atrisk-bg border-b border-atrisk-bg'}`}>
          <div className="flex items-center gap-3">
            {passed ? (
              <>
                <CheckCircle size={24} className="text-verified-fg" />
                <div>
                  <p className="font-bold text-verified-fg">Great job! You passed the review.</p>
                  <p className="text-sm text-verified-fg">You scored {score}% - ready for the next lesson!</p>
                </div>
              </>
            ) : (
              <>
                <XCircle size={24} className="text-atrisk-fg" />
                <div>
                  <p className="font-bold text-atrisk-fg">Almost there! Review and try again.</p>
                  <p className="text-sm text-atrisk-fg">
                    You scored {score}% - need {passingScore}% to proceed.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Questions */}
      <div className="p-6 space-y-6">
        {questions.map((q, qIndex) => {
          const isCorrect = submitted && answers[qIndex] === q.correctAnswer;
          const isWrong = submitted && answers[qIndex] !== q.correctAnswer && answers[qIndex] !== null;

          return (
            <div 
              key={q.id} 
              className={`rounded-lg p-4 transition-colors ${
                submitted 
                  ? isCorrect 
                    ? 'bg-verified-bg border border-verified-bg' 
                    : isWrong 
                      ? 'bg-overdue-bg border border-overdue-bg'
                      : 'bg-maru-cloud border border-maru-line'
                  : 'bg-maru-cloud border border-maru-line'
              }`}
            >
              <p className="font-semibold text-maru-navy mb-4">
                {qIndex + 1}. {q.question}
              </p>
              
              <div className="space-y-2">
                {q.options.map((option, oIndex) => {
                  const isSelected = answers[qIndex] === oIndex;
                  const isCorrectOption = q.correctAnswer === oIndex;
                  
                  return (
                    <button
                      key={oIndex}
                      onClick={() => handleAnswer(qIndex, oIndex)}
                      disabled={submitted}
                      className={`w-full text-left p-3 rounded-lg border transition-all ${
                        submitted
                          ? isCorrectOption
                            ? 'bg-verified-bg border-verified text-verified-fg'
                            : isSelected && !isCorrectOption
                              ? 'bg-overdue-bg border-overdue text-overdue-fg'
                              : 'bg-white border-maru-line text-maru-grey'
                          : isSelected
                            ? 'bg-maru-blue-100 border-maru-blue-300 ring-1 ring-maru-blue-300'
                            : 'bg-white border-maru-line hover:border-maru-line hover:bg-maru-cloud'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold ${
                          submitted && isCorrectOption
                            ? 'border-verified bg-verified text-white'
                            : submitted && isSelected && !isCorrectOption
                              ? 'border-overdue bg-overdue text-white'
                              : isSelected
                                ? 'border-maru-blue bg-maru-blue text-white'
                                : 'border-maru-line'
                        }`}>
                          {String.fromCharCode(65 + oIndex)}
                        </span>
                        <span>{option}</span>
                        {submitted && isCorrectOption && (
                          <CheckCircle size={16} className="ml-auto text-verified-fg" />
                        )}
                        {submitted && isSelected && !isCorrectOption && (
                          <XCircle size={16} className="ml-auto text-overdue-fg" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              {submitted && showExplanations && q.explanation && (
                <div className="mt-4 p-3 bg-maru-blue-100 rounded-lg border border-maru-blue-100">
                  <p className="text-sm text-maru-blue-700">
                    <strong>Explanation:</strong> {q.explanation}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="p-6 bg-maru-cloud border-t border-maru-line">
        {!submitted ? (
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={handleSubmit}
            disabled={!allAnswered}
          >
            {allAnswered ? 'Submit Review' : `Answer all questions (${answers.filter(a => a !== null).length}/${questions.length})`}
          </Button>
        ) : !passed ? (
          <div className="space-y-3">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleRetry}
            >
              Try Again
            </Button>
            {onRequestAIHelp && (
              <Button
                variant="secondary"
                fullWidth
                onClick={() => onRequestAIHelp(lessonTitle)}
                className="flex items-center justify-center gap-2"
              >
                <MessageSquare size={16} />
                Ask AI Assistant for Help
              </Button>
            )}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-verified-fg font-semibold mb-2">Review Complete!</p>
            <p className="text-maru-grey text-sm">You can now proceed to the next lesson.</p>
          </div>
        )}
      </div>
    </Card>
  );
}
