import { Evaluation, ChartConfig } from './types';
import type { Language } from '@/lib/i18n';
import { streamAIResponse, userMessage, systemMessage } from '@/lib/ai/client';

/**
 * Helper to get full response from streamAIResponse
 */
async function getAIResponse(messages: any[], systemPrompt: string): Promise<string> {
    return new Promise((resolve, reject) => {
        streamAIResponse(messages, systemPrompt, {
            onComplete: (text) => resolve(text),
            onError: (err) => reject(err)
        });
    });
}

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
        const systemPrompt = `You are evaluating a user's prompt in a prompt engineering training exercise.`;
        const messages = [
            userMessage(`Lesson context: ${lessonContext}
Evaluation criteria: The prompt should demonstrate ${criteria}

User's prompt: "${userPrompt}"

AI's response to their prompt: "${aiResponse}"

Analyze the user's prompt and provide feedback in this EXACT JSON format (DO NOT include any text outside the JSON):
{
  "score": number from 0-100,
  "breakdown": {
    "clarity": number from 0-25 (Is the prompt clear and unambiguous?),
    "specificity": number from 0-25 (Does it include specific details and context?),
    "structure": number from 0-25 (Is it well-organized with clear steps?),
    "completeness": number from 0-25 (Does it cover all necessary aspects?)
  },
  "passed": true or false,
  "strengths": ["strength 1", "strength 2"],
  "weaknesses": ["weakness 1", "weakness 2"],
  "mainFeedback": "2-3 sentences explaining the score. Reference specific breakdown categories (clarity, specificity, structure, completeness) and how they contributed to the final score.",
  "highlights": ["specific phrase from their prompt that was good or problematic"],
  "nextSteps": "One specific suggestion tied to the lowest-scoring category"
}

Scoring Guidelines:
- 90-100: Excellent - Demonstrates mastery of ${criteria}
- 70-89: Good - Solid understanding with minor improvements needed
- 50-69: Needs Work - Shows understanding but missing key elements
- 0-49: Requires Major Revision - Fundamental issues with ${criteria}

Rules:
- Score on 0-100 scale (total of 4 breakdown categories)
- Set "passed" to true if score >= 70
- In mainFeedback, explicitly mention which breakdown categories scored well/poorly
- Tie "nextSteps" to the lowest-scoring breakdown category
- Be encouraging but honest
- DO NOT OUTPUT ANYTHING EXCEPT VALID JSON`)
        ];

        let responseText = await getAIResponse(messages, systemPrompt);
        responseText = responseText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();

        const evaluationData = JSON.parse(responseText);

        // Ensure score is capped at 100
        if (evaluationData.score) {
            evaluationData.score = Math.min(100, Math.max(0, evaluationData.score));
        }

        return evaluationData;
    } catch (error) {
        console.error("Error evaluating prompt:", error);
        return {
            passed: false,
            score: 0,
            breakdown: {
                clarity: 0,
                specificity: 0,
                structure: 0,
                completeness: 0
            },
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
        const systemPrompt = `Context: ${lessonContext}`;
        const messages = [userMessage(userPrompt)];

        return await new Promise((resolve, reject) => {
            streamAIResponse(messages, systemPrompt, {
                onChunk: onStreamChunk,
                onComplete: resolve,
                onError: reject
            });
        });
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
        const systemPrompt = `You are creating a data visualization based on a user's request.`;
        const messages = [
            userMessage(`Sales data: ${JSON.stringify(salesData)}

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
- DO NOT OUTPUT ANYTHING EXCEPT VALID JSON`)
        ];

        let responseText = await getAIResponse(messages, systemPrompt);
        responseText = responseText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();

        const chartConfig = JSON.parse(responseText);
        return chartConfig;
    } catch (error) {
        console.error("Error generating visualization:", error);
        return null;
    }
}
