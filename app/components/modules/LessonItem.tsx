'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface LessonItemProps {
  lessonId: string
  moduleId: string
  title: string
  duration: string
  isCompleted?: boolean
  index: number
}

export const LessonItem = ({
  lessonId,
  moduleId,
  title,
  duration,
  isCompleted = false,
  index,
}: LessonItemProps) => {
  const router = useRouter()
  const [completed, setCompleted] = useState(isCompleted)
  const [loading, setLoading] = useState(false)

  const toggleCompletion = async (e: React.MouseEvent) => {
    e.preventDefault() // Link behavior prevention
    e.stopPropagation() // Click bubbling prevention
    if (loading) return

    const newState = !completed
    setCompleted(newState)
    setLoading(true)

    try {
      const res = await fetch('/api/progress/mark-complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          moduleSlug: moduleId,
          lessonSlug: lessonId,
          completed: newState,
        }),
      })

      if (!res.ok) {
        throw new Error('Failed to update progress')
      }

      router.refresh()
    } catch (error) {
      console.error(error)
      setCompleted(!newState)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Link 
      href={`/modules/${moduleId}/lesson/${lessonId}`}
      className="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors border-b last:border-0 border-gray-100 group block"
    >
      <div 
        onClick={toggleCompletion}
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mr-3 transition-colors ${
          completed 
            ? 'bg-green-500 border-green-500 text-white' 
            : 'border-gray-300 group-hover:border-primary-400'
        }`}
      >
        {completed && (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      
      <div className="flex-grow">
        <div className={`text-sm font-medium ${completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
          {index}. {title}
        </div>
        <div className="text-xs text-gray-500">{duration}</div>
      </div>
      
      <div className="ml-auto">
        <div className={`p-1 rounded-full ${completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
    </Link>
  )
}
