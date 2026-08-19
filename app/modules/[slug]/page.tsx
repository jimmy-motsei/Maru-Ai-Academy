import { Metadata } from 'next'
import { getModuleBySlug } from '@/types/modules'
import { Badge, Button, Card } from '@/components/ui'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { LessonItem } from '@/components/modules/LessonItem'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { Award, BookOpen, Lock } from 'lucide-react'

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const module = getModuleBySlug(params.slug)
  
  if (!module) {
    return {
      title: 'Module Not Found',
    }
  }

  return {
    title: module.title,
    description: module.description,
    openGraph: {
      title: `${module.title} - Maru AI Academy`,
      description: module.description,
    },
  }
}

async function getModuleProgress(moduleSlug: string) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return []

  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  })

  if (!user) return []

  // Query the correct table: LessonProgress (Table A) where writes happen
  const progress = await prisma.lessonProgress.findMany({
    where: {
      userId: user.id,
      moduleSlug: moduleSlug
    }
  })

  return progress
}

export default async function ModulePage({ params }: { params: { slug: string } }) {
  const module = getModuleBySlug(params.slug)
  if (!module) notFound()

  // Fetch progress
  const session = await getServerSession(authOptions)
  const isPro = (session?.user as any)?.plan === 'PRO' || (session?.user as any)?.plan === 'TEAM'
  const isLocked = module.stream === 'intermediate' && !isPro

  if (isLocked) {
    return (
      <div className="min-h-screen bg-maru-cloud flex items-center justify-center p-4">
        <Card className="max-w-xl w-full text-center p-12">
          <div className="w-20 h-20 bg-maru-cloud rounded-full flex items-center justify-center mx-auto mb-6"><Lock className="h-8 w-8 text-maru-teal" aria-hidden="true" /></div>
          <h1 className="text-3xl font-bold text-maru-navy mb-4">
            Pro access required
          </h1>
          <p className="text-lg text-maru-grey mb-8">
            The <strong>{module.title}</strong> module is exclusively available to Pro Academy members. Upgrade your plan to unlock advanced workflows, governance templates, and more.
          </p>
          <div className="space-y-4">
            <Link href="/pricing" className="block w-full">
              <Button variant="primary" size="lg" fullWidth>
                Upgrade to Pro Academy</Button>
            </Link>
            <Link href="/modules" className="block w-full">
              <Button variant="secondary" size="lg" fullWidth>
                Back to Curriculum
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    )
  }

  const progress = await getModuleProgress(module.slug)
  const completedLessonIds = new Set(progress.filter(p => p.completed).map(p => p.lessonSlug))
  
  const completedCount = completedLessonIds.size
  const totalLessons = module.lessonsCount || 5 // usage of mock data fallback
  const percentComplete = Math.round((completedCount / totalLessons) * 100)

  // Use defined lessons or fallback
  const lessons = module.lessons || Array.from({ length: totalLessons }, (_, i) => ({
    id: `${module.id}-l${i + 1}`,
    title: `Lesson ${i + 1}: Key Concepts & Application`,
    duration: '15 mins'
  }))

  return (
    <div className="min-h-screen bg-maru-cloud pb-20">
      {/* Hero Header */}
      <div className="bg-white border-b border-maru-line">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link href="/modules" className="text-maru-grey hover:text-maru-navy mb-6 inline-flex items-center text-sm font-medium transition-colors">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Curriculum
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Badge variant={module.stream === 'beginner' ? 'teal' : 'blue'}>
                  {module.stream === 'beginner' ? 'Beginner Stream' : 'Intermediate Stream'}
                </Badge>
                <span className="text-maru-grey-300">•</span>
                <span className="text-maru-grey font-medium">Module {module.order}</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl font-heading font-bold text-maru-navy mb-6">
                {module.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-maru-grey">
                <div className="flex items-center">
                  <span className="text-2xl mr-2">⏱</span>
                  {module.duration}
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-6 w-6 text-maru-teal" aria-hidden="true" />
                  {module.lessonsCount} Lessons
                </div>
                <div className="flex items-center">
                  <Award className="h-6 w-6 text-maru-teal" aria-hidden="true" />
                  Earn Badges on completion
                </div>
              </div>
            </div>

            <Card className="w-full md:w-80 flex-shrink-0 p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-maru-blue-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-maru-blue-100" style={{ height: `${100 - percentComplete}%` }}></div>
                  <span className="relative z-10">{module.icon === 'bulb' ? '' : module.icon === 'rocket' ? '' : ''}</span>
                </div>
                <div className="text-sm text-maru-grey">Current Status</div>
                <div className="text-lg font-bold text-maru-navy">
                  {percentComplete === 100 ? 'Completed!' : `${percentComplete}% Complete`}
                </div>
              </div>
              <Link href={`/modules/${module.slug}/lesson/${lessons[0].id}`} className="block">
                <Button fullWidth size="lg">
                  {percentComplete === 0 ? 'Start Learning' : 'Continue Learning'}
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <h2 className="text-2xl font-bold mb-4">About this Module</h2>
              <p className="text-maru-grey leading-relaxed text-lg">
                {module.description}
              </p>
            </Card>

            <Card>
              <h2 className="text-2xl font-bold mb-6">What you'll learn</h2>
              <ul className="space-y-4">
                {module.learningObjectives?.map((objective, i) => (
                  <li key={i} className="flex items-start">
                    <svg className="w-6 h-6 text-verified-fg mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-maru-grey">{objective}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <h3 className="font-bold text-maru-navy mb-4">Course content</h3>
              <p className="text-sm text-maru-grey mb-4">
                Complete lessons in order to unlock the next one.
              </p>
              <div className="space-y-0">
                {lessons.map((lesson, i) => {
                  const isCompleted = completedLessonIds.has(lesson.id);
                  // Lesson is locked if previous lesson isn't completed (except first lesson)
                  const previousLessonCompleted = i === 0 || completedLessonIds.has(lessons[i - 1].id);
                  const isLocked = !isCompleted && !previousLessonCompleted;
                  // Current lesson is first incomplete unlocked lesson
                  const isCurrent = !isCompleted && previousLessonCompleted;
                  
                  return (
                    <LessonItem
                      key={lesson.id}
                      lessonId={lesson.id}
                      moduleId={module.slug}
                      title={lesson.title}
                      duration={lesson.duration}
                      index={i + 1}
                      isCompleted={isCompleted}
                      isLocked={isLocked}
                      isCurrent={isCurrent}
                    />
                  );
                })}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
