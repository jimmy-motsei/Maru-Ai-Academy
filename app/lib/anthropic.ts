/**
 * Anthropic AI integration for Maru AI Academy.
 * Educational chatbot with appropriate guardrails.
 */

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AnthropicTextBlock {
  type: 'text';
  text: string;
}

const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';
const DEFAULT_MODEL = 'claude-3-5-haiku-20241022';

async function parseAnthropicError(response: Response): Promise<string> {
  const rawError = await response.text();

  try {
    const parsed = JSON.parse(rawError);
    return parsed.error?.message || parsed.message || rawError;
  } catch {
    return rawError || 'Unknown error';
  }
}

/**
 * Generate AI response using Anthropic's Messages API.
 */
export async function generateResponse(
  messages: Message[],
  systemPrompt: string
): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY is not configured');
  }

  try {
    const response = await fetch(ANTHROPIC_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': process.env.ANTHROPIC_VERSION || '2023-06-01',
      },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL || DEFAULT_MODEL,
        max_tokens: 1024,
        temperature: 0.7,
        system: systemPrompt,
        messages: messages.map((message) => ({
          role: message.role,
          content: message.content,
        })),
      }),
    });

    if (!response.ok) {
      const errorMessage = await parseAnthropicError(response);
      console.error('Anthropic API Error:', errorMessage);
      throw new Error(`Anthropic API error: ${errorMessage}`);
    }

    const data = await response.json();
    const generatedText = data.content?.find(
      (block: AnthropicTextBlock) => block.type === 'text'
    )?.text;

    if (!generatedText) {
      throw new Error('No response generated from Anthropic');
    }

    return generatedText;
  } catch (error) {
    console.error('Error generating response:', error);
    throw error;
  }
}

/**
 * Check if a message appears to be asking for assignment help.
 */
export function isAskingForAssignmentHelp(message: string): boolean {
  const assignmentKeywords = [
    'do my',
    'complete my',
    'write my',
    'finish my',
    'solve this for me',
    'build this for me',
    'create this for me',
    'can you do',
    'can you write',
    'can you build',
    'homework',
    'assignment',
    'project for me',
  ];

  const lowerMessage = message.toLowerCase();
  return assignmentKeywords.some(keyword => lowerMessage.includes(keyword));
}

/**
 * Check if a message is requesting quiz answers.
 */
export function isAskingForQuizAnswers(message: string): boolean {
  const quizKeywords = [
    'quiz answer',
    'test answer',
    'correct answer',
    'what is the answer',
    'which option is correct',
    'tell me the answer to',
  ];

  const lowerMessage = message.toLowerCase();
  return quizKeywords.some(keyword => lowerMessage.includes(keyword));
}

/**
 * Add educational guardrails to response.
 */
export function addEducationalGuardrails(userMessage: string, aiResponse: string): string {
  if (isAskingForAssignmentHelp(userMessage)) {
    return `**Learning Reminder**: I can't complete assignments for you, but I'm happy to help you understand the concepts!

${aiResponse}

Remember: The goal is to learn and build your own skills. You've got this!`;
  }

  if (isAskingForQuizAnswers(userMessage)) {
    return `**Study Tip**: I can't give direct quiz answers, but I can help you understand the material!

${aiResponse}

Once you understand the concept, the quiz will make much more sense. Want me to explain anything else?`;
  }

  return aiResponse;
}
