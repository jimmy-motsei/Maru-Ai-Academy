'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button, Card, Badge } from '@/components/ui'
import { LessonContent } from '@/content/modules/ai-made-simple'

interface LessonViewProps {
  content: LessonContent
  moduleSlug: string
  lessonSlug: string
  nextLessonSlug?: string
  prevLessonSlug?: string
  isCompleted?: boolean
}

export function LessonView({
  content,
  moduleSlug,
  lessonSlug,
  nextLessonSlug,
  prevLessonSlug,
  isCompleted = false
}: LessonViewProps) {
  const router = useRouter()
  const [completed, setCompleted] = useState(isCompleted)
  const [loading, setLoading] = useState(false)
  
  // Quiz State
  const [quizAnswers, setQuizAnswers] = useState<number[]>(new Array(content.quiz?.length || 0).fill(-1))
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [quizScore, setQuizScore] = useState(0)

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

  // Simple Markdown Renderer
  const renderMarkdown = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('### ')) return <h3 key={i} className="text-xl font-bold mt-6 mb-3 text-gray-900">{line.replace('### ', '')}</h3>
      if (line.startsWith('- ')) return <li key={i} className="ml-4 text-gray-700 mb-2">{line.replace('- ', '')}</li>
      if (line.trim() === '') return <div key={i} className="h-4"></div>
      return <p key={i} className="text-gray-700 leading-relaxed mb-4">{line}</p>
    })
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link 
          href={`/modules/${moduleSlug}`}
          className="text-sm text-gray-500 hover:text-primary-600 mb-4 inline-block"
        >
          &larr; Back to Module
        </Link>
        <div className="flex items-center gap-3 mb-2">
          <Badge variant="primary">{content.type.toUpperCase()}</Badge>
          {completed && <Badge variant="success">COMPLETED</Badge>}
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{content.title}</h1>
        {content.description && <p className="text-xl text-gray-600 mt-4">{content.description}</p>}
      </div>

      {/* Content Body */}
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
            {content.type === 'video' && <h2 className="text-2xl font-bold mb-6">Lesson Notes</h2>}
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
                <div className="text-6xl mb-4">{quizScore >= 70 ? '🎉' : '📚'}</div>
                <h2 className="text-3xl font-bold mb-2">You scored {quizScore}%</h2>
                <p className="text-gray-600 mb-8">
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
                  <div key={qIndex} className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">{qIndex + 1}. {q.question}</h3>
                    <div className="space-y-3">
                      {q.options.map((option: string, oIndex: number) => (
                        <label 
                          key={oIndex} 
                          className={`flex items-center p-4 rounded-lg border cursor-pointer transition-colors ${
                            quizAnswers[qIndex] === oIndex 
                              ? 'bg-primary-50 border-primary-500 ring-1 ring-primary-500' 
                              : 'bg-white border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <input 
                            type="radio" 
                            name={`q-${qIndex}`} 
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                            checked={quizAnswers[qIndex] === oIndex}
                            onChange={() => {
                              const newAnswers = [...quizAnswers]
                              newAnswers[qIndex] = oIndex
                              setQuizAnswers(newAnswers)
                            }}
                          />
                          <span className="ml-3 text-gray-900">{option}</span>
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

      {/* Footer / Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-200 pt-8">
        
        {/* Previous Button */}
        {prevLessonSlug ? (
          <Link href={`/modules/${moduleSlug}/lesson/${prevLessonSlug}`}>
            <Button variant="outline">
              &larr; Previous Lesson
            </Button>
          </Link>
        ) : <div />}

        {/* Mark Complete / Next Action */}
        <div className="flex gap-4">
          {content.type !== 'quiz' && (
            <Button 
              onClick={markComplete} 
              variant={completed ? "outline" : "primary"}
              disabled={loading}
              className={completed ? "border-green-500 text-green-600 hover:bg-green-50" : ""}
            >
              {completed ? 'Valued Completed ✅' : (loading ? 'Saving...' : 'Mark Complete & Continue')}
            </Button>
          )}
          
          {/* Next Button */}
          {nextLessonSlug && (
            <Link href={`/modules/${moduleSlug}/lesson/${nextLessonSlug}`}>
              <Button variant="primary" disabled={!completed && content.type === 'quiz'}>
                Next Lesson &rarr;
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
