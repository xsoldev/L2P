import { http, HttpResponse } from 'msw';

// Define mock API handlers for testing
export const handlers = [
  // Mock the AI messages endpoint
  http.post('/api/messages', async () => {
    return HttpResponse.json({
      role: 'assistant',
      content: 'This is a mocked AI response for testing purposes.',
    });
  }),

  // Mock the analytics generation endpoint
  http.post('/api/generate-analytics', async () => {
    return HttpResponse.json({
      score: 85,
      feedback: {
        clarity: 'Good clarity in your prompt',
        specificity: 'Could be more specific',
        structure: 'Well structured',
      },
      suggestions: [
        'Add more context',
        'Be more specific about the desired output',
      ],
    });
  }),
];

// Helper to create custom mock responses
export function createMockAIResponse(content: string, delay = 0) {
  return http.post('/api/messages', async () => {
    if (delay > 0) {
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
    return HttpResponse.json({
      role: 'assistant',
      content,
    });
  });
}

export function createMockAnalyticsResponse(score: number, feedback: Record<string, string>) {
  return http.post('/api/generate-analytics', async () => {
    return HttpResponse.json({
      score,
      feedback,
      suggestions: [],
    });
  });
}
