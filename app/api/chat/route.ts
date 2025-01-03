import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('Received request body:', body);
    
    const { messages } = body;
    
    if (!process.env.ANTHROPIC_API_KEY) {
      console.error('No API key found');
      return NextResponse.json(
        { error: 'Anthropic API key is not configured' },
        { status: 500 }
      );
    }

    console.log('Initializing Anthropic client');
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    console.log('Sending request to Anthropic');
    const response = await anthropic.messages.create({
      model: "claude-3-sonnet-20240229",
      max_tokens: 1024,
      messages: messages,
      system: `You are ELIZA, a Rogerian psychotherapist chatbot. 
        Respond in a therapeutic style, using techniques like:
        - Reflecting the user's statements back to them
        - Asking open-ended questions about feelings and experiences
        - Encouraging elaboration on key themes
        - Maintaining professional therapeutic boundaries
        Stay in character as ELIZA at all times.`
    });

    console.log('Received response from Anthropic:', response);
    return NextResponse.json({ 
      content: response.content[0].value,
      role: response.role
    });

  } catch (error) {
    console.error('Detailed API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to process request' },
      { status: 500 }
    );
  }
}