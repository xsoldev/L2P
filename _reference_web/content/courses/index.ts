// Course Content Index
// Export all course content for use in pages

import { businessCourse, type LessonContent, type Course, type CourseUnit } from './business'

export { businessCourse }
export type { LessonContent, Course, CourseUnit }

// Additional courses will be added here:
// import { creativeCourse } from './creative'
// import { kidsCourse } from './kids'
// import { elderlyCourse } from './elderly'

const courses: Record<string, Course> = {
  business: businessCourse,
  // creative: creativeCourse,
  // kids: kidsCourse,
  // elderly: elderlyCourse,
}

export function getCourse(slug: string): Course | undefined {
  return courses[slug]
}

export function getLesson(courseSlug: string, lessonId: string): {
  lesson: LessonContent
  unit: CourseUnit
  course: Course
  nextLesson: LessonContent | null
} | null {
  const course = getCourse(courseSlug)
  if (!course) return null

  for (const unit of course.units) {
    const lesson = unit.lessons.find(l => l.id === lessonId)
    if (lesson) {
      return {
        lesson,
        unit,
        course,
        nextLesson: findNextLesson(course, lessonId)
      }
    }
  }
  return null
}

function findNextLesson(course: Course, currentLessonId: string): LessonContent | null {
  const allLessons = course.units.flatMap(u => u.lessons)
  const currentIndex = allLessons.findIndex(l => l.id === currentLessonId)
  if (currentIndex >= 0 && currentIndex < allLessons.length - 1) {
    return allLessons[currentIndex + 1]
  }
  return null
}
