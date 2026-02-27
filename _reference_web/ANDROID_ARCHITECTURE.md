# Learn2Prompt Android App - Architecture & Implementation Plan

## Executive Summary

This document outlines the comprehensive plan to convert the Learn2Prompt Next.js web application into a native Android app using Capacitor, enabling distribution without Google Play Store deployment.

## Technology Decision: Capacitor vs Expo

### Selected Approach: **Capacitor**

**Rationale:**
- ✅ **100% Code Reuse**: Entire Next.js codebase can be wrapped as-is
- ✅ **Web-First**: App is already built in Next.js with web technologies
- ✅ **Simple Migration**: Static export + Capacitor plugins = native Android app
- ✅ **Existing Libraries**: Keep Recharts, Framer Motion, shadcn/ui, etc.
- ✅ **Team Skills**: Web developers don't need to learn React Native
- ✅ **Maintenance**: Single codebase for web AND mobile

**Expo Alternative** (Not chosen because):
- ❌ Requires complete rewrite in React Native
- ❌ Need separate web app development
- ❌ Would lose all existing Next.js infrastructure
- ❌ 3,298 lines of component code would need conversion
- ⚠️ Better for mobile-first apps, but this is web-first

---

## Current State Analysis

### Existing Codebase
- **Framework**: Next.js 16.0.0 + React 19.2.0
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **AI Integration**: Claude Sonnet 4.5 via Vercel AI SDK
- **State**: 22+ useState hooks, localStorage persistence
- **Main Component**: 3,298 lines (monolithic, needs refactoring)
- **Features**: 13 lessons, scoring, certificates, i18n (EN/FR)
- **Charts**: Recharts for data visualization
- **Tests**: None (needs comprehensive test suite)

### Migration Challenges
1. **localStorage** → Capacitor Preferences API
2. **DOM-based screenshots** → Capacitor Filesystem + Canvas
3. **Web sharing** → Android Share Intent
4. **Static export** → Disable SSR features
5. **Mobile UI** → Optimize responsive layouts
6. **Bundle size** → Tree shaking and code splitting
7. **Offline support** → Service worker + caching

---

## Architecture Overview

### Target Architecture: MVVM Pattern

```
┌─────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Welcome    │  │    Lesson    │  │ Certificate  │  │
│  │   Screen     │  │    Screen    │  │   Screen     │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│         ↓                  ↓                  ↓          │
│  ┌─────────────────────────────────────────────────┐   │
│  │         Shared UI Components (shadcn/ui)        │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                    STATE MANAGEMENT                      │
│  ┌─────────────────────────────────────────────────┐   │
│  │      React Context + Hooks (Custom Hooks)       │   │
│  │  - useGameState()  - useProgress()              │   │
│  │  - useAI()         - useCertificate()           │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                     BUSINESS LOGIC                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  Scoring     │  │  Evaluation  │  │  Navigation  │  │
│  │  Engine      │  │  Service     │  │  Controller  │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                      DATA LAYER                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Storage    │  │   AI API     │  │   Charts     │  │
│  │  (Capacitor) │  │  (Anthropic) │  │ (Recharts)   │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                   CAPACITOR NATIVE LAYER                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ Preferences  │  │  Filesystem  │  │    Share     │  │
│  │ SharedPrefs  │  │  (Android)   │  │   (Intent)   │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

## Component Refactoring Plan

### Current State: Monolithic (3,298 lines)
`PromptEngineeringGame.tsx` contains everything

### Target State: Modular Components

```
components/
├── screens/
│   ├── WelcomeScreen.tsx          # Welcome + difficulty selection
│   ├── LessonScreen.tsx           # Lesson content display
│   ├── ExerciseScreen.tsx         # Exercise input + submission
│   └── CertificateScreen.tsx      # Certificate generation + sharing
├── features/
│   ├── ai/
│   │   ├── AIResponseDisplay.tsx  # Streaming text display
│   │   ├── PromptInput.tsx        # User prompt input
│   │   └── EvaluationResults.tsx  # Score + feedback display
│   ├── charts/
│   │   ├── DynamicChart.tsx       # Recharts wrapper (exists)
│   │   └── ChartConfigurator.tsx  # Chart type selection
│   ├── certificate/
│   │   ├── CertificateShape.tsx   # Geometric animations
│   │   ├── SocialShare.tsx        # Native share integration
│   │   └── CertificateDownload.tsx # Screenshot generation
│   └── progress/
│       ├── ProgressBar.tsx        # Lesson progress
│       ├── ScoreDisplay.tsx       # Current score
│       └── MilestonePopup.tsx     # Achievement celebrations
├── layouts/
│   ├── AppLayout.tsx              # Root layout wrapper
│   └── LessonLayout.tsx           # Lesson-specific layout
├── hooks/
│   ├── useGameState.ts            # Game state management
│   ├── useProgress.ts             # Progress persistence
│   ├── useAI.ts                   # AI API integration
│   ├── useStorage.ts              # Capacitor Preferences wrapper
│   └── useCertificate.ts          # Certificate generation logic
└── lib/
    ├── capacitor/
    │   ├── storage.ts             # Preferences API wrapper
    │   ├── filesystem.ts          # File operations
    │   └── share.ts               # Native sharing
    ├── ai/
    │   ├── streaming.ts           # AI response streaming
    │   └── evaluation.ts          # Prompt evaluation
    └── scoring.ts                 # Scoring calculations
```

---

## Capacitor Integration

### Installation & Configuration

**1. Install Capacitor Core**
```bash
npm install @capacitor/core @capacitor/cli
npx cap init
# App name: Learn2Prompt
# Package ID: com.novagenlabs.learn2prompt
```

**2. Install Platform & Plugins**
```bash
npm install @capacitor/android
npm install @capacitor/preferences      # Storage
npm install @capacitor/filesystem       # File operations
npm install @capacitor/share           # Native sharing
npm install @capacitor/splash-screen   # Splash screen
npm install @capacitor/status-bar      # Status bar styling
npm install @capacitor/haptics         # Haptic feedback
```

**3. Next.js Configuration**
```typescript
// next.config.ts
const nextConfig = {
  output: 'export',              // Static export required
  images: {
    unoptimized: true,           // No image optimization API
  },
  trailingSlash: true,           // Better routing for Capacitor
  distDir: 'out',                // Build output directory
};
```

**4. Capacitor Configuration**
```json
// capacitor.config.ts
{
  "appId": "com.novagenlabs.learn2prompt",
  "appName": "Learn2Prompt",
  "webDir": "out",
  "bundledWebRuntime": false,
  "android": {
    "allowMixedContent": true,
    "backgroundColor": "#0D0D0D"
  },
  "plugins": {
    "SplashScreen": {
      "launchShowDuration": 2000,
      "backgroundColor": "#0D0D0D",
      "showSpinner": false
    }
  }
}
```

### API Routes Challenge

**Problem**: Capacitor uses static export, which doesn't support Next.js API routes

**Solutions**:
1. **Move AI logic to client-side** with Anthropic SDK
2. **Use external backend** (Firebase Functions, Vercel Serverless)
3. **Hybrid approach**: Keep web version with API routes, use direct SDK in mobile

**Recommended**: Option 3 (Hybrid)
- Web version: Uses `/api/messages` route (SSR)
- Mobile version: Uses `@anthropic-ai/sdk` directly
- Conditional logic based on platform detection

```typescript
// lib/ai/client.ts
import { Capacitor } from '@capacitor/core';

export const getAIClient = () => {
  if (Capacitor.isNativePlatform()) {
    // Direct Anthropic SDK for mobile
    return new AnthropicClient({ apiKey: MOBILE_API_KEY });
  } else {
    // Fetch API routes for web
    return new WebAIClient();
  }
};
```

---

## Storage Migration: localStorage → Capacitor Preferences

### Current Implementation
```typescript
// Saving
localStorage.setItem('learn2prompt-progress', JSON.stringify(progress));

// Loading
const saved = localStorage.getItem('learn2prompt-progress');
const progress = JSON.parse(saved);
```

### Capacitor Implementation
```typescript
import { Preferences } from '@capacitor/preferences';

// Saving
await Preferences.set({
  key: 'learn2prompt-progress',
  value: JSON.stringify(progress)
});

// Loading
const { value } = await Preferences.get({ key: 'learn2prompt-progress' });
const progress = value ? JSON.parse(value) : null;

// Clearing
await Preferences.remove({ key: 'learn2prompt-progress' });
```

### Unified Storage Hook
```typescript
// hooks/useStorage.ts
export const useStorage = () => {
  const isNative = Capacitor.isNativePlatform();

  const setItem = async (key: string, value: any) => {
    const stringValue = JSON.stringify(value);
    if (isNative) {
      await Preferences.set({ key, value: stringValue });
    } else {
      localStorage.setItem(key, stringValue);
    }
  };

  const getItem = async (key: string) => {
    if (isNative) {
      const { value } = await Preferences.get({ key });
      return value ? JSON.parse(value) : null;
    } else {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    }
  };

  return { setItem, getItem };
};
```

---

## Screenshot & Sharing

### Certificate Download (Web → Mobile)

**Current (Web)**:
```typescript
import domToImage from 'dom-to-image-more';

const downloadCertificate = () => {
  domToImage.toPng(certificateRef.current)
    .then(dataUrl => {
      const link = document.createElement('a');
      link.download = 'certificate.png';
      link.href = dataUrl;
      link.click();
    });
};
```

**New (Mobile)**:
```typescript
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import html2canvas from 'html2canvas';

const downloadCertificate = async () => {
  // 1. Generate canvas from DOM
  const canvas = await html2canvas(certificateRef.current);
  const base64 = canvas.toDataURL('image/png');

  if (Capacitor.isNativePlatform()) {
    // 2. Save to filesystem
    const fileName = `learn2prompt-certificate-${Date.now()}.png`;
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64.split(',')[1], // Remove data:image/png;base64,
      directory: Directory.Cache
    });

    // 3. Share via native dialog
    await Share.share({
      title: 'My Learn2Prompt Certificate',
      text: `I scored ${score}/210 on Learn2Prompt!`,
      url: savedFile.uri,
      dialogTitle: 'Share your achievement'
    });
  } else {
    // Web fallback (existing code)
    const link = document.createElement('a');
    link.download = 'certificate.png';
    link.href = base64;
    link.click();
  }
};
```

---

## Mobile UI Optimizations

### Responsive Design Enhancements

**1. Touch Targets**
- Minimum 44x44px for all interactive elements
- Increased spacing between buttons
- Larger textarea on mobile

**2. Typography Scaling**
```css
/* Mobile-first adjustments */
@media (max-width: 640px) {
  /* Reduce hero text */
  .hero-title { @apply text-4xl; }

  /* Increase body text readability */
  .lesson-content { @apply text-lg leading-relaxed; }

  /* Optimize certificate for small screens */
  .certificate-shape { @apply w-32 h-32; }
}
```

**3. Input Optimization**
```tsx
<textarea
  className="min-h-[120px] md:min-h-[200px] text-base md:text-sm"
  autoComplete="off"
  autoCorrect="off"
  spellCheck="false"
  inputMode="text"
/>
```

**4. Chart Responsiveness**
```tsx
<ResponsiveContainer width="100%" height={300}>
  <BarChart data={data} margin={{ top: 20, right: 10, left: 10, bottom: 20 }}>
    {/* Smaller margins on mobile */}
  </BarChart>
</ResponsiveContainer>
```

### Performance Optimizations

**1. Code Splitting**
```tsx
// Lazy load certificate screen
const CertificateScreen = dynamic(() => import('@/components/screens/CertificateScreen'), {
  loading: () => <LoadingSpinner />
});

// Lazy load Recharts
const DynamicChart = dynamic(() => import('@/components/features/charts/DynamicChart'), {
  ssr: false
});
```

**2. Image Optimization**
```tsx
// Replace Next.js Image with img tags (static export)
<img
  src="/logo.png"
  alt="Learn2Prompt"
  loading="lazy"
  width={120}
  height={120}
/>
```

**3. Bundle Analysis**
```bash
npm install -D @next/bundle-analyzer
```

---

## Testing Strategy

### Test Pyramid

```
            ┌─────────────┐
            │     E2E     │ (10%)
            │  Playwright │
            └─────────────┘
          ┌─────────────────┐
          │   Integration   │ (20%)
          │  React Testing  │
          │     Library     │
          └─────────────────┘
      ┌───────────────────────┐
      │        Unit           │ (70%)
      │  Vitest + Testing Lib │
      └───────────────────────┘
```

### Testing Tools

**Unit & Integration Tests**:
- **Vitest**: Fast, ESM-native test runner
- **React Testing Library**: Component testing
- **MSW**: API mocking

**E2E Tests**:
- **Playwright**: Cross-browser testing
- **Capacitor Test Runner**: Native platform testing

### Test Coverage Requirements

| Category | Target |
|----------|--------|
| **Business Logic** | 90%+ |
| **Hooks** | 85%+ |
| **Components** | 75%+ |
| **Integration** | 60%+ |
| **Overall** | 80%+ |

### Test Structure

```
__tests__/
├── unit/
│   ├── lib/
│   │   ├── scoring.test.ts
│   │   ├── evaluation.test.ts
│   │   └── storage.test.ts
│   └── hooks/
│       ├── useGameState.test.ts
│       ├── useProgress.test.ts
│       └── useAI.test.ts
├── integration/
│   ├── lesson-flow.test.tsx
│   ├── certificate-generation.test.tsx
│   └── storage-persistence.test.tsx
└── e2e/
    ├── complete-course.spec.ts
    ├── exercise-submission.spec.ts
    └── certificate-sharing.spec.ts
```

---

## Git Worktree Strategy

### Worktree Organization

```
prompt-game-next/              # Main branch
├── .git/
├── .worktrees/
│   ├── refactor-components/   # Component refactoring
│   ├── capacitor-setup/       # Capacitor integration
│   ├── storage-migration/     # Storage layer
│   ├── mobile-ui/             # UI optimizations
│   ├── ai-client/             # AI integration
│   ├── testing/               # Test suite
│   ├── certificate-native/    # Certificate features
│   └── performance/           # Performance optimization
```

### Workflow

1. Create worktree for feature
2. Assign to subagent
3. Subagent implements + tests
4. Review code
5. Merge to main
6. Delete worktree

```bash
# Create worktree
git worktree add -b feature/refactor-components .worktrees/refactor-components

# Work in worktree
cd .worktrees/refactor-components

# Merge when done
git checkout main
git merge feature/refactor-components

# Remove worktree
git worktree remove refactor-components
```

---

## Build & Deployment

### Development Workflow

```bash
# 1. Install dependencies
npm ci

# 2. Development (web)
npm run dev

# 3. Build static export
npm run build
# Outputs to /out

# 4. Sync with Capacitor
npx cap sync android

# 5. Open Android Studio
npx cap open android

# 6. Run on emulator/device
npx cap run android
```

### Production Build

```bash
# 1. Clean build
rm -rf .next out android/app/build

# 2. Production build
npm run build

# 3. Sync native code
npx cap sync android

# 4. Build release APK
npx cap run android --variant release

# Output: android/app/build/outputs/apk/release/app-release-unsigned.apk
```

### APK Signing (Optional)

For distribution outside Google Play:

```bash
# Generate keystore
keytool -genkey -v -keystore learn2prompt.keystore \
  -alias learn2prompt -keyalg RSA -keysize 2048 -validity 10000

# Sign APK
jarsigner -verbose -sigalg SHA256withRSA -digestalg SHA-256 \
  -keystore learn2prompt.keystore \
  app-release-unsigned.apk learn2prompt

# Verify signature
jarsigner -verify -verbose -certs app-release-unsigned.apk
```

---

## Implementation Phases

### Phase 1: Foundation (Week 1)
- ✅ Research complete
- ⬜ Git worktrees setup
- ⬜ Next.js static export configuration
- ⬜ Capacitor installation & initialization
- ⬜ Basic Android build working

### Phase 2: Refactoring (Week 2)
- ⬜ Component modularization (3,298 → ~300 per component)
- ⬜ Custom hooks extraction
- ⬜ Service layer creation
- ⬜ Unit tests for business logic

### Phase 3: Native Integration (Week 3)
- ⬜ Storage migration (Capacitor Preferences)
- ⬜ AI client abstraction
- ⬜ Filesystem integration
- ⬜ Share integration
- ⬜ Integration tests

### Phase 4: Mobile UX (Week 4)
- ⬜ Responsive layout optimizations
- ⬜ Touch target improvements
- ⬜ Performance optimizations
- ⬜ Offline support
- ⬜ Splash screen & icons

### Phase 5: Testing & QA (Week 5)
- ⬜ Comprehensive test suite
- ⬜ E2E test scenarios
- ⬜ Android emulator testing
- ⬜ Physical device testing
- ⬜ Performance profiling

### Phase 6: Polish & Release (Week 6)
- ⬜ Bug fixes
- ⬜ Code review
- ⬜ Documentation
- ⬜ APK generation
- ⬜ Distribution setup

---

## Success Criteria

### Functional Requirements
- ✅ All 13 lessons work perfectly
- ✅ AI evaluation scores correctly
- ✅ Certificate generation & sharing works
- ✅ Progress persists across sessions
- ✅ i18n (EN/FR) functions correctly
- ✅ Charts render properly

### Performance Requirements
- ⚡ App launches < 3 seconds
- ⚡ Lesson transitions < 500ms
- ⚡ AI responses stream smoothly
- ⚡ Bundle size < 5MB
- ⚡ 60 FPS scrolling

### Quality Requirements
- 🧪 80%+ test coverage
- 🧪 Zero critical bugs
- 🧪 All E2E scenarios pass
- 🧪 Works on Android 8.0+ (API 26+)
- 🧪 Works offline (except AI features)

### User Experience
- 📱 Touch-friendly interface
- 📱 Native-feeling interactions
- 📱 Proper error handling
- 📱 Loading states everywhere
- 📱 Smooth animations

---

## Risk Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| **API routes don't work in static export** | High | Use direct Anthropic SDK in mobile, platform detection |
| **Large bundle size** | Medium | Code splitting, tree shaking, lazy loading |
| **Recharts performance on mobile** | Medium | Optimize chart data, use memo, virtual scrolling |
| **localStorage doesn't persist** | Low | Migrate to Capacitor Preferences early |
| **Screenshot quality issues** | Low | Test html2canvas vs dom-to-image, optimize settings |
| **Android fragmentation** | Medium | Test on multiple devices/versions, use modern APIs |

---

## Next Steps

1. ✅ Research complete (Capacitor vs Expo)
2. ⬜ Set up git worktrees
3. ⬜ Launch refactoring subagent
4. ⬜ Launch Capacitor setup subagent
5. ⬜ Launch storage migration subagent
6. ⬜ Launch mobile UI subagent
7. ⬜ Launch testing subagent
8. ⬜ Coordinate integration
9. ⬜ Final QA & build

**Estimated Timeline**: 6 weeks to production-ready APK
**Team Size**: 5-7 subagents working in parallel
**Code Quality**: Enterprise-grade with comprehensive tests
