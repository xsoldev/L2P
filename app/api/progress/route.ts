import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET - Fetch user's progress
export async function GET() {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    let progress = await prisma.gameProgress.findUnique({
      where: { userId: session.user.id },
    })

    // Create default progress if none exists
    if (!progress) {
      progress = await prisma.gameProgress.create({
        data: {
          userId: session.user.id,
          currentScreen: 'welcome',
          currentLesson: 0,
          score: 0,
          completedLessons: [],
          userName: session.user.name || '',
          userShape: null,
          exerciseDifficulty: 'easy',
          language: 'en',
        },
      })
    }

    return NextResponse.json(progress)
  } catch (error) {
    console.error('Error fetching progress:', error)
    return NextResponse.json(
      { error: 'Failed to fetch progress' },
      { status: 500 }
    )
  }
}

// PUT - Update user's progress
export async function PUT(request: Request) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()

    const progress = await prisma.gameProgress.upsert({
      where: { userId: session.user.id },
      update: {
        currentScreen: body.currentScreen,
        currentLesson: body.currentLesson,
        score: body.score,
        completedLessons: body.completedLessons,
        userName: body.userName,
        userShape: body.userShape,
        exerciseDifficulty: body.exerciseDifficulty,
        language: body.language,
        lastSaved: new Date(),
      },
      create: {
        userId: session.user.id,
        currentScreen: body.currentScreen || 'welcome',
        currentLesson: body.currentLesson || 0,
        score: body.score || 0,
        completedLessons: body.completedLessons || [],
        userName: body.userName || '',
        userShape: body.userShape || null,
        exerciseDifficulty: body.exerciseDifficulty || 'easy',
        language: body.language || 'en',
      },
    })

    return NextResponse.json(progress)
  } catch (error) {
    console.error('Error updating progress:', error)
    return NextResponse.json(
      { error: 'Failed to update progress' },
      { status: 500 }
    )
  }
}

// DELETE - Reset user's progress
export async function DELETE() {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await prisma.gameProgress.delete({
      where: { userId: session.user.id },
    }).catch(() => {
      // Ignore if progress doesn't exist
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting progress:', error)
    return NextResponse.json(
      { error: 'Failed to delete progress' },
      { status: 500 }
    )
  }
}
