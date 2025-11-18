// Evaluation and AI interaction logic for the Prompt Engineering Game

import { Evaluation, ChartConfig } from './types';
import type { Language } from '@/lib/i18n';

/**
 * Evaluate a user's prompt using the AI API
 */
export async function evaluatePrompt(
  userPrompt: string,
  aiResponse: string,
  criteria: string,
  lessonContext: string,
  language: Language
): Promise<Evaluation> {
  try {
    const response = await fetch("/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        max_tokens: 1000,
        language: language,
        messages: [
          {
            role: "user",
            content: `You are evaluating a user's prompt in a prompt engineering training exercise.

Lesson context: ${lessonContext}
Evaluation criteria: The prompt should demonstrate ${criteria}

User's prompt: "${userPrompt}"

AI's response to their prompt: "${aiResponse}"

Analyze the user's prompt and provide feedback in this EXACT JSON format (DO NOT include any text outside the JSON):
{
  "passed": true or false,
  "score": number from 1-10,
  "strengths": ["strength 1", "strength 2"],
  "weaknesses": ["weakness 1", "weakness 2"],
  "mainFeedback": "2-3 sentences explaining what went well or what needs improvement",
  "highlights": ["phrase from their prompt that was problematic", "another phrase"],
  "nextSteps": "One specific suggestion for improvement"
}

Rules:
- If the prompt demonstrates the criteria well (clear steps, specific details, good structure), set passed to true and score 7+
- If it's vague, missing steps, or lacks specificity, set passed to false and score below 7
- Be encouraging but honest
- Highlight 1-3 specific phrases from their prompt that were good or problematic
- DO NOT OUTPUT ANYTHING EXCEPT VALID JSON`
          }
        ]
      })
    });

    // Read the full text stream
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let responseText = '';

    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        responseText += decoder.decode(value, { stream: true });
      }
    }

    responseText = responseText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();

    const evaluationData = JSON.parse(responseText);
    return evaluationData;
  } catch (error) {
    console.error("Error evaluating prompt:", error);
    return {
      passed: false,
      score: 0,
      strengths: [],
      weaknesses: ["Error evaluating your prompt"],
      mainFeedback: "There was an error evaluating your prompt. Please try again.",
      highlights: [],
      nextSteps: "Try resubmitting your answer."
    };
  }
}

/**
 * Generate an AI response to a user's prompt
 */
export async function generateAIResponse(
  userPrompt: string,
  lessonContext: string,
  enableWebSearch: boolean = false,
  onStreamChunk?: (chunk: string) => void
): Promise<string> {
  try {
    const response = await fetch("/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: `Context: ${lessonContext}\n\nUser request: ${userPrompt}`
          }
        ],
        enableWebSearch: enableWebSearch,
      }),
    });

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let fullResponse = '';

    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        fullResponse += chunk;

        if (onStreamChunk) {
          onStreamChunk(chunk);
        }
      }
    }

    return fullResponse;
  } catch (error) {
    console.error("Error generating AI response:", error);
    throw error;
  }
}

/**
 * Generate a chart visualization configuration using AI
 */
export async function generateVisualization(
  userPrompt: string,
  salesData: any
): Promise<ChartConfig | null> {
  try {
    const response = await fetch("/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        max_tokens: 1000,
        messages: [
          {
            role: "user",
            content: `You are creating a data visualization based on a user's request.

Sales data: ${JSON.stringify(salesData)}

User's prompt: "${userPrompt}"

Based on the user's request, generate a chart configuration in this EXACT JSON format (DO NOT include any text outside the JSON):
{
  "chartType": "bar" | "line" | "area" | "pie",
  "colors": ["#70BEFA", "#5AAFED", "#8CCFFD"],
  "showGrid": true or false,
  "showLegend": true or false,
  "showValues": true or false,
  "xAxisLabel": "label for x axis",
  "yAxisLabel": "label for y axis",
  "interpretation": "2-3 sentences analyzing the data shown in the chart"
}

Rules:
- Choose the chart type that best represents the data and user's request
- Use the brand colors provided
- Include grid and legend if they help readability
- Provide a clear interpretation of what the chart shows
- DO NOT OUTPUT ANYTHING EXCEPT VALID JSON`
          }
        ]
      })
    });

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let responseText = '';

    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        responseText += decoder.decode(value, { stream: true });
      }
    }

    responseText = responseText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();

    const chartConfig = JSON.parse(responseText);
    return chartConfig;
  } catch (error) {
    console.error("Error generating visualization:", error);
    return null;
  }
}
