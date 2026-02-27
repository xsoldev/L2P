#!/usr/bin/env node

/**
 * Asset Generation Script for Learn2Prompt
 * Generates course icons using Nano Banana (Gemini 2.5 Flash Image) via OpenRouter
 *
 * Usage:
 *   npm run generate-assets
 *
 * Requires OPENROUTER_API_KEY in .env.local
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Load .env.local if it exists
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match && !process.env[match[1].trim()]) {
      process.env[match[1].trim()] = match[2].trim().replace(/^["']|["']$/g, '');
    }
  });
}

// Configuration
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'assets', 'courses');

// Nano Banana model (Gemini 2.5 Flash Image)
const MODEL = 'google/gemini-2.5-flash-image';

// Course configurations
const COURSES = {
  business: {
    name: 'Business',
    color: '#007AFF',
    prompt: 'Create a clean, minimalist app icon for a business productivity course. A simple briefcase or laptop icon in modern flat design style. Use professional blue color (#007AFF) on white background. Square format, centered, suitable as an app icon. No text.',
    filename: 'business-icon.png'
  },
  creative: {
    name: 'Creative',
    color: '#FF2D55',
    prompt: 'Create a vibrant app icon for a creative writing course. A simple paint palette or artistic brush icon with colorful accents. Modern flat design in pink/magenta (#FF2D55) on white background. Square format, centered, suitable as an app icon. No text.',
    filename: 'creative-icon.png'
  },
  kids: {
    name: 'Kids',
    color: '#FF9500',
    prompt: 'Create a fun, playful app icon for a kids learning course. A cute cartoon rocket ship blasting off with stars around it. Bright orange color (#FF9500) on white background. Friendly rounded shapes, square format, centered, suitable as an app icon. No text.',
    filename: 'kids-icon.png'
  },
  elderly: {
    name: 'Seniors',
    color: '#34C759',
    prompt: 'Create a warm, accessible app icon for a seniors learning course. A simple open book with reading glasses resting on it. Calm green color (#34C759) on white background. Gentle, approachable design, square format, centered, suitable as an app icon. No text.',
    filename: 'elderly-icon.png'
  }
};

/**
 * Generate image using Nano Banana via OpenRouter
 */
async function generateImage(prompt) {
  return new Promise((resolve, reject) => {
    const requestBody = JSON.stringify({
      model: MODEL,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      modalities: ['image', 'text']
    });

    const options = {
      hostname: 'openrouter.ai',
      path: '/api/v1/chat/completions',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(requestBody),
        'HTTP-Referer': 'https://learn2prompt.com',
        'X-Title': 'Learn2Prompt'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode !== 200) {
          reject(new Error(`API error ${res.statusCode}: ${data}`));
          return;
        }

        try {
          const response = JSON.parse(data);

          // Check for images in message.images array (Nano Banana format)
          if (response.choices && response.choices[0]) {
            const message = response.choices[0].message;

            // Check message.images array (primary format for Nano Banana)
            if (message && message.images && message.images.length > 0) {
              const img = message.images[0];
              if (img.type === 'image_url' && img.image_url && img.image_url.url) {
                resolve(img.image_url.url);
                return;
              }
              // Direct URL string
              if (typeof img === 'string') {
                resolve(img);
                return;
              }
            }

            // Check message content for inline images
            if (message && message.content) {
              const content = message.content;

              // Handle array content (multimodal response)
              if (Array.isArray(content)) {
                for (const part of content) {
                  if (part.type === 'image_url' && part.image_url) {
                    resolve(part.image_url.url);
                    return;
                  }
                }
              }
            }
          }

          // Check top-level images
          if (response.images && response.images.length > 0) {
            resolve(response.images[0]);
            return;
          }

          reject(new Error('No image in response. Response: ' + JSON.stringify(response).slice(0, 500)));
        } catch (error) {
          reject(new Error(`Parse error: ${error.message}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(new Error(`Request error: ${error.message}`));
    });

    req.write(requestBody);
    req.end();
  });
}

/**
 * Save base64 image to file
 */
function saveBase64Image(dataUrl, filename) {
  const outputPath = path.join(OUTPUT_DIR, filename);

  // Extract base64 data
  const matches = dataUrl.match(/^data:image\/(\w+);base64,(.+)$/);
  if (!matches) {
    throw new Error('Invalid data URL format');
  }

  const imageBuffer = Buffer.from(matches[2], 'base64');
  fs.writeFileSync(outputPath, imageBuffer);

  return outputPath;
}

/**
 * Generate placeholder SVG
 */
function generatePlaceholderSVG(color, emoji) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${adjustColor(color, -40)};stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="512" height="512" fill="url(#bg)" rx="96"/>
  <text x="256" y="300" font-size="180" text-anchor="middle" fill="white">${emoji}</text>
</svg>`;
}

function adjustColor(hex, amount) {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount));
  const b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

function savePlaceholder(courseKey, course) {
  const emojis = { business: '💼', creative: '🎨', kids: '🚀', elderly: '📚' };
  const svg = generatePlaceholderSVG(course.color, emojis[courseKey]);
  const svgPath = path.join(OUTPUT_DIR, course.filename.replace('.png', '.svg'));
  fs.writeFileSync(svgPath, svg, 'utf8');
  return svgPath;
}

/**
 * Main
 */
async function main() {
  console.log('\n🍌 Learn2Prompt Asset Generator');
  console.log('   Using Nano Banana (Gemini 2.5 Flash Image)');
  console.log('━'.repeat(50));

  // Create output directory
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Check API key
  if (!OPENROUTER_API_KEY) {
    console.log('\n⚠️  OPENROUTER_API_KEY not set');
    console.log('   Creating placeholder SVGs...\n');

    for (const [key, course] of Object.entries(COURSES)) {
      const svgPath = savePlaceholder(key, course);
      console.log(`   ✓ ${course.name}: ${path.basename(svgPath)}`);
    }

    console.log('\n━'.repeat(50));
    console.log('To generate real images, add to .env.local:');
    console.log('  OPENROUTER_API_KEY="your-key"');
    console.log('\nThen run: npm run generate-assets');
    console.log('Get your key: https://openrouter.ai/keys\n');
    return;
  }

  console.log(`\n📁 Output: ${OUTPUT_DIR}`);
  console.log(`🤖 Model: ${MODEL}\n`);

  for (const [courseKey, course] of Object.entries(COURSES)) {
    console.log(`${course.name}`);
    console.log('─'.repeat(30));

    try {
      console.log('  ⏳ Generating with Nano Banana...');
      const imageData = await generateImage(course.prompt);

      if (imageData.startsWith('data:image')) {
        const filePath = saveBase64Image(imageData, course.filename);
        console.log(`  ✓ Saved: ${path.basename(filePath)}`);
      } else if (imageData.startsWith('http')) {
        console.log(`  ✓ URL: ${imageData}`);
        // You could download this URL if needed
      } else {
        throw new Error('Unexpected response format');
      }

    } catch (error) {
      console.log(`  ✗ ${error.message}`);
      const svgPath = savePlaceholder(courseKey, course);
      console.log(`  ✓ Fallback: ${path.basename(svgPath)}`);
    }

    // Rate limit
    await new Promise(r => setTimeout(r, 3000));
    console.log('');
  }

  console.log('━'.repeat(50));
  console.log('✅ Done!\n');
}

main().catch(err => {
  console.error('❌ Fatal:', err.message);
  process.exit(1);
});
