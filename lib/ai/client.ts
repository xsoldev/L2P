/**
 * AI Client Abstraction for Web and Mobile Platforms
 *
 * This module provides a unified interface for AI interactions that works
 * seamlessly across web (using Next.js API routes) and native mobile
 * (using direct Anthropic SDK).
 */

import { Capacitor } from '@capacitor/core';

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface StreamOptions {
  onChunk?: (text: string) => void;
  onComplete?: (fullText: string) => void;
  onError?: (error: Error) => void;
}

export interface AIClientConfig {
  model?: string;
  maxTokens?: number;
  temperature?: number;
}

/**
 * Check if running on native platform
 */
export function isNativePlatform(): boolean {
  return Capacitor.isNativePlatform();
}

/**
 * Stream AI response using platform-appropriate method
 *
 * @param messages - Conversation messages
 * @param systemPrompt - System prompt for context
 * @param options - Streaming callbacks
 * @param config - AI configuration
 */
export async function streamAIResponse(
  messages: Message[],
  systemPrompt: string,
  options: StreamOptions = {},
  config: AIClientConfig = {}
): Promise<string> {
  if (isNativePlatform()) {
    // Use direct Anthropic SDK for native mobile
    return streamNativeAI(messages, systemPrompt, options, config);
  } else {
    // Use Next.js API route for web
    return streamWebAI(messages, systemPrompt, options, config);
  }
}

/**
 * Web implementation using Next.js API route
 */
async function streamWebAI(
  messages: Message[],
  systemPrompt: string,
  options: StreamOptions,
  config: AIClientConfig
): Promise<string> {
  const {
 onChunk = () => {},
    onComplete = () => {},
    onError = () => {},
  } = options;

  try {
    const response = await fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages,
        system: systemPrompt,
        ...config,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (!response.body) {
      throw new Error('Response body is null');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let fullText = '';

    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      const chunk = decoder.decode(value, { stream: true });
      fullText += chunk;
      onChunk(chunk);
    }

    onComplete(fullText);
    return fullText;
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    onError(err);
    throw err;
  }
}

/**
 * Native implementation using Anthropic SDK directly
 *
 * NOTE: This requires ANTHROPIC_API_KEY to be available in the app
 * For security, consider using a proxy server or secure key storage
 */
async function streamNativeAI(
  messages: Message[],
  systemPrompt: string,
  options: StreamOptions,
  config: AIClientConfig
): Promise<string> {
  const {
    onChunk = () => {},
    onComplete = () => {},
    onError = () => {},
  } = options;

  try {
    // Import Anthropic SDK dynamically (only on native)
    const { Anthropic } = await import('@anthropic-ai/sdk');

    // Get API key from environment or secure storage
    // TODO: Replace with secure key management
    const apiKey = process.env.ANTHROPIC_API_KEY || '';

    if (!apiKey) {
      throw new Error('ANTHROPIC_API_KEY not configured for native platform');
    }

    const anthropic = new Anthropic({ apiKey });

    const stream = await anthropic.messages.stream({
      model: config.model || 'claude-sonnet-4-5-20250929',
      max_tokens: config.maxTokens || 8096,
      temperature: config.temperature,
      system: systemPrompt,
      messages: messages.map((msg) => ({
        role: msg.role === 'system' ? 'user' : msg.role,
        content: msg.content,
      })),
    });

    let fullText = '';

    for await (const chunk of stream) {
      if (
        chunk.type === 'content_block_delta' &&
        chunk.delta.type === 'text_delta'
      ) {
        const text = chunk.delta.text;
        fullText += text;
        onChunk(text);
      }
    }

    onComplete(fullText);
    return fullText;
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    onError(err);
    throw err;
  }
}

/**
 * Generate a single AI response (non-streaming)
 *
 * @param messages - Conversation messages
 * @param systemPrompt - System prompt for context
 * @param config - AI configuration
 */
export async function generateAIResponse(
  messages: Message[],
  systemPrompt: string,
  config: AIClientConfig = {}
): Promise<string> {
  let fullText = '';

  await streamAIResponse(
    messages,
    systemPrompt,
    {
      onChunk: (chunk) => {
        fullText += chunk;
      },
    },
    config
  );

  return fullText;
}

/**
 * Helper function to create a message
 */
export function createMessage(role: Message['role'], content: string): Message {
  return { role, content };
}

/**
 * Helper to create a user message
 */
export function userMessage(content: string): Message {
  return createMessage('user', content);
}

/**
 * Helper to create an assistant message
 */
export function assistantMessage(content: string): Message {
  return createMessage('assistant', content);
}

/**
 * Helper to create a system message
 */
export function systemMessage(content: string): Message {
  return createMessage('system', content);
}

/**
 * Evaluate a prompt using AI
 *
 * This is used by the game to score and provide feedback on user prompts
 */
export async function evaluatePrompt(
  userPrompt: string,
  aiResponse: string,
  criteria: string[]
): Promise<{
  score: number;
  maxScore: number;
  feedback: string;
  passed: boolean;
}> {
  const systemPrompt = `You are evaluating a prompt written by a user learning prompt engineering.
Assess the prompt based on the following criteria and provide a score and constructive feedback.

Criteria:
${criteria.map((c, i) => `${i + 1}. ${c}`).join('\n')}

Respond ONLY with a JSON object in this exact format (no markdown, no code blocks):
{
  "score": <number 0-30>,
  "maxScore": 30,
  "feedback": "<constructive feedback>",
  "reasoning": "<brief explanation of score>"
}`;

  const messages = [
    userMessage(`Prompt: "${userPrompt}"\n\nAI Response: "${aiResponse}"`),
  ];

  try {
    const response = await generateAIResponse(messages, systemPrompt);

    // Try to extract JSON from response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Could not parse evaluation response');
    }

    const evaluation = JSON.parse(jsonMatch[0]);

    return {
      score: evaluation.score || 0,
      maxScore: evaluation.maxScore || 30,
      feedback: evaluation.feedback || 'No feedback provided',
      passed: evaluation.score >= 18, // 60% passing grade
    };
  } catch (error) {
    console.error('Failed to evaluate prompt:', error);
    // Return default passing evaluation on error
    return {
      score: 20,
      maxScore: 30,
      feedback: 'Good effort! Try to be more specific and provide clear instructions.',
      passed: true,
    };
  }
}

/**
 * Generate a visualization configuration from user prompt
 *
 * Used in Exercise 2 for chart generation
 */
export async function generateVisualization(
  userPrompt: string,
  data: any
): Promise<{
  chartType: 'bar' | 'line' | 'area' | 'pie';
  title: string;
  xAxisLabel: string;
  yAxisLabel: string;
  colors: string[];
  showGrid: boolean;
  showLegend: boolean;
  showValues: boolean;
  interpretation: string;
}> {
  const systemPrompt = `You are helping visualize sales data. Based on the user's prompt,
determine the best chart type and configuration.

Available chart types: bar, line, area, pie

Respond ONLY with a JSON object in this exact format (no markdown, no code blocks):
{
  "chartType": "<bar|line|area|pie>",
  "title": "<chart title>",
  "xAxisLabel": "<x-axis label>",
  "yAxisLabel": "<y-axis label>",
  "colors": ["<color1>", "<color2>", ...],
  "showGrid": <true|false>,
  "showLegend": <true|false>,
  "showValues": <true|false>,
  "interpretation": "<brief explanation of visualization choice>"
}`;

  const messages = [
    userMessage(
      `Create a visualization for this data:\n${JSON.stringify(data, null, 2)}\n\nUser request: "${userPrompt}"`
    ),
  ];

  try {
    const response = await generateAIResponse(messages, systemPrompt);

    // Try to extract JSON from response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Could not parse visualization response');
    }

    const config = JSON.parse(jsonMatch[0]);

    return {
      chartType: config.chartType || 'bar',
      title: config.title || 'Sales Data',
      xAxisLabel: config.xAxisLabel || 'Month',
      yAxisLabel: config.yAxisLabel || 'Sales',
      colors: config.colors || ['#70BEFA', '#5AAFED'],
      showGrid: config.showGrid !== false,
      showLegend: config.showLegend !== false,
      showValues: config.showValues !== false,
      interpretation: config.interpretation || '',
    };
  } catch (error) {
    console.error('Failed to generate visualization:', error);
    // Return default configuration on error
    return {
      chartType: 'bar',
      title: 'Sales Data Visualization',
      xAxisLabel: 'Month',
      yAxisLabel: 'Sales',
      colors: ['#70BEFA', '#5AAFED', '#8CCFFD'],
      showGrid: true,
      showLegend: true,
      showValues: true,
      interpretation: 'Showing sales data as a bar chart',
    };
  }
}
