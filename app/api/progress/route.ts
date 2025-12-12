import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

// POST /api/progress - Update lesson completion status
export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { lessonId, moduleId, completed } = await request.json()

    if (!lessonId || !moduleId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Upsert progress record
    const progress = await prisma.progress.upsert({
      where: {
        userId_lessonId: {
          userId: user.id,
          lessonId: lessonId,
        },
      },
      update: {
        completed: completed,
        completedAt: completed ? new Date() : null,
      },
      create: {
        userId: user.id,
        moduleId: moduleId,
        lessonId: lessonId,
        completed: completed,
        completedAt: completed ? new Date() : null,
      },
    })

    return NextResponse.json({ progress })
  } catch (error) {
    console.error('Progress update error:', error)
    return NextResponse.json(
      { error: 'Failed to update progress' },
      { status: 500 }
    )
  }
}

// GET /api/progress?moduleId=... - Get progress for a specific module
export async function GET(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const moduleId = searchParams.get('moduleId')

  if (!moduleId) {
    // Return all progress if no module specified
    // For the dashboard summary
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        progress: {
          where: { completed: true }
        }
      }
    })
    return NextResponse.json({ progress: user?.progress || [] })
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const progress = await prisma.progress.findMany({
      where: {
        userId: user.id,
        moduleId: moduleId,
      },
    })

    return NextResponse.json({ progress })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch progress' },
      { status: 500 }
    )
  }
}
