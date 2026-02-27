// Elderly Course Content - For Seniors 65+
// Focus: Practical everyday tasks, patience, clarity, safety, and building confidence

import type { Course, LessonContent, CourseUnit } from './business'

export const elderlyCourse: Course = {
  id: 'elderly',
  name: 'AI Essentials',
  slug: 'elderly',
  color: '#AF52DE',
  units: [
    {
      id: 'unit-1',
      name: 'Getting Started',
      order: 1,
      lessons: [
        {
          id: 'intro',
          title: 'What Can AI Help You With?',
          type: 'lesson' as const,
          xpReward: 10,
          keyPrincipleLabel: 'AI is Like Having a Helpful Assistant',
          keyPrincipleText: 'AI is simply a computer program that can understand your questions and provide helpful answers. Think of it as a very patient assistant who never gets tired of helping and never judges you for asking the same question twice.',
          exampleLabel: 'Practical things AI can help with:',
          exampleSteps: [
            'Writing letters or emails to family, friends, or businesses',
            'Looking up information without clicking through many websites',
            'Planning events, trips, or creating shopping lists',
            'Explaining confusing things like medical terms or legal documents',
            'Finding recipes and adjusting them for dietary needs'
          ],
          whyWorksLabel: 'What makes AI helpful:',
          benefits: [
            'It\'s available any time of day or night',
            'It never rushes you or makes you feel slow',
            'You can ask the same thing different ways until it makes sense',
            'It can\'t see you or judge you - just type and get help'
          ]
        },
        {
          id: 'lesson1',
          title: 'Talking to AI (It\'s Like Texting)',
          type: 'lesson' as const,
          xpReward: 15,
          keyPrincipleLabel: 'Just Type What You\'re Thinking',
          keyPrincipleText: 'Using AI is simpler than most technology. There are no buttons to memorize, no menus to navigate. You simply type your question or request in plain English, just like you\'re texting a friend or writing a note.',
          vagueLabel: 'You can type things like:',
          vagueExample: '"Can you help me write a thank-you note to my neighbor?"',
          specificLabel: 'Or ask questions:',
          specificExample: '"What\'s a good gift for a 10-year-old grandson who likes dinosaurs?"',
          exampleLabel: 'Ways to start a conversation with AI:',
          exampleSteps: [
            '"I need help with..." - when you have a task',
            '"Can you explain..." - when you need something clarified',
            '"What should I..." - when you want advice',
            '"How do I..." - when you need instructions',
            '"Is it true that..." - when you want to check something'
          ],
          whyWorksLabel: 'Remember:',
          benefits: [
            'There\'s no "wrong" way to ask - just be clear about what you need',
            'You can always ask AI to explain again in simpler terms',
            'Take your time typing - AI will wait for you',
            'If AI\'s answer is confusing, just say "Can you make that simpler?"'
          ]
        },
        {
          id: 'exercise1',
          title: 'Your First Conversation',
          type: 'exercise' as const,
          xpReward: 25,
          scenario: 'Let\'s have a simple, friendly conversation with AI. You want to know what the weather might be like for your walk this weekend, but you also want to see that AI responds in a conversational way.',
          task: 'Write a friendly message to AI asking about the weather and what you might wear or bring for a walk. Just type like you\'re asking a helpful neighbor!',
          evaluationCriteria: 'writing in a natural, conversational way while asking for helpful information',
          hints: [
            'Start with something friendly - it doesn\'t have to be formal',
            'Mention what you\'re planning (a walk)',
            'Ask for practical advice (what to wear, what to bring)',
            'Feel free to add context about yourself if it helps'
          ],
          sampleDocument: {
            title: 'About You',
            content: `YOUR SITUATION:
- You live in Denver, Colorado
- You like to take morning walks in the park near your home
- This Saturday, your daughter might join you for a walk
- You want to know if you should bring an umbrella or wear layers
- You prefer simple, practical advice

REMEMBER:
- AI doesn't actually know the real weather, but it can explain what to prepare for typical weather
- This is practice for having natural conversations with AI
- There's no wrong way to ask - just type what you're thinking!

SAMPLE WAYS TO START:
- "Hello! I was wondering..."
- "I'm planning to take a walk this weekend..."
- "Could you help me figure out..."

TAKE YOUR TIME - AI will wait for you to finish typing.`,
            type: 'data'
          }
        },
        {
          id: 'lesson2',
          title: 'Being Clear Gets Better Answers',
          type: 'lesson' as const,
          xpReward: 15,
          keyPrincipleLabel: 'The More Details You Give, The Better Help You Get',
          keyPrincipleText: 'When you ask AI for help, adding specific details makes a big difference. It\'s like the difference between telling a friend "I need a gift" versus "I need a birthday gift for my sister who loves gardening and has a small apartment."',
          vagueLabel: 'Less helpful:',
          vagueExample: '"Help me write a letter"',
          vagueQuestion: 'A letter to whom? About what? What tone?',
          specificLabel: 'Much more helpful:',
          specificExample: '"Help me write a thank-you letter to my doctor, Dr. Patterson, who took extra time to explain my medication. I want it to be warm but respectful, about 3-4 sentences."',
          specificNote: 'Now AI knows exactly what you need!',
          exampleLabel: 'Details that help AI help you:',
          exampleSteps: [
            'WHO: Who is this for? (your doctor, your grandson, a company)',
            'WHAT: What is the purpose? (thank you, complaint, request)',
            'HOW: What tone? (formal, friendly, warm, brief)',
            'HOW MUCH: How long should it be? (a few sentences, one page)'
          ]
        },
        {
          id: 'exercise2',
          title: 'Write a Better Request',
          type: 'exercise' as const,
          xpReward: 25,
          scenario: 'You want AI to help you write a letter, but a vague request won\'t get you what you need. Let\'s add the specific details that will help AI write exactly what you have in mind.',
          task: 'Write a detailed request for AI to write a thank-you letter for you. Include who it\'s to, what they did, the tone you want, and how long it should be.',
          evaluationCriteria: 'including specific details: recipient, purpose, tone, and length',
          hints: [
            'Start with who you\'re writing to',
            'Explain what they did that you\'re thanking them for',
            'Describe the relationship (close friend, professional, neighbor)',
            'Mention how formal or casual you want it to be'
          ],
          sampleDocument: {
            title: 'Letter Scenario',
            content: `THE SITUATION:
Your neighbor, Margaret, helped you out last week when you weren't feeling well. She picked up groceries for you, fed your cat while you rested, and even brought over some homemade soup.

ABOUT MARGARET:
- She's lived next door for 8 years
- You've always been friendly but not extremely close
- She's about your age, retired
- She was very kind and didn't make a fuss about helping

WHAT YOU WANT TO SAY:
- Thank her sincerely for her help
- Mention specifically what she did
- Let her know it meant a lot to you
- Keep it warm but not too long (she'd be embarrassed by anything too effusive)
- Maybe offer to return the favor sometime

TONE:
- Warm and genuine
- Not overly formal (you're neighbors, not strangers)
- Heartfelt but not excessive
- Brief - Margaret wouldn't want you to make a big fuss`,
            type: 'data'
          }
        }
      ]
    },
    {
      id: 'unit-2',
      name: 'Everyday Uses',
      order: 2,
      lessons: [
        {
          id: 'lesson3',
          title: 'Writing Letters & Emails',
          type: 'lesson' as const,
          xpReward: 15,
          keyPrincipleLabel: 'AI Can Draft, But You Decide What\'s Right',
          keyPrincipleText: 'AI can help you write letters and emails for many occasions. It will create a draft for you, and then you can adjust anything that doesn\'t sound quite like you. Think of it as a helpful starting point, not the final word.',
          exampleLabel: 'Types of letters AI can help with:',
          exampleSteps: [
            'Thank-you notes for gifts, help, or hospitality',
            'Condolence letters when you\'re not sure what to say',
            'Complaint letters to businesses (polite but firm)',
            'Letters to doctors explaining symptoms or concerns',
            'Family updates or holiday letters'
          ],
          whyWorksLabel: 'Tips for getting letters just right:',
          benefits: [
            'Tell AI the situation and who you\'re writing to',
            'Describe the tone: formal, warm, friendly, concerned',
            'Review what AI writes and ask for changes if needed',
            'You can say "Make it warmer" or "Make it shorter"'
          ]
        },
        {
          id: 'exercise3',
          title: 'Draft a Thank-You Note',
          type: 'exercise' as const,
          xpReward: 25,
          scenario: 'Your grandson sent you a birthday gift - a beautiful photo book of family pictures he made himself. You want to send him a heartfelt thank-you note that shows how much it meant to you.',
          task: 'Write a prompt asking AI to help draft this thank-you note. Include all the details AI needs to make it personal and meaningful.',
          evaluationCriteria: 'requesting a letter with specific personal details and emotional warmth',
          hints: [
            'Mention who the letter is for and your relationship',
            'Describe the gift and what made it special',
            'Share how it made you feel (emotions make letters personal)',
            'Specify the tone: warm, loving, grandparent-to-grandchild'
          ],
          sampleDocument: {
            title: 'Thank-You Letter Details',
            content: `THE GIFT:
Your 25-year-old grandson, James (your daughter Susan's son), made you a photo book for your 72nd birthday. It has:
- Photos from your wedding 50 years ago
- Pictures of James growing up
- Family vacation photos
- A recent photo from your granddaughter's graduation
- Handwritten captions under each photo

WHY IT'S SPECIAL:
- You know it took him a lot of time to make
- Some of the photos you hadn't seen in years
- The handwritten captions are personal notes and memories
- James lives far away (California) and you only see him once a year
- It made you cry (happy tears)

YOUR RELATIONSHIP:
- You're very close with James, always have been
- You used to babysit him when he was little
- He calls you "Grammy"
- He's a thoughtful young man but doesn't always show his emotions

WHAT YOU WANT TO SAY:
- How much the gift means to you
- That you've looked through it several times already
- How proud you are of the thoughtful person he's become
- That you miss him and hope to see him soon
- Something loving but not too mushy (he'd be embarrassed)`,
            type: 'data'
          }
        },
        {
          id: 'lesson4',
          title: 'Finding Information',
          type: 'lesson' as const,
          xpReward: 15,
          keyPrincipleLabel: 'AI Can Explain Things Clearly',
          keyPrincipleText: 'Looking something up online often leads to confusing websites, pop-up ads, and jargon. AI can give you a clear, simple answer without all the noise. Just ask your question in plain language.',
          exampleLabel: 'Things AI can look up or explain:',
          exampleSteps: [
            'Medical terms: "What does \'benign\' mean in medical results?"',
            'Recipes: "How do I make a simple chicken soup?"',
            'How-to questions: "How do I clear the memory on my phone?"',
            'General knowledge: "What\'s the difference between Medicare and Medicaid?"',
            'Local info: "What are some nice restaurants in [your city] for a birthday dinner?"'
          ],
          whyWorksLabel: 'Getting clearer answers:',
          benefits: [
            'If the answer is too complicated, just say "Can you explain that more simply?"',
            'You can ask follow-up questions: "What did you mean by...?"',
            'For health info, always double-check with your doctor',
            'If you need current info (like today\'s weather), check a trusted source'
          ]
        },
        {
          id: 'exercise4',
          title: 'Research Assistant',
          type: 'exercise' as const,
          xpReward: 25,
          scenario: 'Your doctor mentioned something called "pre-diabetes" at your last appointment, and you want to understand what it means and what you should do about it. You want clear, practical information without scary medical jargon.',
          task: 'Write a prompt asking AI to explain pre-diabetes in plain, easy-to-understand language. Ask for practical information you can actually use.',
          evaluationCriteria: 'asking for medical information in plain language AND requesting practical next steps',
          hints: [
            'Specify that you want simple, non-medical language',
            'Ask what it actually means for your daily life',
            'Request specific things you can do about it',
            'Ask what questions you might want to ask your doctor'
          ],
          sampleDocument: {
            title: 'Health Information Request',
            content: `YOUR SITUATION:
Your doctor mentioned at your last checkup that your blood sugar is a little high and you might have "pre-diabetes." She gave you a pamphlet but it was full of medical terms you didn't quite understand.

WHAT YOU WANT TO KNOW:
1. What is pre-diabetes in plain English?
2. Is it serious? Should you be worried?
3. What causes it?
4. What can you do about it (diet, exercise, etc.)?
5. Can it be reversed or is it permanent?
6. What questions should you ask your doctor at your next visit?

HOW YOU WANT THE INFORMATION:
- Simple, everyday language (not medical jargon)
- Practical tips you can actually follow
- Honest but not scary
- Short enough to remember the main points

IMPORTANT REMINDER:
- AI information is helpful for understanding, but always follow your doctor's specific advice
- This is for general understanding, not replacing medical care
- If anything seems wrong or concerning, always call your doctor`,
            type: 'data'
          }
        }
      ]
    },
    {
      id: 'unit-3',
      name: 'Staying Safe',
      order: 3,
      lessons: [
        {
          id: 'lesson5',
          title: 'AI Makes Mistakes',
          type: 'lesson' as const,
          xpReward: 15,
          keyPrincipleLabel: 'Always Double-Check Important Information',
          keyPrincipleText: 'AI is helpful, but it\'s not perfect. It can be wrong, especially about recent events, specific numbers, or local details. For anything important - especially health or financial matters - always verify with a trusted source.',
          exampleLabel: 'When to be extra careful:',
          exampleSteps: [
            'Health information: Always confirm with your doctor',
            'Financial decisions: Check with your bank or financial advisor',
            'Legal matters: Consult a lawyer for important questions',
            'Current events: AI might not know recent news',
            'Specific numbers: Dates, prices, and statistics should be verified'
          ],
          whyWorksLabel: 'How to verify information:',
          benefits: [
            'Call your doctor, bank, or other professional directly',
            'Check official websites (like Medicare.gov for Medicare questions)',
            'Ask a family member to help you look it up',
            'If unsure, don\'t make important decisions based on AI alone'
          ]
        },
        {
          id: 'lesson6',
          title: 'Spotting Scams',
          type: 'lesson' as const,
          xpReward: 15,
          keyPrincipleLabel: 'AI Can Help You Identify Suspicious Messages',
          keyPrincipleText: 'Unfortunately, scammers often target older adults with fake emails, phone calls, and messages. The good news is you can ask AI to help you figure out if something might be a scam. When in doubt, check it out!',
          exampleLabel: 'Warning signs of scams:',
          exampleSteps: [
            'URGENCY: "Act now!" "Limited time!" "Your account will be closed!"',
            'THREATS: "You\'ll be arrested" "Legal action" "Penalty fees"',
            'REQUESTS FOR MONEY: Gift cards, wire transfers, or unusual payment methods',
            'PERSONAL INFO REQUESTS: Social Security numbers, bank accounts, passwords',
            'TOO GOOD TO BE TRUE: Prize winnings, unexpected inheritance, free gifts'
          ],
          whyWorksLabel: 'What to do if you\'re unsure:',
          benefits: [
            'Don\'t click any links or call any numbers in the message',
            'Ask a family member or friend to look at it',
            'Call the company directly using a number you know is real',
            'Ask AI to help analyze whether it might be a scam'
          ]
        },
        {
          id: 'exercise5',
          title: 'Is This a Scam?',
          type: 'exercise' as const,
          xpReward: 30,
          scenario: 'You received an email that claims to be from your bank. It says there\'s a problem with your account and you need to click a link immediately. Something feels off, but you\'re not sure. You want AI to help you analyze whether this might be a scam.',
          task: 'Write a prompt sharing the suspicious email with AI and asking for help identifying whether it might be a scam and what you should do next.',
          evaluationCriteria: 'sharing the suspicious message AND asking AI to identify red flags and recommend safe next steps',
          hints: [
            'Share the content of the suspicious message',
            'Ask AI to identify specific warning signs',
            'Ask what a real message from your bank would look like',
            'Request advice on what to do next (without clicking any links)'
          ],
          sampleAIResponse: {
            label: 'Suspicious Email You Received',
            content: `Subject: URGENT: Your Bank of America Account Has Been Compromised!!!

Dear Valued Customer,

We have detected SUSPICIOUS ACTIVITY on your Bank of America account. Your account will be FROZEN within 24 hours unless you verify your identity immediately.

CLICK HERE TO VERIFY YOUR ACCOUNT NOW: [suspicious-link.com/bankofamerica-verify]

You must provide:
- Your account number
- Your Social Security Number
- Your online banking password
- Your PIN number

This is URGENT. Failure to verify within 24 hours will result in permanent account closure and potential legal action.

Thank you for your immediate attention to this matter.

Sincerely,
Bank of America Security Team
securty@bankofamerica-alert.com`,
            issues: [
              'Multiple exclamation points and CAPS LOCK (creates panic)',
              'Urgent deadline creating pressure (24 hours)',
              'Threatening language (legal action, frozen account)',
              'Requesting sensitive information (SSN, password, PIN)',
              'Suspicious email address (misspelled "security", wrong domain)',
              'Generic greeting ("Valued Customer" not your name)',
              'Suspicious link that doesn\'t match real Bank of America website'
            ]
          },
          sampleDocument: {
            title: 'What Real Banks Do',
            content: `HOW REAL BANKS COMMUNICATE:

What they DO:
- Send statements to your known address
- Use your actual name, not "Valued Customer"
- Ask you to call them using the number on your card
- Give you time to respond (no 24-hour threats)
- Have official email addresses (like @bankofamerica.com)

What they NEVER do:
- Ask for your password in an email
- Ask for your full Social Security Number by email
- Threaten legal action for not clicking a link
- Use urgent, panicked language with lots of !!!
- Send links to websites that look slightly wrong

IF YOU'RE EVER UNSURE:
1. Do NOT click any links in the email
2. Do NOT call any phone numbers in the email
3. Call the number on the back of your actual bank card
4. Or go to the bank in person
5. Ask a family member to help you check

REMEMBER: It's always better to be cautious. A real bank will never be upset that you verified before acting.`,
            type: 'data'
          }
        },
        {
          id: 'exercise6',
          title: 'Plan a Special Occasion',
          type: 'exercise' as const,
          xpReward: 50,
          scenario: 'Your daughter\'s 50th birthday is coming up, and you want to host a family dinner at your home. You need help planning the menu, creating a shopping list, and organizing the timing. This brings together everything you\'ve learned!',
          task: 'Write a comprehensive prompt asking AI to help you plan this birthday dinner. Include details about dietary restrictions, your cooking abilities, the timeline, and what kind of help you need.',
          evaluationCriteria: 'providing specific details about the event AND requesting organized, practical planning help',
          hints: [
            'Mention how many guests and any dietary restrictions',
            'Be honest about your cooking abilities and energy levels',
            'Ask for help with the menu, shopping list, and timing',
            'Request that AI break it into manageable steps'
          ],
          sampleDocument: {
            title: 'Birthday Dinner Details',
            content: `THE OCCASION:
Your daughter Susan is turning 50. You want to host a birthday dinner at your home on Saturday evening.

GUEST LIST (8 people total):
- Susan (the birthday girl) - no dietary restrictions
- Susan's husband Mike - diabetic, watching sugar
- Your two grandchildren: James (25) and Emma (22) - no restrictions
- Susan's best friend Carol and her husband Tom - Carol is vegetarian
- Yourself and your husband Richard

YOUR SITUATION:
- You enjoy cooking but get tired if you're on your feet too long
- You have a standard home kitchen
- Your budget is about $150-200 for the meal
- You want something special but not too complicated
- Richard can help with shopping and simple tasks
- You'd like to do most of the prep the day before

WHAT YOU NEED HELP WITH:
1. A menu that works for everyone's dietary needs
2. A shopping list organized by store section
3. A timeline for what to prep Friday vs. what to cook Saturday
4. The menu should feel celebratory but be manageable for you
5. Maybe some simple decoration ideas

THINGS YOU DO WELL:
- Roast chicken or pork tenderloin
- Simple salads
- Roasted vegetables
- Baking (you make a great chocolate cake)

THINGS YOU'D RATHER NOT DO:
- Complicated sauces
- Deep frying
- Last-minute assembly of many dishes
- Anything requiring constant attention while guests are there`,
            type: 'data'
          }
        }
      ]
    }
  ]
}
