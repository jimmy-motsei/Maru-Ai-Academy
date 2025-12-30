import { LessonContent } from './ai-made-simple'

export const SEMANTIC_SEARCH_CONTENT: Record<string, LessonContent> = {
  'i-m2-l1': {
    id: 'i-m2-l1',
    title: 'What is Semantic Search?',
    type: 'text',
    description: 'Understanding meaning-based search and when to use it.',
    content: `
### Finding Meaning, Not Just Words

Semantic search lets AI find **meaning**, not just matching words. Instead of hunting for exact phrases, it looks for **related ideas**.

### When to Use Semantic Search

- You have **policies, SOPs, FAQs, transcripts, slide notes**
- You want the AI to answer **only from your documents**, not the open web
- You need answers with **citations** (file + page/timestamp) you can verify

### When NOT to Use

- Brand-new info that isn't in your library yet
- Then first **add the source**, or the system should politely say "I don't know"

### Core Rule

> **Grounded answers only** — if the source doesn't say it, the assistant shouldn't either.
    `
  },
  'i-m2-l2': {
    id: 'i-m2-l2',
    title: 'Build Your Mini-Library',
    type: 'text',
    description: 'Prepare documents with proper metadata and versioning.',
    content: `
### Well-Prepared Documents

Great Q&A starts with **well-prepared documents**. Use this checklist:

### Document Preparation Checklist

| Step | Action |
|------|--------|
| **1. Collect** | Policies, SOPs, templates, product briefs, transcripts. Avoid duplicates. |
| **2. Clean** | Remove outdated sections; fix headings; export to PDF or clean HTML. |
| **3. Chunk** | Break long docs into small sections (≈ 2–5 paragraphs). |
| **4. Tag** | Add metadata: \`title\`, \`owner\`, \`version\`, \`date\`, \`doc_type\`, \`access level\`. |
| **5. Version** | Keep a version label (v1.2) and archive old copies. |
| **6. Licensing** | Set if original, client-owned, or Creative Commons; mark if searchable. |

### Pro Tip

Transcripts are gold. Clean them (speaker names, timestamps) and include them; they answer a lot of "what did we decide?" questions.
    `
  },
  'i-m2-l3': {
    id: 'i-m2-l3',
    title: 'Ask Better Questions',
    type: 'text',
    description: 'Prompts for precise, cited answers from your knowledge base.',
    content: `
### Force Citations, Allow Questions

Your Q&A prompt should **force citations** and allow the model to **ask for missing info**.

### The Knowledge Assistant Template

\`\`\`
Role: Act as a company knowledge assistant.
Goal: Answer the question ONLY from the provided library.
Inputs: {user question}.
Rules: Cite sources (file + page/timestamp) for every claim. If sources disagree or are missing, say so and ask for clarification. No invented facts.
Format: Short answer (≤120 words) + bullet list of citations [Title – page/timestamp] + "follow-ups" (2 questions to refine).
\`\`\`

### Variants

- For procedures, ask for **step-by-step** outputs
- For numbers, ask to **quote exact figures** and where they came from
    `
  },
  'i-m2-l4': {
    id: 'i-m2-l4',
    title: 'Access, Privacy & POPIA',
    type: 'text',
    description: 'Setting up proper access controls and data protection.',
    content: `
### Who Sees What

Not everyone should see everything. Set rules up front:

### Access Levels

| Level | Description |
|-------|-------------|
| **Public** | Available to all |
| **Internal** | Company employees only |
| **Confidential** | Named roles only |

### Key Concepts

- **Per-team libraries:** Finance, ops, HR each have their own
- **RLS (Row-Level Security):** Users only search within their org/team
- **POPIA:** Avoid indexing personal data unless necessary and consented. Mask IDs where possible.
- **Audit:** Log who searched what (aggregate for improvement; protect privacy)

### Practical Guideline

Default to **internal**, promote to **public** only when approved; keep **confidential** for named roles.
    `
  },
  'i-m2-l5': {
    id: 'i-m2-l5',
    title: 'Reduce Hallucinations',
    type: 'text',
    description: 'Quality checks and evaluation for knowledge systems.',
    content: `
### Say Less, But Say It Right

Make the system accurate, not verbose.

### Techniques to Reduce Hallucinations

| Technique | How |
|-----------|-----|
| **Top-k retrieval** | Start with 3–5 chunks; increase only if needed |
| **Diversity** | Prefer unique sources over many from the same page |
| **Faithfulness checks** | Ask the model to quote or paraphrase and align to citations |
| **Low-confidence fallback** | Reply "I don't know from the library" and propose what to add |
| **Evaluation** | Keep a small test set (10–20 Q&As) with expected citations; review monthly |

### Safety Line for All Q&A Prompts

> **"Only answer from the library. If unsure, say so."**
    `
  },
  'i-m2-l6': {
    id: 'i-m2-l6',
    title: 'Hands-On: Create Your Library',
    type: 'text',
    description: 'Step-by-step guide to building a private knowledge Q&A.',
    content: `
### Build Your First Private Knowledge Q&A

### The 6-Step Process

1. **Collect 5–10 docs** (policy, SOP, transcript). Clean headings; export as PDF/HTML.
2. **Add metadata** (title, owner, version, date, doc_type, access).
3. **Chunk & index** (2–5 paragraphs per chunk).
4. **Create the Q&A prompt** with strict citations and "no invented facts."
5. **Test** with 10 common questions; check citations & correctness.
6. **Publish** to the team with access rules.

### User Instructions

Add a quick help note:

> *"If an answer lacks citations, don't trust it—report it."*

### Iteration

- Add missing docs the system asks for
- Build a simple **FAQ top-hits** page from the searches
    `
  },
  'i-m2-l7': {
    id: 'i-m2-l7',
    title: 'Module Quiz: Semantic Search',
    type: 'quiz',
    description: 'Test your knowledge of private knowledge systems.',
    quiz: [
      {
        question: 'Semantic search finds:',
        options: [
          'Only exact keyword matches',
          'Passages based on meaning, not just exact keywords',
          'Random documents',
          'The newest documents only'
        ],
        correctAnswer: 1
      },
      {
        question: 'If your library lacks the needed info, the assistant should:',
        options: [
          'Make something up',
          'Say it doesn\'t know and ask to add sources',
          'Search the internet',
          'Give a generic answer'
        ],
        correctAnswer: 1
      },
      {
        question: 'Breaking a long document into smaller sections helps because:',
        options: [
          'It saves storage space',
          'The system can retrieve the exact relevant chunk',
          'It makes documents harder to read',
          'It is required by law'
        ],
        correctAnswer: 1
      },
      {
        question: 'RLS (Row-Level Security) ensures:',
        options: [
          'Everyone sees everything',
          'Users only query documents they\'re allowed to access',
          'Documents are deleted automatically',
          'AI models run faster'
        ],
        correctAnswer: 1
      },
      {
        question: 'A good default number of chunks to retrieve is:',
        options: [
          '1',
          '3–5',
          '50+',
          'All of them'
        ],
        correctAnswer: 1
      }
    ]
  }
}
