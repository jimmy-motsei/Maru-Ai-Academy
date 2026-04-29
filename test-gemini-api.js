// Quick test to verify Gemini API is working
// Run with: GEMINI_API_KEY=your_key node test-gemini-api.js
// Or set it in your shell: export GEMINI_API_KEY=your_key

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error('❌ GEMINI_API_KEY environment variable is not set.');
  console.error('   Run: GEMINI_API_KEY=your_key node test-gemini-api.js');
  process.exit(1);
}

async function testGeminiAPI() {
  console.log('🧪 Testing Gemini API...\n');

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: 'Say "Hello from Maru AI!" in a friendly way.'
            }]
          }]
        })
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error('❌ API Error:', error);
      return false;
    }

    const data = await response.json();
    const text = data.candidates[0].content.parts[0].text;
    
    console.log('✅ API Working!');
    console.log('📝 Response:', text);
    console.log('\n🎉 Success! Your Gemini API key is configured correctly.\n');
    
    return true;
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    return false;
  }
}

testGeminiAPI();
