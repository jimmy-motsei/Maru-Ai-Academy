import { LessonContent } from './ai-made-simple'

export const PROMPTS_THAT_WORK_CONTENT: Record<string, LessonContent> = {
  'b-m2-l1': {
    id: 'b-m2-l1',
    title: 'The Reusable Prompt Frame',
    type: 'text',
    description: 'Create templates with variables for speed and consistency.',
    content: `
### Make Once, Use Daily

Our goal is to turn good prompts into **reusable templates** you can use every day.

Recall the 5-part prompt: **Role → Goal → Inputs → Rules → Format**.

### Two Upgrades

1. **Variables** — Placeholders you swap quickly, like \`{client_name}\`, \`{deadline}\`, \`{tone}\`.
2. **Quality checks** — Ask the AI to **list assumptions** and **flag missing info** before finishing.

### Template You Can Save

\`\`\`
Role: Act as a helpful {role} for a {industry} business.
Goal: Produce {deliverable} that achieves {outcome}.
Inputs: {paste raw text, bullets, or transcript}.
Rules: Be {tone}. Keep facts grounded in inputs. If info is missing, ask 2–3 clarifying questions. Apply POPIA (no personal data).
Format: Return {structure}, plus a short checklist at the end.
\`\`\`

Store this as **"Work Prompt – Base"** and copy it whenever you start a task.

> **Templates = Speed + Consistency**
    `
  },
  'b-m2-l2': {
    id: 'b-m2-l2',
    title: 'Email & Customer Replies',
    type: 'text',
    description: 'Turn inbox chaos into professional replies in 60 seconds.',
    content: `
### Inbox to Professional in 60 Seconds

Email is the fastest time-saver. Here's a **reply template**:

### The Email Template

\`\`\`
Role: Act as a polite customer support agent for {company}.
Goal: Draft a reply that answers {customer_topic} and confirms next steps.
Inputs: {paste thread or summary}. Include key facts: names, dates, references.
Rules: Be concise and friendly. No invented facts. If details are missing, ask up to 3 questions.
Format: Subject, greeting, 2–3 short paragraphs, bullets for actions, sign-off.
\`\`\`

### Example Ask

> "Turn this messy thread into a clear reply confirming the booking. If any detail is missing, ask questions at the end. Provide a short subject line."

### Quality Tip

After you get the draft, say:

> **"Now check for tone, clarity, and missing info. Tighten it to 150–180 words."**

You keep control; AI accelerates your wording.
    `
  },
  'b-m2-l3': {
    id: 'b-m2-l3',
    title: 'Presentations & Slide Outlines',
    type: 'text',
    description: 'Transform bullet points into a complete deck skeleton.',
    content: `
### Bullet Points → Deck Skeleton

Slides are about **structure**. Feed bullet points; ask for a deck outline with speaker notes.

### The Presentation Template

\`\`\`
Role: Act as a presentation coach.
Goal: Turn {topic bullets} into a {#}-slide outline that informs {audience}.
Inputs: {paste bullets}.
Rules: Clear headlines, 3–5 bullets per slide, plain English. Add 1 insight or example per slide.
Format: Slide 1–{#}: Title; 3–5 bullets; speaker notes beneath.
\`\`\`

### Example Ask

> "Create a 6-slide outline on 'AI to save 3–5 hours/day for a small business.' Add notes with examples suitable for low-bandwidth teams."

### Export Tip

Ask for a **table** with columns: Slide, Title, Bullets, Notes — easy to copy into your slide tool.

| Slide | Title | Bullets | Notes |
|-------|-------|---------|-------|
| 1 | Introduction | ... | ... |
    `
  },
  'b-m2-l4': {
    id: 'b-m2-l4',
    title: 'Reports & Summaries',
    type: 'text',
    description: 'Convert long documents into actionable decisions.',
    content: `
### Long Docs → Decisions

Reports turn faster when you ask for **decisions**, not just summaries.

### The Report Template

\`\`\`
Role: Act as an analyst for {team}.
Goal: Produce a brief summary with risks, opportunities, and recommended next steps.
Inputs: {paste text} or {link + pasted key excerpts}.
Rules: POPIA: no personal data. Quote exact figures with source lines. No invented facts.
Format: 5 bullets: Key takeaways (x3), Risks (x1), Next steps (x1); then a one-paragraph narrative.
\`\`\`

### Upgrade

Ask: **"Call out any assumptions and data gaps."**

### Export Options

Request **CSV or markdown table** if you want to track items later.

| Finding | Source | Action Required |
|---------|--------|-----------------|
| Revenue up 15% | Q3 Report, p.12 | Review pricing strategy |
    `
  },
  'b-m2-l5': {
    id: 'b-m2-l5',
    title: 'Tracking & Follow-Through',
    type: 'text',
    description: 'Create checklists, actions, and progress tracking from any content.',
    content: `
### Checklists, Actions, Progress

Great work needs **follow-through**. Turn outputs into trackable items.

### The Tracking Template

\`\`\`
Role: Act as an operations assistant.
Goal: Extract actions and create a weekly checklist.
Inputs: {paste email/report/notes}.
Rules: Group by owner; include due dates; mark blockers; keep to one screen.
Format: Table: Task | Owner | Due | Status | Notes. At the end, generate a weekly reminder message I can paste into email/WhatsApp.
\`\`\`

### Output Example

| Task | Owner | Due | Status | Notes |
|------|-------|-----|--------|-------|
| Review proposal | Sarah | Mon | Pending | Waiting for client feedback |
| Send invoice | Mike | Wed | Done | ✅ |
| Schedule call | You | Fri | Blocked | Need calendar access |

### Weekly Reminder

> "Hi team, quick update: 3 tasks remain for this week. Sarah to review proposal by Monday, Mike's invoice is done ✅, and I need calendar access to schedule Friday's call. Let me know if anything changes!"

### No-Code Tip

Feed this table to your simple workflow tool or spreadsheet. You'll have visibility and momentum without new software.
    `
  },
  'b-m2-l6': {
    id: 'b-m2-l6',
    title: 'Putting It Together',
    type: 'text',
    description: 'Chain prompts to create multiple outputs from one source.',
    content: `
### One Prompt, Many Outputs

Let's chain it all together:

### The Chain

1. Use the **Base Work Prompt** to create an email reply.
2. Ask for a **slide outline** of the same content.
3. Ask for a **decision summary** with next steps.
4. Extract a **task table** for tracking and a **weekly reminder** message.

### The Result

**One source, four outputs — all consistent.**

### Save Your Templates

Save these as **templates** in your prompts folder so next time it's drag-and-drop.

### Suggested Folder Structure

\`\`\`
📁 My Prompts
   ├── 📄 Base Work Prompt.txt
   ├── 📄 Email Reply.txt
   ├── 📄 Slide Outline.txt
   ├── 📄 Decision Summary.txt
   └── 📄 Task Tracker.txt
\`\`\`

### Final Reminder

> **Always do a final human check.** You remain accountable for every output.
    `
  },
  'b-m2-l7': {
    id: 'b-m2-l7',
    title: 'Module Quiz: Prompts That Work',
    type: 'quiz',
    description: 'Test your knowledge of professional prompt templates.',
    quiz: [
      {
        question: 'The main benefit of adding {variables} to prompts is:',
        options: [
          'It makes prompts longer',
          'You can reuse the same template quickly',
          'Variables are required by all AI models',
          'It removes the need for human review'
        ],
        correctAnswer: 1
      },
      {
        question: 'The best place to put "no invented facts" is:',
        options: [
          'Role',
          'Goal',
          'Rules',
          'Format'
        ],
        correctAnswer: 2
      },
      {
        question: 'Good email format usually includes:',
        options: [
          'Subject, greeting, body, actions, sign-off',
          'Just the main message',
          'A long paragraph with all details',
          'Only bullet points'
        ],
        correctAnswer: 0
      },
      {
        question: 'For easy copy into slide tools, request output as a:',
        options: [
          'Paragraph',
          'Table',
          'List of ideas',
          'Single sentence'
        ],
        correctAnswer: 1
      },
      {
        question: 'Better than a generic summary is asking for:',
        options: [
          'A longer version',
          'Risks, opportunities, and next steps',
          'Just the main points',
          'A copy of the original'
        ],
        correctAnswer: 1
      }
    ]
  }
}
