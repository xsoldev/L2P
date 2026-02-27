# Asset Generation Scripts

This directory contains scripts for generating and managing assets for the Prompt Game application.

## generate-assets.js

Generates course icons and images using AI image generation services via OpenRouter API.

### Overview

The script creates optimized image generation prompts for each course theme and generates placeholder SVG images that can be used immediately. The enhanced prompts can then be used with various image generation services to create professional course icons.

### Prerequisites

1. **OpenRouter API Key**: Get your API key from [OpenRouter](https://openrouter.ai/keys)
2. **Node.js**: Version 20.9.0 or higher

### Setup

1. Set your OpenRouter API key as an environment variable:

```bash
export OPENROUTER_API_KEY="your-api-key-here"
```

Or create a `.env.local` file in the project root:

```env
OPENROUTER_API_KEY=your-api-key-here
```

### Usage

Run the script using npm:

```bash
npm run generate-assets
```

Or directly with node:

```bash
node scripts/generate-assets.js
```

### What the Script Does

1. **Generates Enhanced Prompts**: Uses OpenRouter API (GPT-4) to create detailed, optimized prompts for image generation
2. **Creates Prompt Files**: Saves enhanced prompts to text files with instructions for manual image generation
3. **Creates Placeholder SVGs**: Generates immediate-use SVG icons with course colors and emojis

### Output

The script creates files in `/public/assets/courses/`:

#### For Each Course:
- `{course}-prompt.txt` - Enhanced image generation prompt with instructions
- `{course}-icon.svg` - Placeholder SVG icon (immediately usable)

#### Course Themes:

**Business Prompting** (`business`)
- Theme: Professional, clean office/productivity imagery
- Colors: Blue and gray (#007AFF)
- Icon: 💼

**Creative Prompting** (`creative`)
- Theme: Artistic, colorful creative tools imagery
- Colors: Pink and vibrant (#FF2D55)
- Icon: 🎨

**AI Adventures** (`kids`)
- Theme: Fun, playful, adventure-themed imagery
- Colors: Orange and bright (#FF9500)
- Icon: 🚀

**AI Made Simple** (`elderly`)
- Theme: Warm, accessible, book/learning imagery
- Colors: Green and warm neutrals (#34C759)
- Icon: 📚

### Generating Final Images

After running the script, follow these steps:

1. **Check the prompt files** in `/public/assets/courses/`
2. **Use the enhanced prompts** with one of these services:
   - [DALL-E](https://openai.com/dall-e) - OpenAI's image generator
   - [Midjourney](https://www.midjourney.com) - High-quality AI art
   - [Stable Diffusion](https://stablediffusion.com) - Open-source option
   - [Leonardo.ai](https://leonardo.ai) - Free tier available
3. **Generate 512x512 images** using the prompts
4. **Save images** with the specified filenames in `/public/assets/courses/`

### Example Workflow

```bash
# 1. Set API key
export OPENROUTER_API_KEY="sk-or-v1-..."

# 2. Run the script
npm run generate-assets

# 3. Check the output
ls -la public/assets/courses/

# Output:
# business-prompt.txt
# business-icon.svg
# creative-prompt.txt
# creative-icon.svg
# kids-prompt.txt
# kids-icon.svg
# elderly-prompt.txt
# elderly-icon.svg

# 4. Use the prompts in your preferred image generation service
# 5. Save generated images as:
#    - business-icon.png
#    - creative-icon.png
#    - kids-icon.png
#    - elderly-icon.png
```

### Placeholder Images

The generated SVG placeholders can be used immediately in development. They feature:
- Course-specific colors matching the theme
- Emoji icons representing each course
- 512x512 size optimized for thumbnails
- Clean, minimal design

### Error Handling

The script includes comprehensive error handling:
- Validates API key before execution
- Creates output directories if they don't exist
- Falls back to placeholder generation if API fails
- Provides clear error messages
- Includes rate limiting between requests

### Troubleshooting

**Error: OPENROUTER_API_KEY not set**
- Solution: Set the environment variable with your OpenRouter API key

**Error: API request failed**
- Check your API key is valid
- Verify you have credits on your OpenRouter account
- Check your internet connection

**Error: Cannot create directory**
- Check file system permissions
- Ensure you're in the correct project directory

### Configuration

To customize the script, edit the configuration in `generate-assets.js`:

```javascript
// Image size
const IMAGE_SIZE = '512x512';

// Course configurations
const COURSES = {
  // Add or modify course configurations
};
```

### API Costs

Using OpenRouter API:
- GPT-4 for prompt enhancement: ~$0.01-0.03 per course
- Total cost for all 4 courses: < $0.15

Note: The script only generates prompts via API. Actual image generation must be done separately using the generated prompts.

### Future Enhancements

Potential improvements:
- Direct integration with image generation APIs (DALL-E, Stable Diffusion)
- Batch image generation
- Automatic image optimization and compression
- Support for multiple image sizes
- Custom course configurations via CLI arguments

### Support

For issues or questions:
1. Check the error messages in the console output
2. Review the generated prompt files for manual image generation
3. Verify your API key and credits at [OpenRouter](https://openrouter.ai)

### License

This script is part of the Prompt Game project.
