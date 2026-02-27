'use client'

import { Card } from '@/components/ui/card'
import {
  XCircle,
  CheckCircle,
  Sparkles,
  BookOpen,
  Target,
  Zap,
  MessageSquare,
  User,
  Bot
} from 'lucide-react'
import type { LessonContent as LessonContentType } from '@/content/courses'

interface LessonContentProps {
  lesson: LessonContentType
  courseColor: string
}

export function LessonContent({ lesson, courseColor }: LessonContentProps) {
  // Intro lesson: Shows vague prompt problem
  if (lesson.id === 'intro' || lesson.vaguePromptLabel) {
    return (
      <div className="space-y-6">
        {/* Vague Prompt Example */}
        {lesson.vaguePromptLabel && (
          <Card className="p-5 border-l-4 border-l-red-500 bg-red-50">
            <div className="flex items-center gap-2 mb-2">
              <XCircle className="w-4 h-4 text-red-500" />
              <span className="text-sm font-medium text-red-700">{lesson.vaguePromptLabel}</span>
            </div>
            <p className="text-red-800 italic">{lesson.vaguePromptExample}</p>
          </Card>
        )}

        {/* What AI Might Do */}
        {lesson.whatAiMightDoLabel && lesson.aiProblems && (
          <Card className="p-5 bg-amber-50 border-amber-200">
            <p className="text-sm font-medium text-amber-700 mb-3">{lesson.whatAiMightDoLabel}</p>
            <ul className="space-y-2">
              {lesson.aiProblems.map((problem, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-amber-800">
                  <span className="text-amber-500 mt-0.5">—</span>
                  <span>{problem}</span>
                </li>
              ))}
            </ul>
          </Card>
        )}

        {/* Solution */}
        {lesson.solutionLabel && (
          <Card className="p-5 border-l-4" style={{ borderLeftColor: courseColor, backgroundColor: `${courseColor}08` }}>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4" style={{ color: courseColor }} />
              <span className="text-sm font-medium" style={{ color: courseColor }}>{lesson.solutionLabel}</span>
            </div>
            <p className="text-muted-foreground">{lesson.solutionText}</p>
          </Card>
        )}
      </div>
    )
  }

  // Lessons with key principle + examples
  if (lesson.keyPrincipleLabel) {
    return (
      <div className="space-y-6">
        {/* Key Principle */}
        <Card className="p-5" style={{ backgroundColor: `${courseColor}05` }}>
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-4 h-4" style={{ color: courseColor }} />
            <span className="text-sm font-medium" style={{ color: courseColor }}>{lesson.keyPrincipleLabel}</span>
          </div>
          <p className="text-muted-foreground">{lesson.keyPrincipleText}</p>
        </Card>

        {/* Example Steps */}
        {lesson.exampleLabel && lesson.exampleSteps && (
          <Card className="p-5">
            <p className="text-sm font-medium text-foreground mb-3">{lesson.exampleLabel}</p>
            <div className="bg-secondary/50 p-4 rounded-lg space-y-2">
              {lesson.exampleSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-sm font-medium min-w-[20px]" style={{ color: courseColor }}>{index + 1}.</span>
                  <span className="text-sm text-muted-foreground">{step}</span>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Why It Works / Benefits */}
        {(lesson.whyWorksLabel || lesson.whyExamplesWorkLabel) && lesson.benefits && (
          <Card className="p-5" style={{ backgroundColor: `${courseColor}08` }}>
            <p className="text-sm font-medium mb-3" style={{ color: courseColor }}>
              {lesson.whyWorksLabel || lesson.whyExamplesWorkLabel}
            </p>
            <ul className="space-y-2">
              {lesson.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: courseColor }} />
                  <span className="text-sm text-muted-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </Card>
        )}

        {/* Vague vs Specific Comparison */}
        {lesson.vagueLabel && lesson.specificLabel && (
          <div className="space-y-3">
            <Card className="p-4 border-l-4 border-l-red-500 bg-red-50">
              <div className="flex items-center gap-2 mb-2">
                <XCircle className="w-4 h-4 text-red-500" />
                <span className="text-sm font-medium text-red-700">{lesson.vagueLabel}</span>
              </div>
              <p className="text-sm text-red-800 italic mb-1">{lesson.vagueExample}</p>
              {lesson.vagueQuestion && (
                <p className="text-xs text-red-600">{lesson.vagueQuestion}</p>
              )}
            </Card>

            <Card className="p-4 border-l-4" style={{ borderLeftColor: courseColor, backgroundColor: `${courseColor}08` }}>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4" style={{ color: courseColor }} />
                <span className="text-sm font-medium" style={{ color: courseColor }}>{lesson.specificLabel}</span>
              </div>
              <p className="text-sm italic mb-1" style={{ color: `${courseColor}CC` }}>{lesson.specificExample}</p>
              {lesson.specificNote && (
                <p className="text-xs text-muted-foreground">{lesson.specificNote}</p>
              )}
            </Card>
          </div>
        )}

        {/* Specificity Types */}
        {lesson.specificsLabel && lesson.specificTypes && (
          <Card className="p-5">
            <p className="text-sm font-medium text-foreground mb-3">{lesson.specificsLabel}</p>
            <div className="space-y-3">
              {lesson.specificTypes.map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: courseColor }} />
                  <div>
                    <span className="text-sm font-medium text-foreground">{item.type}</span>
                    <p className="text-xs text-muted-foreground">{item.example}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Ways to Provide Examples */}
        {lesson.waysToProvideLabel && lesson.exampleWays && (
          <Card className="p-5">
            <p className="text-sm font-medium text-foreground mb-3">{lesson.waysToProvideLabel}</p>
            <div className="space-y-3">
              {lesson.exampleWays.map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: courseColor }} />
                  <div>
                    <span className="text-sm font-medium text-foreground">{item.type}</span>
                    <p className="text-xs text-muted-foreground">{item.example}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Conversation Example */}
        {lesson.conversationLabel && lesson.conversationExample && (
          <Card className="p-5">
            <p className="text-sm font-medium text-foreground mb-4">{lesson.conversationLabel}</p>
            <div className="space-y-3">
              {/* User message */}
              <div className="bg-secondary/50 p-3 rounded-lg border-l-4" style={{ borderLeftColor: courseColor }}>
                <div className="flex items-center gap-2 mb-1">
                  <User className="w-3 h-3" style={{ color: courseColor }} />
                  <span className="text-xs font-medium" style={{ color: courseColor }}>{lesson.conversationExample.userLabel}</span>
                </div>
                <p className="text-sm text-foreground">{lesson.conversationExample.userMessage}</p>
              </div>

              {/* AI message */}
              <div className="bg-secondary/30 p-3 rounded-lg border-l-4 border-l-muted-foreground/30">
                <div className="flex items-center gap-2 mb-1">
                  <Bot className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs font-medium text-muted-foreground">{lesson.conversationExample.aiLabel}</span>
                </div>
                <p className="text-sm text-muted-foreground italic">{lesson.conversationExample.aiMessage}</p>
              </div>

              {/* Correction */}
              <div className="bg-green-50 p-3 rounded-lg border-l-4 border-l-green-500">
                <div className="flex items-center gap-2 mb-1">
                  <User className="w-3 h-3 text-green-600" />
                  <span className="text-xs font-medium text-green-700">{lesson.conversationExample.correctionLabel}</span>
                </div>
                <p className="text-sm text-green-800">{lesson.conversationExample.correctionMessage}</p>
              </div>
            </div>
          </Card>
        )}

        {/* Correction Tips */}
        {lesson.correctionTipsLabel && lesson.correctionTips && (
          <Card className="p-5" style={{ backgroundColor: `${courseColor}08` }}>
            <p className="text-sm font-medium mb-3" style={{ color: courseColor }}>{lesson.correctionTipsLabel}</p>
            <ul className="space-y-2">
              {lesson.correctionTips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: courseColor }} />
                  <span className="text-sm text-muted-foreground">{tip}</span>
                </li>
              ))}
            </ul>
          </Card>
        )}
      </div>
    )
  }

  // Fallback for any other content
  return (
    <Card className="p-5">
      <div className="flex items-center gap-2 mb-2">
        <BookOpen className="w-4 h-4" style={{ color: courseColor }} />
        <span className="text-sm font-medium text-foreground">Lesson Content</span>
      </div>
      <p className="text-sm text-muted-foreground">Content for this lesson is being prepared...</p>
    </Card>
  )
}
