'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Send,
  Loader2,
  Lightbulb,
  CheckCircle,
  AlertCircle,
  Zap,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  User,
  Bot
} from 'lucide-react'
import { evaluatePrompt, generateAIResponse } from '@/lib/game/evaluation'
import type { LessonContent } from '@/content/courses'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface Evaluation {
  passed: boolean
  score: number
  strengths: string[]
  weaknesses: string[]
  mainFeedback: string
  highlights: string[]
  nextSteps: string
}

interface ExerciseViewProps {
  lesson: LessonContent
  courseColor: string
  onComplete: (score: number) => void
}

export function ExerciseView({ lesson, courseColor, onComplete }: ExerciseViewProps) {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isStreaming, setIsStreaming] = useState(false)
  const [streamingText, setStreamingText] = useState('')
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null)
  const [showHints, setShowHints] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, streamingText])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)
    setIsStreaming(true)
    setStreamingText('')
    setEvaluation(null)

    try {
      // Generate AI response with streaming
      const systemPrompt = `You are a helpful AI assistant in a prompt engineering training exercise.

Scenario: ${lesson.scenario}
Task: ${lesson.task}

Respond naturally to the user's prompt. Give a realistic response that demonstrates how AI would interpret their instructions.
Keep your response focused and relevant to the scenario.`

      let fullResponse = ''

      await generateAIResponse(
        userMessage,
        systemPrompt,
        false,
        (chunk) => {
          fullResponse += chunk
          setStreamingText(fullResponse)
        }
      )

      // Add AI response to messages
      setMessages(prev => [...prev, { role: 'assistant', content: fullResponse }])
      setIsStreaming(false)
      setStreamingText('')

      // Evaluate the prompt
      const evalResult = await evaluatePrompt(
        userMessage,
        fullResponse,
        lesson.evaluationCriteria || 'clear structure and specificity',
        lesson.scenario || '',
        'en'
      )

      setEvaluation(evalResult)

    } catch (error) {
      console.error('Error:', error)
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'Sorry, there was an error processing your request. Please try again.' }
      ])
      setIsStreaming(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Scenario Card */}
      <Card className="p-4 mb-4 border-2" style={{ borderColor: `${courseColor}30` }}>
        <div className="flex items-start gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${courseColor}15` }}
          >
            <Lightbulb className="w-4 h-4" style={{ color: courseColor }} />
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium uppercase tracking-wide mb-1" style={{ color: courseColor }}>
              Scenario
            </p>
            <p className="text-sm text-foreground">{lesson.scenario}</p>
          </div>
        </div>
      </Card>

      {/* Task */}
      <div className="mb-4">
        <p className="text-sm text-muted-foreground">{lesson.task}</p>
      </div>

      {/* Hints Toggle */}
      {lesson.hints && lesson.hints.length > 0 && (
        <div className="mb-4">
          <button
            onClick={() => setShowHints(!showHints)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Lightbulb className="w-4 h-4" />
            <span>{showHints ? 'Hide hints' : 'Show hints'}</span>
            {showHints ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
          <AnimatePresence>
            {showHints && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2 overflow-hidden"
              >
                <Card className="p-3 bg-secondary/30">
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {lesson.hints.map((hint, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span style={{ color: courseColor }}>•</span>
                        {hint}
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Chat Messages */}
      <div
        ref={scrollRef}
        className="flex-1 space-y-4 mb-4 overflow-y-auto max-h-[400px] min-h-[200px]"
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] p-4 rounded-2xl ${
                msg.role === 'user'
                  ? 'rounded-tr-sm'
                  : 'rounded-tl-sm bg-secondary/50'
              }`}
              style={msg.role === 'user' ? { backgroundColor: courseColor } : undefined}
            >
              <div className="flex items-center gap-2 mb-1">
                {msg.role === 'user' ? (
                  <User className="w-3 h-3 text-white/70" />
                ) : (
                  <Bot className="w-3 h-3 text-muted-foreground" />
                )}
                <span className={`text-xs ${msg.role === 'user' ? 'text-white/70' : 'text-muted-foreground'}`}>
                  {msg.role === 'user' ? 'You' : 'AI'}
                </span>
              </div>
              <p className={`text-sm whitespace-pre-wrap ${msg.role === 'user' ? 'text-white' : 'text-foreground'}`}>
                {msg.content}
              </p>
            </div>
          </div>
        ))}

        {/* Streaming indicator */}
        {isStreaming && streamingText && (
          <div className="flex justify-start">
            <div className="max-w-[85%] p-4 rounded-2xl rounded-tl-sm bg-secondary/50">
              <div className="flex items-center gap-2 mb-1">
                <Bot className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">AI</span>
                <span className="text-xs animate-pulse" style={{ color: courseColor }}>● Streaming...</span>
              </div>
              <p className="text-sm text-foreground whitespace-pre-wrap">{streamingText}</p>
            </div>
          </div>
        )}

        {/* Loading indicator */}
        {isLoading && !isStreaming && (
          <div className="flex justify-start">
            <div className="p-4 rounded-2xl rounded-tl-sm bg-secondary/50">
              <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
            </div>
          </div>
        )}

        {/* Evaluation Result */}
        {evaluation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4"
          >
            <Card
              className={`p-5 border-2 ${
                evaluation.passed
                  ? 'bg-green-50 border-green-200'
                  : 'bg-amber-50 border-amber-200'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {evaluation.passed ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-amber-600" />
                  )}
                  <span className={`font-semibold ${evaluation.passed ? 'text-green-700' : 'text-amber-700'}`}>
                    {evaluation.passed ? 'Great Job!' : 'Needs Improvement'}
                  </span>
                </div>
                <span className={`text-lg font-bold ${evaluation.passed ? 'text-green-600' : 'text-amber-600'}`}>
                  {evaluation.score * 10}/100
                </span>
              </div>

              <p className={`text-sm mb-4 ${evaluation.passed ? 'text-green-800' : 'text-amber-800'}`}>
                {evaluation.mainFeedback}
              </p>

              {/* Strengths */}
              {evaluation.strengths.length > 0 && (
                <div className="mb-3">
                  <p className="text-xs font-medium text-green-700 mb-1">STRENGTHS</p>
                  <ul className="space-y-1">
                    {evaluation.strengths.map((s, i) => (
                      <li key={i} className="text-sm text-green-700 flex items-start gap-1">
                        <CheckCircle className="w-3 h-3 mt-1 flex-shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Weaknesses */}
              {evaluation.weaknesses.length > 0 && !evaluation.passed && (
                <div className="mb-3">
                  <p className="text-xs font-medium text-amber-700 mb-1">AREAS TO IMPROVE</p>
                  <ul className="space-y-1">
                    {evaluation.weaknesses.map((w, i) => (
                      <li key={i} className="text-sm text-amber-700 flex items-start gap-1">
                        <AlertCircle className="w-3 h-3 mt-1 flex-shrink-0" />
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Next Steps */}
              {evaluation.nextSteps && !evaluation.passed && (
                <div className="pt-3 border-t border-amber-200">
                  <p className="text-xs font-medium text-amber-700 mb-1">NEXT STEP</p>
                  <p className="text-sm text-amber-800">{evaluation.nextSteps}</p>
                </div>
              )}

              {/* Continue Button */}
              {evaluation.passed && (
                <Button
                  className="w-full mt-4 gap-2"
                  style={{ backgroundColor: courseColor }}
                  onClick={() => onComplete(evaluation.score * 10)}
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </Card>
          </motion.div>
        )}
      </div>

      {/* Input Area */}
      <div className="flex gap-3">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Write your prompt here..."
          className="min-h-[80px] resize-none"
          disabled={isLoading || (evaluation?.passed ?? false)}
        />
        <Button
          size="icon"
          className="h-auto min-h-[80px] w-14 rounded-xl"
          style={{ backgroundColor: courseColor }}
          onClick={handleSend}
          disabled={!input.trim() || isLoading || (evaluation?.passed ?? false)}
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </Button>
      </div>
    </div>
  )
}
