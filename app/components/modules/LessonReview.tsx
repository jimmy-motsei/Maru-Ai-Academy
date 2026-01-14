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
    <Card className="overflow-hidden border-2 border-secondary-200">
      {/* Header */}
      <div className="bg-secondary-50 p-6 border-b border-secondary-100">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary" size="lg">
            <HelpCircle size={14} className="mr-1" />
            Lesson Review
          </Badge>
          {submitted && (
            <Badge variant={passed ? 'success' : 'warning'}>
              Score: {score}%
            </Badge>
          )}
        </div>
        <h2 className="text-xl font-bold text-gray-900">
          Check Your Understanding
        </h2>
        <p className="text-gray-600 text-sm mt-1">
          Review the key concepts from <strong>{lessonTitle}</strong>
        </p>
        <p className="text-xs text-gray-500 mt-2">
          Passing score: {passingScore}%
        </p>
      </div>

      {/* Result Banner (if submitted) */}
      {submitted && (
        <div className={`p-4 ${passed ? 'bg-green-50 border-b border-green-100' : 'bg-amber-50 border-b border-amber-100'}`}>
          <div className="flex items-center gap-3">
            {passed ? (
              <>
                <CheckCircle size={24} className="text-green-500" />
                <div>
                  <p className="font-bold text-green-800">Great job! You passed the review.</p>
                  <p className="text-sm text-green-600">You scored {score}% - ready for the next lesson!</p>
                </div>
              </>
            ) : (
              <>
                <XCircle size={24} className="text-amber-500" />
                <div>
                  <p className="font-bold text-amber-800">Almost there! Review and try again.</p>
                  <p className="text-sm text-amber-600">
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
                    ? 'bg-green-50 border border-green-200' 
                    : isWrong 
                      ? 'bg-red-50 border border-red-200'
                      : 'bg-gray-50 border border-gray-200'
                  : 'bg-gray-50 border border-gray-200'
              }`}
            >
              <p className="font-semibold text-gray-900 mb-4">
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
                            ? 'bg-green-100 border-green-400 text-green-800'
                            : isSelected && !isCorrectOption
                              ? 'bg-red-100 border-red-400 text-red-800'
                              : 'bg-white border-gray-200 text-gray-600'
                          : isSelected
                            ? 'bg-primary-50 border-primary-400 ring-1 ring-primary-400'
                            : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold ${
                          submitted && isCorrectOption
                            ? 'border-green-500 bg-green-500 text-white'
                            : submitted && isSelected && !isCorrectOption
                              ? 'border-red-500 bg-red-500 text-white'
                              : isSelected
                                ? 'border-primary-500 bg-primary-500 text-white'
                                : 'border-gray-300'
                        }`}>
                          {String.fromCharCode(65 + oIndex)}
                        </span>
                        <span>{option}</span>
                        {submitted && isCorrectOption && (
                          <CheckCircle size={16} className="ml-auto text-green-500" />
                        )}
                        {submitted && isSelected && !isCorrectOption && (
                          <XCircle size={16} className="ml-auto text-red-500" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              {submitted && showExplanations && q.explanation && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-sm text-blue-800">
                    <strong>💡 Explanation:</strong> {q.explanation}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="p-6 bg-gray-50 border-t border-gray-100">
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
                variant="outline"
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
            <p className="text-green-600 font-semibold mb-2">✅ Review Complete!</p>
            <p className="text-gray-500 text-sm">You can now proceed to the next lesson.</p>
          </div>
        )}
      </div>
    </Card>
  );
}
