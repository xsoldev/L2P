// Hook for managing AI streaming responses

import { useState } from 'react';
import { generateAIResponse } from '@/lib/game/evaluation';

export function useAIStream() {
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  /**
   * Generate AI response with optional streaming
   */
  const streamAIResponse = async (
    userPrompt: string,
    lessonContext: string,
    enableWebSearch: boolean = false
  ): Promise<string> => {
    setIsStreaming(true);
    setStreamingText('');
    setAiResponse(null);

    try {
      const response = await generateAIResponse(
        userPrompt,
        lessonContext,
        enableWebSearch,
        (chunk) => {
          setStreamingText((prev) => prev + chunk);
        }
      );

      setAiResponse(response);
      setIsStreaming(false);
      return response;
    } catch (error) {
      console.error('Error generating AI response:', error);
      setIsStreaming(false);
      throw error;
    }
  };

  /**
   * Reset streaming state
   */
  const resetStream = () => {
    setIsStreaming(false);
    setStreamingText('');
    setAiResponse(null);
  };

  return {
    isStreaming,
    streamingText,
    aiResponse,
    setAiResponse,
    streamAIResponse,
    resetStream
  };
}
