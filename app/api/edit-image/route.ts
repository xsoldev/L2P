import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { prompt, imageUrl, aspectRatio = '1:1' } = await request.json()

    if (!prompt) {
      return NextResponse.json(
        { error: 'Edit prompt is required' },
        { status: 400 }
      )
    }

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'Input image is required' },
        { status: 400 }
      )
    }

    const apiKey = process.env.OPENROUTER_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'OpenRouter API key not configured' },
        { status: 500 }
      )
    }

    // Build message content with text prompt + input image
    const messageContent = [
      {
        type: 'text',
        text: prompt,
      },
      {
        type: 'image_url',
        image_url: {
          url: imageUrl, // Can be base64 data URL or public URL
        },
      },
    ]

    // Call OpenRouter with Gemini model for image editing
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXTAUTH_URL || 'http://localhost:3000',
        'X-Title': 'Learn2Prompt',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash-image-preview',
        messages: [
          {
            role: 'user',
            content: messageContent,
          },
        ],
        modalities: ['image', 'text'],
        image_config: {
          aspect_ratio: aspectRatio,
        },
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('OpenRouter API error:', errorText)
      return NextResponse.json(
        { error: 'Failed to edit image' },
        { status: response.status }
      )
    }

    const result = await response.json()

    // Extract edited image from response
    if (result.choices && result.choices[0]?.message?.images) {
      const images = result.choices[0].message.images
      const textContent = result.choices[0].message.content || ''

      return NextResponse.json({
        images: images.map((img: { image_url: { url: string } }) => img.image_url.url),
        text: textContent,
      })
    }

    // No images in response - might be text-only response
    return NextResponse.json({
      images: [],
      text: result.choices?.[0]?.message?.content || 'No edited image generated',
    })
  } catch (error) {
    console.error('Image editing error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
