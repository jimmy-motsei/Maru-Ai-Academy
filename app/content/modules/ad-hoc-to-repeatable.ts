import { LessonContent } from './ai-made-simple'

export const AD_HOC_TO_REPEATABLE_CONTENT: Record<string, LessonContent> = {
  'i-m1-l1': {
    id: 'i-m1-l1',
    title: 'Design Prompts as Templates',
    type: 'text',
    description: 'Create prompts with variables, constraints, and structured outputs.',
    content: `
### Prompts as Mini-Apps

Our aim: design prompts that behave like **mini-apps**. A good template has three traits:

### The Three Traits

1. **Variables** — Named placeholders to swap fast: \`{client}\`, \`{deadline}\`, \`{tone}\`, \`{country}\`, \`{max_words}\`.
2. **Constraints** — Firm rules: word limits, tone, banned phrases, "**no invented facts**," "**ask for missing info**."
3. **Structured outputs** — Predictable shapes: email blocks, bullet lists, or even **JSON** you can feed into a tool.

### Example: Decision Brief Template

\`\`\`
Role: Act as an operations analyst for a {industry} business in {country}.
Goal: Create a one-page brief that helps {stakeholder} make a decision.
Inputs: {raw notes / transcript / bullets}.
Rules: Plain English; max {max_words} words; no invented facts; list assumptions; ask 3 clarifying questions if needed.
Format: JSON with keys: title, summary, risks, next_steps, assumptions, questions.
\`\`\`

### Why JSON?

Tools can read it. That means you can **chain steps** without manual editing.
    `
  },
  'i-m1-l2': {
    id: 'i-m1-l2',
    title: 'Output Contracts',
    type: 'text',
    description: 'Make AI predictable with schemas, types, and validation.',
    content: `
### How to Make AI Predictable

Think of the output as a **contract**. If the model agrees to the contract, you can depend on it in a workflow.

### Contract Checklist

| Element | Description |
|---------|-------------|
| **Schema** | Exact keys/sections (e.g., \`title\`, \`summary\`, \`risks\`) |
| **Types** | Strings vs lists; allowed values (e.g., priority in {low, med, high}) |
| **Limits** | Word/character counts; bullet counts |
| **Validation** | "If you cannot meet the schema, reply with \`{"error":"missing_inputs"}\`" |

### Tighten with Examples

Show **one good example** and **one bad anti-example** so the model learns what NOT to do.

### Self-Check Tip

After generating, ask the model:

> **"Validate your output against the schema. If invalid, fix it."**
    `
  },
  'i-m1-l3': {
    id: 'i-m1-l3',
    title: 'Data Readiness',
    type: 'text',
    description: 'Clean inputs for clean outputs with the 4-step pre-flight.',
    content: `
### Clean Inputs = Clean Outputs

Great outputs start with **well-prepared inputs**. Use this 4-step pre-flight:

### The 4-Step Pre-Flight

| Step | Action |
|------|--------|
| **1. Select** | Keep only relevant sections; remove noise |
| **2. Sanitize** | Anonymize names, IDs, exact amounts unless necessary (POPIA) |
| **3. Structure** | Convert into bullets, Q&A, or a simple table |
| **4. Signal Quality** | Tell the model what's trustworthy ("numbers in the table are authoritative") |

### Template Snippet

> **"Use only the provided inputs.** If details are missing, ask questions first. If there are conflicting numbers, flag them in \`assumptions\`."

### Reality Check

Even small cleanup boosts accuracy and reduces hallucinations.
    `
  },
  'i-m1-l4': {
    id: 'i-m1-l4',
    title: 'Prompt Libraries & Components',
    type: 'text',
    description: 'Build reusable prompt components with versioning.',
    content: `
### Stop Writing From Scratch

Build a **prompt library** and treat each prompt like a **component** you can reuse.

### Component Design

| Field | Example |
|-------|---------|
| **Name** | "Decision Brief v2", "Email Reply v3" |
| **Purpose** | When to use it |
| **Inputs** | Required variables |
| **Rules** | Tone, word limits, safety lines |
| **Format** | Schema or block layout |
| **Example** | One good example output |
| **Version** | v1, v2, with a change note |

### Storage Options

- A shared doc
- A repo
- Your LMS prompt vault
- Add tags (email, slides, summary, analysis)

### Governance

Nominate one **Prompt Owner** per team to review updates monthly.
    `
  },
  'i-m1-l5': {
    id: 'i-m1-l5',
    title: 'From Template to Workflow',
    type: 'text',
    description: 'Chain components to create multi-step workflows.',
    content: `
### Chain Components into Workflows

Let's chain components into a reliable **mini-workflow**:

### Goal

Turn an email thread into:
1. A client-ready reply
2. A decision brief (JSON)
3. A task table

### Step A: Email Reply (Component)

- **Role:** Support agent
- **Rules:** Polite, 150–180 words, no invented facts, ask 2–3 questions if needed
- **Format:** Email blocks

### Step B: Decision Brief (Component)

- **Role:** Analyst
- **Format:** JSON (\`title\`, \`summary\`, \`risks\`, \`next_steps\`, \`assumptions\`, \`questions\`)
- **Constraints:** Max 180 words; cite figures to line numbers if provided

### Step C: Task Extract (Component)

- **Role:** Operations assistant
- **Format:** Table \`Task | Owner | Due | Status | Notes\`
- **Rules:** Group by owner, set weekly due dates, mark blockers

### Hand-off Tip

Save the JSON/text to a sheet or database; it becomes searchable and trackable.
    `
  },
  'i-m1-l6': {
    id: 'i-m1-l6',
    title: 'Quality Gates & Human-in-the-Loop',
    type: 'text',
    description: 'Add quality checkpoints to your workflows.',
    content: `
### Three Layers of Quality

Intermediate users add **quality gates**:

### Layer 1: Self-Check

Ask the model to validate schema and list uncertainties.

### Layer 2: Human Review

A person approves customer-facing outputs.

### Layer 3: Feedback Loop

Track issues and update the prompt component monthly.

### Rubric Outline for Reviewers

| Check | Question |
|-------|----------|
| **Fit-for-purpose** | Does it answer the ask? |
| **Grounding** | Do facts trace to inputs? |
| **Tone & length** | Does it meet constraints? |
| **Safety** | No personal data beyond inputs? POPIA respected? |

### Policy Reminder

> **"If in doubt, stop and ask."**
    `
  },
  'i-m1-l7': {
    id: 'i-m1-l7',
    title: 'Module Quiz: Ad-Hoc to Repeatable',
    type: 'quiz',
    description: 'Test your knowledge of reusable prompt systems.',
    quiz: [
      {
        question: 'Variables exist to:',
        options: [
          'Make prompts longer',
          'Swap context quickly without rewriting the whole prompt',
          'Confuse the AI model',
          'Replace human oversight'
        ],
        correctAnswer: 1
      },
      {
        question: '"No invented facts; ask when unsure" is a:',
        options: [
          'Variable',
          'Constraint',
          'Output format',
          'Role definition'
        ],
        correctAnswer: 1
      },
      {
        question: 'Structured output (like JSON) helps because:',
        options: [
          'It looks more professional',
          'It uses fewer tokens',
          'Other tools can reliably read and use the result',
          'It is required by all AI models'
        ],
        correctAnswer: 2
      },
      {
        question: 'Versioning prompts helps you:',
        options: [
          'Increase costs',
          'Track improvements and roll back if needed',
          'Confuse team members',
          'Avoid documentation'
        ],
        correctAnswer: 1
      },
      {
        question: 'Customer-facing content should be:',
        options: [
          'Auto-sent immediately',
          'Approved by a human before sending',
          'Generated without any rules',
          'Kept private forever'
        ],
        correctAnswer: 1
      }
    ]
  }
}
