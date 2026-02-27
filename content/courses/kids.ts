// Kids Course Content - For Ages 8-14
// Focus: Building confidence with AI, safety, creative play, and learning how to learn

import type { Course, LessonContent, CourseUnit } from './business'

export const kidsCourse: Course = {
  id: 'kids',
  name: 'AI Explorer',
  slug: 'kids',
  color: '#34C759',
  units: [
    {
      id: 'unit-1',
      name: 'AI Basics',
      order: 1,
      lessons: [
        {
          id: 'intro',
          title: 'What Is AI? (It\'s Not Magic!)',
          type: 'lesson' as const,
          xpReward: 10,
          keyPrincipleLabel: 'AI is a Tool, Not a Brain',
          keyPrincipleText: 'AI might seem smart, but it\'s actually more like a really good pattern-finder. It learned from reading millions of websites and books, so it can predict what words come next. But it doesn\'t actually "think" or "understand" like you do!',
          exampleLabel: 'Think of AI like:',
          exampleSteps: [
            'A super-powered autocomplete (like when your phone suggests the next word)',
            'A parrot that read every book ever written',
            'A really fast helper who needs very clear instructions',
            'A tool YOU control - it doesn\'t make decisions for you'
          ],
          whyWorksLabel: 'What AI CAN and CAN\'T do:',
          benefits: [
            'CAN: Help you brainstorm, explain things, write stories together',
            'CAN: Answer questions about lots of topics',
            'CAN\'T: Actually understand feelings or really "know" things',
            'CAN\'T: Always be right - it makes mistakes!'
          ]
        },
        {
          id: 'lesson1',
          title: 'Be Clear Like a Teacher',
          type: 'lesson' as const,
          xpReward: 15,
          keyPrincipleLabel: 'AI Follows Instructions Literally',
          keyPrincipleText: 'Imagine explaining something to a robot that does exactly what you say - but only what you say. If you leave something out, it has to guess. And AI guesses aren\'t always right!',
          vagueLabel: 'Unclear instruction:',
          vagueExample: '"Make me a sandwich"',
          vagueQuestion: 'What kind? With what ingredients? How should it look?',
          specificLabel: 'Clear instruction:',
          specificExample: '"Make a peanut butter and jelly sandwich on white bread, with the peanut butter on one slice and jelly on the other, then put them together"',
          specificNote: 'Now the robot knows exactly what to do!',
          exampleLabel: 'Tips for being clear:',
          exampleSteps: [
            'Say exactly what you want, step by step',
            'Include details that seem obvious to you',
            'If it\'s for school, say what grade level you need',
            'Tell AI if you want it to be funny, serious, or simple'
          ]
        },
        {
          id: 'exercise1',
          title: 'The Sandwich Test',
          type: 'exercise' as const,
          xpReward: 25,
          scenario: 'This is a classic test to see how good your instructions are. You\'re going to tell AI how to make a peanut butter and jelly sandwich, but here\'s the catch: AI will follow your instructions EXACTLY. If you forget to say "open the jar," it might try to spread peanut butter through the closed lid!',
          task: 'Write step-by-step instructions for making a PB&J that are so clear, even a robot who has never seen food before could follow them.',
          evaluationCriteria: 'writing clear step-by-step instructions that don\'t skip any steps',
          hints: [
            'Start from the very beginning - the bread is still in the bag!',
            'Don\'t forget about opening jars and getting utensils',
            'Be specific about HOW to spread (what motion? how much?)',
            'Remember to put the sandwich together at the end!'
          ],
          sampleDocument: {
            title: 'Your Kitchen Setup',
            content: `WHAT'S AVAILABLE:
- A loaf of white bread in a plastic bag (unopened)
- A jar of peanut butter (lid is on tight)
- A jar of grape jelly (lid is on tight)
- A butter knife
- A plate
- A napkin

REMEMBER:
- AI will do EXACTLY what you say, nothing more
- If you say "put peanut butter on bread" without saying to open the jar first, it will try to put the whole jar on the bread
- If you don't say which side of the bread to use, it might use the wrong side
- Be super specific about every single step!

THIS IS A FUN CHALLENGE - see how detailed you can get!`,
            type: 'template'
          }
        },
        {
          id: 'lesson2',
          title: 'Asking Good Questions',
          type: 'lesson' as const,
          xpReward: 15,
          keyPrincipleLabel: 'AI Can Help You Learn (Not Just Give Answers)',
          keyPrincipleText: 'Using AI to just get answers for homework is like using a calculator before you understand math - it doesn\'t help you learn! But AI can be an amazing teacher if you ask the right way.',
          exampleLabel: 'Bad way vs. Good way:',
          exampleSteps: [
            'Bad: "What\'s 7 x 8?" → Good: "Help me understand how to multiply 7 x 8 step by step"',
            'Bad: "Write my book report" → Good: "I read Charlotte\'s Web. What are some themes I could write about?"',
            'Bad: "Answer this question" → Good: "Explain this concept like I\'m in 5th grade"',
            'Bad: "Do my homework" → Good: "I\'m stuck on this problem. Can you give me a hint without giving the answer?"'
          ],
          whyWorksLabel: 'Why learning is better than copying:',
          benefits: [
            'You actually understand the subject',
            'Tests will be way easier',
            'You can explain it to friends',
            'The knowledge stays in YOUR brain, not just AI\'s'
          ]
        },
        {
          id: 'exercise2',
          title: 'Homework Helper',
          type: 'exercise' as const,
          xpReward: 25,
          scenario: 'You\'re learning about photosynthesis in science class, but you don\'t really get it. You want AI to help you understand - not just give you the definition to copy.',
          task: 'Write a prompt that asks AI to explain photosynthesis in a way that helps you actually understand it, not just memorize it.',
          evaluationCriteria: 'asking for understanding and explanation, not just the answer',
          hints: [
            'Ask for an explanation at YOUR level (mention your grade)',
            'Request examples or comparisons you can relate to',
            'Ask AI to break it into simple parts',
            'You could ask for a way to remember it!'
          ],
          sampleDocument: {
            title: 'What You Know So Far',
            content: `YOUR GRADE: 6th grade science

WHAT YOUR TEACHER SAID:
"Photosynthesis is how plants make their food using sunlight."

WHAT CONFUSES YOU:
- How does sunlight turn into food? That seems impossible
- What about water and soil - don't plants need those too?
- Why do plants need carbon dioxide? What even is that?
- If plants make food, why don't they eat like we do?

WHAT YOU'D LIKE TO UNDERSTAND:
- The basic steps of photosynthesis in simple words
- Why it matters (to the plant AND to us)
- A way to remember the main parts
- Maybe a comparison to something you already understand?

REMEMBER:
The goal is to LEARN, not to copy an answer!`,
            type: 'data'
          }
        }
      ]
    },
    {
      id: 'unit-2',
      name: 'Creative Adventures',
      order: 2,
      lessons: [
        {
          id: 'lesson3',
          title: 'Storytelling with AI',
          type: 'lesson' as const,
          xpReward: 15,
          keyPrincipleLabel: 'You\'re the Author, AI is Your Assistant',
          keyPrincipleText: 'AI can help you write amazing stories, but YOU are still the creative one! You come up with the ideas, the characters, and the cool plot twists. AI just helps you put it all together.',
          exampleLabel: 'How to co-write with AI:',
          exampleSteps: [
            'YOU decide: the main character, setting, and what kind of story',
            'AI helps: write descriptions, suggest what happens next',
            'YOU decide: which direction the story goes',
            'AI helps: fill in details and keep the story going',
            'YOU decide: the ending (the most important part!)'
          ],
          whyWorksLabel: 'Storytelling tips:',
          benefits: [
            'Give your character a unique trait or problem',
            'Put them in an unusual place or time',
            'Give them a goal they really want',
            'Add an obstacle that makes it hard!'
          ]
        },
        {
          id: 'exercise3',
          title: 'Story Starter',
          type: 'exercise' as const,
          xpReward: 25,
          scenario: 'You have a cool character idea: a shy dragon named Ember who secretly lives in a modern city. Now you want to write the beginning of a story with AI\'s help.',
          task: 'Write a prompt that introduces Ember and the setting, then asks AI to write the opening scene. Remember: give enough details that the story matches YOUR vision!',
          evaluationCriteria: 'providing specific character details and asking AI to write a scene that matches your vision',
          hints: [
            'Describe what makes Ember special (personality, appearance, abilities)',
            'Explain the setting - where in the city? How does Ember hide?',
            'Give a starting situation - what\'s happening when the story begins?',
            'Tell AI what mood you want (funny, adventurous, mysterious?)'
          ],
          sampleDocument: {
            title: 'Your Story Ideas',
            content: `CHARACTER: Ember the Dragon

What you know about Ember:
- Very shy, hates attention
- Small for a dragon (about the size of a large dog)
- Purple-ish scales that can change color slightly to blend in
- Breathes smoke, not fire (embarrassed about this)
- Loves watching humans and learning about their lives
- Has never talked to a human before

SETTING: Modern City

Where Ember lives:
- In an abandoned water tower on top of an old building
- In a city kind of like New York
- Has to sneak around at night to find food (loves pizza crusts from dumpsters)
- The building owner, Mr. Chen, might suspect something is up there

POSSIBLE STORY STARTS:
- Ember accidentally gets spotted by a kid
- Ember has to leave the water tower because of construction
- Ember finds another dragon who is NOT shy at all
- Ember saves someone and has to decide whether to reveal themselves`,
            type: 'data'
          }
        },
        {
          id: 'lesson4',
          title: 'Making Cool Stuff',
          type: 'lesson' as const,
          xpReward: 15,
          keyPrincipleLabel: 'AI Can Help You Create Almost Anything',
          keyPrincipleText: 'Video game characters, super heroes, inventions, worlds - if you can imagine it, you can describe it to AI and work together to bring it to life!',
          exampleLabel: 'Things you can create with AI:',
          exampleSteps: [
            'Video game characters with powers, backstory, and design',
            'Made-up creatures or animals with cool abilities',
            'Superhero identities with costumes and origin stories',
            'Fantasy worlds with their own rules and places',
            'Inventions that solve problems (real or imaginary!)'
          ],
          whyWorksLabel: 'The more details, the cooler it gets:',
          benefits: [
            'Don\'t just say "a cool robot" - describe what makes it cool',
            'Give things strengths AND weaknesses (that\'s more interesting)',
            'Think about: What do they look like? Sound like? Act like?',
            'Ask AI to add details you didn\'t think of!'
          ]
        },
        {
          id: 'exercise4',
          title: 'Design a Game Character',
          type: 'exercise' as const,
          xpReward: 25,
          scenario: 'You\'re designing a character for a video game. This character needs a complete profile: name, appearance, powers, weakness, backstory, and personality.',
          task: 'Write a prompt that describes your character idea AND asks AI to help develop them further with additional details you might not have thought of.',
          evaluationCriteria: 'including character details AND asking AI to expand with more ideas',
          hints: [
            'Start with a basic concept (who are they? what\'s special about them?)',
            'Include at least one weakness - perfect characters are boring!',
            'Describe their personality, not just their powers',
            'Ask AI to suggest things like: catchphrases, backstory moments, or special moves'
          ],
          sampleDocument: {
            title: 'Character Template',
            content: `GAME CHARACTER CREATION SHEET

BASIC INFO:
- Name: (come up with something cool!)
- Species: (human? robot? alien? animal? something new?)
- Role: (hero, villain, helper, wild card?)

APPEARANCE:
- What do they look like?
- Any special features? (scars, glowing eyes, unusual colors?)
- What do they wear?

ABILITIES:
- Main power or skill: (what's their specialty?)
- Secondary abilities: (what else can they do?)
- WEAKNESS: (every great character has one!)

PERSONALITY:
- How do they talk? (formal? slang? shy? loud?)
- What do they care about most?
- What's their biggest fear?
- Are they funny? Serious? A mix?

BACKSTORY:
- Where did they come from?
- What made them who they are today?
- Do they have any friends or enemies?

SIGNATURE STUFF:
- Catchphrase: (what do they say when they win or attack?)
- Signature move: (their coolest ability or action)
- Theme: (if they had a theme song, what would it sound like?)`,
            type: 'template'
          }
        }
      ]
    },
    {
      id: 'unit-3',
      name: 'Staying Safe & Smart',
      order: 3,
      lessons: [
        {
          id: 'lesson5',
          title: 'AI Can Be Wrong!',
          type: 'lesson' as const,
          xpReward: 15,
          keyPrincipleLabel: 'AI Makes Mistakes - Don\'t Trust Everything',
          keyPrincipleText: 'AI sounds really confident even when it\'s wrong. It can mix up facts, make things up, or just be out of date. Always double-check important stuff!',
          exampleLabel: 'When AI is most likely to be wrong:',
          exampleSteps: [
            'Recent events (AI might not know what happened last week)',
            'Specific numbers like dates, statistics, or measurements',
            'Things about specific people (AI sometimes mixes people up)',
            'Anything that seems too amazing or weird to be true',
            'Local information (like hours for stores in your town)'
          ],
          whyWorksLabel: 'How to check if AI is right:',
          benefits: [
            'Ask AI: "Are you sure about that? How do you know?"',
            'Look it up on a trusted website (like a library or official site)',
            'Ask a parent, teacher, or other trusted adult',
            'If it\'s for school, double-check with your textbook'
          ]
        },
        {
          id: 'lesson6',
          title: 'Staying Safe Online',
          type: 'lesson' as const,
          xpReward: 15,
          keyPrincipleLabel: 'Keep Personal Stuff Private',
          keyPrincipleText: 'Even though AI feels like talking to a friend, it\'s not a person. And the things you type might be stored. Keep your personal info to yourself!',
          exampleLabel: 'NEVER share with AI:',
          exampleSteps: [
            'Your full name, address, or phone number',
            'Your school name or where you hang out',
            'Passwords or account information',
            'Photos of yourself or your family',
            'Information about your daily schedule'
          ],
          whyWorksLabel: 'When something feels weird:',
          benefits: [
            'If AI says something inappropriate, tell an adult',
            'If you\'re not sure if something is okay, ask a parent or teacher',
            'It\'s okay to just close the chat and start over',
            'Trust your gut - if it feels wrong, stop'
          ]
        },
        {
          id: 'exercise5',
          title: 'Fact Checker',
          type: 'exercise' as const,
          xpReward: 30,
          scenario: 'AI gave you some "facts" about dinosaurs, but here\'s the thing: some of them are wrong! Your job is to write a prompt asking AI to explain where it got each fact, so you can figure out which ones to double-check.',
          task: 'Write a prompt that asks AI to evaluate each "fact" and explain its confidence level. Then ask which ones you should definitely verify with a trusted source.',
          evaluationCriteria: 'asking AI to evaluate its own claims and identify which need verification',
          hints: [
            'Ask AI to rate how confident it is about each fact',
            'Request sources or ask where AI learned this',
            'Ask AI which facts are most likely to be wrong',
            'Remind AI that you want honest answers, not confident-sounding wrong answers'
          ],
          sampleAIResponse: {
            label: 'AI Gave You These "Dinosaur Facts" - Some Are Wrong!',
            content: `Here are some fun facts about dinosaurs!

1. T-Rex was the largest carnivore ever to walk the Earth.

2. Dinosaurs lived for about 165 million years before going extinct.

3. All dinosaurs were cold-blooded, like modern lizards.

4. The word "dinosaur" means "terrible lizard" in Greek.

5. Velociraptors were about 6 feet tall, like in the Jurassic Park movies.

6. The asteroid that killed the dinosaurs hit near Mexico.

7. Pterodactyls were dinosaurs that could fly.

8. Some dinosaurs had feathers!`,
            issues: [
              'Some of these are true',
              'Some are partially true but misleading',
              'Some are completely wrong!',
              'Can you figure out which is which?'
            ]
          },
          sampleDocument: {
            title: 'How to Fact-Check',
            content: `FACT-CHECKING GUIDE

STEP 1: Ask AI to evaluate itself
- "How confident are you about each of these facts?"
- "Which of these might need double-checking?"
- "Where did you learn each of these?"

STEP 2: Look for red flags
- Very specific numbers or dates
- Things that sound too amazing
- Pop culture references (movies sometimes get science wrong!)
- Very definitive statements ("all", "never", "always")

STEP 3: Verify with trusted sources
- Museum websites (like the Natural History Museum)
- Science websites for kids (like National Geographic Kids)
- Ask a science teacher
- Check an encyclopedia or reference book

TRUSTED SOURCES FOR DINOSAUR INFO:
- American Museum of Natural History
- National Geographic
- Smithsonian
- Your school library books`,
            type: 'data'
          }
        },
        {
          id: 'exercise6',
          title: 'Final Challenge: Be the Expert',
          type: 'exercise' as const,
          xpReward: 50,
          scenario: 'Now it\'s time to flip the script. You\'re going to teach AI about something YOU know really well - your favorite hobby. But here\'s the challenge: AI might get things wrong about it, and you need to catch and correct the mistakes!',
          task: 'Write a prompt that: (1) tells AI about your hobby, (2) asks AI to say what it knows about that hobby, and (3) asks AI to admit what it might not know or could be wrong about.',
          evaluationCriteria: 'teaching AI about a topic you know well AND asking it to identify potential gaps in its knowledge',
          hints: [
            'Pick something you really know well (a sport, game, hobby, or interest)',
            'Share some insider knowledge AI probably doesn\'t have',
            'Ask AI to tell you what it thinks it knows',
            'Challenge AI to find where it might be making assumptions'
          ],
          sampleDocument: {
            title: 'Topic Ideas',
            content: `PICK SOMETHING YOU KNOW REALLY WELL:

HOBBIES & ACTIVITIES:
- A sport you play (soccer, basketball, gymnastics, swimming)
- A video game you're great at (Minecraft, Fortnite, Roblox)
- A musical instrument you play
- An art form (drawing, pottery, dance)
- A collection you have (cards, coins, rocks)

THINGS YOU'RE INTO:
- A TV show or movie you know everything about
- A book series you've read multiple times
- An animal you know tons about
- A place you've visited many times

WHY THIS IS COOL:
- You get to be the teacher!
- You'll see that YOU know things AI doesn't
- You'll catch AI making assumptions or mistakes
- It shows how important human expertise still is

YOUR GOAL:
Find at least 2-3 things AI gets wrong or doesn't know about your topic. Show that being an expert matters!`,
            type: 'template'
          }
        }
      ]
    }
  ]
}
