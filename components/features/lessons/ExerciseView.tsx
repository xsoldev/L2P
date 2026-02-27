'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
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
  Bot,
  FileText,
  AlertTriangle
} from 'lucide-react'
import { evaluatePrompt, generateAIResponse } from '@/lib/game/evaluation'
import { generateImage, editImage } from '@/lib/ai/client'
import { ImageIcon } from 'lucide-react'
import type { LessonContent } from '@/content/courses'

interface Message {
  role: 'user' | 'assistant'
  content: string
  images?: string[] // For image generation responses
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
  const [loadingState, setLoadingState] = useState<'idle' | 'sending' | 'thinking' | 'streaming' | 'evaluating' | 'generating-image' | 'editing-image'>('idle')
  const [generatedImages, setGeneratedImages] = useState<string[]>([])
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
    setLoadingState('sending')
    setStreamingText('')
    setEvaluation(null)
    setGeneratedImages([])

    try {
      // Immediate feedback: Sending
      await new Promise(resolve => setTimeout(resolve, 300))

      // Check if this is an image generation exercise
      if (lesson.isImageGeneration) {
        setLoadingState('generating-image')

        // Generate image using OpenRouter
        const imageResult = await generateImage(
          userMessage,
          lesson.imageAspectRatio || '1:1'
        )

        if (imageResult.error) {
          setMessages(prev => [
            ...prev,
            { role: 'assistant', content: `Error generating image: ${imageResult.error}. Please try again.` }
          ])
          setLoadingState('idle')
          setIsLoading(false)
          return
        }

        if (imageResult.images.length > 0) {
          setGeneratedImages(imageResult.images)
          setMessages(prev => [
            ...prev,
            {
              role: 'assistant',
              content: imageResult.text || 'Here\'s the image I generated based on your prompt:',
              images: imageResult.images
            }
          ])
        } else {
          setMessages(prev => [
            ...prev,
            { role: 'assistant', content: imageResult.text || 'No image was generated. Try adding more details to your prompt.' }
          ])
        }

        setLoadingState('evaluating')

        // Evaluate the image prompt
        const evalResult = await evaluatePrompt(
          userMessage,
          `[Generated image based on prompt. Text response: ${imageResult.text}]`,
          lesson.evaluationCriteria || 'including specific details for subject, style, mood/lighting, composition, AND artistic direction',
          lesson.scenario || '',
          'en'
        )

        setEvaluation(evalResult)
        setLoadingState('idle')

      } else if (lesson.isImageEditing) {
        // Image editing exercise
        setLoadingState('editing-image')

        // Get the source image URL
        const sourceImageUrl = lesson.sampleImageUrl || ''

        if (!sourceImageUrl) {
          setMessages(prev => [
            ...prev,
            { role: 'assistant', content: 'Error: No source image provided for editing.' }
          ])
          setLoadingState('idle')
          setIsLoading(false)
          return
        }

        // Edit image using OpenRouter
        const imageResult = await editImage(
          userMessage,
          sourceImageUrl,
          lesson.imageAspectRatio || '1:1'
        )

        if (imageResult.error) {
          setMessages(prev => [
            ...prev,
            { role: 'assistant', content: `Error editing image: ${imageResult.error}. Please try again.` }
          ])
          setLoadingState('idle')
          setIsLoading(false)
          return
        }

        if (imageResult.images.length > 0) {
          setGeneratedImages(imageResult.images)
          setMessages(prev => [
            ...prev,
            {
              role: 'assistant',
              content: imageResult.text || 'Here\'s the edited image based on your prompt:',
              images: imageResult.images
            }
          ])
        } else {
          setMessages(prev => [
            ...prev,
            { role: 'assistant', content: imageResult.text || 'The edit could not be applied. Try being more specific about the changes you want.' }
          ])
        }

        setLoadingState('evaluating')

        // Evaluate the image editing prompt
        const evalResult = await evaluatePrompt(
          userMessage,
          `[Edited image based on prompt. Original: ${lesson.sampleImageDescription || 'source image'}. Text response: ${imageResult.text}]`,
          lesson.evaluationCriteria || 'providing specific editing instructions that address mood, lighting, and visual elements',
          lesson.scenario || '',
          'en'
        )

        setEvaluation(evalResult)
        setLoadingState('idle')

      } else {
        // Standard text-based exercise
        setLoadingState('thinking')

        // Build context with available data
        let contextData = ''

        // Add sales data if available
        if (lesson.salesData) {
          contextData += `\n\nAVAILABLE DATA:\n${lesson.salesData.map(d => `${d.quarter}: $${d.sales.toLocaleString()}`).join('\n')}`
        }

        // Add sample document if available
        if (lesson.sampleDocument) {
          contextData += `\n\n${lesson.sampleDocument.title}:\n${lesson.sampleDocument.content}`
        }

        // Add sample AI response context if this is a correction exercise
        if (lesson.sampleAIResponse) {
          contextData += `\n\nPREVIOUS AI RESPONSE (that needs correction):\n${lesson.sampleAIResponse.content}`
        }

        // Generate AI response with streaming
        const systemPrompt = `You are a helpful AI assistant in a prompt engineering training exercise.

Scenario: ${lesson.scenario}
Task: ${lesson.task}
${contextData}

Respond naturally to the user's prompt using the available data/context above. Give a realistic response that demonstrates how AI would interpret their instructions.
Keep your response focused and relevant to the scenario.`

        let fullResponse = ''
        let hasStartedStreaming = false

        await generateAIResponse(
          userMessage,
          systemPrompt,
          false,
          (chunk) => {
            if (!hasStartedStreaming) {
              setLoadingState('streaming')
              setIsStreaming(true)
              hasStartedStreaming = true
            }
            fullResponse += chunk
            setStreamingText(fullResponse)
          }
        )

        // Add AI response to messages
        setMessages(prev => [...prev, { role: 'assistant', content: fullResponse }])
        setIsStreaming(false)
        setStreamingText('')
        setLoadingState('evaluating')

        // Evaluate the prompt (include context for proper evaluation)
        const fullContext = `${lesson.scenario || ''}${contextData}`
        const evalResult = await evaluatePrompt(
          userMessage,
          fullResponse,
          lesson.evaluationCriteria || 'clear structure and specificity',
          fullContext,
          'en'
        )

        setEvaluation(evalResult)
        setLoadingState('idle')
      }

    } catch (error) {
      console.error('Error:', error)
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'Sorry, there was an error processing your request. Please try again.' }
      ])
      setIsStreaming(false)
      setLoadingState('idle')
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
    <div className="grid md:grid-cols-[1fr,380px] gap-6">
      {/* Left Panel: Chat and Interaction */}
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

        {/* Sales Data (for visualization exercises) */}
        {lesson.salesData && (
          <Card className="p-4 mb-4 bg-secondary/30 border border-border">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-foreground rounded-sm" />
                <span className="text-xs font-mono text-foreground tracking-wider uppercase">Data</span>
              </div>
              <span className="text-xs text-muted-foreground italic">Use this data in your prompt ↓</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {lesson.salesData.map((item, idx) => (
                <div key={idx} className="bg-background p-4 rounded-lg border border-border hover:border-primary/30 transition-colors">
                  <div className="text-xs font-mono text-muted-foreground mb-2">{item.quarter}</div>
                  <div className="text-2xl font-bold text-foreground">
                    ${item.sales.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Sample Document (if provided) */}
        {lesson.sampleDocument && (
          <Card className="p-4 mb-4 bg-secondary/30 border border-border">
            <div className="flex items-start gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-blue-500/10"
              >
                <FileText className="w-4 h-4 text-blue-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-medium uppercase tracking-wide text-blue-600 dark:text-blue-400">
                    {lesson.sampleDocument.title}
                  </p>
                  <span className="text-xs text-muted-foreground italic">Reference this context ↓</span>
                </div>
                <pre className="text-xs text-foreground whitespace-pre-wrap font-mono bg-background/50 p-3 rounded-lg overflow-x-auto">
                  {lesson.sampleDocument.content}
                </pre>
              </div>
            </div>
          </Card>
        )}

        {/* Source Image for Editing Exercises */}
        {lesson.isImageEditing && lesson.sampleImageUrl && (
          <Card className="p-4 mb-4 bg-secondary/30 border border-border">
            <div className="flex items-start gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${courseColor}15` }}
              >
                <ImageIcon className="w-4 h-4" style={{ color: courseColor }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-medium uppercase tracking-wide" style={{ color: courseColor }}>
                    Source Image to Edit
                  </p>
                  <span className="text-xs text-muted-foreground italic">Write a prompt to transform this ↓</span>
                </div>
                <div className="rounded-lg overflow-hidden border border-border">
                  <img
                    src={lesson.sampleImageUrl}
                    alt={lesson.sampleImageDescription || 'Source image for editing'}
                    className="w-full h-auto max-h-[300px] object-cover"
                  />
                </div>
                {lesson.sampleImageDescription && (
                  <p className="text-xs text-muted-foreground mt-2 italic">
                    {lesson.sampleImageDescription}
                  </p>
                )}
              </div>
            </div>
          </Card>
        )}

        {/* Sample AI Response that needs correction (if provided) */}
        {lesson.sampleAIResponse && (
          <Card className="p-4 mb-4 bg-red-50/50 dark:bg-red-950/20 border border-red-200 dark:border-red-900">
            <div className="flex items-start gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-red-500/10"
              >
                <AlertTriangle className="w-4 h-4 text-red-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-medium uppercase tracking-wide text-red-600 dark:text-red-400">
                    {lesson.sampleAIResponse.label}
                  </p>
                  <span className="text-xs text-red-500/70 italic">Correct this response ↓</span>
                </div>
                <pre className="text-xs text-foreground whitespace-pre-wrap font-mono bg-background/50 p-3 rounded-lg mb-3 overflow-x-auto">
                  {lesson.sampleAIResponse.content}
                </pre>
                {lesson.sampleAIResponse.issues && lesson.sampleAIResponse.issues.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs font-medium text-red-600 dark:text-red-400 mb-1">Issues to address:</p>
                    <ul className="space-y-1">
                      {lesson.sampleAIResponse.issues.map((issue, i) => (
                        <li key={i} className="text-xs text-red-700 dark:text-red-300 flex items-start gap-1">
                          <span className="text-red-400">•</span>
                          {issue}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </Card>
        )}

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
          className="flex-1 space-y-4 mb-4 overflow-y-auto max-h-[500px] min-h-[200px]"
        >
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
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
                {msg.role === 'user' ? (
                  <p className="text-sm whitespace-pre-wrap text-white">
                    {msg.content}
                  </p>
                ) : (
                  <div className="space-y-3">
                    {/* Display images if present */}
                    {msg.images && msg.images.length > 0 && (
                      <div className="space-y-2">
                        {msg.images.map((imgSrc, imgIdx) => (
                          <img
                            key={imgIdx}
                            src={imgSrc}
                            alt={`Generated image ${imgIdx + 1}`}
                            className="max-w-full rounded-lg border border-border shadow-lg"
                            style={{ maxHeight: '400px', objectFit: 'contain' }}
                          />
                        ))}
                      </div>
                    )}
                    {/* Display text content */}
                    {msg.content && (
                      <div className="text-sm text-foreground prose prose-sm dark:prose-invert max-w-none prose-p:my-2 prose-ul:my-2 prose-li:my-0 prose-headings:my-2 prose-pre:bg-background prose-pre:border prose-pre:border-border">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          {/* Loading States with smooth transitions */}
          <AnimatePresence mode="wait">
            {loadingState === 'sending' && (
              <motion.div
                key="sending"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex justify-start"
              >
                <div className="p-4 rounded-2xl rounded-tl-sm bg-secondary/50">
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: courseColor }}
                    />
                    <span className="text-sm text-muted-foreground">Sending...</span>
                  </div>
                </div>
              </motion.div>
            )}

            {loadingState === 'thinking' && (
              <motion.div
                key="thinking"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex justify-start"
              >
                <div className="p-4 rounded-2xl rounded-tl-sm bg-secondary/50">
                  <div className="flex items-center gap-2">
                    <Bot className="w-4 h-4 text-muted-foreground" />
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                          className="w-2 h-2 rounded-full bg-muted-foreground"
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">AI is thinking...</span>
                  </div>
                </div>
              </motion.div>
            )}

            {loadingState === 'generating-image' && (
              <motion.div
                key="generating-image"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex justify-start"
              >
                <div className="p-4 rounded-2xl rounded-tl-sm bg-secondary/50">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        className="w-8 h-8 rounded-lg border-2 border-t-transparent"
                        style={{ borderColor: courseColor, borderTopColor: 'transparent' }}
                      />
                      <div
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: courseColor }} />
                      </div>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-foreground">Generating image...</span>
                      <p className="text-xs text-muted-foreground">This may take 10-20 seconds</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {loadingState === 'editing-image' && (
              <motion.div
                key="editing-image"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex justify-start"
              >
                <div className="p-4 rounded-2xl rounded-tl-sm bg-secondary/50">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        className="w-8 h-8 rounded-lg border-2 border-t-transparent"
                        style={{ borderColor: courseColor, borderTopColor: 'transparent' }}
                      />
                      <div
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <ImageIcon className="w-3 h-3" style={{ color: courseColor }} />
                      </div>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-foreground">Editing image...</span>
                      <p className="text-xs text-muted-foreground">Applying your transformations...</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {loadingState === 'streaming' && streamingText && (
              <motion.div
                key="streaming"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="max-w-[85%] p-4 rounded-2xl rounded-tl-sm bg-secondary/50">
                  <div className="flex items-center gap-2 mb-1">
                    <Bot className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">AI</span>
                    <motion.span
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="text-xs"
                      style={{ color: courseColor }}
                    >
                      ● Streaming...
                    </motion.span>
                  </div>
                  <div className="text-sm text-foreground prose prose-sm dark:prose-invert max-w-none prose-p:my-2 prose-ul:my-2 prose-li:my-0 prose-headings:my-2 prose-pre:bg-background prose-pre:border prose-pre:border-border">
                    <ReactMarkdown>{streamingText}</ReactMarkdown>
                  </div>
                </div>
              </motion.div>
            )}

            {loadingState === 'evaluating' && (
              <motion.div
                key="evaluating"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex justify-center"
              >
                <div className="px-4 py-2 rounded-full bg-secondary/50">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" style={{ color: courseColor }} />
                    <span className="text-sm text-muted-foreground">Evaluating your prompt...</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input Area */}
        <div className="flex gap-3">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              lesson.isImageEditing
                ? "Describe how to transform the image above..."
                : lesson.isImageGeneration
                  ? "Describe the image you want to generate..."
                  : lesson.salesData
                    ? "Write your prompt using the data above..."
                    : lesson.sampleAIResponse
                      ? "Write a correction prompt addressing the issues above..."
                      : lesson.sampleDocument
                        ? "Write your prompt referencing the context above..."
                        : "Write your prompt here..."
            }
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

      {/* Right Panel: Evaluation Feedback (Sticky on desktop) */}
      <div className="md:sticky md:top-6 md:self-start">
        <AnimatePresence mode="wait">
          {evaluation ? (
            <motion.div
              key="evaluation"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <Card
                className={`p-5 border-l-4 ${
                  evaluation.passed
                    ? 'bg-green-50/80 dark:bg-green-950/20 border-l-green-500'
                    : 'bg-amber-50/80 dark:bg-amber-950/20 border-l-amber-500'
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  {evaluation.passed ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-amber-600" />
                  )}
                  <span className={`font-semibold ${evaluation.passed ? 'text-green-700 dark:text-green-400' : 'text-amber-700 dark:text-amber-400'}`}>
                    {evaluation.passed ? 'Great Job!' : 'Needs Improvement'}
                  </span>
                </div>

                <p className={`text-sm mb-4 ${evaluation.passed ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'}`}>
                  {evaluation.mainFeedback}
                </p>

                {/* Strengths - only show top 2 */}
                {evaluation.strengths.length > 0 && evaluation.passed && (
                  <div className="mb-3">
                    <ul className="space-y-1">
                      {evaluation.strengths.slice(0, 2).map((s, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="text-sm text-green-700 dark:text-green-300 flex items-start gap-1"
                        >
                          <CheckCircle className="w-3 h-3 mt-1 flex-shrink-0" />
                          {s}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Weaknesses - only show if failed */}
                {evaluation.weaknesses.length > 0 && !evaluation.passed && (
                  <div className="mb-3">
                    <p className="text-xs font-medium text-amber-700 dark:text-amber-400 mb-1">TRY THESE IMPROVEMENTS</p>
                    <ul className="space-y-1">
                      {evaluation.weaknesses.slice(0, 2).map((w, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="text-sm text-amber-700 dark:text-amber-300 flex items-start gap-1"
                        >
                          <Lightbulb className="w-3 h-3 mt-1 flex-shrink-0" />
                          {w}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Continue Button */}
                {evaluation.passed && (
                  <Button
                    className="w-full mt-2 gap-2"
                    style={{ backgroundColor: courseColor }}
                    onClick={() => onComplete(evaluation.score * 10)}
                  >
                    Complete Lesson
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                )}
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Card className="p-6 border-2 border-dashed border-muted-foreground/20">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-secondary/50 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your feedback will appear here
                  </p>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
