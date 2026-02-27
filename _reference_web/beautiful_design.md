# Beautiful Design System Documentation
*Human-Centered Design Principles for Prompt Engineering Game*

---

## 🎯 Core Philosophy

**Key Principle:** Avoid AI-generated design patterns by using intentional asymmetry, authentic voice, and purposeful visual choices.

### What We Avoid (AI Tells)
- ❌ Gradient orbs/blurred backgrounds
- ❌ Uniform rounded corners everywhere
- ❌ Perfect symmetry and centering
- ❌ Generic marketing copy
- ❌ Emoji overuse (📋 💡 ✨)
- ❌ Cookie-cutter card patterns
- ❌ Predictable spacing (everything px-8, py-4)
- ❌ Same shadow on everything

### What We Embrace
- ✅ Asymmetric layouts with purpose
- ✅ Mixed hard/soft edges
- ✅ Authentic, direct language
- ✅ Intentional visual hierarchy
- ✅ Varied spacing and rhythm
- ✅ Strategic use of brand color

---

## 🎨 Color Palette

### Primary Colors
```css
--novagen-blue: #70BEFA     /* Primary brand color - use sparingly */
--novagen-blue-dark: #5AAFED  /* Hover states, secondary elements */
--novagen-blue-light: #8CCFFD /* Accents, highlights */
--novagen-blue-darker: #4A9FE0 /* Deep accents */
```

### Background Colors
```css
--bg-primary: #0D0D0D       /* Main background - very dark */
--bg-secondary: #1A1A1A     /* Cards, elevated surfaces */
--bg-tertiary: #0D0D0D      /* Nested elements */
```

### Text Colors
```css
--text-primary: #FFFFFF      /* Headings, primary text */
--text-secondary: #9CA3AF    /* Body text (gray-400) */
--text-tertiary: #6B7280     /* Subtle text (gray-500) */
--text-muted: rgba(0,0,0,0.6) /* On light backgrounds */
```

### Border Colors
```css
--border-default: rgba(112, 190, 250, 0.2)  /* #70BEFA/20 - subtle */
--border-accent: #70BEFA                     /* Full opacity for emphasis */
--border-subtle: #374151                     /* gray-700 for dividers */
```

---

## 📐 Layout Principles

### Grid System

**Asymmetric 12-Column Layout:**
```tsx
// Primary content: 7 columns (58%)
<div className="md:col-span-7">

// Secondary/CTA: 5 columns (42%)
<div className="md:col-span-5">
```

**Why:** Creates visual tension and interest. Not boring 50/50 or 100% centered.

### Spacing Scale
```css
/* Avoid uniform spacing - vary intentionally */
--space-xs: 0.25rem   /* 4px - tight spacing */
--space-sm: 0.5rem    /* 8px - compact */
--space-md: 1rem      /* 16px - normal */
--space-lg: 1.5rem    /* 24px - comfortable */
--space-xl: 2rem      /* 32px - spacious */
--space-2xl: 3rem     /* 48px - section breaks */
--space-3xl: 4rem     /* 64px - major sections */
```

### Container Widths
```css
--container-sm: 768px
--container-md: 1024px
--container-lg: 1280px
--container-xl: 1536px

/* Our choice: max-w-6xl (1152px) for main content */
```

---

## 🔤 Typography

### Font Stack
```css
font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
             Roboto, sans-serif;
font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace; /* for labels */
```

### Heading Scale
```tsx
// Hero/Display - Left aligned, tight tracking
<h1 className="text-6xl md:text-7xl font-bold leading-[1.1] tracking-tight">

// Section Headers - Strong hierarchy
<h2 className="text-3xl md:text-4xl font-bold">

// Subsection Headers
<h3 className="text-xl font-bold">

// Card Titles
<h4 className="text-lg font-semibold">

// Labels - Monospace, uppercase, tracked
<span className="text-sm font-mono tracking-wider uppercase">
```

### Body Text
```tsx
// Primary body
<p className="text-xl text-gray-400 leading-relaxed">

// Secondary body
<p className="text-base text-gray-300 leading-relaxed">

// Small text
<p className="text-sm text-gray-500">

// Micro copy
<p className="text-xs text-gray-500">
```

### Typography Rules
1. **Vary line-height intentionally**
   - Headings: `leading-[1.1]` or `leading-tight`
   - Body: `leading-relaxed`

2. **Use tracking strategically**
   - Hero: `tracking-tight` (-0.025em)
   - Monospace labels: `tracking-wider` (0.05em)
   - Never track body text

3. **Semantic weight hierarchy**
   - Display: `font-bold` (700)
   - Headers: `font-semibold` (600)
   - Body: `font-normal` (400)

---

## 🎴 Card Patterns

### Standard Card
```tsx
<Card className="bg-[#1A1A1A] border-[#70BEFA]/20">
  <CardContent className="p-6">
    {/* Content */}
  </CardContent>
</Card>
```

### Accent Border Card (Left)
```tsx
<Card className="bg-[#1A1A1A] border-l-4 border-l-[#70BEFA]
                 border-r-0 border-t-0 border-b-0
                 rounded-none rounded-r-lg">
```
**Purpose:** Directional emphasis, breaks uniformity

### Inverted Card (Bright CTA)
```tsx
<Card className="bg-[#70BEFA] border-0">
  <CardContent className="p-8">
    {/* Dark text on bright background */}
    <div className="text-black font-bold">
  </CardContent>
</Card>
```
**Purpose:** High-impact CTAs, unexpected visual break

### Sticky CTA Pattern
```tsx
<Card className="sticky top-8">
  {/* Stays in view while scrolling */}
</Card>
```

---

## 🎭 Border & Edge Styles

### Border Radius Rules

**DO:**
- Mix rounded and sharp edges
- `rounded-lg` (0.5rem) for cards
- `rounded-r-lg` for directional emphasis
- `rounded-none` when paired with border accent

**DON'T:**
- Use `rounded-3xl` everywhere
- Make everything round
- Use same radius throughout

### Border Patterns

**Hover-Sensitive Borders:**
```tsx
<div className="border-l-2 border-gray-700 pl-4
                hover:border-[#70BEFA] transition-colors">
```

**Accent Borders:**
```tsx
// Left emphasis (directional)
className="border-l-4 border-l-[#70BEFA]"

// Subtle all-around
className="border border-[#70BEFA]/20"

// No border (when using background contrast)
className="border-0"
```

---

## ✨ Interaction States

### Button States
```tsx
// Primary CTA
<Button className="bg-gradient-to-r from-[#70BEFA] to-[#5AAFED]
                   hover:shadow-lg hover:shadow-[#70BEFA]/50
                   hover:scale-105 transition-all duration-200">

// Inverted (on bright background)
<Button className="bg-black text-white hover:bg-black/90">

// Ghost/Outline
<Button variant="outline" className="border-[#70BEFA]/30
                                    text-gray-300
                                    hover:border-[#70BEFA]">
```

### Micro-interactions

**Hover Translation:**
```tsx
<ArrowRight className="w-5 h-5 ml-2
                      group-hover:translate-x-1
                      transition-transform" />
```

**Border Color Shift:**
```tsx
className="border-l-2 border-gray-700
           hover:border-[#70BEFA]
           transition-colors"
```

**Scale on Hover:**
```tsx
className="hover:scale-105 transition-all duration-200"
```

**Subtle Shadow Growth:**
```tsx
className="shadow-lg shadow-[#70BEFA]/50
           hover:shadow-[#70BEFA]/70"
```

---

## 📝 Content Voice & Copy

### Writing Principles

**BE DIRECT:**
- ✅ "Write prompts that actually work"
- ❌ "Master AI Prompting"

**BE HONEST:**
- ✅ "When you mess up (and you will)"
- ❌ "Perfect results every time"

**BE SPECIFIC:**
- ✅ "One clear step beats ten vague instructions"
- ❌ "Learn best practices"

**BE CONVERSATIONAL:**
- ✅ "You'll write real prompts and see actual AI responses"
- ❌ "Leverage cutting-edge AI technology"

### Label Patterns

**Monospace Tags:**
```tsx
<span className="text-sm font-mono text-[#70BEFA]
                 tracking-wider uppercase">
  INTERACTIVE COURSE
</span>
```

**Metadata:**
```tsx
<span className="flex items-center gap-1 text-sm text-gray-500">
  <Icon className="w-4 h-4" />
  ~30 min
</span>
```

---

## 🏗️ Layout Patterns

### Hero Section (Left-Aligned)
```tsx
<div className="max-w-6xl mx-auto pt-12 md:pt-20">
  <div className="mb-16 max-w-2xl">
    {/* Label */}
    <div className="inline-block mb-6">
      <div className="flex items-center gap-2 text-[#70BEFA]
                      text-sm font-mono tracking-wider">
        <div className="w-2 h-2 bg-[#70BEFA] rounded-sm"></div>
        INTERACTIVE COURSE
      </div>
    </div>

    {/* Hero Title */}
    <h1 className="text-6xl md:text-7xl font-bold text-white
                   mb-6 leading-[1.1] tracking-tight">
      Write prompts
      <br />
      <span className="text-[#70BEFA]">that actually work</span>
    </h1>

    {/* Subtitle */}
    <p className="text-xl text-gray-400 leading-relaxed">
      Most people write vague prompts and get vague results.
      This course teaches you the three principles that change everything.
    </p>
  </div>
</div>
```

### Asymmetric Grid Content
```tsx
<div className="grid md:grid-cols-12 gap-6 mb-16">
  {/* Left: Primary content (7 cols) */}
  <div className="md:col-span-7 space-y-6">
    <Card>...</Card>
    <Card>...</Card>
  </div>

  {/* Right: CTA (5 cols) */}
  <div className="md:col-span-5">
    <Card className="sticky top-8">...</Card>
  </div>
</div>
```

---

## 🎪 Visual Accents

### Square Accent Dot
```tsx
<div className="w-2 h-2 bg-[#70BEFA] rounded-sm"></div>
```
**Purpose:** Simple, geometric - not overused gradients

### Separator Usage
```tsx
<Separator className="my-6 bg-black/20" />
```
**On light backgrounds:**
```tsx
<Separator className="my-6 bg-gray-800" />
```

### Badge Styling
```tsx
// Score badge
<Badge variant="secondary"
       className="bg-gradient-to-br from-[#8CCFFD] to-[#70BEFA]
                  text-white px-3 py-2 shadow-lg shadow-[#70BEFA]/30">

// Outline badge
<Badge variant="outline"
       className="text-gray-400 border-[#70BEFA]/30">
```

---

## 📊 Component Examples

### Principle List Pattern
```tsx
<div className="space-y-4">
  <div className="border-l-2 border-gray-700 pl-4
                  hover:border-[#70BEFA] transition-colors">
    <h4 className="text-white font-semibold mb-1">Break it down</h4>
    <p className="text-gray-400 text-sm">
      One clear step beats ten vague instructions
    </p>
  </div>
  {/* Repeat pattern */}
</div>
```

### Metadata Row
```tsx
<div className="flex items-center gap-4 text-sm text-gray-500">
  <span className="flex items-center gap-1">
    <Book className="w-4 h-4" />
    3 lessons
  </span>
  <span className="flex items-center gap-1">
    <Target className="w-4 h-4" />
    4 exercises
  </span>
  <span className="flex items-center gap-1">
    <Zap className="w-4 h-4" />
    ~30 min
  </span>
</div>
```

### CTA Card Pattern
```tsx
<Card className="bg-[#70BEFA] border-0 sticky top-8">
  <CardContent className="p-8">
    {/* Large number */}
    <div className="mb-6">
      <div className="text-5xl font-bold text-black mb-2">150</div>
      <div className="text-black/70 text-sm">points to earn</div>
    </div>

    <Separator className="my-6 bg-black/20" />

    {/* Black button on bright background */}
    <Button className="w-full bg-black text-white
                       hover:bg-black/90 font-semibold py-6 group">
      Start course
      <ArrowRight className="w-5 h-5 ml-2
                            group-hover:translate-x-1
                            transition-transform" />
    </Button>

    {/* Trust builder */}
    <p className="text-black/60 text-xs mt-4 text-center">
      Free • No signup required
    </p>
  </CardContent>
</Card>
```

---

## 🚫 Anti-Patterns (What NOT to Do)

### Visual
1. **Gradient Orbs Everywhere**
   ```tsx
   // ❌ DON'T
   <div className="absolute top-0 left-0 w-96 h-96
                   bg-[#70BEFA] rounded-full blur-3xl
                   opacity-10 animate-pulse"></div>
   ```

2. **Uniform Shadows**
   ```tsx
   // ❌ DON'T - Same shadow on every card
   className="shadow-lg shadow-[#70BEFA]/50"
   ```

   ```tsx
   // ✅ DO - Vary or omit shadows
   className="shadow-lg" // default
   className="border border-[#70BEFA]/20" // or just border
   ```

3. **Perfect Symmetry**
   ```tsx
   // ❌ DON'T
   <div className="text-center max-w-3xl mx-auto">

   // ✅ DO
   <div className="max-w-2xl"> // Left-aligned
   ```

### Typography
1. **Generic Headlines**
   - ❌ "Master AI Prompting"
   - ❌ "Learn to communicate with AI like a pro"
   - ❌ "Unlock the power of prompts"

   - ✅ "Write prompts that actually work"
   - ✅ "Three principles that change everything"

2. **Marketing Speak**
   - ❌ "Leverage cutting-edge technology"
   - ❌ "Revolutionary approach"
   - ❌ "Unlock your potential"

   - ✅ "When you mess up (and you will)"
   - ✅ "Most people write vague prompts"
   - ✅ "See actual AI responses"

### Layout
1. **Everything Centered**
   ```tsx
   // ❌ DON'T
   <div className="flex items-center justify-center">
     <div className="text-center">
   ```

2. **Same Card Style**
   ```tsx
   // ❌ DON'T - All cards identical
   <Card className="rounded-2xl border-[#70BEFA]/20">
   ```

   ```tsx
   // ✅ DO - Mix it up
   <Card className="border-l-4 border-l-[#70BEFA] rounded-none rounded-r-lg">
   <Card className="bg-[#70BEFA] border-0">
   <Card className="border-[#70BEFA]/20 rounded-lg">
   ```

---

## 🎯 Implementation Checklist

When designing a new page/section, ensure:

- [ ] Layout is **asymmetric** (not centered or 50/50)
- [ ] Copy is **direct and honest** (no marketing fluff)
- [ ] Cards have **varied styles** (not all the same)
- [ ] Borders are **mixed** (some left, some all-around, some none)
- [ ] Typography has **clear hierarchy** (varied sizes and weights)
- [ ] Spacing is **intentional** (not uniform everywhere)
- [ ] Color is used **strategically** (not gradients everywhere)
- [ ] Hover states are **unique** (different per element type)
- [ ] Icons are used **sparingly** (not decorating everything)
- [ ] No generic **gradient orbs** in background

---

## 📦 Reusable Patterns

### Pattern: Left-Accent Card
```tsx
<Card className="bg-[#1A1A1A] border-l-4 border-l-[#70BEFA]
                 border-r-0 border-t-0 border-b-0
                 rounded-none rounded-r-lg">
  <CardContent className="p-6">
    <h3 className="text-sm font-mono text-[#70BEFA]
                   mb-4 tracking-wider uppercase">
      SECTION LABEL
    </h3>
    {/* Content */}
  </CardContent>
</Card>
```

### Pattern: Hover-Responsive List
```tsx
<div className="space-y-4">
  {items.map(item => (
    <div key={item.id}
         className="border-l-2 border-gray-700 pl-4
                    hover:border-[#70BEFA] transition-colors
                    cursor-pointer">
      <h4 className="text-white font-semibold">{item.title}</h4>
      <p className="text-gray-400 text-sm">{item.desc}</p>
    </div>
  ))}
</div>
```

### Pattern: Sticky CTA Sidebar
```tsx
<div className="md:col-span-5">
  <Card className="bg-[#70BEFA] border-0 sticky top-8">
    <CardContent className="p-8">
      {/* Large metric */}
      <div className="text-5xl font-bold text-black">{value}</div>
      <div className="text-black/70 text-sm">{label}</div>

      <Separator className="my-6 bg-black/20" />

      {/* Inverted button */}
      <Button className="w-full bg-black text-white
                         hover:bg-black/90">
        {action}
      </Button>

      {/* Trust signal */}
      <p className="text-black/60 text-xs mt-4 text-center">
        {trustMessage}
      </p>
    </CardContent>
  </Card>
</div>
```

---

## 🎨 Quick Reference

### Most Used Classes
```css
/* Backgrounds */
bg-[#0D0D0D]       /* Main page background */
bg-[#1A1A1A]       /* Card backgrounds */
bg-[#70BEFA]       /* Accent/CTA backgrounds */

/* Text */
text-white         /* Primary headings */
text-gray-400      /* Body text */
text-gray-500      /* Meta text */
text-[#70BEFA]     /* Brand color text */

/* Borders */
border-[#70BEFA]/20    /* Subtle borders */
border-[#70BEFA]       /* Accent borders */
border-gray-700        /* Neutral dividers */
border-l-4             /* Left emphasis */

/* Spacing */
space-y-4          /* Vertical stack spacing */
gap-6              /* Grid/flex gap */
p-6                /* Card padding */
mb-16              /* Section margin */

/* Typography */
text-6xl md:text-7xl font-bold leading-[1.1] tracking-tight  /* Hero */
text-sm font-mono tracking-wider uppercase                   /* Labels */
text-xl text-gray-400 leading-relaxed                        /* Body */
```

---

## 🔄 Applying to Other Pages

To maintain consistency across the app:

1. **Start with layout structure** - use 12-column grid with 7/5 or 8/4 split
2. **Add content with hierarchy** - monospace labels, large headings, body text
3. **Style cards intentionally** - mix border styles, don't make all the same
4. **Add micro-interactions** - hover states should feel unique per element
5. **Review copy** - remove generic phrases, be direct and honest
6. **Check spacing rhythm** - vary spacing, don't use same padding everywhere
7. **Test visual balance** - should feel intentional, not template-y

---

*This design system prioritizes authenticity over AI-generated perfection. Every choice should feel purposeful and human.*
