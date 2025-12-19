import { notFound, redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { getLessonContent } from '@/content/modules'
import { getModuleBySlug } from '@/types/modules'
import { LessonView } from '@/components/modules/LessonView'

interface Props {
  params: {
    slug: string
    lessonId: string
  }
}

export default async function LessonPage({ params }: Props) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect(`/auth/signin?callbackUrl=/modules/${params.slug}/lesson/${params.lessonId}`)
  }

  // 1. Validate Module & Lesson
  const moduleData = getModuleBySlug(params.slug)
  if (!moduleData) notFound()

  // 2. Get Lesson Content
  // We use the ID as the slug in this implementation for simplicity
  const content = getLessonContent(params.slug, params.lessonId)
  
  if (!content) {
    // If no content found in registry, check if it exists in the module definition
    // This handles "placeholder" lessons that haven't been written yet
    const lessonDef = moduleData.lessons?.find(l => l.id === params.lessonId)
    if (!lessonDef) notFound()

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold mb-4">Coming Soon 🚧</h1>
          <p className="text-gray-600 mb-6">
            The content for <strong>{lessonDef.title}</strong> is being created.
          </p>
          <a href={`/modules/${params.slug}`} className="text-primary-600 hover:underline">
            &larr; Back to Module
          </a>
        </div>
      </div>
    )
  }

  // 3. Determine Navigation (Next/Prev)
  const currentIndex = moduleData.lessons?.findIndex(l => l.id === params.lessonId) ?? -1
  const prevLessonSlug = currentIndex > 0 ? moduleData.lessons?.[currentIndex - 1].id : undefined
  const nextLessonSlug = currentIndex >= 0 && currentIndex < (moduleData.lessons?.length || 0) - 1 
    ? moduleData.lessons?.[currentIndex + 1].id 
    : undefined

  // 4. Fetch User Progress state
  const userId = (session.user as any).id
  const progress = await (prisma as any).lessonProgress.findUnique({
    where: {
      userId_moduleSlug_lessonSlug: {
        userId: userId,
        moduleSlug: params.slug,
        lessonSlug: params.lessonId,
      }
    }
  })

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar Placeholder - assuming main layout handles this */}
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <LessonView
          content={content}
          moduleSlug={params.slug}
          lessonSlug={params.lessonId}
          nextLessonSlug={nextLessonSlug}
          prevLessonSlug={prevLessonSlug}
          isCompleted={!!progress?.completed}
        />
      </main>
    </div>
  )
}
