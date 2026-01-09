import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

interface GradeRequest {
  userPrompt: string;
  challengeContext: {
    goal: string;
    criteria: string[];
    exampleGoodPrompt?: string;
  };
}

interface GradeResponse {
  isValid: boolean;
  score: number; // 0-100
  feedback: string;
  suggestions: string[];
}

export async function POST(request: NextRequest) {
  try {
    const body: GradeRequest = await request.json();
    const { userPrompt, challengeContext } = body;

    if (!userPrompt || !challengeContext) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const systemPrompt = `You are an AI prompt engineering instructor evaluating a student's prompt.

CHALLENGE GOAL:
${challengeContext.goal}

EVALUATION CRITERIA:
${challengeContext.criteria.map((c, i) => `${i + 1}. ${c}`).join('\n')}

${challengeContext.exampleGoodPrompt ? `EXAMPLE OF A GOOD PROMPT:\n"${challengeContext.exampleGoodPrompt}"` : ''}

STUDENT'S PROMPT:
"${userPrompt}"

Evaluate the student's prompt and respond ONLY with valid JSON in this exact format:
{
  "isValid": true/false (true if score >= 70),
  "score": 0-100,
  "feedback": "Brief encouraging feedback (1-2 sentences). If successful, explain what they did well. If not, give a helpful hint without giving the answer.",
  "suggestions": ["specific improvement suggestion 1", "specific improvement suggestion 2"]
}

Be encouraging but honest. Focus on teaching, not just grading.`;

    const result = await model.generateContent(systemPrompt);
    const response = result.response;
    const text = response.text();
    
    // Extract JSON from response (handle markdown code blocks)
    let jsonStr = text;
    const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      jsonStr = jsonMatch[1].trim();
    }
    
    // Try to parse the JSON
    let gradeResult: GradeResponse;
    try {
      gradeResult = JSON.parse(jsonStr);
    } catch {
      // If parsing fails, create a fallback response
      console.error('Failed to parse Gemini response:', text);
      gradeResult = {
        isValid: userPrompt.length >= 20,
        score: userPrompt.length >= 20 ? 70 : 40,
        feedback: "I had trouble analyzing your prompt. Try being more specific about the context and desired output.",
        suggestions: ["Add more context about your role or situation", "Specify the format you want the response in"]
      };
    }

    return NextResponse.json(gradeResult);

  } catch (error) {
    console.error('Prompt grading error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to grade prompt',
        isValid: false,
        score: 0,
        feedback: "Sorry, I couldn't evaluate your prompt right now. Please try again.",
        suggestions: []
      },
      { status: 500 }
    );
  }
}
