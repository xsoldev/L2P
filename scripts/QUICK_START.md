# Quick Start: Asset Generation

## TL;DR

Generate course icons in 3 steps:

```bash
# 1. Set API key
export OPENROUTER_API_KEY="your-key-here"

# 2. Run script
npm run generate-assets

# 3. Use generated prompts with image generator of choice
```

## What You Get

The script creates:
- ✅ **Prompt files** - Enhanced prompts for image generation
- ✅ **Placeholder SVGs** - Immediate use icons
- ✅ **Instructions** - Step-by-step guide for each course

## File Locations

```
public/assets/courses/
├── business-prompt.txt  ← Use this with DALL-E/Midjourney
├── business-icon.svg    ← Use this immediately
├── creative-prompt.txt
├── creative-icon.svg
├── kids-prompt.txt
├── kids-icon.svg
├── elderly-prompt.txt
└── elderly-icon.svg
```

## Next Steps

1. Open any `*-prompt.txt` file
2. Copy the enhanced prompt
3. Paste into [DALL-E](https://openai.com/dall-e) or [Midjourney](https://midjourney.com)
4. Generate 512×512 image
5. Save as the specified filename
6. Done!

## No API Key?

You can skip the script and use these prompts directly:

### Business Course
```
A clean, professional icon representing business and productivity.
Modern office setting with a laptop, documents, and coffee cup on a
minimalist desk. Soft blue and gray color scheme. Flat design style,
simple geometric shapes, professional atmosphere. High quality digital
illustration. 512x512, icon-style.
```

### Creative Course
```
A vibrant, artistic icon representing creativity and imagination.
Colorful paint palette with brushes, pencils, and artistic tools
arranged aesthetically. Bold pink, purple, and orange colors. Modern
flat design style with playful elements. High quality digital
illustration. 512x512, icon-style.
```

### Kids Course
```
A fun, playful icon representing adventure and learning for children.
Cartoon rocket ship flying through colorful stars and planets in space.
Bright orange, yellow, and blue colors. Friendly, whimsical style with
rounded shapes. Exciting and adventurous atmosphere. High quality
digital illustration. 512x512, icon-style.
```

### Elderly Course
```
A warm, accessible icon representing learning and knowledge. Open book
with soft lighting and reading glasses on a comfortable desk. Calm green
and warm neutral colors. Gentle, approachable design with soft edges.
Peaceful and inviting atmosphere. High quality digital illustration.
512x512, icon-style.
```

## Recommended Services

| Service | Cost | Quality | Link |
|---------|------|---------|------|
| DALL-E | $0.04/image | ⭐⭐⭐⭐⭐ | [openai.com/dall-e](https://openai.com/dall-e) |
| Leonardo.ai | Free tier | ⭐⭐⭐⭐ | [leonardo.ai](https://leonardo.ai) |
| Midjourney | $10/month | ⭐⭐⭐⭐⭐ | [midjourney.com](https://midjourney.com) |

## Common Issues

**"OPENROUTER_API_KEY not set"**
```bash
export OPENROUTER_API_KEY="sk-or-v1-..."
```

**"Can't find the script"**
```bash
# Make sure you're in the project root
cd /path/to/prompt-game-next
npm run generate-assets
```

**"Image looks wrong"**
- Try regenerating with the same prompt (different seed)
- Adjust the prompt in the txt file
- Try a different image generation service

## Full Documentation

See [ASSET_GENERATION_GUIDE.md](../ASSET_GENERATION_GUIDE.md) for complete documentation.
