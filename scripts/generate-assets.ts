#!/usr/bin/env tsx

/**
 * Asset Generation Script for Prompt Game (TypeScript version)
 * Generates course icons/images using OpenRouter API
 *
 * Usage: tsx scripts/generate-assets.ts
 * Requires: OPENROUTER_API_KEY environment variable
 */

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Types
interface CourseConfig {
  name: string;
  prompt: string;
  filename: string;
}

interface OpenRouterResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

// Configuration
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'assets', 'courses');
const IMAGE_SIZE = '512x512';

// Course configurations with detailed prompts
const COURSES: Record<string, CourseConfig> = {
  business: {
    name: 'Business Prompting',
    prompt: 'A clean, professional icon representing business and productivity. Modern office setting with a laptop, documents, and coffee cup on a minimalist desk. Soft blue and gray color scheme. Flat design style, simple geometric shapes, professional atmosphere. High quality digital illustration.',
    filename: 'business-icon.png'
  },
  creative: {
    name: 'Creative Prompting',
    prompt: 'A vibrant, artistic icon representing creativity and imagination. Colorful paint palette with brushes, pencils, and artistic tools arranged in an aesthetically pleasing composition. Bold pink, purple, and orange colors. Modern flat design style with playful elements. High quality digital illustration.',
    filename: 'creative-icon.png'
  },
  kids: {
    name: 'AI Adventures',
    prompt: 'A fun, playful icon representing adventure and learning for children. Cartoon rocket ship flying through colorful stars and planets in space. Bright orange, yellow, and blue colors. Friendly, whimsical style with rounded shapes. Exciting and adventurous atmosphere. High quality digital illustration.',
    filename: 'kids-icon.png'
  },
  elderly: {
    name: 'AI Made Simple',
    prompt: 'A warm, accessible icon representing learning and knowledge. Open book with soft lighting and reading glasses on a comfortable desk. Calm green and warm neutral colors. Gentle, approachable design with soft edges. Peaceful and inviting atmosphere. High quality digital illustration.',
    filename: 'elderly-icon.png'
  }
};

/**
 * Make HTTPS request to OpenRouter API
 */
async function makeOpenRouterRequest(prompt: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const requestBody = JSON.stringify({
      model: 'openai/gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are an expert at creating detailed image generation prompts. Given a description, enhance it for optimal results with image generation AI models like DALL-E or Stable Diffusion.'
        },
        {
          role: 'user',
          content: `Create an enhanced, detailed prompt for image generation based on this description: "${prompt}". The image should be ${IMAGE_SIZE}, icon-style, suitable for a course thumbnail. Return only the enhanced prompt text, no explanation.`
        }
      ]
    });

    const options: https.RequestOptions = {
      hostname: 'openrouter.ai',
      path: '/api/v1/chat/completions',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(requestBody),
        'HTTP-Referer': 'https://github.com/prompt-game-next',
        'X-Title': 'Prompt Game Asset Generator'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode !== 200) {
          reject(new Error(`API request failed with status ${res.statusCode}: ${data}`));
          return;
        }

        try {
          const response: OpenRouterResponse = JSON.parse(data);
          const enhancedPrompt = response.choices[0].message.content.trim();
          resolve(enhancedPrompt);
        } catch (error) {
          reject(new Error(`Failed to parse API response: ${(error as Error).message}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(new Error(`Request failed: ${error.message}`));
    });

    req.write(requestBody);
    req.end();
  });
}

/**
 * Generate placeholder image (fallback when API is not available)
 */
function generatePlaceholderSVG(courseName: string, color: string, emoji: string): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" fill="${color}" rx="64"/>
  <text x="256" y="320" font-size="200" text-anchor="middle" fill="white">${emoji}</text>
</svg>`;
}

/**
 * Save placeholder image as SVG
 */
function savePlaceholderImage(courseName: string, filename: string, color: string, emoji: string): void {
  const svgContent = generatePlaceholderSVG(courseName, color, emoji);
  const outputPath = path.join(OUTPUT_DIR, filename.replace('.png', '.svg'));

  fs.writeFileSync(outputPath, svgContent, 'utf8');
  console.log(`  ✓ Created placeholder: ${outputPath}`);
}

/**
 * Create a text file with the enhanced prompt for manual image generation
 */
function savePromptToFile(courseKey: string, enhancedPrompt: string): void {
  const promptFilename = `${courseKey}-prompt.txt`;
  const outputPath = path.join(OUTPUT_DIR, promptFilename);

  const content = `Course: ${COURSES[courseKey].name}
Generated Image Prompt:
${enhancedPrompt}

Instructions:
1. Use this prompt with an image generation service like:
   - DALL-E (https://openai.com/dall-e)
   - Midjourney (https://www.midjourney.com)
   - Stable Diffusion (https://stablediffusion.com)
2. Generate a ${IMAGE_SIZE} image
3. Save the image as: ${COURSES[courseKey].filename}
4. Place it in: public/assets/courses/

Original Prompt:
${COURSES[courseKey].prompt}
`;

  fs.writeFileSync(outputPath, content, 'utf8');
  console.log(`  ✓ Saved prompt to: ${outputPath}`);
}

/**
 * Delay helper for rate limiting
 */
const delay = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Main execution function
 */
async function main(): Promise<void> {
  console.log('🎨 Prompt Game Asset Generator\n');
  console.log('='.repeat(60));

  // Validate API key
  if (!OPENROUTER_API_KEY) {
    console.error('\n❌ Error: OPENROUTER_API_KEY environment variable not set');
    console.error('\nPlease set your OpenRouter API key:');
    console.error('  export OPENROUTER_API_KEY="your-api-key-here"');
    console.error('\nGet your API key at: https://openrouter.ai/keys\n');
    process.exit(1);
  }

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`\n✓ Created directory: ${OUTPUT_DIR}\n`);
  }

  console.log(`\n📁 Output directory: ${OUTPUT_DIR}`);
  console.log(`📐 Image size: ${IMAGE_SIZE}\n`);
  console.log('='.repeat(60));

  // Color mappings for placeholders
  const courseColors: Record<string, string> = {
    business: '#007AFF',
    creative: '#FF2D55',
    kids: '#FF9500',
    elderly: '#34C759'
  };

  const courseEmojis: Record<string, string> = {
    business: '💼',
    creative: '🎨',
    kids: '🚀',
    elderly: '📚'
  };

  // Process each course
  const courseEntries = Object.entries(COURSES);
  for (let i = 0; i < courseEntries.length; i++) {
    const [courseKey, courseData] = courseEntries[i];
    console.log(`\n📚 Processing: ${courseData.name}`);
    console.log('-'.repeat(60));

    try {
      // Generate enhanced prompt using OpenRouter
      console.log('  ⏳ Generating enhanced prompt...');
      const enhancedPrompt = await makeOpenRouterRequest(courseData.prompt);
      console.log(`  ✓ Enhanced prompt created`);

      // Save the prompt to a file for manual image generation
      savePromptToFile(courseKey, enhancedPrompt);

      // Create placeholder SVG
      console.log('  ⏳ Creating placeholder image...');
      savePlaceholderImage(
        courseData.name,
        courseData.filename,
        courseColors[courseKey],
        courseEmojis[courseKey]
      );

      console.log('  ✓ Course assets prepared');

    } catch (error) {
      console.error(`  ❌ Error processing ${courseKey}:`, (error as Error).message);

      // Create placeholder anyway
      try {
        savePlaceholderImage(
          courseData.name,
          courseData.filename,
          courseColors[courseKey],
          courseEmojis[courseKey]
        );
        console.log('  ✓ Fallback placeholder created');
      } catch (fallbackError) {
        console.error(`  ❌ Failed to create fallback:`, (fallbackError as Error).message);
      }
    }

    // Rate limiting - wait 1 second between requests
    if (i < courseEntries.length - 1) {
      await delay(1000);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('\n✅ Asset generation complete!\n');
  console.log('Next steps:');
  console.log('1. Check the generated prompt files in:', OUTPUT_DIR);
  console.log('2. Use the prompts with an image generation service');
  console.log('3. Save generated images as specified in the prompt files');
  console.log('4. Placeholder SVG files have been created for immediate use\n');
  console.log('Image generation services:');
  console.log('  • DALL-E: https://openai.com/dall-e');
  console.log('  • Midjourney: https://www.midjourney.com');
  console.log('  • Stable Diffusion: https://stablediffusion.com');
  console.log('  • Leonardo.ai: https://leonardo.ai');
  console.log('');
}

// Execute
main().catch(error => {
  console.error('\n❌ Fatal error:', (error as Error).message);
  console.error((error as Error).stack);
  process.exit(1);
});
