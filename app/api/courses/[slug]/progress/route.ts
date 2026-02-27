import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// Course metadata for auto-creation if not in DB
const COURSES_META: Record<string, { name: string; description: string; icon: string; color: string; difficulty: string }> = {
  business: {
    name: 'Business Prompts',
    description: 'Master prompt engineering for professional productivity',
    icon: 'briefcase',
    color: '#007AFF',
    difficulty: 'intermediate'
  },
  creative: {
    name: 'Creative Writing',
    description: 'Unlock AI creativity for stories, copy, and more',
    icon: 'palette',
    color: '#FF2D55',
    difficulty: 'intermediate'
  },
  kids: {
    name: 'Kids Adventures',
    description: 'Fun AI learning for young explorers',
    icon: 'rocket',
    color: '#FF9500',
    difficulty: 'beginner'
  },
  elderly: {
    name: 'Senior Basics',
    description: 'Simple and clear AI guidance',
    icon: 'book-open',
    color: '#34C759',
    difficulty: 'beginner'
  }
}

// Helper to ensure course exists in database
async function ensureCourseExists(slug: string): Promise<string> {
  let course = await prisma.course.findUnique({
    where: { slug }
  })

  if (!course && COURSES_META[slug]) {
    course = await prisma.course.create({
      data: {
        slug,
        ...COURSES_META[slug]
      }
    })
  }

  if (!course) {
    throw new Error(`Unknown course: ${slug}`)
  }

  return course.id
}

// GET - Fetch user's progress for a specific course
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await auth()
    const { slug } = await params

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Find course by slug
    const course = await prisma.course.findUnique({
      where: { slug }
    })

    if (!course) {
      // Return empty progress for unknown courses
      return NextResponse.json({
        courseId: slug,
        completedLessons: [],
        totalXpEarned: 0,
        currentLessonId: null
      })
    }

    const progress = await prisma.courseProgress.findUnique({
      where: {
        userId_courseId: {
          userId: session.user.id,
          courseId: course.id
        }
      }
    })

    if (!progress) {
      return NextResponse.json({
        courseId: slug,
        completedLessons: [],
        totalXpEarned: 0,
        currentLessonId: null
      })
    }

    return NextResponse.json({
      ...progress,
      courseSlug: slug
    })
  } catch (error) {
    console.error('Error fetching course progress:', error)
    return NextResponse.json(
      { error: 'Failed to fetch progress' },
      { status: 500 }
    )
  }
}

// POST - Complete a lesson and update progress
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await auth()
    const { slug } = await params

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { lessonId, xpEarned, nextLessonId } = body

    if (!lessonId) {
      return NextResponse.json({ error: 'lessonId is required' }, { status: 400 })
    }

    // Ensure course exists
    const courseId = await ensureCourseExists(slug)

    // Get existing progress
    const existingProgress = await prisma.courseProgress.findUnique({
      where: {
        userId_courseId: {
          userId: session.user.id,
          courseId
        }
      }
    })

    // Check if lesson already completed (prevent duplicate XP)
    if (existingProgress?.completedLessons.includes(lessonId)) {
      return NextResponse.json({
        success: true,
        progress: existingProgress,
        xpEarned: 0,
        alreadyCompleted: true
      })
    }

    // Build new completed lessons array
    const completedLessons = existingProgress
      ? [...existingProgress.completedLessons, lessonId]
      : [lessonId]

    // Upsert course progress
    const progress = await prisma.courseProgress.upsert({
      where: {
        userId_courseId: {
          userId: session.user.id,
          courseId
        }
      },
      update: {
        completedLessons,
        totalXpEarned: (existingProgress?.totalXpEarned || 0) + (xpEarned || 0),
        currentLessonId: nextLessonId || null,
        updatedAt: new Date()
      },
      create: {
        userId: session.user.id,
        courseId,
        completedLessons: [lessonId],
        totalXpEarned: xpEarned || 0,
        currentLessonId: nextLessonId || null
      }
    })

    // Also update the user's total XP
    if (xpEarned && xpEarned > 0) {
      await prisma.user.update({
        where: { id: session.user.id },
        data: {
          xp: { increment: xpEarned },
          weeklyXp: { increment: xpEarned }
        }
      })
    }

    return NextResponse.json({
      success: true,
      progress: {
        ...progress,
        courseSlug: slug
      },
      xpEarned: xpEarned || 0
    })
  } catch (error) {
    console.error('Error updating course progress:', error)
    return NextResponse.json(
      { error: 'Failed to update progress' },
      { status: 500 }
    )
  }
}
