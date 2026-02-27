// Business Course Content - Following Original Game Structure
// Each lesson has type-specific fields for rendering

export interface LessonContent {
  id: string
  title: string
  type: 'lesson' | 'exercise'
  xpReward: number
  // Lesson-specific fields (all optional)
  keyPrincipleLabel?: string
  keyPrincipleText?: string
  vaguePromptLabel?: string
  vaguePromptExample?: string
  whatAiMightDoLabel?: string
  aiProblems?: string[]
  solutionLabel?: string
  solutionText?: string
  exampleLabel?: string
  exampleSteps?: string[]
  whyWorksLabel?: string
  benefits?: string[]
  vagueLabel?: string
  vagueExample?: string
  vagueQuestion?: string
  specificLabel?: string
  specificExample?: string
  specificNote?: string
  specificsLabel?: string
  specificTypes?: Array<{ type: string; example: string }>
  conversationLabel?: string
  conversationExample?: {
    userLabel: string
    userMessage: string
    aiLabel: string
    aiMessage: string
    correctionLabel: string
    correctionMessage: string
  }
  correctionTipsLabel?: string
  correctionTips?: string[]
  waysToProvideLabel?: string
  exampleWays?: Array<{ type: string; example: string }>
  whyExamplesWorkLabel?: string
  // Exercise-specific fields
  scenario?: string
  task?: string
  evaluationCriteria?: string
  hints?: string[]
  // Sample documents for exercises
  sampleDocument?: {
    title: string
    content: string
    type?: 'email' | 'report' | 'data' | 'response' | 'template'
  }
  sampleAIResponse?: {
    label: string
    content: string
    issues?: string[]
  }
  // Sales data for visualization exercises
  salesData?: Array<{ quarter: string; sales: number }>
  // Flag for image generation exercises
  isImageGeneration?: boolean
  // Default aspect ratio for image generation
  imageAspectRatio?: '1:1' | '16:9' | '9:16' | '4:3' | '3:4' | '21:9'
  // Flag for image editing exercises
  isImageEditing?: boolean
  // Sample image for editing exercises (URL or will use placeholder)
  sampleImageUrl?: string
  // Description of the sample image for context
  sampleImageDescription?: string
}

export interface CourseUnit {
  id: string
  name: string
  order: number
  lessons: LessonContent[]
}

export interface Course {
  id: string
  name: string
  slug: string
  color: string
  units: CourseUnit[]
}

export const businessCourse: Course = {
  id: 'business',
  name: 'Business Prompts',
  slug: 'business',
  color: '#007AFF',
  units: [
    {
      id: 'unit-1',
      name: 'Fundamentals',
      order: 1,
      lessons: [
        {
          id: 'intro',
          title: 'The Problem with Vague Prompts',
          type: 'lesson' as const,
          xpReward: 10,
          vaguePromptLabel: 'Vague Prompt',
          vaguePromptExample: '"Write me a business email"',
          whatAiMightDoLabel: 'What the AI might do:',
          aiProblems: [
            'Write about a random topic you didn\'t intend',
            'Use the wrong tone for your audience',
            'Miss crucial context about your situation',
            'Create something too generic to be useful'
          ],
          solutionLabel: 'The Solution',
          solutionText: 'Break down your request into clear, specific steps. Guide the AI like you\'re briefing a new team member who has never worked at your company before!'
        },
        {
          id: 'lesson1',
          title: 'Break It Down',
          type: 'lesson' as const,
          xpReward: 15,
          keyPrincipleLabel: 'Key Principle: One Step at a Time',
          keyPrincipleText: 'Instead of asking for a complete result, break your task into small, clear steps. This gives you control and produces better output.',
          exampleLabel: 'Example: Drafting a proposal',
          exampleSteps: [
            'Define the client and project scope',
            'Outline the key deliverables',
            'Specify the timeline and milestones',
            'Set the tone (formal, persuasive)',
            'Add pricing structure requirements'
          ],
          whyWorksLabel: 'Why this works:',
          benefits: [
            'Each step is simple and clear',
            'You maintain control of the process',
            'Easy to catch and fix errors early',
            'AI knows exactly what\'s expected at each stage'
          ]
        },
        {
          id: 'exercise1',
          title: 'Break Down a Task',
          type: 'exercise' as const,
          xpReward: 25,
          scenario: 'You need AI to help you write a professional email to your manager requesting time off for a vacation next month.',
          task: 'Write a prompt that breaks this task down into clear steps. Think about: greeting, context, dates, coverage, and closing.',
          evaluationCriteria: 'breaking the task into clear steps with specific details',
          hints: [
            'Start with who you\'re writing to and why',
            'Include specific dates you need off',
            'Mention how your work will be covered',
            'Specify the tone you want'
          ],
          sampleDocument: {
            title: 'Your Work Context',
            content: `Manager: Sarah Chen (Director of Product)
Your Role: Senior Product Manager
Team: Product Development (5 people)
Dates Needed: March 15-22 (7 business days)
Reason: Family vacation to Hawaii
Work Coverage: Tom (another PM) has agreed to cover urgent items
Pending Projects: Q2 roadmap review (due March 25), Sprint planning (can be done before leaving)
Tone Needed: Professional but warm (Sarah appreciates directness)`,
            type: 'data'
          }
        },
        {
          id: 'lesson2',
          title: 'Be Specific',
          type: 'lesson' as const,
          xpReward: 15,
          keyPrincipleLabel: 'Key Principle: Details Matter',
          keyPrincipleText: 'Vague instructions lead to unexpected results. Add specific details about what, where, who, and how.',
          vagueLabel: 'Vague',
          vagueExample: '"Write a report"',
          vagueQuestion: 'About what? For whom? How long? What format?',
          specificLabel: 'Specific',
          specificExample: '"Write a 500-word executive summary of Q3 sales performance for our board meeting, using bullet points for key metrics"',
          specificNote: 'Clear audience, length, topic, and format!',
          specificsLabel: 'Types of specificity to include:',
          specificTypes: [
            { type: 'Audience:', example: '"for the executive team" vs "for new hires"' },
            { type: 'Length:', example: '"300 words" or "2 paragraphs"' },
            { type: 'Format:', example: '"bullet points", "table", "narrative"' },
            { type: 'Tone:', example: '"professional", "casual", "urgent"' },
            { type: 'Context:', example: '"for a quarterly review meeting"' }
          ]
        },
        {
          id: 'exercise2',
          title: 'Add Specificity',
          type: 'exercise' as const,
          xpReward: 25,
          scenario: 'You need a data visualization showing your company\'s quarterly sales performance for 2024.',
          task: 'Write a specific prompt to create a chart from this data. Be specific about chart type, colors, labels, title, and formatting!',
          evaluationCriteria: 'being specific with details (chart type, labels, colors, title, axis labels)',
          hints: [
            'What type of chart? (bar, line, pie, area?)',
            'What colors should be used?',
            'What should the title say?',
            'Should there be axis labels? What should they say?',
            'Any specific formatting? (show values, grid lines, legend?)'
          ],
          salesData: [
            { quarter: 'Q1 2024', sales: 45000 },
            { quarter: 'Q2 2024', sales: 62000 },
            { quarter: 'Q3 2024', sales: 58000 },
            { quarter: 'Q4 2024', sales: 71000 }
          ]
        }
      ]
    },
    {
      id: 'unit-2',
      name: 'Business Applications',
      order: 2,
      lessons: [
        {
          id: 'lesson3',
          title: 'Iterate & Correct',
          type: 'lesson' as const,
          xpReward: 15,
          keyPrincipleLabel: 'Key Principle: Fix Misunderstandings Immediately',
          keyPrincipleText: 'AI will sometimes misunderstand. That\'s okay! Correct it right away and give context for future interactions.',
          conversationLabel: 'Example conversation:',
          conversationExample: {
            userLabel: 'You:',
            userMessage: '"Write a follow-up email for the client meeting"',
            aiLabel: 'AI:',
            aiMessage: '*Writes a formal thank-you note*',
            correctionLabel: 'You (Correcting):',
            correctionMessage: '"Not a thank-you note. This should follow up on the action items we discussed: the budget approval and timeline changes. Make it action-oriented with clear next steps for them."'
          },
          correctionTipsLabel: 'Correction tips:',
          correctionTips: [
            'Point out specifically what was wrong',
            'Explain what you actually wanted',
            'Add context the AI was missing',
            'Be direct - AI doesn\'t have feelings to hurt'
          ]
        },
        {
          id: 'exercise3',
          title: 'Correct & Iterate',
          type: 'exercise' as const,
          xpReward: 25,
          scenario: 'You asked AI to write a LinkedIn post announcing your company\'s new product, but it came back too salesy and full of buzzwords like "revolutionary" and "game-changing."',
          task: 'Write a correction prompt that fixes the tone and sets expectations for future posts.',
          evaluationCriteria: 'correcting mistakes clearly and setting future expectations',
          hints: [
            'Specifically name what went wrong',
            'Describe the tone you actually want',
            'Give an example of better phrasing',
            'Set a guideline for future content'
          ],
          sampleAIResponse: {
            label: 'AI Generated This Response (Needs Correction)',
            content: `🚀 EXCITING NEWS! 🚀

We are THRILLED to announce our revolutionary, game-changing product that will TRANSFORM the way you work forever!

Introducing TaskFlow Pro - the most innovative, cutting-edge, best-in-class project management solution that will 10X your productivity and supercharge your team's performance!

Our groundbreaking AI-powered platform is disrupting the industry with:
✨ Revolutionary automation features
✨ Game-changing collaboration tools
✨ Industry-leading integrations

Don't miss out on this incredible opportunity to revolutionize your workflow! The future of work is HERE! 🔥

#Innovation #GameChanger #Revolutionary #Disruption #FutureOfWork #Productivity #AI`,
            issues: [
              'Overuse of buzzwords: "revolutionary", "game-changing", "cutting-edge"',
              'Too many exclamation marks and emojis',
              'Vague claims without substance ("10X your productivity")',
              'Sounds like spam rather than authentic company voice',
              'No specific information about what the product actually does'
            ]
          },
          sampleDocument: {
            title: 'Product Context',
            content: `Product: TaskFlow Pro
What it is: Project management tool with AI-powered task prioritization
Target audience: Small-to-medium business teams (5-50 people)
Key feature: Automatically suggests which tasks to focus on based on deadlines, dependencies, and team availability
Company voice: Helpful, straightforward, slightly casual but professional
Avoid: Hype, buzzwords, making claims we can't back up`,
            type: 'data'
          }
        },
        {
          id: 'lesson4',
          title: 'Provide Examples',
          type: 'lesson' as const,
          xpReward: 15,
          keyPrincipleLabel: 'Key Principle: Show, Don\'t Just Tell',
          keyPrincipleText: 'Instead of only describing what you want, provide examples. AI learns patterns from your examples and matches that style.',
          waysToProvideLabel: 'Ways to provide examples:',
          exampleWays: [
            { type: 'Text samples:', example: '"Write like this: [paste example]"' },
            { type: 'Templates:', example: '"Follow this structure: [template]"' },
            { type: 'Before/After:', example: '"Transform this [input] to this [output]"' },
            { type: 'Reference:', example: '"Match the style of our company newsletter"' }
          ],
          whyExamplesWorkLabel: 'Why examples work:',
          benefits: [
            'AI sees exactly what you want',
            'Matches tone and style automatically',
            'Reduces back-and-forth clarifications',
            'Works better than lengthy descriptions'
          ]
        },
        {
          id: 'exercise4',
          title: 'Use Examples Effectively',
          type: 'exercise' as const,
          xpReward: 25,
          scenario: 'You need to write customer support responses that match your company\'s friendly but professional tone.',
          task: 'Write a prompt that includes an example response and asks AI to match that style for a new customer inquiry.',
          evaluationCriteria: 'including a clear example and asking AI to match the style',
          hints: [
            'Include a sample response you like',
            'Point out what makes it good',
            'Describe the new scenario clearly',
            'Ask AI to maintain the same qualities'
          ],
          sampleDocument: {
            title: 'Support Response Examples & New Inquiry',
            content: `EXAMPLE OF GOOD SUPPORT RESPONSE (our style):
---
Hi Marcus!

Thanks for reaching out. I totally get how frustrating it must be when the sync isn't working right before your big presentation!

Good news: this is usually a quick fix. Here's what to try:
1. Log out and back in (this refreshes your connection)
2. Check if you're on the latest app version (Settings > About)
3. Try syncing just one file first to test

If none of that works, I'm here to dig deeper. Just let me know and I can take a look at your account directly.

You've got this! 🙌
- Jamie, Customer Success

---
NEW CUSTOMER INQUIRY TO RESPOND TO:

From: Lisa Thompson
Subject: Can't access my account after password reset

"I reset my password yesterday but now it says my account is locked. I have a team meeting in 2 hours where I need to present our project data. This is really urgent. Please help!"`,
            type: 'template'
          }
        },
        {
          id: 'exercise5',
          title: 'Unit 2 Challenge',
          type: 'exercise' as const,
          xpReward: 30,
          scenario: 'You\'re preparing for a difficult conversation with a team member about their performance. You need talking points that are direct but supportive.',
          task: 'Combine everything you\'ve learned: break it down, be specific, and provide an example of the tone you want.',
          evaluationCriteria: 'combining multiple principles: clear structure, specificity, and examples',
          hints: [
            'Structure the conversation in sections',
            'Specify the tone: direct but supportive',
            'Include an example of phrasing you like',
            'Add context about your relationship and goals'
          ],
          sampleDocument: {
            title: 'Performance Conversation Context',
            content: `TEAM MEMBER: Alex Rivera (Software Developer, 2 years on team)
YOUR ROLE: Engineering Manager

RELATIONSHIP: Generally positive. Alex was a strong performer their first year but has struggled recently.

SPECIFIC ISSUES TO ADDRESS:
1. Missed 3 sprint deadlines in the past 2 months
2. Code reviews taking 5+ days instead of target 2 days
3. Stopped participating in team standups (camera off, no updates)

CONTEXT YOU KNOW:
- Alex mentioned stress about buying a house recently
- Their mentor left the company 3 months ago
- They used to be very engaged and helpful to junior devs

YOUR GOALS FOR THIS CONVERSATION:
- Understand what's going on (don't assume)
- Be clear about the impact of the issues
- Create a concrete improvement plan together
- Preserve the relationship and their confidence

TONE EXAMPLE YOU LIKE:
"I've noticed some changes and I wanted to check in. I care about your success here, and I want to understand what's happening so we can figure this out together."`,
            type: 'data'
          }
        }
      ]
    },
    {
      id: 'unit-3',
      name: 'Advanced Techniques',
      order: 3,
      lessons: [
        {
          id: 'lesson5',
          title: 'Role Prompting',
          type: 'lesson' as const,
          xpReward: 15,
          keyPrincipleLabel: 'Key Principle: Assign a Persona',
          keyPrincipleText: 'Give AI a specific role or expertise to draw from. This shapes how it approaches your request and what knowledge it applies.',
          exampleLabel: 'Example roles for business:',
          exampleSteps: [
            '"Act as a senior marketing strategist with 15 years of B2B experience"',
            '"You are an executive assistant helping prepare for board meetings"',
            '"As a financial analyst, review this budget proposal"',
            '"Be a customer success manager responding to concerns"'
          ],
          whyWorksLabel: 'Why role prompting works:',
          benefits: [
            'Focuses AI on relevant knowledge',
            'Shapes the vocabulary and tone used',
            'Provides implicit context about expectations',
            'Gets more expert-level responses'
          ]
        },
        {
          id: 'lesson6',
          title: 'Chain-of-Thought Prompting',
          type: 'lesson' as const,
          xpReward: 15,
          keyPrincipleLabel: 'Key Principle: Ask for Reasoning',
          keyPrincipleText: 'For complex problems, ask AI to explain its thinking step by step. This produces more accurate and thoughtful responses.',
          exampleLabel: 'How to request chain-of-thought:',
          exampleSteps: [
            '"Think through this step by step"',
            '"Explain your reasoning as you go"',
            '"Walk me through your analysis"',
            '"Consider each factor and explain why it matters"'
          ],
          whyWorksLabel: 'When to use this:',
          benefits: [
            'Complex decision-making scenarios',
            'When you need to verify the logic',
            'Strategic planning and analysis',
            'Problem-solving with multiple factors'
          ]
        },
        {
          id: 'exercise6',
          title: 'Advanced Prompting',
          type: 'exercise' as const,
          xpReward: 30,
          scenario: 'You need to analyze whether your company should enter a new market. This requires weighing multiple factors.',
          task: 'Write a prompt that assigns an appropriate role and asks for step-by-step reasoning about the decision.',
          evaluationCriteria: 'using role prompting AND chain-of-thought together',
          hints: [
            'Assign a relevant expert role',
            'Ask for step-by-step analysis',
            'Specify the factors to consider',
            'Request a final recommendation with reasoning'
          ],
          sampleDocument: {
            title: 'Market Expansion Data',
            content: `COMPANY: CloudSync (B2B SaaS - file collaboration)
CURRENT MARKET: United States only
CONSIDERING: Expansion to European Union

COMPANY STATS:
- Annual revenue: $12M ARR
- Team size: 45 employees (all US-based)
- Current customers: 800 companies (mostly 50-500 employees)
- Growth rate: 35% YoY

EU OPPORTUNITY DATA:
- TAM estimate: €2.1B for file collaboration tools
- 3 main competitors already operating there
- GDPR compliance required (we're not currently compliant)
- Need EU-based data centers (~$400K setup + $50K/month)
- Language support needed: English, German, French minimum

INTERNAL CONSTRAINTS:
- Current engineering team at capacity
- $2M available for expansion investment
- CEO wants decision by end of quarter

QUESTIONS TO CONSIDER:
- Is the timing right given our current growth?
- What's the realistic timeline to compliance + launch?
- Should we hire locally or expand US team?
- What's the minimum viable investment to test the market?`,
            type: 'data'
          }
        },
        {
          id: 'lesson7',
          title: 'Output Formatting',
          type: 'lesson' as const,
          xpReward: 15,
          keyPrincipleLabel: 'Key Principle: Specify the Format',
          keyPrincipleText: 'Tell AI exactly how you want the response structured. This saves editing time and makes outputs immediately usable.',
          exampleLabel: 'Format specifications:',
          exampleSteps: [
            '"Format as a bulleted list with headers"',
            '"Create a table with columns: Task, Owner, Due Date"',
            '"Write in the format: Problem → Analysis → Recommendation"',
            '"Use markdown with H2 headers for each section"'
          ],
          whyWorksLabel: 'Formatting tips:',
          benefits: [
            'Match your existing document styles',
            'Request specific section lengths',
            'Ask for summaries at the start or end',
            'Specify what to include AND exclude'
          ]
        },
        {
          id: 'exercise7',
          title: 'Final Business Challenge',
          type: 'exercise' as const,
          xpReward: 50,
          scenario: 'Your CEO needs a comprehensive briefing document for a partnership discussion. It needs to cover: company background, strategic fit, potential risks, and recommended next steps.',
          task: 'Create the ultimate business prompt: assign a role, break it into sections, specify format, and set the tone for an executive audience.',
          evaluationCriteria: 'combining all techniques: role, structure, specificity, format, and appropriate tone',
          hints: [
            'Start with an expert role assignment',
            'Define each section clearly',
            'Specify the format (headers, bullets, etc.)',
            'Set the executive-level tone',
            'Include length or depth requirements'
          ],
          sampleDocument: {
            title: 'Partnership Briefing Data',
            content: `YOUR COMPANY: Meridian Analytics (data visualization platform)
- Founded 2019, Series B ($45M raised)
- 12,000 customers, $18M ARR
- Strength: Real-time dashboards for operations teams
- Weakness: Limited AI/ML capabilities

POTENTIAL PARTNER: NeuralPath AI (machine learning platform)
- Founded 2020, Series A ($15M raised)
- 200 enterprise customers, $8M ARR
- Strength: Predictive analytics, anomaly detection
- Weakness: No visualization layer, complex for non-technical users

MEETING CONTEXT:
- CEO-to-CEO meeting scheduled for next Tuesday (1 hour)
- NeuralPath reached out - they're interested in integration or deeper partnership
- Our board has expressed interest in adding AI capabilities
- Competitors (Tableau, Looker) have recently added AI features

WHAT CEO NEEDS:
- 2-page briefing document (executive summary style)
- Background on NeuralPath
- Why this partnership makes sense (or doesn't)
- Key risks to consider
- Recommended talking points for the meeting
- Specific questions to ask their CEO

PREVIOUS PARTNERSHIPS:
- We integrated with Snowflake in 2022 (successful, +30% enterprise deals)
- Tried partnership with DataRobot in 2021 (failed due to unclear ownership)

CEO PREFERENCES:
- Bullet points over paragraphs
- Numbers and data to support claims
- Clear recommendation, not just options
- Honest about risks, not just optimistic`,
            type: 'data'
          }
        }
      ]
    }
  ]
}
