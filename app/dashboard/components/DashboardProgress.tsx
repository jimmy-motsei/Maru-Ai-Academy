'use client'

import { useEffect, useState } from 'react'
import { Card, Badge, Button } from '@/components/ui'
import Link from 'next/link'

interface ProgressData {
  totalCompleted: number
  totalTimeSpent: number
  currentStreak: number
  moduleStats: Array<{
    slug: string
    name: string
    completed: number
    total: number
    percentage: number
  }>
}

export function DashboardProgress({ userId }: { userId: string }) {
  const [progress, setProgress] = useState<ProgressData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProgress() {
      try {
        const response = await fetch('/api/progress/user')
        if (response.ok) {
          const data = await response.json()
          setProgress(data)
        }
      } catch (error) {
        console.error('Failed to fetch progress:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProgress()
  }, [userId])

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-40 bg-maru-line rounded-lg"></div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="h-24 bg-maru-line rounded-lg"></div>
          <div className="h-24 bg-maru-line rounded-lg"></div>
        </div>
      </div>
    )
  }

  const { totalCompleted = 0, totalTimeSpent = 0, currentStreak = 0, moduleStats = [] } = progress || {}
  const totalLessons = moduleStats.reduce((acc, m) => acc + m.total, 0)
  const overallProgress = totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0

  // Format time spent (convert seconds to human readable)
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    if (hours > 0) return `${hours}h ${minutes}m`
    return `${minutes}m`
  }

  return (
    <>
      {/* Active Course Card */}
      <Card className="border-l-4 border-l-primary-500">
        <div className="flex justify-between items-start mb-4">
          <div>
            <Badge variant="blue" className="mb-2">In Progress</Badge>
            <h2 className="text-xl font-bold text-maru-navy">Your learning journey</h2>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-maru-blue-700 font-mono tracking-mono">{overallProgress}%</span>
            <p className="text-xs text-maru-grey">Overall Completion</p>
          </div>
        </div>
        
        <div className="w-full bg-maru-cloud rounded-full h-2.5 mb-6">
          <div 
            className="bg-maru-blue h-2.5 rounded-full transition-all duration-500" 
            style={{ width: `${overallProgress}%` }}
          ></div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-maru-grey">
            Lessons Completed: <strong>{totalCompleted} / {totalLessons}</strong>
          </p>
          <Link href="/learn">
            <Button size="sm">Browse Modules &rarr;</Button>
          </Link>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-3 gap-6">
        <Card>
          <div className="text-3xl mb-2"></div>
          <h3 className="font-bold text-maru-navy">{currentStreak} Day Streak</h3>
          <p className="text-maru-grey text-sm">
            {currentStreak > 0 ? 'Keep it up!' : 'Start your streak today!'}
          </p>
        </Card>
        
        <Card>
          <div className="text-3xl mb-2">⏱</div>
          <h3 className="font-bold text-maru-navy">{formatTime(totalTimeSpent)}</h3>
          <p className="text-maru-grey text-sm">Time Spent Learning</p>
        </Card>
        
        <Card>
          <div className="text-3xl mb-2"></div>
          <h3 className="font-bold text-maru-navy">{totalCompleted} Lessons</h3>
          <p className="text-maru-grey text-sm">Completed</p>
        </Card>
      </div>

      {/* Module Progress */}
      {moduleStats.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-maru-navy mb-4">Module progress</h2>
          <div className="space-y-4">
            {moduleStats.map((module) => (
              <Link 
                key={module.slug} 
                href={`/modules/${module.slug}`}
                className="block"
              >
                <Card className="hover:border-maru-blue-300 transition-colors cursor-pointer">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-maru-navy">{module.name}</h4>
                    <span className="text-sm font-semibold text-maru-blue-700">
                      {module.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-maru-cloud rounded-full h-2 mb-2">
                    <div 
                      className="bg-maru-blue h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${module.percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-maru-grey">
                    {module.completed} / {module.total} lessons completed
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
