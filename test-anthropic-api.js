// Quick Anthropic API smoke test.
// Run with: ANTHROPIC_API_KEY=your_key node test-anthropic-api.js

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const ANTHROPIC_MODEL = process.env.ANTHROPIC_MODEL || 'claude-3-5-haiku-20241022';

if (!ANTHROPIC_API_KEY) {
  console.error('ANTHROPIC_API_KEY environment variable is not set.');
  console.error('Run: ANTHROPIC_API_KEY=your_key node test-anthropic-api.js');
  process.exit(1);
}

async function testAnthropicAPI() {
  console.log('Testing Anthropic API...');

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: ANTHROPIC_MODEL,
        max_tokens: 100,
        messages: [
          {
            role: 'user',
            content: 'Say hello in one short sentence.',
          },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Anthropic API error: ${response.status} ${error}`);
    }

    const data = await response.json();
    const text = data.content?.find((block) => block.type === 'text')?.text;

    console.log('Anthropic API response:', text);
  } catch (error) {
    console.error('Error testing Anthropic API:', error);
    process.exit(1);
  }
}

testAnthropicAPI();
