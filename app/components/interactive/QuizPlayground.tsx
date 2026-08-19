'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { CheckCircle, XCircle, Award, RotateCcw, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface QuizPlaygroundProps {
  questions: QuizQuestion[];
  passingScore: number; // percentage (e.g., 70)
  onComplete?: (score: number, passed: boolean) => void;
  moduleSlug?: string;
  lessonSlug?: string;
}

type QuizState = 'taking' | 'reviewing' | 'completed';

export function QuizPlayground({ 
  questions, 
  passingScore,
  onComplete,
  moduleSlug,
  lessonSlug
}: QuizPlaygroundProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
    new Array(questions.length).fill(null)
  );
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizState, setQuizState] = useState<QuizState>('taking');

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const hasSelectedAnswer = selectedAnswers[currentQuestionIndex] !== null;

  // Calculate score
  const correctAnswers = selectedAnswers.filter((answer, index) => 
    answer === questions[index].correctIndex
  ).length;
  const scorePercentage = Math.round((correctAnswers / questions.length) * 100);
  const passed = scorePercentage >= passingScore;

  const handleSelectAnswer = (optionIndex: number) => {
    if (quizState === 'reviewing') return; // Can't change answers in review mode
    
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setSelectedAnswers(newAnswers);
    setShowExplanation(false);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowExplanation(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowExplanation(false);
    }
  };

  const handleCheckAnswer = () => {
    setShowExplanation(true);
  };

  const handleSubmitQuiz = async () => {
    setQuizState('completed');
    
    // Save score to database if moduleSlug and lessonSlug are provided
    if (moduleSlug && lessonSlug) {
      try {
        await fetch('/api/quiz/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            moduleSlug,
            lessonSlug,
            score: scorePercentage,
            questionsTotal: questions.length,
            questionsCorrect: correctAnswers
          })
        });
      } catch (error) {
        console.error('Failed to save quiz score:', error);
      }
    }

    // Callback to parent component
    if (onComplete) {
      onComplete(scorePercentage, passed);
    }
  };

  const handleRetry = () => {
    setSelectedAnswers(new Array(questions.length).fill(null));
    setCurrentQuestionIndex(0);
    setShowExplanation(false);
    setQuizState('taking');
  };

  const handleReview = () => {
    setQuizState('reviewing');
    setCurrentQuestionIndex(0);
    setShowExplanation(false);
  };

  // Quiz Completed View
  if (quizState === 'completed') {
    return (
      <div className="h-full flex items-center justify-center p-6">
        <div className="max-w-2xl w-full text-center">
          <div className={cn(
            "w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6",
            passed ? "bg-verified-bg" : "bg-atrisk-bg"
          )}>
            {passed ? (
              <Award className="w-12 h-12 text-verified-fg" />
            ) : (
              <RotateCcw className="w-12 h-12 text-atrisk-fg" />
            )}
          </div>

          <h2 className="text-3xl font-bold mb-2">
            {passed ? 'Congratulations!' : 'Keep Practicing!'}
          </h2>
          
          <p className="text-maru-grey mb-6">
            You scored <span className="font-bold text-2xl text-maru-navy">{scorePercentage}%</span>
          </p>

          <div className="bg-maru-cloud rounded-lg p-6 mb-8 border border-maru-line">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-maru-navy font-mono tracking-mono">{correctAnswers}</div>
                <div className="text-sm text-maru-grey">Correct</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-maru-navy font-mono tracking-mono">{questions.length - correctAnswers}</div>
                <div className="text-sm text-maru-grey">Incorrect</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-maru-navy font-mono tracking-mono">{questions.length}</div>
                <div className="text-sm text-maru-grey">Total</div>
              </div>
            </div>
          </div>

          {passed ? (
            <div className="bg-verified-bg border border-verified-bg rounded-lg p-4 mb-6">
              <p className="text-verified-fg">
                You've passed! (Minimum: {passingScore}%)
              </p>
            </div>
          ) : (
            <div className="bg-atrisk-bg border border-atrisk-bg rounded-lg p-4 mb-6">
              <p className="text-atrisk-fg">
                You need {passingScore}% to pass. You can retake the quiz to improve your score.
              </p>
            </div>
          )}

          <div className="flex gap-3 justify-center">
            <Button variant="secondary" onClick={handleReview} className="gap-2">
              Review Answers
            </Button>
            {!passed && (
              <Button onClick={handleRetry} className="gap-2">
                <RotateCcw className="w-4 h-4" />
                Retake Quiz
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Question View (Taking or Reviewing)
  const selectedAnswer = selectedAnswers[currentQuestionIndex];
  const isCorrect = selectedAnswer === currentQuestion.correctIndex;

  return (
    <div className="h-full flex flex-col">
      {/* Progress Bar */}
      <div className="px-6 pt-6 pb-4 border-b border-maru-line">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-maru-grey">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
          {quizState === 'reviewing' && (
            <span className="text-xs px-2 py-1 bg-maru-blue-100 text-maru-blue-700 rounded font-medium">
              Review Mode
            </span>
          )}
        </div>
        <div className="w-full h-2 bg-maru-cloud rounded-full overflow-hidden">
          <div 
            className="h-full bg-maru-blue transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 overflow-y-auto p-6">
        <h3 className="text-xl font-bold text-maru-navy mb-6">
          {currentQuestion.question}
        </h3>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrectOption = index === currentQuestion.correctIndex;
            const showAsCorrect = showExplanation && isCorrectOption;
            const showAsWrong = showExplanation && isSelected && !isCorrect;

            return (
              <button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                disabled={quizState === 'reviewing'}
                className={cn(
                  "w-full text-left p-4 rounded-lg border-2 transition-all",
                  "hover:border-maru-blue-300 hover:bg-maru-blue-100",
                  isSelected && !showExplanation && "border-maru-blue bg-maru-blue-100",
                  showAsCorrect && "border-verified bg-verified-bg",
                  showAsWrong && "border-overdue bg-overdue-bg",
                  !isSelected && !showAsCorrect && !showAsWrong && "border-maru-line"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="flex-1 text-maru-navy">{option}</span>
                  {showAsCorrect && <CheckCircle className="w-5 h-5 text-verified-fg flex-shrink-0 ml-2" />}
                  {showAsWrong && <XCircle className="w-5 h-5 text-overdue-fg flex-shrink-0 ml-2" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div className={cn(
            "p-4 rounded-lg border-2 mb-6",
            isCorrect ? "bg-verified-bg border-verified-bg" : "bg-maru-blue-100 border-maru-blue-100"
          )}>
            <div className="flex items-start gap-3">
              {isCorrect ? (
                <CheckCircle className="w-5 h-5 text-verified-fg flex-shrink-0 mt-0.5" />
              ) : (
                <div className="w-5 h-5 flex-shrink-0">
                  <div className="w-5 h-5 rounded-full border-2 border-maru-blue flex items-center justify-center">
                    <span className="text-xs font-bold text-maru-blue-700">i</span>
                  </div>
                </div>
              )}
              <div className="flex-1">
                <p className="font-semibold mb-1 text-maru-navy">
                  {isCorrect ? 'Correct!' : 'Not quite'}
                </p>
                <p className="text-sm text-maru-grey">{currentQuestion.explanation}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="px-6 py-4 border-t border-maru-line flex items-center justify-between bg-white">
        <Button
          variant="secondary"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </Button>

        <div className="flex gap-2">
          {!showExplanation && hasSelectedAnswer && quizState === 'taking' && (
            <Button variant="secondary" onClick={handleCheckAnswer}>
              Check Answer
            </Button>
          )}

          {!isLastQuestion ? (
            <Button 
              onClick={handleNext}
              disabled={!hasSelectedAnswer && quizState === 'taking'}
              className="gap-2"
            >
              Next Question
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            quizState === 'taking' && selectedAnswers.every(a => a !== null) && (
              <Button 
                onClick={handleSubmitQuiz}
                className="gap-2 bg-verified hover:bg-verified-fg"
              >
                Submit Quiz
                <CheckCircle className="w-4 h-4" />
              </Button>
            )
          )}

          {quizState === 'reviewing' && (
            <Button onClick={() => setQuizState('completed')} variant="secondary">
              Back to Results
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
