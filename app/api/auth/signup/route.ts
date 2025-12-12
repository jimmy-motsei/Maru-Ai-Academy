import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import prisma from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password, name, plan } = body

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      )
    }

    // Determine Plan (Use strings to avoid enum import issues)
    let userPlan = 'FREE'
    if (plan === 'pro') userPlan = 'PRO'
    if (plan === 'team') userPlan = 'TEAM'

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    try {
      const user = await prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
          plan: userPlan,
        } as any,
      })

      return NextResponse.json({
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          plan: (user as any).plan
        },
      })
    } catch (dbError: any) {
      console.error('Database creation error:', dbError)
      return NextResponse.json(
        { error: `Database error: ${dbError.message}` },
        { status: 500 }
      )
    }

  } catch (error: any) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: `Internal error: ${error.message}` },
      { status: 500 }
    )
  }
}
