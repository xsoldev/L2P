import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getCourse } from '@/content/courses'

// Course metadata from content files
const COURSE_SLUGS = ['business', 'creative', 'kids', 'elderly']

export async function GET() {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Fetch user data with gamification stats
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        xp: true,
        level: true,
        streakCount: true,
        courseProgress: {
          include: {
            course: {
              select: {
                slug: true,
                name: true,
                icon: true,
                color: true,
              },
            },
          },
        },
      },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Get total lessons from content files (not database)
    const courseLessonsMap: Record<string, number> = {}
    for (const slug of COURSE_SLUGS) {
      const course = getCourse(slug)
      if (course) {
        const totalLessons = course.units.reduce(
          (sum, unit) => sum + unit.lessons.length,
          0
        )
        courseLessonsMap[slug] = totalLessons
      }
    }

    // Format course progress
    const courseProgress = user.courseProgress.map((progress) => ({
      courseSlug: progress.course.slug,
      courseName: progress.course.name,
      courseIcon: progress.course.icon,
      courseColor: progress.course.color,
      completedLessons: progress.completedLessons.length,
      totalLessons: courseLessonsMap[progress.course.slug] || 0,
      totalXpEarned: progress.totalXpEarned,
      completedAt: progress.completedAt?.toISOString() || null,
    }))

    return NextResponse.json({
      totalXp: user.xp,
      level: user.level,
      streakCount: user.streakCount,
      courseProgress,
    })
  } catch (error) {
    console.error('Error fetching user stats:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
