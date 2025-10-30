#!/usr/bin/env node

/**
 * Translation Script
 * Automatically translates en.json to fr.json using Claude API
 */

const fs = require('fs');
const path = require('path');

// Load environment variables from .env.local
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

const { Anthropic } = require('@anthropic-ai/sdk');

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function translateToFrench() {
  console.log('🔄 Starting translation process...\n');

  // Read English translations
  const enPath = path.join(__dirname, '../translations/en.json');
  const frPath = path.join(__dirname, '../translations/fr.json');

  if (!fs.existsSync(enPath)) {
    console.error('❌ Error: translations/en.json not found');
    process.exit(1);
  }

  const englishContent = fs.readFileSync(enPath, 'utf8');

  console.log('📖 English translation file loaded');
  console.log(`📦 File size: ${(Buffer.byteLength(englishContent) / 1024).toFixed(2)} KB\n`);
  console.log('🤖 Translating with Claude...\n');

  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 16000,
      messages: [
        {
          role: 'user',
          content: `You are a professional translator specializing in educational content. Translate the following JSON file from English to French.

CRITICAL INSTRUCTIONS:
1. Maintain the EXACT same JSON structure and keys
2. Only translate the string VALUES, never translate the keys
3. Preserve all formatting, including {{variables}}, newlines, and special characters
4. Use natural, idiomatic French appropriate for an educational course about AI prompt engineering
5. Keep technical terms like "prompt engineering" in English or use widely accepted French equivalents
6. Maintain the tone: professional yet friendly and educational

Here is the English JSON to translate:

${englishContent}

Return ONLY the translated JSON, with no additional text or explanation.`,
        },
      ],
    });

    let translatedContent = message.content[0].text;

    // Strip markdown code fences if present
    translatedContent = translatedContent.replace(/^```json\n/, '').replace(/\n```$/, '');

    // Write French translations
    fs.writeFileSync(frPath, translatedContent, 'utf8');

    console.log('✅ Translation complete!');
    console.log(`📝 French translation saved to: ${frPath}\n`);
    console.log('🎉 Success! You can now use French in your app.');
  } catch (error) {
    console.error('❌ Translation failed:', error.message);
    process.exit(1);
  }
}

translateToFrench();
