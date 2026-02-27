# Code Changes for Exercise UX Improvements

## File 1: ExerciseView.tsx

**Path:** `/Users/novagenlabs/Documents/code/caludexperiments/prompt-game-next/components/features/lessons/ExerciseView.tsx`

### Change 1: Added Loading State

```typescript
// ADDED: New state variable for granular loading states
const [loadingState, setLoadingState] = useState<'idle' | 'sending' | 'thinking' | 'streaming' | 'evaluating'>('idle')
```

### Change 2: Enhanced handleSend Function

```typescript
const handleSend = async () => {
  if (!input.trim() || isLoading) return

  const userMessage = input.trim()
  setInput('')
  setMessages(prev => [...prev, { role: 'user', content: userMessage }])
  setIsLoading(true)
  setLoadingState('sending')  // ← NEW: Immediate feedback
  setStreamingText('')
  setEvaluation(null)

  try {
    // NEW: 300ms delay for tactile feedback
    await new Promise(resolve => setTimeout(resolve, 300))
    setLoadingState('thinking')  // ← NEW: Show thinking state

    const systemPrompt = `...`

    let fullResponse = ''
    let hasStartedStreaming = false  // ← NEW: Track streaming start

    await generateAIResponse(
      userMessage,
      systemPrompt,
      false,
      (chunk) => {
        // NEW: Set streaming state on first chunk
        if (!hasStartedStreaming) {
          setLoadingState('streaming')
          setIsStreaming(true)
          hasStartedStreaming = true
        }
        fullResponse += chunk
        setStreamingText(fullResponse)
      }
    )

    setMessages(prev => [...prev, { role: 'assistant', content: fullResponse }])
    setIsStreaming(false)
    setStreamingText('')
    setLoadingState('evaluating')  // ← NEW: Show evaluating state

    const evalResult = await evaluatePrompt(...)

    setEvaluation(evalResult)
    setLoadingState('idle')  // ← NEW: Return to idle

  } catch (error) {
    // ...
    setLoadingState('idle')
  } finally {
    setIsLoading(false)
  }
}
```

### Change 3: Two-Column Grid Layout

```typescript
return (
  <div className="grid md:grid-cols-[1fr,380px] gap-6">  {/* ← NEW: Grid layout */}
    {/* Left Panel: Chat and Interaction */}
    <div className="flex flex-col h-full">
      {/* Existing content */}
    </div>

    {/* Right Panel: Evaluation Feedback (Sticky on desktop) */}
    <div className="md:sticky md:top-6 md:self-start">  {/* ← NEW: Sticky panel */}
      <AnimatePresence mode="wait">
        {evaluation ? (
          <motion.div
            key="evaluation"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Evaluation card */}
          </motion.div>
        ) : (
          <motion.div key="placeholder">
            <Card className="p-6 border-2 border-dashed border-muted-foreground/20">
              <div className="text-center">
                <Zap className="w-6 h-6 text-muted-foreground" />
                <p>Your feedback will appear here</p>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </div>
)
```

### Change 4: Loading State Indicators

```typescript
{/* Loading States with smooth transitions */}
<AnimatePresence mode="wait">
  {loadingState === 'sending' && (
    <motion.div
      key="sending"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
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

  {loadingState === 'streaming' && streamingText && (
    <motion.div key="streaming">
      {/* Streaming indicator with pulsing dot */}
      <motion.span
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        style={{ color: courseColor }}
      >
        ● Streaming...
      </motion.span>
      <p>{streamingText}</p>
    </motion.div>
  )}

  {loadingState === 'evaluating' && (
    <motion.div key="evaluating">
      <div className="px-4 py-2 rounded-full bg-secondary/50">
        <Loader2 className="w-4 h-4 animate-spin" style={{ color: courseColor }} />
        <span>Evaluating your prompt...</span>
      </div>
    </motion.div>
  )}
</AnimatePresence>
```

### Change 5: Enhanced Message Animations

```typescript
{messages.map((msg, index) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, y: 10 }}  // ← NEW: Fade-in animation
    animate={{ opacity: 1, y: 0 }}
    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
  >
    {/* Message content */}
  </motion.div>
))}
```

### Change 6: Dark Mode Support for Evaluation

```typescript
<Card
  className={`p-5 border-l-4 ${
    evaluation.passed
      ? 'bg-green-50/80 dark:bg-green-950/20 border-l-green-500'  // ← NEW: Dark mode
      : 'bg-amber-50/80 dark:bg-amber-950/20 border-l-amber-500'
  }`}
>
  <span className={`font-semibold ${
    evaluation.passed
      ? 'text-green-700 dark:text-green-400'  // ← NEW: Dark mode text
      : 'text-amber-700 dark:text-amber-400'
  }`}>
```

### Change 7: Staggered List Animations

```typescript
{evaluation.strengths.slice(0, 2).map((s, i) => (
  <motion.li
    key={i}
    initial={{ opacity: 0, x: -10 }}  // ← NEW: Staggered animation
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: i * 0.1 }}   // ← NEW: Delay for each item
    className="text-sm text-green-700 dark:text-green-300"
  >
    <CheckCircle className="w-3 h-3" />
    {s}
  </motion.li>
))}
```

## File 2: page.tsx

**Path:** `/Users/novagenlabs/Documents/code/caludexperiments/prompt-game-next/app/courses/[slug]/learn/[lessonId]/page.tsx`

### Change: Dynamic Container Width

```typescript
<main className={`container mx-auto px-4 py-8 ${
  isExercise && !isComplete
    ? 'max-w-7xl'   // ← NEW: Wider for exercises (side panel layout)
    : 'max-w-3xl'   // ← Keep narrow for lessons and completion screen
}`}>
```

## Additional Changes

### File Removed
- `components/ui/typography.tsx` - Removed as it was a React Native component causing build errors

## CSS Classes Used

### Grid Layout
- `grid` - CSS Grid container
- `md:grid-cols-[1fr,380px]` - Two columns: flex + fixed 380px on medium+ screens
- `gap-6` - 1.5rem gap between columns

### Sticky Positioning
- `md:sticky` - Sticky on medium+ screens
- `md:top-6` - 1.5rem from top when stuck
- `md:self-start` - Align to start of grid cell

### Animations (Framer Motion)
- `initial={{ opacity: 0, y: 10 }}` - Start invisible, slightly below
- `animate={{ opacity: 1, y: 0 }}` - Fade in, slide up
- `exit={{ opacity: 0, y: -10 }}` - Fade out, slide up
- `transition={{ type: 'spring', stiffness: 300, damping: 30 }}` - Spring animation

## Dependencies

No new dependencies required. All features use existing packages:
- `framer-motion` (already installed)
- Tailwind CSS utility classes
- Lucide React icons

## Browser Support

- CSS Grid: All modern browsers
- Sticky positioning: All modern browsers
- Framer Motion animations: All modern browsers
- Dark mode: System preference detection
