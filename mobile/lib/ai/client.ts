import Anthropic from '@anthropic-ai/sdk';
import { fetch as expoFetch } from 'expo/fetch';

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
    apiKey?: string;
}

/**
 * Stream AI response using Anthropic SDK
 */
export async function streamAIResponse(
    messages: Message[],
    systemPrompt: string,
    options: StreamOptions = {},
    config: AIClientConfig = {}
): Promise<string> {
    const {
        onChunk = () => { },
        onComplete = () => { },
        onError = () => { },
    } = options;

    try {
        const apiKey = config.apiKey || process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY;

        if (!apiKey) {
            throw new Error('API Key not found. Please set EXPO_PUBLIC_ANTHROPIC_API_KEY.');
        }

        const anthropic = new Anthropic({
            apiKey,
            // React Native requires this to work, and we need expo/fetch for streaming
            fetch: expoFetch as any,
        });

        const stream = await anthropic.messages.stream({
            model: config.model || 'claude-sonnet-4-20250514',
            max_tokens: config.maxTokens || 4096,
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

export function userMessage(content: string): Message {
    return { role: 'user', content };
}

export function assistantMessage(content: string): Message {
    return { role: 'assistant', content };
}

export function systemMessage(content: string): Message {
    return { role: 'system', content };
}
