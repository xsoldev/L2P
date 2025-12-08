# Learn2Prompt Personalization - Implementation Guide

## 🎉 What's New

Your Learn2Prompt platform now has:
- ✅ 4 personalized learning paths (Creative, Analytical, Kids, Senior)
- ✅ User authentication (Email/Password + Google OAuth)
- ✅ Database for persistent progress tracking
- ✅ User preferences and settings
- ✅ Path-specific content and difficulty levels

---

## 📋 Prerequisites

Before starting, ensure you have:
- Node.js 20.9.0 or higher
- PostgreSQL database (local or hosted)
- Google OAuth credentials (optional, for Google login)

---

## 🚀 Step-by-Step Setup

### Step 1: Install Dependencies

```bash
npm install
```

This will install:
- `@prisma/client` - Database ORM
- `prisma` - Database migrations
- `next-auth` - Authentication
- `bcryptjs` - Password hashing
- `@auth/prisma-adapter` - NextAuth Prisma integration

---

### Step 2: Set Up Environment Variables

Create or update your `.env.local` file:

```env
# Existing
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# NEW: Database
DATABASE_URL="postgresql://username:password@localhost:5432/learn2prompt"

# NEW: NextAuth
NEXTAUTH_SECRET="your-secret-key-here-generate-with-openssl"
NEXTAUTH_URL="http://localhost:3000"

# NEW: Google OAuth (Optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

---

### Step 3: Database Setup

#### Option A: Local PostgreSQL

1. Install PostgreSQL:
```bash
# macOS
brew install postgresql
brew services start postgresql

# Ubuntu/Debian
sudo apt-get install postgresql
sudo service postgresql start
```

2. Create database:
```bash
createdb learn2prompt
```

3. Update DATABASE_URL in `.env.local`

#### Option B: Hosted Database (Recommended for Production)

Choose one:
- **Railway**: https://railway.app (Easy, $5/month)
- **Supabase**: https://supabase.com (Free tier available)
- **Neon**: https://neon.tech (Free tier available)

Copy the connection string to `DATABASE_URL`

---

### Step 4: Initialize Prisma

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database (creates tables)
npm run db:push

# OR run migrations (recommended for production)
npm run db:migrate
```

---

### Step 5: Google OAuth Setup (Optional)

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project (or select existing)
3. Enable Google+ API
4. Create OAuth 2.0 credentials:
   - Application type: Web application
   - Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
5. Copy Client ID and Client Secret to `.env.local`

---

### Step 6: Run Development Server

```bash
npm run dev
```

Visit: http://localhost:3000

---

## 🎨 What's Been Created

### New Files

```
learn2prompt/
├── auth.ts                          # NextAuth configuration
├── middleware.ts                    # Route protection
├── PERSONALIZATION_DESIGN.md        # Full design document
├── IMPLEMENTATION_GUIDE.md          # This file
├── prisma/
│   └── schema.prisma                # Database schema
├── lib/
│   └── prisma.ts                    # Prisma client singleton
├── types/
│   └── next-auth.d.ts               # TypeScript types for auth
├── learning-paths/
│   ├── creative.json                # Creative path content
│   ├── analytical.json              # Analytical path content
│   ├── kids.json                    # Kids path content
│   └── senior.json                  # Senior path content
└── app/
    └── api/
        └── auth/
            └── [...nextauth]/
                └── route.ts         # Auth API route
```

### Updated Files

- `package.json` - New dependencies and scripts
- `.gitignore` - Ignores `.env.local` and Prisma artifacts

---

## 🗄️ Database Schema

### Tables Created

1. **users** - User accounts
2. **user_preferences** - Settings (font size, theme, etc.)
3. **user_progress** - Lesson completion tracking
4. **achievements** - Badges and rewards
5. **custom_exercises** - User-generated exercises
6. **user_sessions** - Session tracking
7. **oauth_accounts** - OAuth provider connections

---

## 🎯 Learning Paths

### 1. Creative Path (🎨)
**For:** Writers, Marketers, Artists

**Exercises:**
- Character Creation
- Product Storytelling
- Social Media Voice
- Email Campaigns
- Blog Posts with Style
- Full Marketing Campaign

**Tone:** Inspiring, creative, expressive

---

### 2. Analytical Path (🔬)
**For:** Engineers, Data Scientists, Analysts

**Exercises:**
- SQL Query Generation
- Data Cleaning Specification
- Statistical Analysis
- API Documentation
- Algorithm Explanation
- Full Data Analysis Report

**Tone:** Precise, logical, methodical

---

### 3. Kids Path (🎮)
**For:** Ages 8-14

**Exercises:**
- Dream Pet Creation
- Birthday Party Planning
- Game Invention
- Superhero Design
- Silly Story Writing
- Dream Treehouse Design

**Tone:** Playful, encouraging, fun

---

### 4. Senior Path (👴)
**For:** Ages 60+

**Exercises:**
- Email to Family
- Shopping List Organization
- Letter to Business
- Medical Questions
- Travel Itinerary
- Recipe Organization

**Tone:** Clear, patient, practical

---

## 🔧 Next Steps to Complete

### Phase 1: UI Components (Priority)

1. **Create Auth Pages**
   ```bash
   app/auth/signin/page.tsx
   app/auth/signup/page.tsx
   app/auth/error/page.tsx
   ```

2. **Create Path Selection UI**
   ```bash
   app/onboarding/page.tsx
   components/PathSelector.tsx
   ```

3. **Create Settings Page**
   ```bash
   app/settings/page.tsx
   components/PreferencesForm.tsx
   ```

### Phase 2: API Routes

Create these API routes:

```bash
app/api/user/profile/route.ts       # GET/PUT user profile
app/api/user/preferences/route.ts   # GET/PUT preferences
app/api/progress/route.ts           # GET progress
app/api/progress/[lessonId]/route.ts # POST lesson completion
app/api/achievements/route.ts       # GET/POST achievements
app/api/exercises/[path]/route.ts   # GET path exercises
```

### Phase 3: Update Main Game Component

Modify `components/PromptEngineeringGame.tsx`:
- Load lessons from learning paths based on user's path
- Save progress to database instead of localStorage
- Check authentication status
- Respect user preferences (font size, theme, etc.)

### Phase 4: Migration Tool

Create a tool to migrate existing localStorage data to database for returning users.

---

## 🧪 Testing

### Test User Creation

```typescript
// Run in Prisma Studio or via API
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

const hashedPassword = await bcrypt.hash('testpassword', 10);

await prisma.user.create({
  data: {
    email: 'test@example.com',
    name: 'Test User',
    passwordHash: hashedPassword,
    learningPath: 'CREATIVE',
    preferences: {
      create: {
        language: 'en',
        difficulty: 'MEDIUM',
        fontSize: 'NORMAL',
      }
    }
  }
});
```

### Test Database Connection

```bash
npx prisma studio
```

Opens visual database browser at http://localhost:5555

---

## 📊 Database Commands

```bash
# View database in browser
npm run db:studio

# Create migration
npm run db:migrate

# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Seed database (if you create a seed file)
npx prisma db seed
```

---

## 🔒 Security Best Practices

1. **Never commit `.env.local`** - Already in .gitignore
2. **Use strong NEXTAUTH_SECRET** - Generate with openssl
3. **Validate all inputs** - Use Zod schemas
4. **Hash passwords** - bcryptjs with salt rounds >= 10
5. **Use HTTPS in production** - Update NEXTAUTH_URL

---

## 🚢 Deployment Checklist

- [ ] Set up production PostgreSQL database
- [ ] Update environment variables on hosting platform
- [ ] Run database migrations: `npx prisma migrate deploy`
- [ ] Set NEXTAUTH_URL to production URL
- [ ] Configure Google OAuth production redirect URIs
- [ ] Test authentication flow
- [ ] Test each learning path
- [ ] Monitor database performance
- [ ] Set up database backups

---

## 📈 Monitoring & Analytics

Consider adding:
- Database connection pool monitoring
- User registration/login tracking
- Path completion rates
- Error logging (Sentry, LogRocket)
- Performance monitoring (Vercel Analytics)

---

## 🐛 Troubleshooting

### "Module not found: @prisma/client"
```bash
npm run db:generate
```

### "Database connection error"
- Check DATABASE_URL is correct
- Ensure PostgreSQL is running
- Test connection: `psql $DATABASE_URL`

### "NextAuth error"
- Verify NEXTAUTH_SECRET is set
- Check NEXTAUTH_URL matches your domain
- Clear browser cookies and try again

### "Google OAuth not working"
- Verify redirect URI matches exactly
- Check Google Cloud Console credentials
- Ensure Google+ API is enabled

---

## 💡 Tips

1. **Start Simple**: Get auth working first, then add features
2. **Test Each Path**: Make sure all 4 paths load correctly
3. **User Feedback**: Add analytics to see which paths are most popular
4. **Gradual Migration**: Allow guest mode while building user features
5. **Backup Data**: Always backup production database before migrations

---

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [NextAuth.js Docs](https://authjs.dev)
- [Prisma Docs](https://www.prisma.io/docs)
- [PostgreSQL Docs](https://www.postgresql.org/docs)

---

## 🤝 Need Help?

Common issues and solutions are in the troubleshooting section above. For additional support:
1. Check Prisma/NextAuth documentation
2. Search GitHub issues
3. Ask in relevant Discord communities

---

**Ready to launch!** 🚀

Next command to run:
```bash
npm install && npm run db:push && npm run dev
```
