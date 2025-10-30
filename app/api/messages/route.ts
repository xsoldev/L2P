import { streamText } from 'ai';
import { createAnthropic } from '@ai-sdk/anthropic';

export async function POST(request: Request) {
  try {
    const { messages, system, language } = await request.json();

    const anthropic = createAnthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    // Add language instruction to system prompt if language is provided
    const systemPrompt = system || 'You are a helpful assistant.';
    const languageInstruction = language === 'fr'
      ? '\n\nIMPORTANT: Respond in French (français). All your responses must be in French.'
      : '';
    const finalSystemPrompt = systemPrompt + languageInstruction;

    const result = streamText({
      model: anthropic('claude-sonnet-4-5-20250929'),
      system: finalSystemPrompt,
      messages: messages.map((msg: any) => ({
        role: msg.role,
        content: msg.content
      })),
    });

    // Create a simple text stream using ReadableStream
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.textStream) {
            controller.enqueue(encoder.encode(chunk));
          }
          controller.close();
        } catch (error) {
          console.error('Stream error:', error);
          controller.error(error);
        }
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to process request' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
