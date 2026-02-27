# Exercise View Layout Diagram

## Desktop Layout (md+ breakpoint)

```
┌────────────────────────────────────────────────────────────────────────────┐
│                              Page Header                                    │
│  ← Back to Course                                    [Unit Badge] [XP Badge]│
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ (Progress Bar)        │
└────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────┐
│                        Exercise Title Header                                │
└────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────┬──────────────────────────────────────┐
│  LEFT PANEL (flex-1)                │  RIGHT PANEL (380px, sticky)         │
│                                     │                                      │
│  ┌───────────────────────────────┐  │  ┌────────────────────────────────┐  │
│  │  Scenario Card                │  │  │  Evaluation Placeholder        │  │
│  │  [Lightbulb] Scenario text    │  │  │  ┌──────────────────────────┐  │  │
│  └───────────────────────────────┘  │  │  │   [Zap Icon]             │  │  │
│                                     │  │  │   "Your feedback will    │  │  │
│  Task description text...           │  │  │    appear here"          │  │  │
│                                     │  │  │                          │  │  │
│  [💡 Show hints ▼]                  │  │  └──────────────────────────┘  │  │
│                                     │  └────────────────────────────────┘  │
│  ┌───────────────────────────────┐  │     ↑ Sticky positioned             │
│  │  Chat Messages Area           │  │                                      │
│  │  (scrollable, max-h-500px)    │  │  AFTER EVALUATION:                  │
│  │                               │  │  ┌────────────────────────────────┐  │
│  │  ┌─────────────────────────┐  │  │  │ ✓ Great Job! / ⚠ Improve    │  │
│  │  │ [User] You: Prompt text │  │  │  │                              │  │
│  │  └─────────────────────────┘  │  │  │ Main feedback text...        │  │
│  │                               │  │  │                              │  │
│  │  ┌─────────────────────────┐  │  │  │ ✓ Strength 1                │  │
│  │  │ [Bot] AI: Response...   │  │  │  │ ✓ Strength 2                │  │
│  │  │ ● Streaming...          │  │  │  │                              │  │
│  │  └─────────────────────────┘  │  │  │ [Complete Lesson →]          │  │
│  │                               │  │  └────────────────────────────────┘  │
│  │  LOADING STATES:              │  │                                      │
│  │  ○ Sending...                 │  │                                      │
│  │  ⋯ AI is thinking...          │  │                                      │
│  │  ⟳ Evaluating your prompt...  │  │                                      │
│  └───────────────────────────────┘  │                                      │
│                                     │                                      │
│  ┌───────────────────────────────┐  │                                      │
│  │ [Text Input Area       ] [▶] │  │                                      │
│  │  Write your prompt here...   │  │                                      │
│  └───────────────────────────────┘  │                                      │
└─────────────────────────────────────┴──────────────────────────────────────┘
```

## Mobile Layout (< md breakpoint)

```
┌──────────────────────────────────────────┐
│          Page Header                     │
│  ← Back    [Unit Badge] [XP Badge]       │
│  ━━━━━━━━━━━━━━━━━━━━━━ (Progress)      │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│        Exercise Title Header             │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│  ┌────────────────────────────────────┐  │
│  │  Scenario Card                     │  │
│  │  [Lightbulb] Scenario text         │  │
│  └────────────────────────────────────┘  │
│                                          │
│  Task description text...                │
│                                          │
│  [💡 Show hints ▼]                       │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │  Chat Messages Area                │  │
│  │  (scrollable)                      │  │
│  │                                    │  │
│  │  ┌──────────────────────────────┐  │  │
│  │  │ [User] You: Prompt text      │  │  │
│  │  └──────────────────────────────┘  │  │
│  │                                    │  │
│  │  ┌──────────────────────────────┐  │  │
│  │  │ [Bot] AI: Response...        │  │  │
│  │  │ ● Streaming...               │  │  │
│  │  └──────────────────────────────┘  │  │
│  │                                    │  │
│  │  LOADING STATES:                   │  │
│  │  ○ Sending...                      │  │
│  │  ⋯ AI is thinking...               │  │
│  │  ⟳ Evaluating your prompt...       │  │
│  └────────────────────────────────────┘  │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │ [Text Input Area        ] [▶]     │  │
│  │  Write your prompt here...        │  │
│  └────────────────────────────────────┘  │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │  Evaluation Feedback               │  │
│  │  (appears below after submission)  │  │
│  │  ✓ Great Job! / ⚠ Improve         │  │
│  │  Main feedback...                  │  │
│  │  [Complete Lesson →]               │  │
│  └────────────────────────────────────┘  │
└──────────────────────────────────────────┘
```

## Loading State Flow

```
1. USER CLICKS SEND
   ↓
2. SENDING STATE (300ms)
   [○ pulsing dot] Sending...
   ↓
3. THINKING STATE
   [⋯ three dots animating] AI is thinking...
   ↓
4. STREAMING STATE
   [Bot icon] AI
   [● pulsing] Streaming...
   Response text appears incrementally...
   ↓
5. EVALUATING STATE
   [⟳ spinner] Evaluating your prompt...
   ↓
6. EVALUATION APPEARS IN RIGHT PANEL
   Slides in from right with spring animation
   ↓
7. IDLE STATE
   Ready for next prompt or completion
```

## Key Features

### Desktop
- **Two-column grid layout**: `grid md:grid-cols-[1fr,380px] gap-6`
- **Sticky right panel**: Stays visible while scrolling chat
- **Wider container**: `max-w-7xl` for exercises
- **Evaluation always visible**: No need to scroll to see feedback

### Mobile
- **Stacked layout**: Natural vertical flow
- **Evaluation below**: Appears after input area
- **Full-width components**: Better mobile readability

### Animations
- **Message entry**: Fade-in + upward slide
- **Loading transitions**: Smooth exit/enter with vertical movement
- **Evaluation panel**: Spring animation from right
- **Pulsing indicators**: Draw attention to loading states
- **Staggered list items**: Strengths/weaknesses appear sequentially
