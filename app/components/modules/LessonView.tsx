'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button, Card, Badge } from '@/components/ui'
import { LessonContent } from '@/content/modules/ai-made-simple'
import { LessonIntroduction } from './LessonIntroduction'
import { LessonReview } from './LessonReview'
import { FeedbackModal } from './FeedbackModal'
import { ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react'

// Extended content interface with intro and review data
interface EnhancedLessonContent extends LessonContent {
  introduction?: {
    objectives: string[];
    concepts: string[];
    benefits: string[];
    estimatedTime: string;
  };
  review?: {
    questions: Array<{
      id: string;
      question: string;
      options: string[];
      correctAnswer: number;
      explanation?: string;
    }>;
  };
}

interface LessonViewProps {
  content: EnhancedLessonContent
  moduleSlug: string
  lessonSlug: string
  nextLessonSlug?: string
  prevLessonSlug?: string
  isCompleted?: boolean
  lessonNumber?: number
  totalLessons?: number
}

export function LessonView({
  content,
  moduleSlug,
  lessonSlug,
  nextLessonSlug,
  prevLessonSlug,
  isCompleted = false,
  lessonNumber = 1,
  totalLessons = 5
}: LessonViewProps) {
  const router = useRouter()
  const [completed, setCompleted] = useState(isCompleted)
  const [loading, setLoading] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [reviewPassed, setReviewPassed] = useState(false)
  
  // Sections: 'intro' | 'content' | 'review'
  const [currentSection, setCurrentSection] = useState<'intro' | 'content' | 'review'>('intro')
  
  // Quiz State (for quiz-type lessons)
  const [quizAnswers, setQuizAnswers] = useState<number[]>(new Array(content.quiz?.length || 0).fill(-1))
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [quizScore, setQuizScore] = useState(0)

  // Skip intro if already completed
  useEffect(() => {
    if (isCompleted) {
      setCurrentSection('content')
    }
  }, [isCompleted])

  // Check if should show feedback (every 3rd lesson)
  const shouldShowFeedback = lessonNumber % 3 === 0

  const markComplete = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/progress/mark-complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          moduleSlug,
          lessonSlug,
          completed: true,
          score: content.type === 'quiz' ? quizScore : undefined
        }),
      })

      if (res.ok) {
        setCompleted(true)
        router.refresh()
        
        // Show feedback modal if applicable
        if (shouldShowFeedback) {
          setShowFeedback(true)
        }
      }
    } catch (error) {
      console.error('Failed to mark complete', error)
    } finally {
      setLoading(false)
    }
  }

  const handleQuizSubmit = () => {
    if (!content.quiz) return
    
    let correct = 0
    content.quiz.forEach((q: any, i: number) => {
      if (quizAnswers[i] === q.correctAnswer) correct++
    })
    
    const percentage = Math.round((correct / content.quiz.length) * 100)
    setQuizScore(percentage)
    setQuizSubmitted(true)
    
    if (percentage >= 70) {
      markComplete()
    }
  }

  const handleReviewComplete = (passed: boolean, score: number) => {
    setReviewPassed(passed)
    if (passed) {
      markComplete()
    }
  }

  // Simple Markdown Renderer
  const renderMarkdown = (text: string) => {
    const processInline = (line: string) => {
      const parts = line.split(/(\*\*[^*]+\*\*)/g)
      return parts.map((part, j) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={j} className="font-semibold text-maru-navy">{part.slice(2, -2)}</strong>
        }
        return part
      })
    }

    return text.split('\n').map((line, i) => {
      if (line.startsWith('### ')) return <h3 key={i} className="text-xl font-bold mt-6 mb-3 text-maru-navy">{processInline(line.replace('### ', ''))}</h3>
      if (line.startsWith('- ')) return <li key={i} className="ml-4 text-maru-grey mb-2">{processInline(line.replace('- ', ''))}</li>
      if (line.startsWith('| ')) return <p key={i} className="text-maru-grey font-mono text-sm bg-maru-cloud p-2 rounded mb-2">{line}</p>
      if (line.startsWith('> ')) return <blockquote key={i} className="border-l-4 border-maru-blue pl-4 italic text-maru-grey my-4">{processInline(line.replace('> ', ''))}</blockquote>
      if (line.startsWith('```')) return null
      if (line.trim() === '') return <div key={i} className="h-4"></div>
      return <p key={i} className="text-maru-grey leading-relaxed mb-4">{processInline(line)}</p>
    })
  }

  // Default intro data if not provided
  const introData = content.introduction || {
    objectives: [
      `Understand the key concepts in "${content.title}"`,
      'Apply these concepts in real-world scenarios',
      'Build on your existing AI knowledge'
    ],
    concepts: [
      'Core principles of this topic',
      'Practical application methods',
      'Best practices and tips'
    ],
    benefits: [
      'Increase your productivity',
      'Make better decisions with AI assistance',
      'Stay ahead in your career'
    ],
    estimatedTime: '15 minutes'
  }

  // Default review questions if not provided
  const reviewData = content.review || {
    questions: [
      {
        id: '1',
        question: `What is the main concept covered in "${content.title}"?`,
        options: [
          'Understanding foundational principles',
          'Advanced implementation details',
          'Historical background only',
          'None of the above'
        ],
        correctAnswer: 0,
        explanation: 'This lesson focuses on foundational principles that you can build upon.'
      },
      {
        id: '2',
        question: 'How can you apply what you learned in this lesson?',
        options: [
          'Only in specific technical roles',
          'In your daily work and decision-making',
          'Only with advanced tools',
          'It has no practical application'
        ],
        correctAnswer: 1,
        explanation: 'The concepts in this lesson are designed to be applicable in everyday work scenarios.'
      }
    ]
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Link 
          href={`/modules/${moduleSlug}`}
          className="text-sm text-maru-grey hover:text-maru-blue-700 mb-4 inline-flex items-center gap-1"
        >
          <ChevronLeft size={16} />
          Back to Module
        </Link>
        <div className="flex items-center gap-3 mb-2">
          <Badge variant="blue">{content.type.toUpperCase()}</Badge>
          <Badge variant={currentSection === 'intro' ? 'neutral' : currentSection === 'content' ? 'blue' : 'navy'}>
            {currentSection === 'intro' ? 'INTRODUCTION' : currentSection === 'content' ? 'LEARNING' : 'REVIEW'}
          </Badge>
          {completed && <Badge variant="verified">COMPLETED</Badge>}
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-maru-navy">{content.title}</h1>
        {content.description && <p className="text-xl text-maru-grey mt-2">{content.description}</p>}
      </div>

      {/* Section Progress Indicator */}
      <div className="flex items-center gap-2 mb-8">
        <button
          onClick={() => setCurrentSection('intro')}
          className={`flex-1 h-2 rounded-full transition-colors ${
            currentSection === 'intro' ? 'bg-maru-blue' : 'bg-maru-line'
          }`}
          title="Introduction"
        />
        <button
          onClick={() => setCurrentSection('content')}
          className={`flex-1 h-2 rounded-full transition-colors ${
            currentSection === 'content' ? 'bg-maru-blue' : 'bg-maru-line'
          }`}
          title="Content"
        />
        <button
          onClick={() => setCurrentSection('review')}
          className={`flex-1 h-2 rounded-full transition-colors ${
            currentSection === 'review' ? 'bg-maru-blue' : completed ? 'bg-verified' : 'bg-maru-line'
          }`}
          title="Review"
        />
      </div>

      {/* SECTION: Introduction */}
      {currentSection === 'intro' && (
        <>
          <LessonIntroduction
            title={content.title}
            objectives={introData.objectives}
            concepts={introData.concepts}
            benefits={introData.benefits}
            estimatedTime={introData.estimatedTime}
            lessonNumber={lessonNumber}
            totalLessons={totalLessons}
          />
          
          <div className="mt-6 flex justify-end">
            <Button 
              variant="primary" 
              size="lg"
              onClick={() => setCurrentSection('content')}
              className="flex items-center gap-2"
            >
              Start Learning
              <ChevronRight size={18} />
            </Button>
          </div>
        </>
      )}

      {/* SECTION: Content */}
      {currentSection === 'content' && (
        <>
          <Card className="p-0 overflow-hidden mb-8">
            {/* VIDEO TYPE */}
            {content.type === 'video' && content.videoUrl && (
              <div className="aspect-w-16 aspect-h-9 bg-black relative pt-[56.25%]">
                <iframe 
                  src={`https://www.youtube-nocookie.com/embed/${content.videoUrl}?rel=0`}
                  className="absolute top-0 left-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  title={content.title}
                ></iframe>
              </div>
            )}

            {/* TEXT CONTENT / VIDEO NOTES */}
            {content.content && (
              <div className="p-8 sm:p-10">
                {content.type === 'video' && <h2 className="text-2xl font-bold mb-6">Lesson notes</h2>}
                <div className="prose max-w-none">
                  {renderMarkdown(content.content)}
                </div>
              </div>
            )}

            {/* QUIZ TYPE */}
            {content.type === 'quiz' && content.quiz && (
              <div className="p-8 sm:p-10">
                {quizSubmitted ? (
                  <div className="text-center py-8">
                    <div className="text-6xl mb-4">{quizScore >= 70 ? '' : ''}</div>
                    <h2 className="text-3xl font-bold mb-2">You scored {quizScore}%</h2>
                    <p className="text-maru-grey mb-8">
                      {quizScore >= 70 
                        ? 'Great job! You have passed this lesson.' 
                        : 'Review the material and try again.'}
                    </p>
                    {quizScore < 70 && (
                      <Button onClick={() => {
                        setQuizAnswers(new Array(content.quiz!.length).fill(-1))
                        setQuizSubmitted(false)
                      }}>
                        Try Again
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="space-y-8">
                    {content.quiz.map((q: any, qIndex: number) => (
                      <div key={qIndex} className="bg-maru-cloud p-6 rounded-lg">
                        <h3 className="text-lg font-bold text-maru-navy mb-4">{qIndex + 1}. {q.question}</h3>
                        <div className="space-y-3">
                          {q.options.map((option: string, oIndex: number) => (
                            <label 
                              key={oIndex} 
                              className={`flex items-center p-4 rounded-lg border cursor-pointer transition-colors ${
                                quizAnswers[qIndex] === oIndex 
                                  ? 'bg-maru-blue-100 border-maru-blue ring-1 ring-maru-blue' 
                                  : 'bg-white border-maru-line hover:border-maru-line'
                              }`}
                            >
                              <input 
                                type="radio" 
                                name={`q-${qIndex}`} 
                                className="h-4 w-4 text-maru-blue-700 focus:ring-maru-blue border-maru-line"
                                checked={quizAnswers[qIndex] === oIndex}
                                onChange={() => {
                                  const newAnswers = [...quizAnswers]
                                  newAnswers[qIndex] = oIndex
                                  setQuizAnswers(newAnswers)
                                }}
                              />
                              <span className="ml-3 text-maru-navy">{option}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                    
                    <Button 
                      onClick={handleQuizSubmit} 
                      variant="primary" 
                      size="lg" 
                      fullWidth
                      disabled={quizAnswers.includes(-1)}
                    >
                      Submit Quiz
                    </Button>
                  </div>
                )}
              </div>
            )}
          </Card>

          {/* AI Assistant Prompt */}
          <Card className="mb-6 bg-maru-blue-100 border-maru-blue-100">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-maru-blue-100 flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-5 h-5 text-maru-blue-700" />
              </div>
              <div>
                <h3 className="font-semibold text-maru-navy mb-1">Need more help?</h3>
                <p className="text-sm text-maru-grey mb-3">
                  Ask the AI Assistant for a deeper explanation of any concept in this lesson.
                </p>
                <Button variant="secondary" size="sm" className="border-maru-blue-300 text-maru-blue-700">
                  Open AI Assistant
                </Button>
              </div>
            </div>
          </Card>

          {/* Navigation to Review or Next Section */}
          <div className="flex justify-between items-center">
            <Button 
              variant="secondary"
              onClick={() => setCurrentSection('intro')}
            >
              <ChevronLeft size={16} className="mr-1" />
              Back to Intro
            </Button>
            
            {content.type !== 'quiz' && (
              <Button 
                variant="primary"
                onClick={() => setCurrentSection('review')}
                className="flex items-center gap-2"
              >
                Continue to Review
                <ChevronRight size={16} />
              </Button>
            )}
          </div>
        </>
      )}

      {/* SECTION: Review */}
      {currentSection === 'review' && (
        <>
          <LessonReview
            lessonTitle={content.title}
            questions={reviewData.questions}
            passingScore={80}
            moduleSlug={moduleSlug}
            lessonSlug={lessonSlug}
            onComplete={handleReviewComplete}
          />

          {/* Navigation after review */}
          {(completed || reviewPassed) && (
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-maru-line pt-8">
              {prevLessonSlug ? (
                <Link href={`/modules/${moduleSlug}/lesson/${prevLessonSlug}`}>
                  <Button variant="secondary">
                    <ChevronLeft size={16} className="mr-1" />
                    Previous Lesson
                  </Button>
                </Link>
              ) : <div />}

              {nextLessonSlug ? (
                <Link href={`/modules/${moduleSlug}/lesson/${nextLessonSlug}`}>
                  <Button variant="primary" className="flex items-center gap-2">
                    Next Lesson
                    <ChevronRight size={16} />
                  </Button>
                </Link>
              ) : (
                <Link href={`/modules/${moduleSlug}`}>
                  <Button variant="primary" className="flex items-center gap-2">
                    Complete Module<ChevronRight size={16} />
                  </Button>
                </Link>
              )}
            </div>
          )}

          {!completed && !reviewPassed && (
            <div className="mt-6 flex justify-start">
              <Button 
                variant="secondary"
                onClick={() => setCurrentSection('content')}
              >
                <ChevronLeft size={16} className="mr-1" />
                Back to Content
              </Button>
            </div>
          )}
        </>
      )}

      {/* Feedback Modal */}
      <FeedbackModal
        moduleSlug={moduleSlug}
        lessonSlug={lessonSlug}
        lessonTitle={content.title}
        isOpen={showFeedback}
        onClose={() => setShowFeedback(false)}
      />
    </div>
  )
}
