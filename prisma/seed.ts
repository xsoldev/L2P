import { config } from 'dotenv'
import { PrismaClient } from '@prisma/client'

// Load .env.local
config({ path: '.env.local' })

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
})

// Helper function to retry operations
async function withRetry<T>(fn: () => Promise<T>, retries = 3, delay = 2000): Promise<T> {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn()
    } catch (error) {
      if (i === retries - 1) throw error
      console.log(`   Retry ${i + 1}/${retries} after error...`)
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }
  throw new Error('Max retries reached')
}

// ==================== Achievement Data ====================

const achievements = [
  // Streak achievements
  { slug: 'week-warrior', name: 'Week Warrior', description: 'Maintain a 7-day streak', icon: '🔥', category: 'streak', requirement: { type: 'streak', value: 7 }, xpReward: 50 },
  { slug: 'monthly-master', name: 'Monthly Master', description: 'Maintain a 30-day streak', icon: '🏆', category: 'streak', requirement: { type: 'streak', value: 30 }, xpReward: 200 },
  { slug: 'century-streak', name: 'Century Streak', description: 'Maintain a 100-day streak', icon: '💯', category: 'streak', requirement: { type: 'streak', value: 100 }, xpReward: 500 },
  { slug: 'year-legend', name: 'Year Legend', description: 'Maintain a 365-day streak', icon: '👑', category: 'streak', requirement: { type: 'streak', value: 365 }, xpReward: 1000 },

  // Course completion achievements
  { slug: 'business-pro', name: 'Business Pro', description: 'Complete the Business course', icon: '💼', category: 'course', requirement: { type: 'course_complete', course: 'business' }, xpReward: 100 },
  { slug: 'creative-genius', name: 'Creative Genius', description: 'Complete the Creative course', icon: '🎨', category: 'course', requirement: { type: 'course_complete', course: 'creative' }, xpReward: 100 },
  { slug: 'kid-coder', name: 'Kid Coder', description: 'Complete the Kids course', icon: '🚀', category: 'course', requirement: { type: 'course_complete', course: 'kids' }, xpReward: 100 },
  { slug: 'wise-learner', name: 'Wise Learner', description: 'Complete the Elderly course', icon: '📚', category: 'course', requirement: { type: 'course_complete', course: 'elderly' }, xpReward: 100 },
  { slug: 'completionist', name: 'Completionist', description: 'Complete all courses', icon: '🌟', category: 'course', requirement: { type: 'all_courses_complete' }, xpReward: 500 },

  // XP achievements
  { slug: 'century-club', name: 'Century Club', description: 'Earn 100 XP in a single day', icon: '⚡', category: 'xp', requirement: { type: 'daily_xp', value: 100 }, xpReward: 25 },
  { slug: 'xp-machine', name: 'XP Machine', description: 'Earn 500 XP in a single day', icon: '🔋', category: 'xp', requirement: { type: 'daily_xp', value: 500 }, xpReward: 100 },
  { slug: 'thousand-xp', name: 'Thousand Strong', description: 'Reach 1,000 total XP', icon: '💪', category: 'xp', requirement: { type: 'total_xp', value: 1000 }, xpReward: 50 },
  { slug: 'five-thousand-xp', name: 'XP Champion', description: 'Reach 5,000 total XP', icon: '🏅', category: 'xp', requirement: { type: 'total_xp', value: 5000 }, xpReward: 150 },

  // Special achievements
  { slug: 'perfect-lesson', name: 'Perfect Lesson', description: 'Complete a lesson with no mistakes', icon: '✨', category: 'special', requirement: { type: 'perfect_lesson' }, xpReward: 15 },
  { slug: 'speed-demon', name: 'Speed Demon', description: 'Complete a lesson in under 2 minutes', icon: '⚡', category: 'special', requirement: { type: 'fast_completion', seconds: 120 }, xpReward: 20 },
  { slug: 'first-lesson', name: 'First Steps', description: 'Complete your first lesson', icon: '🎉', category: 'special', requirement: { type: 'lessons_completed', value: 1 }, xpReward: 10 },
  { slug: 'ten-lessons', name: 'Getting Started', description: 'Complete 10 lessons', icon: '📈', category: 'special', requirement: { type: 'lessons_completed', value: 10 }, xpReward: 30 },
  { slug: 'fifty-lessons', name: 'Halfway Hero', description: 'Complete 50 lessons', icon: '🌟', category: 'special', requirement: { type: 'lessons_completed', value: 50 }, xpReward: 100 },
]

// ==================== Course Data ====================

const courses = [
  {
    slug: 'business',
    name: 'Business Prompting',
    description: 'Master prompt engineering for professional productivity. Learn to write emails, create reports, analyze data, and automate workflows.',
    icon: '💼',
    color: '#007AFF', // Apple Blue
    difficulty: 'intermediate',
    targetAge: null,
    sortOrder: 1,
    units: [
      {
        name: 'Prompt Fundamentals',
        description: 'Build a solid foundation in prompt engineering',
        order: 1,
        icon: '🎯',
        lessons: [
          {
            name: 'What is Prompt Engineering?',
            type: 'lesson',
            order: 1,
            xpReward: 15,
            content: {
              title: 'What is Prompt Engineering?',
              sections: [
                {
                  type: 'text',
                  content: 'Prompt engineering is the art and science of communicating effectively with AI systems. Just like learning a new language, it involves understanding how to structure your requests to get the best possible responses.'
                },
                {
                  type: 'key-points',
                  title: 'Key Concepts',
                  points: [
                    'Prompts are instructions you give to AI',
                    'Better prompts lead to better outputs',
                    'Context and specificity matter greatly',
                    'Iteration helps refine results'
                  ]
                },
                {
                  type: 'example',
                  title: 'Poor vs Good Prompt',
                  bad: 'Write about marketing',
                  good: 'Write a 200-word introduction explaining the benefits of content marketing for small businesses, using a professional but approachable tone.'
                }
              ]
            }
          },
          {
            name: 'The Role-Task-Tone Framework',
            type: 'lesson',
            order: 2,
            xpReward: 15,
            content: {
              title: 'The Role-Task-Tone Framework',
              sections: [
                {
                  type: 'text',
                  content: 'The RTT Framework is a simple but powerful structure for creating effective prompts. It consists of three components that help AI understand exactly what you need.'
                },
                {
                  type: 'framework',
                  title: 'RTT Framework',
                  items: [
                    { letter: 'R', name: 'Role', description: 'Who should the AI act as? (e.g., marketing expert, technical writer)' },
                    { letter: 'T', name: 'Task', description: 'What specific action should be taken? Be clear and detailed.' },
                    { letter: 'T', name: 'Tone', description: 'What style or voice should be used? (e.g., professional, casual, persuasive)' }
                  ]
                },
                {
                  type: 'example',
                  title: 'RTT in Action',
                  bad: 'Help me write an email',
                  good: 'As a customer service manager (Role), draft a response to a customer complaint about delayed shipping (Task) using an empathetic and solution-focused tone (Tone).'
                }
              ]
            }
          },
          {
            name: 'Zero-shot vs Few-shot Prompting',
            type: 'lesson',
            order: 3,
            xpReward: 15,
            content: {
              title: 'Zero-shot vs Few-shot Prompting',
              sections: [
                {
                  type: 'text',
                  content: 'These two approaches determine whether you provide examples in your prompt. Understanding when to use each is crucial for getting optimal results.'
                },
                {
                  type: 'comparison',
                  title: 'Comparison',
                  items: [
                    { name: 'Zero-shot', description: 'No examples provided. AI relies on its training to understand your request.', best_for: 'Simple, common tasks' },
                    { name: 'Few-shot', description: 'Include 2-5 examples showing the desired output format.', best_for: 'Complex formats, specific styles, or unusual tasks' }
                  ]
                },
                {
                  type: 'example',
                  title: 'Few-shot Example',
                  content: 'Convert these sentences to formal language:\n\nInput: "Hey, can we meet tomorrow?"\nOutput: "I would like to request a meeting at your earliest convenience tomorrow."\n\nInput: "That idea is pretty cool!"\nOutput: "That proposal demonstrates considerable merit."\n\nInput: "I messed up the report."\nOutput:'
                }
              ]
            }
          },
          {
            name: 'Iterative Refinement',
            type: 'lesson',
            order: 4,
            xpReward: 15,
            content: {
              title: 'Iterative Refinement',
              sections: [
                {
                  type: 'text',
                  content: 'The best prompts rarely come on the first try. Iterative refinement is the process of improving your prompts based on the outputs you receive.'
                },
                {
                  type: 'steps',
                  title: 'The Refinement Process',
                  items: [
                    'Start with a clear initial prompt',
                    'Evaluate the output against your needs',
                    'Identify what\'s missing or incorrect',
                    'Adjust your prompt with more specificity',
                    'Repeat until satisfied'
                  ]
                },
                {
                  type: 'tip',
                  content: 'Keep a "prompt journal" of what works. Over time, you\'ll build a library of effective prompts for common tasks.'
                }
              ]
            }
          },
          {
            name: 'Your First Business Prompt',
            type: 'exercise',
            order: 5,
            xpReward: 25,
            content: {
              title: 'Exercise: Your First Business Prompt',
              instruction: 'Using the RTT Framework, write a prompt to help draft a professional email requesting a project deadline extension.',
              hints: [
                'Start with a clear role (e.g., project manager)',
                'Specify the task in detail',
                'Choose an appropriate tone for professional communication'
              ],
              evaluation_criteria: {
                has_role: 'Includes a specific role or persona',
                has_task: 'Clearly describes the email purpose and context',
                has_tone: 'Specifies a professional tone',
                is_specific: 'Includes relevant details (recipient, reason, new deadline)'
              },
              example_answer: 'As a project manager, draft a polite email to our client explaining that we need a 2-week extension on the website redesign project due to unexpected technical challenges. Use a professional and apologetic tone while emphasizing our commitment to delivering quality work.'
            }
          }
        ]
      },
      {
        name: 'Business Applications',
        description: 'Apply prompt engineering to real business scenarios',
        order: 2,
        icon: '📊',
        lessons: [
          {
            name: 'Email Drafting',
            type: 'lesson',
            order: 1,
            xpReward: 15,
            content: {
              title: 'Email Drafting with AI',
              sections: [
                {
                  type: 'text',
                  content: 'Email is the backbone of business communication. Learn how to use AI to draft professional, effective emails quickly while maintaining your personal voice.'
                },
                {
                  type: 'template',
                  title: 'Email Prompt Template',
                  content: 'Write a [type] email to [recipient] about [subject].\n\nContext: [background information]\nKey points to include: [bullet points]\nTone: [formal/casual/urgent]\nLength: [brief/detailed]'
                },
                {
                  type: 'key-points',
                  title: 'Email Types to Master',
                  points: [
                    'Follow-up emails after meetings',
                    'Request emails (resources, information, meetings)',
                    'Update/status report emails',
                    'Apology or problem resolution emails',
                    'Introduction and networking emails'
                  ]
                }
              ]
            }
          },
          {
            name: 'Report Summarization',
            type: 'lesson',
            order: 2,
            xpReward: 15,
            content: {
              title: 'Report Summarization',
              sections: [
                {
                  type: 'text',
                  content: 'Transform lengthy reports into actionable summaries. AI can help you extract key insights, identify action items, and create executive summaries.'
                },
                {
                  type: 'template',
                  title: 'Summarization Prompt',
                  content: 'Summarize this [report type] for [audience].\n\nFocus on:\n- Key findings\n- Action items\n- Important metrics\n- Recommendations\n\nFormat as [bullet points/executive summary/slide notes]\nLength: [word count]'
                },
                {
                  type: 'tip',
                  content: 'Always specify the audience. A summary for executives differs greatly from one for technical teams.'
                }
              ]
            }
          },
          {
            name: 'Meeting Notes & Action Items',
            type: 'lesson',
            order: 3,
            xpReward: 15,
            content: {
              title: 'Meeting Notes & Action Items',
              sections: [
                {
                  type: 'text',
                  content: 'Transform raw meeting notes or transcripts into organized summaries with clear action items, decisions made, and follow-up tasks.'
                },
                {
                  type: 'template',
                  title: 'Meeting Notes Prompt',
                  content: 'From these meeting notes, create a structured summary including:\n\n1. Meeting Overview (date, attendees, purpose)\n2. Key Discussion Points\n3. Decisions Made\n4. Action Items (who, what, deadline)\n5. Follow-up Items\n\nNotes: [paste notes]'
                },
                {
                  type: 'key-points',
                  title: 'Pro Tips',
                  points: [
                    'Include attendee names for accurate action assignment',
                    'Specify date formats you prefer',
                    'Ask for priority levels on action items',
                    'Request follow-up email draft if needed'
                  ]
                }
              ]
            }
          },
          {
            name: 'Data Analysis Prompts',
            type: 'lesson',
            order: 4,
            xpReward: 15,
            content: {
              title: 'Data Analysis Prompts',
              sections: [
                {
                  type: 'text',
                  content: 'Use AI to help interpret data, identify trends, and generate insights. While AI won\'t replace statistical tools, it excels at pattern recognition and narrative creation.'
                },
                {
                  type: 'template',
                  title: 'Data Analysis Template',
                  content: 'Analyze this [data type] and provide:\n\n1. Key trends and patterns\n2. Anomalies or outliers\n3. Comparison to [benchmark/previous period]\n4. Actionable recommendations\n5. Questions for further investigation\n\nData: [paste or describe data]'
                },
                {
                  type: 'warning',
                  content: 'Always verify AI-generated data insights against your source data. AI can sometimes misinterpret numbers or draw incorrect correlations.'
                }
              ]
            }
          },
          {
            name: 'Business Scenario Challenge',
            type: 'exercise',
            order: 5,
            xpReward: 30,
            content: {
              title: 'Exercise: Business Scenario Challenge',
              instruction: 'Your manager asks you to prepare for an important client meeting. Write prompts to: 1) Summarize the client\'s recent complaints, 2) Draft talking points addressing their concerns, and 3) Create a follow-up email template.',
              scenario: 'Client: TechCorp Inc.\nIssue: Their software integration project is 2 weeks behind schedule.\nComplaints: Poor communication, missed deadlines, technical issues.\nMeeting purpose: Repair relationship and present recovery plan.',
              hints: [
                'Create separate prompts for each deliverable',
                'Include specific context about the client situation',
                'Consider the emotional aspect of client relations'
              ],
              evaluation_criteria: {
                addresses_all_tasks: 'Creates prompts for all three deliverables',
                includes_context: 'Incorporates the specific client situation',
                professional_tone: 'Maintains appropriate business tone',
                actionable: 'Results would be immediately usable'
              }
            }
          }
        ]
      },
      {
        name: 'Advanced Techniques',
        description: 'Master sophisticated prompt engineering methods',
        order: 3,
        icon: '🚀',
        lessons: [
          {
            name: 'Chain-of-Thought Prompting',
            type: 'lesson',
            order: 1,
            xpReward: 20,
            content: {
              title: 'Chain-of-Thought Prompting',
              sections: [
                {
                  type: 'text',
                  content: 'Chain-of-Thought (CoT) prompting encourages AI to show its reasoning process step-by-step. This technique dramatically improves accuracy for complex problems.'
                },
                {
                  type: 'key-points',
                  title: 'When to Use CoT',
                  points: [
                    'Math and logical problems',
                    'Multi-step analysis',
                    'Complex decision making',
                    'When you need to verify AI\'s reasoning'
                  ]
                },
                {
                  type: 'example',
                  title: 'CoT in Action',
                  bad: 'Should we expand to the European market?',
                  good: 'Analyze whether we should expand to the European market. Think through this step by step:\n1. First, consider our current market position\n2. Then, analyze European market conditions\n3. Next, evaluate our readiness and resources\n4. Consider potential risks and challenges\n5. Finally, provide a recommendation with reasoning'
                }
              ]
            }
          },
          {
            name: 'System Prompts for Assistants',
            type: 'lesson',
            order: 2,
            xpReward: 20,
            content: {
              title: 'System Prompts for Assistants',
              sections: [
                {
                  type: 'text',
                  content: 'System prompts define AI behavior at a fundamental level. They set the personality, constraints, and capabilities of AI assistants you create.'
                },
                {
                  type: 'template',
                  title: 'System Prompt Structure',
                  content: 'You are [role/identity].\n\nYour purpose is to [primary function].\n\nGuidelines:\n- [Behavior 1]\n- [Behavior 2]\n- [Constraint 1]\n\nYou should always [positive behavior].\nYou should never [prohibited behavior].\n\nResponse format: [specify structure]'
                },
                {
                  type: 'example',
                  title: 'Customer Service Bot',
                  content: 'You are a friendly customer service representative for TechCorp.\n\nYour purpose is to help customers with product questions and issues.\n\nGuidelines:\n- Always be polite and empathetic\n- Focus on solutions, not blame\n- Escalate to human support for billing issues\n\nYou should always thank customers for their patience.\nYou should never share internal company information.'
                }
              ]
            }
          },
          {
            name: 'Output Formatting',
            type: 'lesson',
            order: 3,
            xpReward: 20,
            content: {
              title: 'Output Formatting',
              sections: [
                {
                  type: 'text',
                  content: 'Control exactly how AI structures its responses. This is crucial for integration with other tools, creating consistent documents, and improving readability.'
                },
                {
                  type: 'key-points',
                  title: 'Format Options',
                  points: [
                    'JSON for data processing',
                    'Markdown for documentation',
                    'Tables for comparisons',
                    'Bullet points for lists',
                    'Numbered steps for processes'
                  ]
                },
                {
                  type: 'example',
                  title: 'JSON Output',
                  content: 'Analyze this customer feedback and return a JSON object with:\n{\n  "sentiment": "positive/negative/neutral",\n  "main_topics": ["topic1", "topic2"],\n  "action_required": true/false,\n  "priority": "high/medium/low",\n  "summary": "brief summary"\n}'
                }
              ]
            }
          },
          {
            name: 'Prompt Templates & Libraries',
            type: 'lesson',
            order: 4,
            xpReward: 20,
            content: {
              title: 'Prompt Templates & Libraries',
              sections: [
                {
                  type: 'text',
                  content: 'Build a personal library of proven prompts that you can reuse and adapt. This saves time and ensures consistent quality.'
                },
                {
                  type: 'key-points',
                  title: 'Template Best Practices',
                  points: [
                    'Use clear variable placeholders [like this]',
                    'Include example outputs when helpful',
                    'Document what each template is for',
                    'Version control your templates',
                    'Share effective templates with your team'
                  ]
                },
                {
                  type: 'template',
                  title: 'Universal Business Template',
                  content: 'As a [ROLE], help me [TASK].\n\nContext:\n- Audience: [WHO]\n- Purpose: [WHY]\n- Constraints: [LIMITATIONS]\n\nPlease provide:\n1. [OUTPUT_1]\n2. [OUTPUT_2]\n\nFormat: [STRUCTURE]\nTone: [VOICE]'
                }
              ]
            }
          },
          {
            name: 'Build Your Prompt Library',
            type: 'exercise',
            order: 5,
            xpReward: 35,
            content: {
              title: 'Final Project: Build Your Prompt Library',
              instruction: 'Create a mini prompt library with 3 reusable templates for tasks you commonly do at work. Each template should include: variable placeholders, example usage, and expected output format.',
              hints: [
                'Think about tasks you do weekly',
                'Consider emails, reports, or analysis you frequently create',
                'Make templates flexible enough to adapt to variations'
              ],
              evaluation_criteria: {
                three_templates: 'Includes 3 distinct templates',
                has_placeholders: 'Uses clear variable placeholders',
                includes_examples: 'Shows example usage for each',
                practical: 'Templates address real business needs'
              },
              example_answer: '1. Weekly Status Report Template\n[ROLE]: Project Manager\n[TASK]: Write status update for [PROJECT_NAME]\n...'
            }
          }
        ]
      }
    ]
  },
  {
    slug: 'creative',
    name: 'Creative Prompting',
    description: 'Unleash your creativity with AI. Master storytelling, copywriting, and image generation prompts for creative professionals.',
    icon: '🎨',
    color: '#FF2D55', // Apple Pink
    difficulty: 'intermediate',
    targetAge: null,
    sortOrder: 2,
    units: [
      {
        name: 'Creative Writing',
        description: 'Craft compelling stories and narratives',
        order: 1,
        icon: '✍️',
        lessons: [
          {
            name: 'The AIDA Framework',
            type: 'lesson',
            order: 1,
            xpReward: 15,
            content: {
              title: 'The AIDA Framework',
              sections: [
                {
                  type: 'text',
                  content: 'AIDA is a classic marketing and writing framework that works brilliantly with AI. It helps create content that captures and maintains reader attention.'
                },
                {
                  type: 'framework',
                  title: 'AIDA Explained',
                  items: [
                    { letter: 'A', name: 'Attention', description: 'Hook the reader with a compelling opening' },
                    { letter: 'I', name: 'Interest', description: 'Build curiosity with relevant information' },
                    { letter: 'D', name: 'Desire', description: 'Create emotional connection and want' },
                    { letter: 'A', name: 'Action', description: 'Guide toward a clear next step' }
                  ]
                },
                {
                  type: 'example',
                  title: 'AIDA Prompt',
                  content: 'Write a blog post introduction using the AIDA framework:\n\nTopic: Remote work productivity\nTarget audience: New remote workers\nDesired action: Read the full article\n\nMake each section distinct and flowing naturally into the next.'
                }
              ]
            }
          },
          {
            name: 'Storytelling Prompts',
            type: 'lesson',
            order: 2,
            xpReward: 15,
            content: {
              title: 'Storytelling Prompts',
              sections: [
                {
                  type: 'text',
                  content: 'Great stories follow patterns. Learn how to prompt AI to create compelling narratives with well-developed characters, conflict, and resolution.'
                },
                {
                  type: 'template',
                  title: 'Story Elements Prompt',
                  content: 'Write a [length] story with these elements:\n\nProtagonist: [character details]\nSetting: [time and place]\nConflict: [main challenge]\nTheme: [underlying message]\nTone: [mood/atmosphere]\n\nInclude:\n- A hook in the first paragraph\n- Rising tension in the middle\n- A satisfying resolution'
                },
                {
                  type: 'key-points',
                  title: 'Story Components',
                  points: [
                    'Character motivation drives the plot',
                    'Conflict creates engagement',
                    'Setting grounds the reader',
                    'Theme gives meaning',
                    'Pacing controls tension'
                  ]
                }
              ]
            }
          },
          {
            name: 'Dialogue Generation',
            type: 'lesson',
            order: 3,
            xpReward: 15,
            content: {
              title: 'Dialogue Generation',
              sections: [
                {
                  type: 'text',
                  content: 'Natural dialogue brings characters to life. Learn to prompt AI for conversations that reveal character, advance plot, and feel authentic.'
                },
                {
                  type: 'template',
                  title: 'Dialogue Prompt',
                  content: 'Write a dialogue between [Character A] and [Character B].\n\nCharacter A: [personality, background, goal in conversation]\nCharacter B: [personality, background, goal in conversation]\n\nSituation: [context]\nSubtext: [what\'s NOT being said]\nLength: [number of exchanges]\n\nMake each character\'s voice distinct and include action beats.'
                },
                {
                  type: 'tip',
                  content: 'The best dialogue has subtext - characters rarely say exactly what they mean. Prompt for what\'s beneath the surface.'
                }
              ]
            }
          },
          {
            name: 'Genre Techniques',
            type: 'lesson',
            order: 4,
            xpReward: 15,
            content: {
              title: 'Genre Techniques',
              sections: [
                {
                  type: 'text',
                  content: 'Different genres have different conventions. Mastering genre-specific prompts helps you create authentic content that meets reader expectations.'
                },
                {
                  type: 'comparison',
                  title: 'Genre Conventions',
                  items: [
                    { name: 'Mystery', description: 'Clues, red herrings, detective figure, revelation' },
                    { name: 'Romance', description: 'Meet-cute, obstacles, emotional beats, HEA' },
                    { name: 'Sci-Fi', description: 'World-building, technology, social commentary' },
                    { name: 'Horror', description: 'Atmosphere, dread, escalation, catharsis' }
                  ]
                },
                {
                  type: 'example',
                  title: 'Genre-Specific Prompt',
                  content: 'Write a mystery story opening that:\n- Introduces the detective character\n- Presents the crime or puzzle\n- Establishes the setting atmosphere\n- Plants at least one subtle clue\n- Hooks the reader with a question'
                }
              ]
            }
          },
          {
            name: 'Write a Story Opening',
            type: 'exercise',
            order: 5,
            xpReward: 25,
            content: {
              title: 'Exercise: Write a Story Opening',
              instruction: 'Create a prompt that would generate a compelling opening paragraph for a short story. Include character, setting, genre, and hook elements.',
              hints: [
                'Consider what makes an opening memorable',
                'Include sensory details in your prompt',
                'Specify the emotional tone you want'
              ],
              evaluation_criteria: {
                has_character: 'Includes character description',
                has_setting: 'Specifies time and place',
                has_genre: 'Indicates genre conventions',
                has_hook: 'Requests an engaging opening'
              }
            }
          }
        ]
      },
      {
        name: 'Copywriting & Marketing',
        description: 'Create compelling marketing content',
        order: 2,
        icon: '📣',
        lessons: [
          {
            name: 'Headlines That Hook',
            type: 'lesson',
            order: 1,
            xpReward: 15,
            content: {
              title: 'Headlines That Hook',
              sections: [
                {
                  type: 'text',
                  content: 'Headlines make or break your content. 80% of readers never make it past the headline. Learn to prompt AI for attention-grabbing titles.'
                },
                {
                  type: 'key-points',
                  title: 'Headline Formulas',
                  points: [
                    'Numbers: "7 Ways to..." (specific, scannable)',
                    'How-to: "How to [Achieve Result]" (promise of value)',
                    'Question: "Are You Making This Mistake?" (curiosity)',
                    'Negative: "Stop Doing [X]" (pattern interrupt)',
                    'Curiosity gap: "[Result] Without [Expected Method]"'
                  ]
                },
                {
                  type: 'template',
                  title: 'Headline Prompt',
                  content: 'Generate 10 headline variations for:\n\nTopic: [subject]\nAudience: [who]\nPlatform: [blog/social/email]\nGoal: [clicks/shares/conversions]\n\nInclude a mix of:\n- Number-based headlines\n- Question headlines\n- How-to headlines\n- Curiosity-driven headlines'
                }
              ]
            }
          },
          {
            name: 'Product Descriptions',
            type: 'lesson',
            order: 2,
            xpReward: 15,
            content: {
              title: 'Product Descriptions',
              sections: [
                {
                  type: 'text',
                  content: 'Great product descriptions sell benefits, not just features. Learn to prompt AI for copy that converts browsers into buyers.'
                },
                {
                  type: 'template',
                  title: 'Product Description Prompt',
                  content: 'Write a product description for [product].\n\nFeatures: [list key features]\nTarget customer: [ideal buyer profile]\nPain points solved: [problems it addresses]\nCompetitive advantage: [what makes it unique]\n\nInclude:\n- Benefit-focused headline\n- Emotional hook\n- Feature-to-benefit translations\n- Social proof placeholder\n- Clear call to action'
                },
                {
                  type: 'example',
                  title: 'Feature vs Benefit',
                  bad: 'Feature: 10-hour battery life',
                  good: 'Benefit: Power through your entire workday without searching for outlets'
                }
              ]
            }
          },
          {
            name: 'Social Media Content',
            type: 'lesson',
            order: 3,
            xpReward: 15,
            content: {
              title: 'Social Media Content',
              sections: [
                {
                  type: 'text',
                  content: 'Each social platform has its own voice and format. Master prompts that create native-feeling content for any platform.'
                },
                {
                  type: 'comparison',
                  title: 'Platform Differences',
                  items: [
                    { name: 'LinkedIn', description: 'Professional, value-driven, storytelling' },
                    { name: 'Twitter/X', description: 'Concise, witty, thread-friendly' },
                    { name: 'Instagram', description: 'Visual-first, lifestyle, hashtag-rich' },
                    { name: 'TikTok', description: 'Trendy, casual, hook-focused' }
                  ]
                },
                {
                  type: 'template',
                  title: 'Social Media Prompt',
                  content: 'Create a [platform] post about [topic].\n\nBrand voice: [tone/personality]\nGoal: [engagement/traffic/awareness]\nCall to action: [what you want readers to do]\nCharacter limit: [platform limit]\n\nInclude relevant hashtags and emoji use appropriate to the platform.'
                }
              ]
            }
          },
          {
            name: 'Email Marketing',
            type: 'lesson',
            order: 4,
            xpReward: 15,
            content: {
              title: 'Email Marketing',
              sections: [
                {
                  type: 'text',
                  content: 'Email remains the highest-ROI marketing channel. Learn to prompt AI for emails that get opened, read, and clicked.'
                },
                {
                  type: 'key-points',
                  title: 'Email Components',
                  points: [
                    'Subject line (make or break moment)',
                    'Preview text (second hook)',
                    'Opening line (personal connection)',
                    'Body (value delivery)',
                    'CTA (clear next step)',
                    'P.S. (often the most-read part)'
                  ]
                },
                {
                  type: 'template',
                  title: 'Email Sequence Prompt',
                  content: 'Create a 3-email welcome sequence for [business].\n\nEmail 1: Introduction and immediate value\nEmail 2: Build trust with story/proof\nEmail 3: Soft pitch with clear CTA\n\nFor each email, provide:\n- Subject line options\n- Preview text\n- Full email body\n- CTA button text'
                }
              ]
            }
          },
          {
            name: 'Create a Marketing Campaign',
            type: 'exercise',
            order: 5,
            xpReward: 30,
            content: {
              title: 'Exercise: Create a Marketing Campaign',
              instruction: 'Create prompts for a mini marketing campaign launching a new product. Include: 1) Product announcement headline, 2) Social media post, 3) Email subject line and preview.',
              scenario: 'Product: An AI-powered writing assistant app\nTarget: Busy professionals and content creators\nKey benefit: Write 3x faster with AI suggestions',
              hints: [
                'Maintain consistent messaging across channels',
                'Adapt tone for each platform',
                'Focus on the transformation, not just features'
              ],
              evaluation_criteria: {
                complete: 'Includes all three components',
                consistent: 'Maintains brand voice across channels',
                compelling: 'Uses proven copywriting techniques',
                actionable: 'Clear calls to action'
              }
            }
          }
        ]
      },
      {
        name: 'Image Generation Prompts',
        description: 'Master the art of visual AI prompting',
        order: 3,
        icon: '🖼️',
        lessons: [
          {
            name: 'Anatomy of an Image Prompt',
            type: 'lesson',
            order: 1,
            xpReward: 20,
            content: {
              title: 'Anatomy of an Image Prompt',
              sections: [
                {
                  type: 'text',
                  content: 'Image generation AI thinks differently than text AI. Understanding its visual vocabulary unlocks stunning creative possibilities.'
                },
                {
                  type: 'framework',
                  title: 'Image Prompt Structure',
                  items: [
                    { letter: 'S', name: 'Subject', description: 'The main focus of the image (who/what)' },
                    { letter: 'S', name: 'Style', description: 'Artistic style (photorealistic, oil painting, anime)' },
                    { letter: 'C', name: 'Composition', description: 'Framing, angle, perspective' },
                    { letter: 'L', name: 'Lighting', description: 'Light source, mood, atmosphere' },
                    { letter: 'D', name: 'Details', description: 'Specific elements, colors, textures' }
                  ]
                },
                {
                  type: 'example',
                  title: 'Building a Prompt',
                  content: 'Subject: A wise old owl\nStyle: Digital art, fantasy illustration\nComposition: Close-up portrait, eye-level\nLighting: Magical golden hour, rim lighting\nDetails: Intricate feather patterns, glowing amber eyes, mystical forest background\n\nFinal: "Close-up portrait of a wise old owl, digital fantasy illustration style, golden hour rim lighting, intricate feather patterns, glowing amber eyes, mystical forest background"'
                }
              ]
            }
          },
          {
            name: 'Style Modifiers',
            type: 'lesson',
            order: 2,
            xpReward: 20,
            content: {
              title: 'Style Modifiers',
              sections: [
                {
                  type: 'text',
                  content: 'Style modifiers are the secret sauce of image prompts. They tell the AI what artistic approach to take, dramatically changing the output.'
                },
                {
                  type: 'key-points',
                  title: 'Popular Style Modifiers',
                  points: [
                    'Artistic: oil painting, watercolor, pencil sketch, digital art',
                    'Photography: DSLR, macro, long exposure, polaroid',
                    'Era: 1920s art deco, 80s synthwave, Victorian',
                    'Media: anime, pixar-style, comic book, stained glass',
                    'Quality: 4K, highly detailed, professional, cinematic'
                  ]
                },
                {
                  type: 'comparison',
                  title: 'Same Subject, Different Styles',
                  items: [
                    { name: '"cat" + photorealistic', description: 'Detailed fur, natural lighting, DSLR quality' },
                    { name: '"cat" + studio ghibli style', description: 'Soft lines, warm colors, whimsical feel' },
                    { name: '"cat" + cyberpunk', description: 'Neon lights, tech elements, dark atmosphere' }
                  ]
                }
              ]
            }
          },
          {
            name: 'Negative Prompts',
            type: 'lesson',
            order: 3,
            xpReward: 20,
            content: {
              title: 'Negative Prompts',
              sections: [
                {
                  type: 'text',
                  content: 'Negative prompts tell AI what NOT to include. They\'re essential for avoiding common AI art problems and refining your vision.'
                },
                {
                  type: 'key-points',
                  title: 'Common Negative Prompts',
                  points: [
                    'Quality issues: blurry, low resolution, watermark, text',
                    'Anatomy issues: extra fingers, deformed hands, distorted face',
                    'Style avoidance: cartoon (when wanting realism), photorealistic (when wanting art)',
                    'Content control: violence, text, logos, specific unwanted elements'
                  ]
                },
                {
                  type: 'template',
                  title: 'Negative Prompt Template',
                  content: 'Standard negative prompt:\n"blurry, low quality, distorted, deformed, bad anatomy, extra limbs, watermark, text, signature, cropped, out of frame"'
                },
                {
                  type: 'tip',
                  content: 'Start with a standard negative prompt template and customize based on your specific needs and common issues you encounter.'
                }
              ]
            }
          },
          {
            name: 'Prompt Weighting',
            type: 'lesson',
            order: 4,
            xpReward: 20,
            content: {
              title: 'Prompt Weighting',
              sections: [
                {
                  type: 'text',
                  content: 'Prompt weighting lets you emphasize certain elements over others. It\'s like telling the AI "pay more attention to THIS."'
                },
                {
                  type: 'key-points',
                  title: 'Weighting Syntax',
                  points: [
                    '(word) - slight emphasis',
                    '((word)) - strong emphasis',
                    '(word:1.5) - numerical weight (higher = more emphasis)',
                    '[word] - de-emphasis in some systems',
                    'Order matters: front-loaded terms get more attention'
                  ]
                },
                {
                  type: 'example',
                  title: 'Weighting Examples',
                  content: 'Without weighting:\n"portrait of woman with red hair in garden"\n\nWith weighting (emphasizing the hair):\n"portrait of woman with ((vibrant red hair:1.4)) in garden"\n\nThe red hair will be more prominent and detailed in the weighted version.'
                }
              ]
            }
          },
          {
            name: 'Create a Visual Portfolio',
            type: 'exercise',
            order: 5,
            xpReward: 35,
            content: {
              title: 'Exercise: Create a Visual Portfolio',
              instruction: 'Create 3 distinct image prompts for a cohesive visual brand: 1) A logo concept, 2) A hero image for a website, 3) A social media profile picture.',
              scenario: 'Brand: "Mindful Tech" - a wellness app company\nVibe: Calm, modern, human-centric, nature-inspired\nColors: Soft greens, warm neutrals, touch of gold',
              hints: [
                'Use consistent style modifiers across all three',
                'Include negative prompts for quality control',
                'Consider how each image will be used'
              ],
              evaluation_criteria: {
                three_prompts: 'Creates all three image prompts',
                consistent_style: 'Maintains visual cohesion',
                appropriate_format: 'Uses proper image prompt structure',
                brand_aligned: 'Reflects the brand values and aesthetics'
              }
            }
          }
        ]
      }
    ]
  },
  {
    slug: 'kids',
    name: 'AI Adventures',
    description: 'A fun journey into the world of AI! Learn how to talk to computers and create amazing things together.',
    icon: '🚀',
    color: '#FF9500', // Apple Orange
    difficulty: 'beginner',
    targetAge: '8-14',
    sortOrder: 3,
    units: [
      {
        name: 'Meet Your AI Friend',
        description: 'Discover what AI is and how to talk to it',
        order: 1,
        icon: '🤖',
        lessons: [
          {
            name: 'What is AI?',
            type: 'lesson',
            order: 1,
            xpReward: 10,
            content: {
              title: 'What is AI?',
              sections: [
                {
                  type: 'text',
                  content: 'AI stands for Artificial Intelligence. Think of it like a super-smart helper that lives inside computers. It can read, write, draw pictures, and answer questions!'
                },
                {
                  type: 'fun-fact',
                  title: 'Did You Know?',
                  content: 'AI learns from millions of books, websites, and conversations - like reading the biggest library in the world!'
                },
                {
                  type: 'key-points',
                  title: 'AI Can Help You:',
                  points: [
                    '📚 Explain hard homework problems',
                    '📖 Write stories together',
                    '🎨 Describe pictures to create',
                    '🎮 Come up with game ideas',
                    '❓ Answer curious questions'
                  ]
                },
                {
                  type: 'remember',
                  content: 'AI is a tool, not a person. It\'s really smart but it can make mistakes, and it doesn\'t have feelings like you do!'
                }
              ]
            }
          },
          {
            name: 'Talking to AI',
            type: 'lesson',
            order: 2,
            xpReward: 10,
            content: {
              title: 'Talking to AI',
              sections: [
                {
                  type: 'text',
                  content: 'Talking to AI is like giving instructions to a very helpful robot. The clearer you are, the better it can help you!'
                },
                {
                  type: 'comparison',
                  title: 'Good vs Not-So-Good Requests',
                  items: [
                    { name: 'Not-so-good', description: '"Tell me about animals"' },
                    { name: 'Better!', description: '"Tell me 3 cool facts about dolphins that would surprise my friends"' }
                  ]
                },
                {
                  type: 'key-points',
                  title: 'Tips for Talking to AI:',
                  points: [
                    '🎯 Be specific about what you want',
                    '📝 Tell it who you are (like "explain this for a 10-year-old")',
                    '🔢 Ask for a specific number ("give me 5 ideas")',
                    '😊 Be polite (it\'s good practice!)'
                  ]
                }
              ]
            }
          },
          {
            name: 'Be Clear & Specific',
            type: 'lesson',
            order: 3,
            xpReward: 10,
            content: {
              title: 'Be Clear & Specific',
              sections: [
                {
                  type: 'text',
                  content: 'Imagine asking a friend to draw you a picture. If you just say "draw something," they won\'t know what you want! The same goes for AI.'
                },
                {
                  type: 'example',
                  title: 'The Sandwich Test',
                  bad: '"Make me a sandwich"',
                  good: '"Make me a peanut butter and jelly sandwich on white bread, cut into triangles"'
                },
                {
                  type: 'activity',
                  title: 'Practice Being Specific',
                  content: 'Instead of: "Help me with math"\nTry: "Help me solve this problem: What is 24 × 15? Show me the steps so I can understand."'
                },
                {
                  type: 'key-points',
                  title: 'Add These Details:',
                  points: [
                    '📏 How long or short? (100 words, 3 sentences)',
                    '😄 What mood? (funny, serious, exciting)',
                    '👤 Who is it for? (me, my teacher, my friends)',
                    '📋 What format? (list, story, poem)'
                  ]
                }
              ]
            }
          },
          {
            name: 'Magic Words',
            type: 'lesson',
            order: 4,
            xpReward: 10,
            content: {
              title: 'Magic Words for AI',
              sections: [
                {
                  type: 'text',
                  content: 'Some phrases work like magic spells to make AI responses better! Let\'s learn these super-useful words.'
                },
                {
                  type: 'key-points',
                  title: 'The Magic Phrases:',
                  points: [
                    '"Step by step" - Makes AI explain things clearly',
                    '"For a kid my age" - Gets simpler explanations',
                    '"Give me examples" - Shows you how things work',
                    '"In a fun way" - Makes learning more exciting',
                    '"Like you\'re explaining to a friend" - More casual tone'
                  ]
                },
                {
                  type: 'example',
                  title: 'Using Magic Words',
                  content: 'Normal: "How do plants grow?"\n\nWith magic: "Explain step by step how plants grow, for a kid my age, with fun examples!"'
                },
                {
                  type: 'fun-fact',
                  title: 'Bonus Magic!',
                  content: '"Pretend you are a [character]" makes AI take on personalities! Try: "Pretend you are a pirate and explain how boats float."'
                }
              ]
            }
          },
          {
            name: 'Make AI Tell a Joke',
            type: 'exercise',
            order: 5,
            xpReward: 20,
            content: {
              title: 'Activity: Make AI Tell a Joke',
              instruction: 'Write a prompt asking AI to tell you a joke! Make it specific about what kind of joke you want.',
              hints: [
                'What topic? (animals, school, food, space)',
                'What style? (knock-knock, pun, riddle)',
                'For who? (you, your little sibling, your parents)'
              ],
              evaluation_criteria: {
                has_topic: 'Specifies a joke topic or theme',
                has_style: 'Mentions type of joke',
                is_specific: 'Includes at least 2 details',
                is_appropriate: 'Asks for kid-friendly content'
              },
              example_answer: 'Tell me a funny knock-knock joke about dinosaurs that I can share with my friends at school!'
            }
          }
        ]
      },
      {
        name: 'Fun Projects',
        description: 'Use AI for cool projects and homework help',
        order: 2,
        icon: '🎮',
        lessons: [
          {
            name: 'Homework Helper',
            type: 'lesson',
            order: 1,
            xpReward: 15,
            content: {
              title: 'Homework Helper',
              sections: [
                {
                  type: 'text',
                  content: 'AI can be an awesome homework helper - but remember, it helps you LEARN, not just gives you answers! Here\'s how to use it the right way.'
                },
                {
                  type: 'key-points',
                  title: 'Good Ways to Use AI for Homework:',
                  points: [
                    '❓ "Explain this concept in simple words"',
                    '📝 "Give me a similar practice problem"',
                    '🔍 "Help me check if my answer is correct"',
                    '💡 "What are the steps to solve this?"',
                    '📖 "Suggest resources to learn more about this"'
                  ]
                },
                {
                  type: 'warning',
                  content: 'Don\'t just copy AI answers! Your teachers want to see YOUR thinking. Use AI to understand, then do the work yourself.'
                },
                {
                  type: 'template',
                  title: 'Homework Help Prompt',
                  content: '"I\'m learning about [topic] and I\'m stuck on [specific part]. Can you explain it step by step like you\'re talking to a [your age]-year-old? Please give me a different example I can practice with."'
                }
              ]
            }
          },
          {
            name: 'Story Creator',
            type: 'lesson',
            order: 2,
            xpReward: 15,
            content: {
              title: 'Story Creator',
              sections: [
                {
                  type: 'text',
                  content: 'AI is an amazing story-writing partner! You come up with the ideas, and AI helps bring them to life. Let\'s create some awesome stories together!'
                },
                {
                  type: 'template',
                  title: 'Story Starter Prompt',
                  content: '"Write a short story about [main character] who [what happens]. Make it [mood - funny/exciting/mysterious] and set it in [where/when]. Include a surprise twist at the end!"'
                },
                {
                  type: 'key-points',
                  title: 'Story Building Blocks:',
                  points: [
                    '🦸 Hero: Who is the main character?',
                    '🗺️ Setting: Where and when does it happen?',
                    '⚡ Problem: What challenge do they face?',
                    '🎯 Goal: What do they want?',
                    '🎉 Ending: How does it resolve?'
                  ]
                },
                {
                  type: 'fun-fact',
                  title: 'Pro Tip!',
                  content: 'Try "Continue this story:" and write the first few sentences yourself. Then AI will continue YOUR story in your style!'
                }
              ]
            }
          },
          {
            name: 'Game Ideas',
            type: 'lesson',
            order: 3,
            xpReward: 15,
            content: {
              title: 'Invent New Games',
              sections: [
                {
                  type: 'text',
                  content: 'Bored of the same old games? AI can help you invent brand new ones! You can create games to play with friends, family, or even by yourself.'
                },
                {
                  type: 'template',
                  title: 'Game Invention Prompt',
                  content: '"Invent a new [type: card/board/outdoor/word] game for [number] players. It should be fun for kids age [age] and take about [time] minutes to play. Include the rules and how to win!"'
                },
                {
                  type: 'key-points',
                  title: 'Game Types to Try:',
                  points: [
                    '🃏 Card games with regular playing cards',
                    '🎲 Board games using paper and coins',
                    '🏃 Outdoor games for the playground',
                    '🧠 Brain teasers and puzzles',
                    '📱 Games that don\'t need any equipment'
                  ]
                },
                {
                  type: 'example',
                  title: 'Example Request',
                  content: '"Create a fun word game for 3-5 players that we can play on a car trip. No supplies needed, just our brains! It should be silly and make us laugh."'
                }
              ]
            }
          },
          {
            name: 'Art Director',
            type: 'lesson',
            order: 4,
            xpReward: 15,
            content: {
              title: 'Art Director',
              sections: [
                {
                  type: 'text',
                  content: 'AI can create amazing pictures from descriptions! You get to be the "Art Director" - the person who decides what the picture should look like.'
                },
                {
                  type: 'template',
                  title: 'Picture Description Template',
                  content: '"Create a picture of [what] that is [style: cartoon/realistic/magical]. The colors should be [colors]. Make it feel [mood: happy/spooky/peaceful]."'
                },
                {
                  type: 'key-points',
                  title: 'Things to Include in Picture Descriptions:',
                  points: [
                    '🎨 Style: Cartoon, realistic, anime, painting',
                    '🌈 Colors: Bright, pastel, dark, rainbow',
                    '😊 Mood: Happy, mysterious, exciting, calm',
                    '📍 Setting: Where is it? Background details',
                    '✨ Special effects: Glowing, sparkly, magical'
                  ]
                },
                {
                  type: 'example',
                  title: 'Detailed Picture Description',
                  content: '"A friendly dragon reading a book in a cozy library. Cartoon style with bright colors. The dragon has blue scales and little glasses. Warm lamp lighting. Cute and cozy feeling."'
                }
              ]
            }
          },
          {
            name: 'Create Your Adventure',
            type: 'exercise',
            order: 5,
            xpReward: 25,
            content: {
              title: 'Activity: Create Your Own Adventure',
              instruction: 'Write a prompt to create the beginning of a "Choose Your Own Adventure" story! You\'ll be the hero of the story.',
              hints: [
                'Make yourself the main character',
                'Choose an exciting setting (space, underwater, magical forest)',
                'Include a mystery or quest',
                'Ask for choices at the end'
              ],
              evaluation_criteria: {
                has_character: 'Main character is described',
                has_setting: 'Interesting location specified',
                has_adventure: 'Quest or mystery included',
                has_choices: 'Asks for decision points'
              },
              example_answer: 'Write the beginning of a choose-your-own-adventure story where I\'m an explorer who discovers a hidden door in my school that leads to a magical underwater kingdom. Make it exciting! At the end, give me 2 choices for what to do next.'
            }
          }
        ]
      },
      {
        name: 'Creative Adventures',
        description: 'Explore big ideas and create amazing things',
        order: 3,
        icon: '🌟',
        lessons: [
          {
            name: 'Science Explorer',
            type: 'lesson',
            order: 1,
            xpReward: 15,
            content: {
              title: 'Science Explorer',
              sections: [
                {
                  type: 'text',
                  content: 'AI is like having a friendly scientist who can explain ANYTHING! From black holes to bacteria, dinosaurs to DNA - ask away!'
                },
                {
                  type: 'template',
                  title: 'Science Question Prompt',
                  content: '"Explain [science topic] to a curious [your age]-year-old. Use fun examples and compare it to things I already know. Make it amazing and blow my mind!"'
                },
                {
                  type: 'key-points',
                  title: 'Cool Science Questions to Ask:',
                  points: [
                    '🌌 "Why is space black?"',
                    '🦕 "What was the biggest dinosaur ever?"',
                    '🧠 "How does my brain remember things?"',
                    '🌊 "Why is the ocean salty?"',
                    '⚡ "How does lightning work?"'
                  ]
                },
                {
                  type: 'fun-fact',
                  title: 'Chain of Questions!',
                  content: 'After AI answers, ask "Why?" or "How?" to go deeper! You can learn SO much by following your curiosity.'
                }
              ]
            }
          },
          {
            name: 'History Time Machine',
            type: 'lesson',
            order: 2,
            xpReward: 15,
            content: {
              title: 'History Time Machine',
              sections: [
                {
                  type: 'text',
                  content: 'AI can take you on adventures through history! Meet famous people, visit ancient civilizations, and learn about how people lived long ago.'
                },
                {
                  type: 'template',
                  title: 'Time Travel Prompt',
                  content: '"Pretend I just time-traveled to [place] in [year/era]. What would I see, hear, and smell? What would a kid my age be doing there? Make it feel like I\'m really there!"'
                },
                {
                  type: 'key-points',
                  title: 'History Adventures to Try:',
                  points: [
                    '🏛️ Ancient Egypt - Building pyramids',
                    '🏰 Medieval times - Knights and castles',
                    '🚀 1969 - Moon landing day',
                    '🦖 65 million years ago - Dinosaur era',
                    '🎨 Renaissance Italy - Meeting Leonardo da Vinci'
                  ]
                },
                {
                  type: 'example',
                  title: 'Interview with History!',
                  content: 'Try: "Pretend you are [famous person from history]. I\'m a kid who wants to interview you. Tell me about your life and biggest achievement in your own words!"'
                }
              ]
            }
          },
          {
            name: 'Future Inventor',
            type: 'lesson',
            order: 3,
            xpReward: 15,
            content: {
              title: 'Future Inventor',
              sections: [
                {
                  type: 'text',
                  content: 'Use your imagination and AI to invent things that don\'t exist yet! Who knows - your idea today might be real tomorrow!'
                },
                {
                  type: 'template',
                  title: 'Invention Prompt',
                  content: '"Help me design an invention that solves [problem]. Explain how it would work, what it would look like, and how it would help people. Be creative and futuristic!"'
                },
                {
                  type: 'key-points',
                  title: 'Invention Ideas to Start With:',
                  points: [
                    '🤖 A robot that helps with chores',
                    '🚗 A car that can fly AND swim',
                    '📚 A backpack that makes homework easier',
                    '🌍 Something to help the environment',
                    '🏠 A cool feature for your dream house'
                  ]
                },
                {
                  type: 'activity',
                  title: 'Invention Challenge',
                  content: 'Think of something that annoys you or a problem you\'ve noticed. Ask AI to help you invent something to fix it!'
                }
              ]
            }
          },
          {
            name: 'Music Maker',
            type: 'lesson',
            order: 4,
            xpReward: 15,
            content: {
              title: 'Music & Song Creator',
              sections: [
                {
                  type: 'text',
                  content: 'AI can help you write songs, create lyrics, and even explain how music works! Let\'s make some music together.'
                },
                {
                  type: 'template',
                  title: 'Song Writing Prompt',
                  content: '"Write a fun song about [topic] in the style of [type: pop/rap/silly/lullaby]. Make it rhyme and give it a catchy chorus that\'s easy to sing! Include [number] verses."'
                },
                {
                  type: 'key-points',
                  title: 'Music Projects to Try:',
                  points: [
                    '🎵 Write a theme song for yourself',
                    '🎤 Create a rap about your favorite subject',
                    '😂 Make a silly song about your pet',
                    '🎸 Write new lyrics to a melody you know',
                    '🎹 Create a song to help memorize something'
                  ]
                },
                {
                  type: 'example',
                  title: 'Memory Song',
                  content: '"Write a short, catchy song to help me remember the planets in order from the sun. Make it fun and easy to memorize!"'
                }
              ]
            }
          },
          {
            name: 'Your AI Project Portfolio',
            type: 'exercise',
            order: 5,
            xpReward: 30,
            content: {
              title: 'Final Project: Your AI Portfolio',
              instruction: 'Create 3 prompts showing off what you\'ve learned! Make one for: 1) Learning something new, 2) Creating something fun, 3) Solving a problem.',
              hints: [
                'Use the magic words you learned',
                'Be specific and detailed',
                'Show your personality in your prompts',
                'Think about what YOU find interesting'
              ],
              evaluation_criteria: {
                three_prompts: 'Includes all three types of prompts',
                uses_techniques: 'Uses magic words and good structure',
                creative: 'Shows creativity and personality',
                specific: 'Each prompt is clear and detailed'
              },
              example_answer: '1. Learning: "Explain how volcanoes work step by step, for a 10-year-old, using comparisons to things in my kitchen!"\n2. Creating: "Help me write a short adventure story where my cat becomes a superhero..."\n3. Problem: "I have trouble waking up in the morning. Invent a fun alarm clock idea..."'
            }
          }
        ]
      }
    ]
  },
  {
    slug: 'elderly',
    name: 'AI Made Simple',
    description: 'A gentle, clear introduction to using AI assistants. Learn at your own pace with practical examples for everyday life.',
    icon: '📚',
    color: '#34C759', // Apple Green
    difficulty: 'beginner',
    targetAge: '65+',
    sortOrder: 4,
    units: [
      {
        name: 'Getting Started with AI',
        description: 'Understanding AI basics in plain language',
        order: 1,
        icon: '👋',
        lessons: [
          {
            name: 'What Can AI Do For You?',
            type: 'lesson',
            order: 1,
            xpReward: 10,
            content: {
              title: 'What Can AI Do For You?',
              sections: [
                {
                  type: 'text',
                  content: 'AI assistants are like having a helpful friend available 24 hours a day. They can help with writing, answer questions, and make everyday tasks easier. No technical knowledge needed!'
                },
                {
                  type: 'key-points',
                  title: 'Helpful Things AI Can Do:',
                  points: [
                    '✉️ Help write emails and letters',
                    '🍳 Find and explain recipes',
                    '📖 Summarize long articles',
                    '❓ Answer questions about anything',
                    '📝 Help organize your thoughts',
                    '🗓️ Assist with planning activities'
                  ]
                },
                {
                  type: 'reassurance',
                  content: 'You don\'t need to be "good with computers" to use AI. If you can type a message, you can use AI. Take your time - there\'s no rush.'
                }
              ]
            }
          },
          {
            name: 'Your First Conversation',
            type: 'lesson',
            order: 2,
            xpReward: 10,
            content: {
              title: 'Having Your First Conversation',
              sections: [
                {
                  type: 'text',
                  content: 'Talking to AI is just like writing a note to a helpful assistant. You type what you need, and it responds. It\'s a conversation - you can ask follow-up questions just like with a person.'
                },
                {
                  type: 'example',
                  title: 'A Simple Conversation',
                  content: 'You: "Can you explain what a podcast is?"\n\nAI: [Explains podcasts in simple terms]\n\nYou: "How do I listen to one?"\n\nAI: [Gives step-by-step instructions]\n\nYou: "Can you recommend some for someone who likes history?"\n\nAI: [Suggests history podcasts]'
                },
                {
                  type: 'tip',
                  content: 'Don\'t worry about saying things perfectly. AI is very forgiving and will try to understand what you mean, even if there are typos.'
                }
              ]
            }
          },
          {
            name: 'Asking Clear Questions',
            type: 'lesson',
            order: 3,
            xpReward: 10,
            content: {
              title: 'Asking Clear Questions',
              sections: [
                {
                  type: 'text',
                  content: 'The clearer your question, the more helpful the answer. But don\'t overthink it - you can always ask AI to explain more or try differently.'
                },
                {
                  type: 'comparison',
                  title: 'Making Questions Clearer',
                  items: [
                    { name: 'Okay', description: '"Tell me about Paris"' },
                    { name: 'Better', description: '"Tell me the best time of year to visit Paris and what I should see there"' }
                  ]
                },
                {
                  type: 'key-points',
                  title: 'Tips for Good Questions:',
                  points: [
                    'One question at a time is usually best',
                    'It\'s okay to say "I don\'t understand, please explain again"',
                    'You can ask AI to "make it simpler" anytime',
                    'If the answer is too long, ask for "the short version"'
                  ]
                }
              ]
            }
          },
          {
            name: 'Understanding AI Responses',
            type: 'lesson',
            order: 4,
            xpReward: 10,
            content: {
              title: 'Understanding AI Responses',
              sections: [
                {
                  type: 'text',
                  content: 'AI is very knowledgeable but not perfect. It\'s good to understand what it can and can\'t do so you can use it wisely.'
                },
                {
                  type: 'key-points',
                  title: 'Important Things to Know:',
                  points: [
                    '✅ AI is usually very accurate for general knowledge',
                    '⚠️ Always double-check medical or legal information with professionals',
                    '📅 AI might not know about very recent events',
                    '🔄 You can ask it to try again if the answer isn\'t quite right',
                    '❓ It\'s okay to say "Are you sure about that?"'
                  ]
                },
                {
                  type: 'reassurance',
                  content: 'Think of AI as a helpful assistant, not an expert. It\'s great for everyday help, but for important decisions, always consult the appropriate professional.'
                }
              ]
            }
          },
          {
            name: 'Have a Simple Chat',
            type: 'exercise',
            order: 5,
            xpReward: 15,
            content: {
              title: 'Practice: Have a Simple Chat',
              instruction: 'Write a message to AI asking about something you\'ve been curious about. It could be anything - a place, a recipe, how something works, or advice on something.',
              hints: [
                'Write like you\'re asking a friendly neighbor',
                'Include a specific detail about what you want to know',
                'You can ask AI to explain it simply'
              ],
              evaluation_criteria: {
                clear_topic: 'Has a clear subject or question',
                complete: 'Gives enough context for a helpful answer',
                natural: 'Sounds natural and conversational'
              },
              example_answer: 'I\'ve always wondered how bread rises when you bake it. Can you explain what makes that happen in simple terms?'
            }
          }
        ]
      },
      {
        name: 'Everyday Tasks',
        description: 'Practical ways AI can help daily life',
        order: 2,
        icon: '🏠',
        lessons: [
          {
            name: 'Writing Emails & Letters',
            type: 'lesson',
            order: 1,
            xpReward: 15,
            content: {
              title: 'Help with Emails & Letters',
              sections: [
                {
                  type: 'text',
                  content: 'AI can help you write any kind of message - from thank you notes to formal letters. Just tell it what you want to say, and it can help you say it well.'
                },
                {
                  type: 'template',
                  title: 'Simple Email Request',
                  content: '"Please help me write a [friendly/formal] email to [who] about [what]. I want to [purpose - thank them/ask something/respond to something]. Keep it [short/medium length]."'
                },
                {
                  type: 'example',
                  title: 'Example Request',
                  content: '"Help me write a thank you note to my neighbor who watched my cat while I was away for a week. Keep it warm and friendly but not too long."'
                },
                {
                  type: 'tip',
                  content: 'After AI writes something, you can say "Make it more casual" or "Make it a bit shorter" or "Add a line about..." - just like working with a helpful assistant.'
                }
              ]
            }
          },
          {
            name: 'Finding Recipes',
            type: 'lesson',
            order: 2,
            xpReward: 15,
            content: {
              title: 'Recipe Finder',
              sections: [
                {
                  type: 'text',
                  content: 'AI can suggest recipes based on what you have in your kitchen, dietary needs, or what you\'re in the mood for. It\'s like having a friendly cook to consult!'
                },
                {
                  type: 'template',
                  title: 'Recipe Request',
                  content: '"I have [ingredients you have]. Can you suggest a simple recipe? I prefer [any preferences - easy to make, healthy, comfort food]. I cook for [number of people]."'
                },
                {
                  type: 'key-points',
                  title: 'Recipe Questions to Ask:',
                  points: [
                    '"What can I make with chicken and vegetables?"',
                    '"Give me an easy dinner idea for one person"',
                    '"I need a recipe without dairy"',
                    '"How do I make [dish] step by step?"',
                    '"What\'s a simple dessert I can make with basic ingredients?"'
                  ]
                },
                {
                  type: 'tip',
                  content: 'You can ask AI to adjust recipes: "Can you make this recipe for just 2 people instead of 6?" or "What can I use instead of butter?"'
                }
              ]
            }
          },
          {
            name: 'Health Questions',
            type: 'lesson',
            order: 3,
            xpReward: 15,
            content: {
              title: 'Asking Health Questions',
              sections: [
                {
                  type: 'text',
                  content: 'AI can help you understand health information and prepare for doctor visits. But remember: AI is for information, not diagnosis. Always consult your doctor for medical decisions.'
                },
                {
                  type: 'key-points',
                  title: 'Good Health Questions for AI:',
                  points: [
                    '"Explain what [medical term] means in simple words"',
                    '"Help me write down questions for my doctor appointment"',
                    '"What are common side effects of [medication]?"',
                    '"Explain this test result report to me simply"',
                    '"What questions should I ask about [condition]?"'
                  ]
                },
                {
                  type: 'warning',
                  content: 'Important: Never use AI instead of seeing a doctor. AI cannot examine you, know your full history, or provide medical treatment. Always verify health information with healthcare providers.'
                },
                {
                  type: 'template',
                  title: 'Doctor Visit Prep',
                  content: '"I have an appointment with my doctor about [reason]. Help me write a list of important questions I should ask and symptoms I should mention."'
                }
              ]
            }
          },
          {
            name: 'Tech Troubleshooting',
            type: 'lesson',
            order: 4,
            xpReward: 15,
            content: {
              title: 'Getting Help with Technology',
              sections: [
                {
                  type: 'text',
                  content: 'When technology isn\'t working, AI can often help figure out what\'s wrong and walk you through solutions step by step.'
                },
                {
                  type: 'template',
                  title: 'Tech Help Request',
                  content: '"I\'m having trouble with [device/program]. [Describe the problem]. Can you help me fix it step by step? I\'m not very technical, so please explain simply."'
                },
                {
                  type: 'example',
                  title: 'Example Questions',
                  content: '"My email keeps asking for a password and I don\'t know what to do. I use Gmail on my iPad."\n\n"My phone\'s screen got very dim and I can\'t see well. How do I make it brighter?"\n\n"How do I add a picture to a text message? I have an iPhone."'
                },
                {
                  type: 'tip',
                  content: 'Always mention what device you\'re using (iPhone, Android, computer, iPad, etc.) - this helps AI give you the right instructions.'
                }
              ]
            }
          },
          {
            name: 'Write a Helpful Email',
            type: 'exercise',
            order: 5,
            xpReward: 20,
            content: {
              title: 'Practice: Write a Helpful Email',
              instruction: 'Write a request to AI to help you compose an email. Pick any situation - thanking someone, asking a question, or responding to an invitation.',
              hints: [
                'Tell AI who the email is for',
                'Explain the purpose of the email',
                'Mention how formal or casual it should be'
              ],
              evaluation_criteria: {
                has_recipient: 'Specifies who the email is to',
                has_purpose: 'Clear about what the email should accomplish',
                has_tone: 'Indicates desired formality level'
              },
              example_answer: 'Help me write a polite email to my grandchildren\'s school asking about the date and time of the holiday concert. Keep it friendly but professional.'
            }
          }
        ]
      },
      {
        name: 'Staying Connected',
        description: 'Using AI to stay in touch and engaged',
        order: 3,
        icon: '💬',
        lessons: [
          {
            name: 'Social Media Posts',
            type: 'lesson',
            order: 1,
            xpReward: 15,
            content: {
              title: 'Help with Social Media',
              sections: [
                {
                  type: 'text',
                  content: 'AI can help you write posts for Facebook, Instagram, or any social media. Share your thoughts, photos, and stories more easily.'
                },
                {
                  type: 'template',
                  title: 'Social Post Helper',
                  content: '"Help me write a [Facebook/Instagram] post about [topic - your garden, grandkids visit, trip, etc.]. I want it to sound [warm and friendly/proud/funny]. Not too long."'
                },
                {
                  type: 'example',
                  title: 'Example Requests',
                  content: '"Help me write a Facebook post to share that my grandson just graduated from high school. I\'m very proud."\n\n"I want to post about my garden tomatoes that finally turned red. Help me write something cheerful to go with the photo."'
                },
                {
                  type: 'tip',
                  content: 'You can ask AI to suggest what photos to include or how to make your post more interesting: "What could I add to make this more engaging?"'
                }
              ]
            }
          },
          {
            name: 'Finding Gift Ideas',
            type: 'lesson',
            order: 2,
            xpReward: 15,
            content: {
              title: 'Gift Idea Helper',
              sections: [
                {
                  type: 'text',
                  content: 'Stuck on what to give someone? AI can suggest thoughtful gift ideas based on the person\'s interests, age, and the occasion.'
                },
                {
                  type: 'template',
                  title: 'Gift Idea Request',
                  content: '"I need gift ideas for my [relationship - daughter, friend, neighbor]. They are [age range] and enjoy [interests/hobbies]. It\'s for [occasion]. My budget is around [amount]."'
                },
                {
                  type: 'example',
                  title: 'Example',
                  content: '"My granddaughter is turning 8. She loves animals and drawing. Can you suggest some thoughtful gifts under $50?"\n\n"I need a birthday gift for my friend who just retired. He likes gardening and reading mysteries. Budget is about $30."'
                },
                {
                  type: 'key-points',
                  title: 'Ask Follow-Up Questions Like:',
                  points: [
                    '"Where could I buy that?"',
                    '"Can you suggest something I could make myself?"',
                    '"What about experience gifts instead of objects?"'
                  ]
                }
              ]
            }
          },
          {
            name: 'Travel Planning Help',
            type: 'lesson',
            order: 3,
            xpReward: 15,
            content: {
              title: 'Travel Planning Assistant',
              sections: [
                {
                  type: 'text',
                  content: 'Planning a trip? AI can help you think through what to do, what to pack, and what to expect. It\'s like having a travel agent conversation.'
                },
                {
                  type: 'template',
                  title: 'Travel Planning Request',
                  content: '"I\'m planning to visit [destination] for [number] days in [month]. I\'m interested in [what you enjoy - history, nature, food, relaxing]. What should I know and what do you recommend seeing?"'
                },
                {
                  type: 'key-points',
                  title: 'Travel Questions to Ask:',
                  points: [
                    '"What\'s the weather like in [place] in [month]?"',
                    '"What should I pack for a trip to [destination]?"',
                    '"What are must-see places in [city] for seniors?"',
                    '"How do I get around in [city] without renting a car?"',
                    '"What are some good restaurants in [area]?"'
                  ]
                },
                {
                  type: 'tip',
                  content: 'Mention any mobility concerns or preferences: "I need places with easy walking and places to sit" or "I prefer quieter, less crowded attractions."'
                }
              ]
            }
          },
          {
            name: 'Memory Helper & Lists',
            type: 'lesson',
            order: 4,
            xpReward: 15,
            content: {
              title: 'Memory Helper & Lists',
              sections: [
                {
                  type: 'text',
                  content: 'AI can help you organize thoughts, create lists, and keep track of important information. Think of it as a helpful notepad that can also give suggestions.'
                },
                {
                  type: 'key-points',
                  title: 'Helpful Organization Tasks:',
                  points: [
                    '📝 "Help me make a packing list for a week at my daughter\'s"',
                    '📋 "Organize my grocery list by store sections"',
                    '📅 "Help me plan out my week\'s meals"',
                    '🎂 "Help me remember important dates coming up this month"',
                    '✅ "Make a checklist for preparing for the holidays"'
                  ]
                },
                {
                  type: 'template',
                  title: 'List Creation',
                  content: '"Create a [type] list for [purpose]. Include [any specific items you want]. Organize it by [category/priority/order]."'
                },
                {
                  type: 'example',
                  title: 'Example',
                  content: '"Help me make a list of questions to ask when I call about my Medicare coverage. I\'m confused about prescription drug coverage."'
                }
              ]
            }
          },
          {
            name: 'Create Your AI Assistant',
            type: 'exercise',
            order: 5,
            xpReward: 25,
            content: {
              title: 'Final Project: Your Personal AI Helper',
              instruction: 'Write 3 requests for things AI could help you with in your daily life. Think about emails, planning, questions you have, or tasks you\'d like help with.',
              hints: [
                'Think about what takes up your time or energy',
                'What questions do you find yourself wondering about?',
                'What tasks do you sometimes put off because they seem complicated?'
              ],
              evaluation_criteria: {
                three_requests: 'Includes three different requests',
                practical: 'Addresses real daily needs',
                clear: 'Each request is clear and complete',
                varied: 'Shows different uses of AI'
              },
              example_answer: '1. "Help me write a birthday card message for my brother who is turning 70. We\'ve always joked around, so make it warm but a little funny."\n\n2. "I\'m having my book club over next week for 6 people. Help me plan a simple lunch menu that I can prepare ahead of time."\n\n3. "Explain to me how to video call with WhatsApp on my iPhone. Give me step-by-step instructions."'
            }
          }
        ]
      }
    ]
  }
]

async function main() {
  console.log('🌱 Starting database seed...')

  // Test connection first
  console.log('🔌 Testing database connection...')
  await withRetry(async () => {
    await prisma.$connect()
    console.log('   Connected successfully!')
  })

  // Clear existing data (optional - comment out if you want to preserve data)
  console.log('🗑️  Clearing existing data...')
  await withRetry(() => prisma.userAchievement.deleteMany())
  await withRetry(() => prisma.lessonHistory.deleteMany())
  await withRetry(() => prisma.courseProgress.deleteMany())
  await withRetry(() => prisma.lesson.deleteMany())
  await withRetry(() => prisma.unit.deleteMany())
  await withRetry(() => prisma.course.deleteMany())
  await withRetry(() => prisma.achievement.deleteMany())

  // Seed achievements
  console.log('🏆 Seeding achievements...')
  for (let i = 0; i < achievements.length; i++) {
    await withRetry(() => prisma.achievement.create({
      data: {
        ...achievements[i],
        sortOrder: i
      }
    }))
  }
  console.log(`   Created ${achievements.length} achievements`)

  // Seed courses with units and lessons
  console.log('📚 Seeding courses...')
  for (const courseData of courses) {
    const { units, ...courseInfo } = courseData

    const course = await withRetry(() => prisma.course.create({
      data: courseInfo
    }))
    console.log(`   Created course: ${course.name}`)

    for (const unitData of units) {
      const { lessons, ...unitInfo } = unitData

      const unit = await withRetry(() => prisma.unit.create({
        data: {
          ...unitInfo,
          courseId: course.id
        }
      }))
      console.log(`      Created unit: ${unit.name}`)

      for (const lessonData of lessons) {
        await withRetry(() => prisma.lesson.create({
          data: {
            ...lessonData,
            unitId: unit.id
          }
        }))
      }
      console.log(`         Created ${lessons.length} lessons`)
    }
  }

  console.log('✅ Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
