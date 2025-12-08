# Learn2Prompt Personalization System Design

## Overview
Transform Learn2Prompt into a personalized learning platform with multiple paths tailored to different user types and persistent user accounts.

---

## User Types & Learning Paths

### 1. **Creative Path** (Artists, Writers, Marketers)
**Focus:** Storytelling, content creation, emotional connection

**Exercises:**
- Write compelling stories
- Create marketing copy
- Generate social media content
- Develop character descriptions
- Craft email campaigns
- Design product descriptions
- Create poetry/creative writing
- Generate video scripts

**Tone:** Inspiring, imaginative, expressive
**Difficulty:** Medium, emphasis on style and creativity
**Feedback Style:** Encouraging, focuses on originality and engagement

---

### 2. **Analytical Path** (Data Scientists, Engineers, Analysts)
**Focus:** Logic, precision, data analysis, technical accuracy

**Exercises:**
- Analyze datasets
- Create SQL queries
- Debug code explanations
- Extract structured data
- Generate technical documentation
- Build decision trees
- Create data visualizations
- Write technical specifications

**Tone:** Precise, logical, methodical
**Difficulty:** High, emphasis on accuracy and detail
**Feedback Style:** Direct, focuses on precision and completeness

---

### 3. **Kids Path** (Ages 8-14)
**Focus:** Fun, simple, gamified learning with age-appropriate content

**Exercises:**
- Write a story about their pet
- Create a recipe for a fun snack
- Design a treasure hunt
- Make up a superhero
- Plan a birthday party
- Create game rules
- Write a letter to a friend
- Invent a new toy

**Tone:** Playful, encouraging, simple language
**Difficulty:** Easy, short prompts with lots of hints
**Feedback Style:** Positive, uses emojis and celebratory language
**Rewards:** Stickers, badges, fun animations

---

### 4. **Senior Path** (Ages 60+)
**Focus:** Practical applications, slower pace, larger text, clear instructions

**Exercises:**
- Write emails to family
- Create shopping lists with details
- Draft letters to businesses
- Organize recipes
- Plan travel itineraries
- Write reminders and notes
- Create photo captions
- Generate health questions for doctors

**Tone:** Respectful, patient, clear
**Difficulty:** Easy-Medium, extra hints available
**Feedback Style:** Supportive, detailed explanations
**UI:** Larger fonts, high contrast, simple navigation

---

## Database Schema

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  password_hash VARCHAR(255), -- for email/password auth
  avatar_url TEXT,
  learning_path VARCHAR(50) NOT NULL, -- 'creative', 'analytical', 'kids', 'senior'
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- User preferences
CREATE TABLE user_preferences (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  language VARCHAR(10) DEFAULT 'en',
  theme VARCHAR(20) DEFAULT 'dark',
  difficulty VARCHAR(20) DEFAULT 'medium', -- 'easy', 'medium', 'hard'
  font_size VARCHAR(20) DEFAULT 'normal', -- 'small', 'normal', 'large', 'xlarge'
  high_contrast BOOLEAN DEFAULT false,
  show_hints BOOLEAN DEFAULT true,
  enable_animations BOOLEAN DEFAULT true,
  ai_personality VARCHAR(50) DEFAULT 'balanced', -- 'encouraging', 'balanced', 'direct'
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Progress tracking
CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  lesson_id VARCHAR(50) NOT NULL,
  completed BOOLEAN DEFAULT false,
  score INTEGER DEFAULT 0,
  attempts INTEGER DEFAULT 0,
  best_score INTEGER DEFAULT 0,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

-- User achievements
CREATE TABLE achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  achievement_type VARCHAR(50) NOT NULL,
  achievement_name VARCHAR(255) NOT NULL,
  earned_at TIMESTAMP DEFAULT NOW(),
  metadata JSONB
);

-- Custom exercises (user-generated or AI-generated personalized)
CREATE TABLE custom_exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  scenario TEXT,
  evaluation_criteria TEXT,
  difficulty VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Session tracking
CREATE TABLE user_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  started_at TIMESTAMP DEFAULT NOW(),
  ended_at TIMESTAMP,
  lessons_completed INTEGER DEFAULT 0,
  total_score INTEGER DEFAULT 0
);

-- OAuth accounts (for social login)
CREATE TABLE oauth_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  provider VARCHAR(50) NOT NULL, -- 'google', 'github', etc.
  provider_account_id VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(provider, provider_account_id)
);
```

---

## Authentication Strategy

### Options:
1. **NextAuth.js** (Recommended)
   - Easy integration with Next.js
   - Supports OAuth (Google, GitHub) + Email/Password
   - JWT sessions
   - Prisma adapter available

2. **Clerk** (Alternative - Simpler)
   - Managed authentication
   - Beautiful UI out of the box
   - Free tier: 5,000 MAU

3. **Supabase Auth** (If using Supabase DB)
   - Built-in auth with database
   - Row-level security
   - Social providers

**Recommendation:** NextAuth.js for flexibility and control

---

## Tech Stack Additions

### Database:
- **PostgreSQL** (production)
- **Prisma ORM** (type-safe, migrations, easy to use)
- Hosted on: Railway, Supabase, or existing Dokploy setup

### Authentication:
- **NextAuth.js** v5 (latest)
- Providers: Email/Password, Google OAuth
- JWT sessions for performance

### New Dependencies:
```json
{
  "next-auth": "^5.0.0-beta.25",
  "@prisma/client": "^6.1.0",
  "prisma": "^6.1.0",
  "bcryptjs": "^2.4.3",
  "zod": "^4.1.12" (already installed)
}
```

---

## User Onboarding Flow

### Step 1: Welcome Screen
```
"Welcome to Learn2Prompt!"
[Get Started] [Sign In]
```

### Step 2: Account Creation
```
Create Your Account
- Email
- Password
- Name (optional)

Or sign in with:
[Google] [GitHub]
```

### Step 3: Path Selection
```
Choose Your Learning Path

[🎨 Creative]
For writers, marketers, artists
Focus: Storytelling and content

[🔬 Analytical]
For engineers, analysts, scientists
Focus: Logic and precision

[🎮 Kids]
Fun and simple for young learners
Focus: Games and imagination

[👴 Senior]
Clear and practical applications
Focus: Everyday tasks

[Skip - I'll choose later]
```

### Step 4: Preferences
```
Customize Your Experience
- Language: [English ▼]
- Difficulty: [○ Easy ◉ Medium ○ Hard]
- Font Size: [Small] [Normal] [Large]
- Theme: [Dark] [Light]

[Start Learning]
```

---

## Personalization Features

### 1. Adaptive Difficulty
- Tracks user performance
- Adjusts difficulty automatically
- Suggests retrying lower difficulty if struggling

### 2. Personalized Exercises
- AI generates custom exercises based on:
  - User's learning path
  - Past performance
  - Interests (collected during onboarding)
  - Difficulty preference

### 3. Progress Analytics
- Dashboard showing:
  - Completion percentage
  - Strengths/weaknesses
  - Time spent learning
  - Streak tracking
  - Comparison to path average

### 4. Smart Hints
- Context-aware hints based on:
  - Current struggle points
  - Learning path
  - Previous mistakes

---

## API Endpoints to Add

```typescript
// Auth
POST /api/auth/signup
POST /api/auth/signin
POST /api/auth/signout
GET  /api/auth/session

// User
GET  /api/user/profile
PUT  /api/user/profile
GET  /api/user/preferences
PUT  /api/user/preferences

// Progress
GET  /api/progress
POST /api/progress/lesson/:id
GET  /api/progress/stats

// Exercises
GET  /api/exercises/path/:pathType
POST /api/exercises/generate-custom
GET  /api/exercises/custom

// Achievements
GET  /api/achievements
POST /api/achievements/unlock/:type
```

---

## Migration Strategy

### Phase 1: Setup (Week 1)
- [ ] Set up PostgreSQL database
- [ ] Install Prisma and configure
- [ ] Create database schema
- [ ] Run migrations

### Phase 2: Authentication (Week 1)
- [ ] Install NextAuth.js
- [ ] Configure providers (Email + Google)
- [ ] Create auth UI components
- [ ] Implement auth routes

### Phase 3: Learning Paths (Week 2)
- [ ] Create 4 path content files
- [ ] Design path-specific exercises
- [ ] Build path selection UI
- [ ] Implement path switching

### Phase 4: Personalization (Week 2-3)
- [ ] Build user preferences UI
- [ ] Implement preference persistence
- [ ] Create analytics dashboard
- [ ] Add achievement system

### Phase 5: Migration (Week 3)
- [ ] Migrate localStorage → Database
- [ ] Create migration tool for existing users
- [ ] Update all components to use DB

### Phase 6: Testing & Launch (Week 4)
- [ ] Test all paths
- [ ] User acceptance testing
- [ ] Performance optimization
- [ ] Deploy

---

## Backwards Compatibility

### For Existing Users (localStorage):
1. Detect localStorage data on first visit
2. Show: "Want to save your progress? Create an account!"
3. Migrate data to database on signup
4. Clear localStorage after successful migration

### Fallback:
- Keep localStorage as backup if user doesn't create account
- "Guest mode" with limited features

---

## Success Metrics

### Engagement:
- User retention rate (7-day, 30-day)
- Path completion rates per user type
- Average session duration
- Exercises completed per session

### Quality:
- Average scores per path
- Improvement rate over time
- Custom exercise generation quality
- User satisfaction ratings

### Growth:
- New user signups
- Guest → Account conversion
- Social shares
- Path distribution

---

## Future Enhancements

### Phase 2 Features:
- **Teams/Organizations**: Company training programs
- **Leaderboards**: Friendly competition (opt-in)
- **Certificates with verification**: Blockchain or unique IDs
- **Mentorship**: Connect learners with experts
- **API Access**: Let users generate exercises programmatically
- **Mobile App**: React Native version
- **Offline Mode**: Download lessons for offline practice

---

## Estimated Timeline

- **Full Implementation**: 3-4 weeks
- **MVP (Auth + 2 Paths)**: 1-2 weeks
- **Polish & Testing**: 1 week

---

## Cost Considerations

### Database Hosting:
- **Railway**: $5/month (PostgreSQL)
- **Supabase**: Free tier → $25/month
- **Dokploy-hosted**: $0 (self-hosted)

### Authentication:
- **NextAuth.js**: Free (self-hosted)
- **Clerk**: Free (5,000 MAU) → $25/month

### AI API Costs:
- Current: Anthropic API
- Estimated increase: 2-3x (personalized exercises)

**Total Monthly Cost**: $5-50 depending on scale

---

## Questions to Answer

1. **Target launch date?**
2. **Priority path order?** (Start with 1-2 paths?)
3. **Database preference?** (Self-hosted vs managed?)
4. **Auth preference?** (NextAuth vs Clerk?)
5. **Mobile support timeline?**
6. **Budget constraints?**

---

*This design enables scalable, personalized learning while maintaining the core "learn by doing" philosophy.*
