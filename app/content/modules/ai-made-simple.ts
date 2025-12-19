export interface LessonContent {
  id: string
  title: string
  type: 'video' | 'text' | 'quiz'
  description?: string
  videoUrl?: string // YouTube or Vimeo ID
  videoProvider?: 'youtube' | 'vimeo'
  content?: string // Markdown-like content
  quiz?: {
    question: string
    options: string[]
    correctAnswer: number // index
  }[]
}

export const AI_MADE_SIMPLE_CONTENT: Record<string, LessonContent> = {
  'b-m1-l1': {
    id: 'b-m1-l1',
    title: 'What is Generative AI?',
    type: 'video',
    description: 'A high-level overview of Generative AI, how it differs from predictive AI, and why it changes everything.',
    videoUrl: 'G2fqAlgmoPo', // Placeholder: "Introduction to Gen AI" from Google Cloud Tech
    videoProvider: 'youtube',
    content: `
### Key Takeaways
- **Generative AI** creates new content (text, images, code) rather than just analyzing existing data.
- It learns patterns from massive datasets to generate probabilistic responses.
- It acts as a "reasoning engine" rather than just a database of facts.

### Why it matters
Historically, software required explicit instructions for every step. Generative AI allows us to give "fuzzy" instructions in plain English, and the model figures out the steps to achieve the goal.
    `
  },
  'b-m1-l2': {
    id: 'b-m1-l2',
    title: 'LLMs vs Traditional Software',
    type: 'text',
    description: 'Understanding the fundamental shift from deterministic to probabilistic computing.',
    content: `
### The Paradigm Shift
Traditional software is **deterministic**. 
- Input: "2 + 2"
- Output: "4" (Always)

Large Language Models (LLMs) are **probabilistic**.
- Input: "Write a poem about the sea"
- Output: A unique poem every time.

### The "Black Box" Concept
With traditional code, we can trace exactly why a bug happened (line 42 has a typo). With LLMs, the "reasoning" happens inside a neural network with billions of parameters. We can't always explain *why* it gave a specific answer, but we can learn how to guide it.

### When to use which?
- **Traditional Software**: Calculations, data storage, exact logic (e.g., Accounting software).
- **LLMs**: Creative writing, summarization, translation, complex reasoning (e.g., Drafting emails, analyzing sentiment).
    `
  },
  'b-m1-l3': {
    id: 'b-m1-l3',
    title: 'AI Safety & Data Privacy',
    type: 'video',
    description: 'Crucial guidelines for using AI tools without compromising company data.',
    videoUrl: 'J5xK0Q6g-7E', // Placeholder: AI Safety
    videoProvider: 'youtube',
    content: `
### Three Golden Rules of AI Safety
1. **Never input PII (Personally Identifiable Information)** into public models.
2. **assume everything you type is being used for training** unless you are on an Enterprise plan with "Zero Data Retention".
3. **Verify everything.** AI can sound confident even when it is wrong.

### Data Classification
- **Public Data**: Safe for ChatGPT/Gemini.
- **Internal Data**: Only safe for Enterprise/Private instances.
- **Confidential/Secret**: Do not use with AI without explicit legal approval.
    `
  },
  'b-m1-l4': {
    id: 'b-m1-l4',
    title: 'The Hallucination Problem',
    type: 'text',
    description: 'Why AI lies, and how to spot it.',
    content: `
### What is a Hallucination?
A hallucination is when an AI model confidently generates false information. This happens because the model is designed to predict the *next likely word*, not necessarily the *truth*.

### Common Types of Hallucinations
- **Fabricated Facts**: Inventing historical events or news.
- **Fake Citations**: Making up book titles, authors, or legal cases.
- **Code Errors**: Writing code that looks correct but uses non-existent libraries.

### How to Mitigate
- **Ask for sources**: Prompt the model to "Provide quotes from the text provided."
- **Use "Grounding"**: Give the model a document and say "Only answer using this document."
- **Human in the Loop**: Always review the output before sending/publishing.
    `
  },
  'b-m1-l5': {
    id: 'b-m1-l5',
    title: 'Module Quiz: Fundamentals',
    type: 'quiz',
    description: 'Test your knowledge of AI basics.',
    quiz: [
      {
        question: 'Which of the following is true about LLMs?',
        options: [
          'They strictly follow if/then logic like a calculator.',
          'They always tell the absolute truth.',
          'They are probabilistic and predict the next likely word.',
          'They can access your private files by default.'
        ],
        correctAnswer: 2
      },
      {
        question: 'What is a "Hallucination"?',
        options: [
          'When the AI crashes.',
          'When the AI confidently generates false information.',
          'When the AI becomes sentient.',
          'When the AI refuses to answer.'
        ],
        correctAnswer: 1
      },
      {
        question: 'Is it safe to put customer credit card numbers into free ChatGPT?',
        options: [
          'Yes, if you ask it nicely.',
          'No, never.',
          'Only on Tuesdays.',
          'Yes, it is encrypted.'
        ],
        correctAnswer: 1
      }
    ]
  }
}
