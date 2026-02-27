// Creative Course Content - For Writers, Artists, and Content Creators
// Focus: Maintaining unique voice, creative constraints, brainstorming, collaborative drafting

import type { Course, LessonContent, CourseUnit } from './business'

export const creativeCourse: Course = {
  id: 'creative',
  name: 'Creative Prompts',
  slug: 'creative',
  color: '#FF9500',
  units: [
    {
      id: 'unit-1',
      name: 'Finding Your Voice',
      order: 1,
      lessons: [
        {
          id: 'intro',
          title: 'Why AI Sounds Generic',
          type: 'lesson' as const,
          xpReward: 10,
          keyPrincipleLabel: 'The Problem: AI Defaults to Average',
          keyPrincipleText: 'AI is trained on millions of examples, so it naturally gravitates toward common patterns. Without guidance, it produces "average" writing that sounds like everyone and no one.',
          vaguePromptLabel: 'What happens with vague prompts:',
          vaguePromptExample: '"Write a blog post about coffee"',
          whatAiMightDoLabel: 'The result:',
          aiProblems: [
            'Generic opening like "Coffee is one of the world\'s most popular beverages..."',
            'Safe, predictable structure that reads like every other coffee article',
            'No personality, no unique perspective, no memorable voice',
            'Could have been written by anyone (or no one)'
          ],
          solutionLabel: 'Your Voice Is Your Superpower',
          solutionText: 'The good news? AI can match YOUR specific voice once you teach it. The key is showing, not just telling. Your unique word choices, sentence rhythms, and personality can all be captured and replicated.'
        },
        {
          id: 'lesson1',
          title: 'Voice & Tone Prompting',
          type: 'lesson' as const,
          xpReward: 15,
          keyPrincipleLabel: 'Key Principle: Define Your Voice in Concrete Terms',
          keyPrincipleText: 'Vague descriptors like "casual" or "professional" mean different things to different people. Break your voice down into specific, observable characteristics.',
          exampleLabel: 'Voice characteristics to specify:',
          exampleSteps: [
            'Sentence length: "Short, punchy sentences. Rarely more than 15 words."',
            'Word choice: "Simple words, no jargon. Write like you\'re texting a friend."',
            'Personality: "Dry humor, occasional sarcasm, never mean-spirited."',
            'Structure: "One idea per paragraph. Use questions to create rhythm."',
            'Quirks: "Start sentences with \'And\' or \'But\' sometimes. Use em-dashes—like this."'
          ],
          whyWorksLabel: 'Why this works:',
          benefits: [
            'AI can measure and match specific traits',
            'Removes ambiguity about what you want',
            'Creates consistency across multiple pieces',
            'Your voice becomes reproducible, not accidental'
          ]
        },
        {
          id: 'exercise1',
          title: 'Capture Your Voice',
          type: 'exercise' as const,
          xpReward: 25,
          scenario: 'You want AI to write in your unique style, but first it needs to understand what that style actually is.',
          task: 'Write a prompt that provides a sample of your writing and asks AI to analyze your voice characteristics, then write a new piece matching that style.',
          evaluationCriteria: 'providing a writing sample AND asking AI to analyze and match specific voice characteristics',
          hints: [
            'Include an actual sample of your writing (even 2-3 sentences helps)',
            'Ask AI to identify specific patterns: sentence length, word choice, tone',
            'Give it a new topic to write about in YOUR voice',
            'Ask it to explain what elements it matched'
          ],
          sampleDocument: {
            title: 'Your Writing Sample',
            content: `Here's a sample of your blog writing style:

"Look, I'm not going to pretend meditation changed my life. It didn't. But it did stop me from throwing my laptop out the window last Tuesday, and honestly? That's worth the ten minutes.

Here's the thing about mindfulness that nobody tells you: it's boring. Spectacularly, mind-numbingly boring. And that's kind of the point. We're so addicted to stimulation that sitting still feels like punishment.

I've been doing this for three months now. Not every day—let's be real—but enough. And the biggest change? I notice when I'm spiraling. That's it. That's the whole magic trick."

NEW TOPIC TO WRITE ABOUT: Working from home with a dog`,
            type: 'template'
          }
        },
        {
          id: 'lesson2',
          title: 'Creative Constraints',
          type: 'lesson' as const,
          xpReward: 15,
          keyPrincipleLabel: 'Key Principle: Limitations Breed Creativity',
          keyPrincipleText: 'Paradoxically, giving AI MORE rules often produces MORE creative output. Without constraints, AI takes the safe, predictable path. Constraints force unexpected solutions.',
          exampleLabel: 'Types of creative constraints:',
          exampleSteps: [
            'Word limits: "Exactly 50 words" or "No more than 100 words"',
            'Forbidden words: "Never use the word \'very\' or any adverbs"',
            'Structural rules: "Every paragraph must start with a question"',
            'Perspective: "Write from the point of view of the product, not the user"',
            'Hybrid genres: "Explain coding concepts using cooking metaphors only"'
          ],
          whyWorksLabel: 'Famous examples of constraints:',
          benefits: [
            'Dr. Seuss wrote "Green Eggs and Ham" using only 50 different words',
            'Haiku\'s 5-7-5 structure forces precision and imagery',
            'Twitter\'s character limit created a new form of expression',
            'Sonnets\' rigid form produced Shakespeare\'s greatest work'
          ]
        },
        {
          id: 'exercise2',
          title: 'Constrained Writing',
          type: 'exercise' as const,
          xpReward: 25,
          scenario: 'You want to write a short poem about morning coffee, but you want to push past the obvious cliches.',
          task: 'Write a prompt with at least 3 creative constraints that will force AI to produce something unexpected and original.',
          evaluationCriteria: 'including at least 3 specific creative constraints that push beyond obvious solutions',
          hints: [
            'Try forbidding obvious words (coffee, morning, caffeine, cup)',
            'Set a specific line count or word limit',
            'Add a structural constraint (rhyme scheme, repeated phrase)',
            'Consider an unusual perspective (the coffee\'s point of view?)'
          ],
          sampleDocument: {
            title: 'Constraint Ideas',
            content: `EXAMPLE CONSTRAINTS TO CONSIDER:

Word constraints:
- Cannot use: coffee, morning, caffeine, cup, mug, drink, tired, awake, energy
- Must use these 3 words: ritual, warmth, silence

Structure constraints:
- Exactly 6 lines
- Each line must be 6-8 words
- Lines 1 and 6 must mirror each other

Perspective constraints:
- Written from the perspective of the coffee itself
- OR from the perspective of the empty cup after
- OR from the perspective of someone who just quit coffee

Style constraints:
- No adjectives allowed
- Every line must contain an action verb
- Must include one metaphor comparing coffee to something unexpected`,
            type: 'template'
          }
        }
      ]
    },
    {
      id: 'unit-2',
      name: 'Creative Applications',
      order: 2,
      lessons: [
        {
          id: 'lesson3',
          title: 'Brainstorming & Ideation',
          type: 'lesson' as const,
          xpReward: 15,
          keyPrincipleLabel: 'Key Principle: Quantity Before Quality',
          keyPrincipleText: 'In brainstorming, more ideas = better ideas. Don\'t let AI (or yourself) self-censor too early. Generate widely first, filter ruthlessly later.',
          exampleLabel: 'Brainstorming prompts that work:',
          exampleSteps: [
            '"Give me 20 ideas, including at least 5 that seem ridiculous"',
            '"What would a 5-year-old suggest? What about a CEO?"',
            '"List 10 conventional approaches, then 10 that break the rules"',
            '"Combine [X] with [unexpected Y]. What happens?"',
            '"What\'s the opposite of the obvious solution?"'
          ],
          whyWorksLabel: 'Why bad ideas matter:',
          benefits: [
            'Bad ideas often contain seeds of great ones',
            'They give you permission to think unconventionally',
            'The 20th idea is usually better than the 1st',
            'Creativity needs volume to find breakthroughs'
          ]
        },
        {
          id: 'exercise3',
          title: 'Idea Explosion',
          type: 'exercise' as const,
          xpReward: 25,
          scenario: 'You need to come up with blog post ideas for a sustainable living website, but you\'re stuck in the same tired territory (reduce, reuse, recycle).',
          task: 'Write a brainstorming prompt that generates 20 diverse ideas, including some unconventional ones. Then add a follow-up instruction to narrow down to the 3 most promising.',
          evaluationCriteria: 'asking for high volume of ideas with variety AND a filtering step',
          hints: [
            'Specify a number (20+) to push past obvious ideas',
            'Ask for different categories or angles',
            'Request some "bad" or "weird" ideas explicitly',
            'Include criteria for selecting the best ones'
          ],
          sampleDocument: {
            title: 'Blog Context',
            content: `WEBSITE: Green Apartment Living
TARGET AUDIENCE: City dwellers in apartments, ages 25-40, interested in sustainability but limited by space and renter restrictions

TOPICS ALREADY COVERED:
- Composting in small spaces
- Energy-saving tips for renters
- Sustainable cleaning products
- Indoor herb gardens
- Reducing plastic use

WHAT WE WANT TO AVOID:
- Preachy or guilt-inducing tone
- Tips that require owning a home
- Expensive solutions
- Ideas that feel overdone

WHAT WORKS WELL FOR US:
- Practical, actionable advice
- Humor and honesty about tradeoffs
- "Lazy sustainability" - easy wins
- Community and social aspects`,
            type: 'data'
          }
        },
        {
          id: 'lesson4',
          title: 'Collaborative Drafting',
          type: 'lesson' as const,
          xpReward: 15,
          keyPrincipleLabel: 'Key Principle: AI as Writing Partner, Not Replacement',
          keyPrincipleText: 'The best creative work comes from iteration. Let AI create a rough draft, then guide it through specific revisions. You\'re the director; AI is the assistant.',
          exampleLabel: 'Collaborative workflow:',
          exampleSteps: [
            '1. Brief AI on context, audience, and goals',
            '2. Get a rough first draft—don\'t expect perfection',
            '3. Identify what works and what doesn\'t',
            '4. Give specific revision instructions ("Make paragraph 2 punchier")',
            '5. Iterate until it sounds like YOU wrote it'
          ],
          whyWorksLabel: 'Revision prompts that work:',
          benefits: [
            '"The opening is too slow. Start with the surprising fact instead."',
            '"This sounds too formal. Rewrite like you\'re explaining to a friend."',
            '"Cut this by 50%. Keep only the essential points."',
            '"Add a specific example to support the claim in paragraph 3."'
          ]
        },
        {
          id: 'exercise4',
          title: 'Draft & Refine',
          type: 'exercise' as const,
          xpReward: 25,
          scenario: 'AI wrote a product description for a new smart water bottle, but it came out sounding like generic marketing copy. You need to make it sound authentic and compelling.',
          task: 'Write a revision prompt that identifies specific problems with the draft and gives clear instructions for improving it.',
          evaluationCriteria: 'identifying specific problems AND providing clear revision instructions',
          hints: [
            'Point out exactly what doesn\'t work (vague claims, generic language)',
            'Describe the voice you want instead',
            'Give examples of phrasing you\'d prefer',
            'Specify what to keep and what to change'
          ],
          sampleAIResponse: {
            label: 'AI Generated This Draft (Needs Revision)',
            content: `Introducing the HydroSmart Pro - The Future of Hydration

Stay hydrated like never before with our revolutionary smart water bottle! The HydroSmart Pro uses cutting-edge technology to transform your daily hydration routine.

Features:
- Advanced sensors track your water intake in real-time
- Smart LED reminders ensure you never forget to drink
- Premium insulation keeps drinks cold for 24 hours
- Seamless app integration for comprehensive hydration analytics
- Sleek, modern design that fits any lifestyle

The HydroSmart Pro isn't just a water bottle - it's your personal hydration coach. Whether you're at the gym, in the office, or on the go, this innovative solution has you covered.

Join thousands of satisfied customers who have already upgraded their hydration game. Order now and experience the difference!

Starting at just $49.99`,
            issues: [
              'Buzzword overload: "revolutionary", "cutting-edge", "innovative"',
              'Generic claims that any product could make',
              'No specific benefits - how does "comprehensive analytics" help me?',
              'Sounds like every other product description on the internet',
              'Missing: personality, humor, honest acknowledgment of who this is for'
            ]
          },
          sampleDocument: {
            title: 'Brand Voice Guide',
            content: `BRAND: HydroSmart
VOICE: Friendly, honest, slightly self-deprecating

WHAT WE ARE:
- A genuinely useful product for forgetful people
- Simple tech, not complicated
- Priced for normal humans, not tech bros

WHAT WE'RE NOT:
- A life-changing revolutionary breakthrough
- For hardcore athletes (they don't forget to drink)
- Trying to gamify your entire life

TARGET CUSTOMER:
- Office workers who get to 3pm and realize they've had only coffee
- People who buy water bottles with good intentions
- Skeptics of over-designed "smart" products

TONE WE WANT:
"Look, you're not going to remember to drink water. Neither do we. So we made a bottle that just... reminds you. That's it. No life coaching, no hydration journey, just a gentle nudge when you haven't taken a sip in a while."`,
            type: 'data'
          }
        }
      ]
    },
    {
      id: 'unit-3',
      name: 'Advanced Creative Techniques',
      order: 3,
      lessons: [
        {
          id: 'lesson5',
          title: 'Character & Dialogue',
          type: 'lesson' as const,
          xpReward: 15,
          keyPrincipleLabel: 'Key Principle: Characters Need Contradictions',
          keyPrincipleText: 'Flat characters are consistent. Interesting characters have tensions, quirks, and contradictions. Give AI specific personality traits that create internal conflict.',
          exampleLabel: 'Character dimensions to define:',
          exampleSteps: [
            'Core trait vs. hidden trait: "Confident in public, anxious in private"',
            'Speech patterns: "Uses metaphors constantly, never swears, trails off..."',
            'Knowledge gaps: "Expert chef who can\'t boil water at home"',
            'Verbal tics: "Says \'honestly\' before lying, clears throat when nervous"',
            'What they want vs. what they need: "Chases fame, needs connection"'
          ],
          whyWorksLabel: 'Dialogue reveals character:',
          benefits: [
            'What they say vs. what they mean',
            'How they talk differently to different people',
            'What topics make them change their speech pattern',
            'What they avoid saying entirely'
          ]
        },
        {
          id: 'lesson6',
          title: 'Visual Prompting Principles',
          type: 'lesson' as const,
          xpReward: 15,
          keyPrincipleLabel: 'Key Principle: The Same Rules Apply to Images',
          keyPrincipleText: 'Whether you\'re prompting for text or images, specificity wins. Vague image prompts get generic stock-photo results. Detailed prompts get art.',
          exampleLabel: 'Visual prompt elements:',
          exampleSteps: [
            'Subject: What\'s in the image, specifically described',
            'Style: Art movement, artist reference, medium (oil painting, photograph)',
            'Mood/Lighting: Time of day, emotional quality, color palette',
            'Composition: Camera angle, framing, focus point',
            'Details: Textures, small elements that add realism or interest'
          ],
          whyWorksLabel: 'Vague vs. Specific:',
          benefits: [
            'Vague: "A cat" → Stock photo cat',
            'Specific: "A scruffy orange tabby cat sleeping in a sunbeam on a worn leather armchair, afternoon light, dust motes visible, warm golden tones"',
            'The details create atmosphere, not just subject matter',
            'Reference artists or styles for consistent aesthetic'
          ]
        },
        {
          id: 'exercise5',
          title: 'Generate an Image',
          type: 'exercise' as const,
          xpReward: 30,
          isImageGeneration: true,
          imageAspectRatio: '16:9',
          scenario: 'You need a hero image for a blog post about finding calm in a busy city. Stock photos won\'t cut it - you want something with a specific mood and artistic vision. You\'ll use AI image generation to create exactly what you envision.',
          task: 'Write a detailed image generation prompt that specifies subject, style, mood, lighting, composition, and any important details. The more specific you are, the closer the result will match your vision.',
          evaluationCriteria: 'including specific details for subject, style, mood/lighting, composition, AND artistic direction',
          hints: [
            'Describe the subject in detail - what exactly is in the scene?',
            'Specify an art style or medium (photograph, oil painting, illustration, etc.)',
            'Include mood and lighting (golden hour, moody, bright and airy)',
            'Mention composition (close-up, wide shot, centered, rule of thirds)',
            'Add artistic references if helpful (in the style of...)'
          ],
          sampleDocument: {
            title: 'Image Prompt Guide',
            content: `BUILDING AN EFFECTIVE IMAGE PROMPT

1. SUBJECT (What's in the image)
Bad: "a person in a city"
Good: "a woman in her 30s sitting alone on a park bench, reading a book, surrounded by cherry blossom trees"

2. STYLE (How it should look)
Options: photograph, digital art, oil painting, watercolor, pencil sketch, anime style, minimalist illustration, vintage poster
Example: "soft watercolor illustration" or "cinematic photograph"

3. MOOD & LIGHTING
Options: golden hour, blue hour, overcast, harsh midday sun, candlelit, neon, dreamy, moody, bright and airy
Example: "warm golden hour light, peaceful and contemplative mood"

4. COMPOSITION
Options: close-up portrait, wide establishing shot, overhead view, low angle, centered subject, rule of thirds, negative space
Example: "medium shot with the subject off-center, lots of bokeh in the background"

5. DETAILS & ATMOSPHERE
- Colors: "muted earth tones" or "vibrant saturated colors"
- Texture: "soft focus" or "sharp and detailed"
- Extras: "falling leaves" or "rain on window"

EXAMPLE COMPLETE PROMPT:
"A watercolor illustration of a small cafe on a quiet Paris street corner, early morning light, soft pastels with touches of warm yellow from the cafe windows, a single bicycle leaning against the wall, cobblestones glistening from recent rain, peaceful and nostalgic mood, slightly impressionistic style"

YOUR BLOG POST CONTEXT:
Topic: "Finding Calm in a Busy City"
Tone: Peaceful, aspirational, relatable
Audience: Urban professionals seeking balance
The image should capture that feeling of finding a quiet moment amid urban chaos.`,
            type: 'template'
          }
        },
        {
          id: 'exercise5b',
          title: 'Edit an Image',
          type: 'exercise' as const,
          xpReward: 30,
          isImageEditing: true,
          imageAspectRatio: '16:9',
          sampleImageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800',
          sampleImageDescription: 'A busy city street during daytime with people walking, cars, and buildings',
          scenario: 'You have a stock photo of a busy city street, but it doesn\'t quite match your vision. You need to transform it to create a more peaceful, contemplative mood for your "Finding Calm" blog post.',
          task: 'Write an image editing prompt that transforms the provided city scene. Be specific about what changes you want: lighting, mood, elements to add/remove, color adjustments, style changes.',
          evaluationCriteria: 'providing specific editing instructions that address mood, lighting, and visual elements to change',
          hints: [
            'Describe the mood transformation (busy → calm)',
            'Specify lighting changes (harsh daylight → golden hour, rain, etc.)',
            'Mention elements to add or remove (people, vehicles, nature)',
            'Include color palette adjustments (cooler, warmer, muted)',
            'Consider style changes (photorealistic, painterly, dreamy)'
          ],
          sampleDocument: {
            title: 'Image Editing Guide',
            content: `HOW TO WRITE EFFECTIVE IMAGE EDITING PROMPTS

Unlike image generation where you describe everything from scratch, editing prompts should:
1. Reference what's already in the image
2. Specify what to CHANGE, ADD, or REMOVE
3. Describe the desired mood/atmosphere shift

EXAMPLE EDITING PROMPTS:

Basic: "Remove the cars and add trees"

Better: "Transform this busy street into a quiet morning scene: remove most pedestrians, replace cars with bicycle, add warm golden sunrise lighting, make the atmosphere peaceful and contemplative"

Advanced: "Edit this city scene to feel like a peaceful Sunday morning:
- Remove most people, leave 1-2 walking slowly
- Remove vehicles except one vintage bicycle
- Change harsh daylight to soft golden hour
- Add gentle fog in the distance
- Make colors warmer and slightly desaturated
- Add a few birds in the sky
- Keep the architecture but make it feel European"

CURRENT IMAGE:
A busy city street during daytime with people walking, cars, and buildings

YOUR GOAL:
Transform this into something that captures "finding calm in a busy city" - the contrast between urban environment and peaceful moment.`,
            type: 'template'
          }
        },
        {
          id: 'exercise6',
          title: 'Create a Character Voice',
          type: 'exercise' as const,
          xpReward: 30,
          scenario: 'You\'re writing a short story and need AI to write dialogue for a specific character. The dialogue needs to feel distinct and consistent.',
          task: 'Write a character description that defines their voice so specifically that AI can write dialogue that\'s unmistakably them. Then give a scenario to test it.',
          evaluationCriteria: 'creating a detailed character voice profile with contradictions/quirks AND a test scenario',
          hints: [
            'Include contradictions or tensions in their personality',
            'Define specific speech patterns, not just general traits',
            'Give examples of phrases they would/wouldn\'t say',
            'Create a scenario that challenges their voice to come through'
          ],
          sampleDocument: {
            title: 'Character Template',
            content: `CHARACTER VOICE ELEMENTS TO DEFINE:

BACKGROUND:
- Name, age, profession
- Where they grew up (affects speech patterns)
- Education level (affects vocabulary)

PERSONALITY CONTRADICTIONS:
- Public persona vs. private self
- What they claim to believe vs. how they act
- Their greatest strength that's also their weakness

SPEECH PATTERNS:
- Sentence length tendency (short/long/varied)
- Vocabulary level (simple/sophisticated/industry jargon)
- Filler words or verbal tics ("you know", "honestly", throat clearing)
- How they express strong emotions (deflection, sarcasm, directness)
- What topics change their speech pattern

DIALOGUE DOS AND DON'TS:
- Phrases they WOULD say: [list 3-5]
- Phrases they NEVER say: [list 3-5]
- How they greet people
- How they handle confrontation

TEST SCENARIO IDEAS:
- Getting unexpected bad news
- Explaining something to someone they find annoying
- Trying to comfort a friend without being too soft
- Being caught in a small lie`,
            type: 'template'
          }
        },
        {
          id: 'exercise7',
          title: 'Final Creative Challenge',
          type: 'exercise' as const,
          xpReward: 50,
          scenario: 'You\'re developing content for a new newsletter about urban gardening. You need to establish a distinctive voice, generate ideas, and create a sample piece.',
          task: 'Create a multi-part prompt that: (1) defines a unique voice for the newsletter, (2) brainstorms 10 topic ideas, and (3) drafts the opening of the first issue using all the techniques you\'ve learned.',
          evaluationCriteria: 'combining voice definition, brainstorming with constraints, and specific creative direction into a cohesive multi-part prompt',
          hints: [
            'Start by defining the newsletter\'s voice characteristics',
            'Set creative constraints for the brainstorming (audience, tone, what to avoid)',
            'Request specific structure for the draft (hook, length, style elements)',
            'Include examples of the tone you want'
          ],
          sampleDocument: {
            title: 'Newsletter Project Brief',
            content: `PROJECT: "Concrete Jungle" Newsletter
TOPIC: Urban gardening for people who kill plants

TARGET AUDIENCE:
- City dwellers, ages 28-45
- Live in apartments with limited outdoor space
- Interested in plants but intimidated by gardening
- Busy, not willing to spend hours on maintenance
- Appreciate humor about their plant-killing history

NEWSLETTER GOALS:
- Make gardening feel accessible, not precious
- Celebrate small wins (keeping a basil alive = victory)
- Practical tips that actually work in city conditions
- Build community around imperfect plant parenthood

COMPETITOR NEWSLETTERS:
- Too aspirational (beautiful gardens we'll never have)
- Too technical (soil pH readings, seriously?)
- Too preachy about sustainability
- No personality

WHAT WE WANT TO BE:
- The friend who keeps plants alive and tells you how
- Honest about failures (we kill plants too)
- Focused on "good enough" gardening
- Entertaining even if you never plant anything

CONTENT TYPES WE'D LIKE:
- Plant recommendations for different apartment conditions
- "Kill-proof" challenges (can you kill a pothos? let's find out)
- Apartment garden tours (the real, messy ones)
- Seasonal to-do lists that take 10 minutes`,
            type: 'data'
          }
        }
      ]
    }
  ]
}
