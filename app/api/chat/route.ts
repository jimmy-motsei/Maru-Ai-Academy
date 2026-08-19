import { NextRequest, NextResponse } from 'next/server';
import { generateResponse, addEducationalGuardrails } from '@/lib/anthropic';
import EDUCATION_SYSTEM_PROMPT from '@/lib/chatbot-prompt';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    // Get the last user message to check for guardrails
    const lastUserMessage = messages[messages.length - 1];
    
    // Generate response using the educational system prompt
    const rawResponse = await generateResponse(messages, EDUCATION_SYSTEM_PROMPT);

    // Apply educational guardrails (checking for assignment help, quiz answers, etc.)
    const finalResponse = addEducationalGuardrails(lastUserMessage.content, rawResponse);

    return NextResponse.json({ 
      response: finalResponse,
      success: true 
    });

  } catch (error) {
    console.error('Chat API error:', error);
    
    // Return a friendly error message that keeps the immersive experience
    return NextResponse.json(
      { 
        response: "I'm having a little trouble connecting to the knowledge base right now. Please try asking your question again in a moment!",
        success: false
      },
      { status: 500 }
    );
  }
}
