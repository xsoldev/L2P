# Asset Generation Guide

This guide explains how to generate professional course icons for the Prompt Game application using AI image generation.

## Overview

The project includes automated scripts to help generate high-quality course icons that replace the default emoji icons. The process uses OpenRouter API to create optimized image generation prompts, which can then be used with various image generation services.

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up API Key

Get your OpenRouter API key from [OpenRouter](https://openrouter.ai/keys) and set it as an environment variable:

```bash
export OPENROUTER_API_KEY="your-api-key-here"
```

Or add it to your `.env.local` file:

```bash
echo "OPENROUTER_API_KEY=your-api-key-here" >> .env.local
```

### 3. Run the Script

```bash
npm run generate-assets
```

This will:
- Generate enhanced image prompts for all 4 courses
- Create placeholder SVG icons (immediately usable)
- Save prompt files with instructions for image generation

### 4. Generate Images

Use the generated prompts (in `public/assets/courses/*-prompt.txt`) with your preferred image generation service to create the final PNG images.

## Detailed Instructions

### Available Scripts

#### JavaScript Version (Default)
```bash
npm run generate-assets
# or
node scripts/generate-assets.js
```

#### TypeScript Version
```bash
tsx scripts/generate-assets.ts
```

Both versions produce identical output. Use the TypeScript version if you prefer type safety during development.

### Course Themes

The script generates assets for 4 courses:

#### 1. Business Prompting
- **Theme**: Professional productivity and business tools
- **Colors**: Blue (#007AFF) and gray
- **Style**: Clean, modern, minimalist
- **Elements**: Laptop, documents, office setting
- **Target**: Professional users

#### 2. Creative Prompting
- **Theme**: Artistic creativity and imagination
- **Colors**: Pink (#FF2D55), purple, orange
- **Style**: Vibrant, playful, artistic
- **Elements**: Paint palette, brushes, creative tools
- **Target**: Creative professionals

#### 3. AI Adventures (Kids)
- **Theme**: Fun exploration and learning
- **Colors**: Orange (#FF9500), yellow, blue
- **Style**: Cartoon, whimsical, exciting
- **Elements**: Rocket ship, stars, planets
- **Target**: Children (8-14)

#### 4. AI Made Simple (Elderly)
- **Theme**: Accessible learning and knowledge
- **Colors**: Green (#34C759), warm neutrals
- **Style**: Gentle, approachable, calm
- **Elements**: Open book, reading glasses, desk
- **Target**: Seniors (65+)

### Output Files

After running the script, you'll find these files in `/public/assets/courses/`:

```
public/assets/courses/
├── business-prompt.txt      # Enhanced prompt for business course
├── business-icon.svg        # Placeholder SVG (immediate use)
├── creative-prompt.txt      # Enhanced prompt for creative course
├── creative-icon.svg        # Placeholder SVG
├── kids-prompt.txt          # Enhanced prompt for kids course
├── kids-icon.svg            # Placeholder SVG
├── elderly-prompt.txt       # Enhanced prompt for elderly course
└── elderly-icon.svg         # Placeholder SVG
```

### Using the Generated Prompts

Each `*-prompt.txt` file contains:
1. The enhanced image generation prompt
2. Instructions for image generation
3. Recommended services
4. Filename and location for saving

#### Recommended Image Generation Services

**1. DALL-E (OpenAI)**
- Website: https://openai.com/dall-e
- Cost: ~$0.04 per image (1024×1024)
- Quality: Excellent
- Best for: Professional, realistic images

**2. Midjourney**
- Website: https://www.midjourney.com
- Cost: $10/month subscription
- Quality: Outstanding artistic quality
- Best for: Creative, artistic styles

**3. Stable Diffusion**
- Website: https://stablediffusion.com
- Cost: Free (self-hosted) or ~$0.01/image
- Quality: Very good
- Best for: Open-source, customizable

**4. Leonardo.ai**
- Website: https://leonardo.ai
- Cost: Free tier available
- Quality: Good
- Best for: Budget-friendly option

### Generating Images - Step by Step

#### Using DALL-E (Recommended)

1. Go to https://platform.openai.com/
2. Navigate to the DALL-E section
3. Copy the enhanced prompt from the `*-prompt.txt` file
4. Paste into DALL-E's prompt field
5. Select image size: 1024×1024 (will be resized to 512×512)
6. Generate the image
7. Download and save as specified filename
8. Place in `public/assets/courses/`

#### Using Midjourney (Discord)

1. Join Midjourney Discord server
2. Use `/imagine` command
3. Paste the enhanced prompt
4. Add parameters: `--ar 1:1 --quality 2`
5. Select the best variation
6. Upscale and download
7. Resize to 512×512 if needed
8. Save with specified filename

#### Using Stable Diffusion (DreamStudio)

1. Go to https://beta.dreamstudio.ai/
2. Paste the enhanced prompt
3. Set dimensions to 512×512
4. Adjust quality settings (50-75 steps)
5. Generate image
6. Download and save with specified filename

### Image Specifications

All course icons should follow these specifications:

- **Format**: PNG
- **Size**: 512×512 pixels
- **Color Mode**: RGB
- **Compression**: Optimized for web
- **Background**: Can be transparent or colored (as appropriate)
- **Style**: Consistent with course theme

### Optimizing Generated Images

After generating images, optimize them:

#### Using ImageOptim (Mac)
```bash
brew install imageoptim
imageoptim public/assets/courses/*.png
```

#### Using TinyPNG
1. Go to https://tinypng.com/
2. Upload generated images
3. Download optimized versions

#### Using Command Line (ImageMagick)
```bash
# Install ImageMagick
brew install imagemagick

# Optimize all PNG files
for file in public/assets/courses/*.png; do
  convert "$file" -strip -quality 85 "$file"
done
```

### Placeholder SVG Icons

The script automatically generates placeholder SVG icons that can be used immediately in development. These feature:

- Course-specific brand colors
- Emoji representing the course theme
- 512×512 size
- Scalable vector format
- Zero file size impact

To use placeholders in production until real images are generated:

```tsx
// In your component
<img
  src="/assets/courses/business-icon.svg"
  alt="Business Course"
  width={512}
  height={512}
/>
```

### Updating Course Configurations

To customize prompts or add new courses, edit `scripts/generate-assets.js`:

```javascript
const COURSES = {
  yourcourse: {
    name: 'Your Course Name',
    prompt: 'Detailed description for image generation...',
    filename: 'yourcourse-icon.png'
  },
  // ... existing courses
};
```

Then update the color and emoji mappings:

```javascript
const courseColors = {
  yourcourse: '#YOUR_HEX_COLOR',
  // ... existing courses
};

const courseEmojis = {
  yourcourse: '🎯',
  // ... existing courses
};
```

## Troubleshooting

### Error: OPENROUTER_API_KEY not set

**Problem**: Environment variable not configured

**Solution**:
```bash
export OPENROUTER_API_KEY="your-key-here"
```

### Error: API request failed

**Problem**: Invalid API key or no credits

**Solutions**:
- Verify API key at https://openrouter.ai/keys
- Check account credits/billing
- Wait a moment and retry (rate limiting)

### Error: Cannot create directory

**Problem**: Permission issues

**Solution**:
```bash
sudo chmod -R 755 public/assets
mkdir -p public/assets/courses
```

### Generated images are low quality

**Solutions**:
- Use higher quality settings in image generator
- Try a different image generation service
- Enhance the prompt with more details
- Generate at higher resolution then downscale

### Images don't match the theme

**Solutions**:
- Regenerate with modified prompts
- Try different variations in the image generator
- Add more specific details to the prompt
- Use negative prompts to exclude unwanted elements

## Best Practices

### 1. Consistency
- Maintain similar visual style across all course icons
- Use consistent lighting and perspective
- Keep the same level of detail

### 2. Accessibility
- Ensure good contrast for visibility
- Test at different sizes
- Verify readability on both light and dark backgrounds

### 3. Branding
- Align with overall application design
- Use brand colors where appropriate
- Maintain professional appearance

### 4. File Management
- Keep original high-resolution versions
- Maintain a backup of generated images
- Version control the prompt files
- Document any custom modifications

## Advanced Usage

### Batch Generation

To regenerate all assets:

```bash
npm run generate-assets
```

### Custom Prompts

For one-off custom prompts:

```javascript
// Create custom-prompt.js
const customPrompt = "Your custom image description...";
// Use the makeOpenRouterRequest function
```

### Integration with CI/CD

Add to your deployment pipeline:

```yaml
# .github/workflows/assets.yml
name: Generate Assets
on:
  workflow_dispatch:
jobs:
  generate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm install
      - run: npm run generate-assets
        env:
          OPENROUTER_API_KEY: ${{ secrets.OPENROUTER_API_KEY }}
      - uses: actions/upload-artifact@v2
        with:
          name: course-assets
          path: public/assets/courses/
```

## Cost Estimation

### OpenRouter API (Prompt Generation)
- Model: GPT-4o
- Cost per course: ~$0.01-0.03
- Total for 4 courses: < $0.15

### Image Generation
- DALL-E: $0.04/image × 4 = $0.16
- Midjourney: $10/month (unlimited)
- Stable Diffusion: Free (self-hosted)
- Leonardo.ai: Free tier available

**Total estimated cost**: $0.31 - $10 (one-time)

## Contributing

To improve the asset generation process:

1. Test with different image generation services
2. Share optimized prompts that work well
3. Suggest improvements to the script
4. Submit better placeholder designs

## Resources

- [OpenRouter Documentation](https://openrouter.ai/docs)
- [DALL-E Best Practices](https://platform.openai.com/docs/guides/images)
- [Midjourney Documentation](https://docs.midjourney.com/)
- [Stable Diffusion Guide](https://stable-diffusion-art.com/)
- [Image Optimization Guide](https://web.dev/fast/#optimize-your-images)

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the generated `*-prompt.txt` files
3. Verify your API key and credits
4. Open an issue on the project repository

## License

This asset generation system is part of the Prompt Game project and follows the same license terms.
