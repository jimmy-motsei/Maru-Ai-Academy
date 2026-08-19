'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Lock, CheckCircle, PlayCircle, Circle } from 'lucide-react'

interface LessonItemProps {
  lessonId: string
  moduleId: string
  title: string
  duration: string
  isCompleted?: boolean
  isLocked?: boolean
  isCurrent?: boolean
  index: number
}

export const LessonItem = ({
  lessonId,
  moduleId,
  title,
  duration,
  isCompleted = false,
  isLocked = false,
  isCurrent = false,
  index,
}: LessonItemProps) => {
  const router = useRouter()
  const [completed, setCompleted] = useState(isCompleted)
  const [loading, setLoading] = useState(false)

  const toggleCompletion = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (loading || isLocked) return

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

  const handleClick = (e: React.MouseEvent) => {
    if (isLocked) {
      e.preventDefault()
      // Could show a toast here
    }
  }

  // Determine status icon and styling
  const getStatusIcon = () => {
    if (isLocked) {
      return <Lock className="w-4 h-4 text-maru-grey" />
    }
    if (completed) {
      return <CheckCircle className="w-5 h-5 text-verified-fg" />
    }
    if (isCurrent) {
      return <PlayCircle className="w-5 h-5 text-maru-blue-700" />
    }
    return <Circle className="w-5 h-5 text-maru-grey-on-dark" />
  }

  const getContainerStyles = () => {
    if (isLocked) {
      return 'opacity-60 cursor-not-allowed bg-maru-cloud'
    }
    if (isCurrent) {
      return 'bg-maru-blue-100 border-l-4 border-l-primary-500'
    }
    if (completed) {
      return 'bg-verified-bg'
    }
    return 'hover:bg-maru-cloud'
  }

  const content = (
    <div 
      className={`flex items-center p-3 rounded-lg transition-colors border-b last:border-0 border-maru-line ${getContainerStyles()}`}
      onClick={handleClick}
    >
      {/* Status Icon */}
      <div 
        onClick={!isLocked ? toggleCompletion : undefined}
        className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mr-3 transition-colors ${
          isLocked 
            ? 'bg-maru-cloud' 
            : completed 
              ? 'bg-verified-bg' 
              : isCurrent 
                ? 'bg-maru-blue-100' 
                : 'bg-maru-cloud hover:bg-maru-line'
        }`}
      >
        {getStatusIcon()}
      </div>
      
      {/* Content */}
      <div className="flex-grow">
        <div className={`text-sm font-medium ${
          isLocked 
            ? 'text-maru-grey' 
            : completed 
              ? 'text-maru-grey' 
              : 'text-maru-navy'
        }`}>
          {index}. {title}
        </div>
        <div className="text-xs text-maru-grey flex items-center gap-2">
          <span>{duration}</span>
          {isLocked && (
            <span className="text-xs text-atrisk-fg font-medium">
              Complete previous lesson to unlock
            </span>
          )}
          {isCurrent && !isLocked && (
            <span className="text-xs text-maru-blue-700 font-medium">
              Current lesson
            </span>
          )}
        </div>
      </div>
      
      {/* Action indicator */}
      <div className="ml-auto">
        {isLocked ? (
          <div className="p-1.5 rounded-full bg-maru-line">
            <Lock className="w-4 h-4 text-maru-grey" />
          </div>
        ) : (
          <div className={`p-1.5 rounded-full ${
            completed 
              ? 'bg-verified-bg text-verified-fg' 
              : isCurrent 
                ? 'bg-maru-blue-100 text-maru-blue-700' 
                : 'bg-maru-cloud text-maru-grey group-hover:bg-maru-blue-100 group-hover:text-maru-blue-700'
          }`}>
            <PlayCircle className="w-4 h-4" />
          </div>
        )}
      </div>
    </div>
  )

  if (isLocked) {
    return <div className="group">{content}</div>
  }

  return (
    <Link 
      href={`/modules/${moduleId}/lesson/${lessonId}`}
      className="group block"
    >
      {content}
    </Link>
  )
}
