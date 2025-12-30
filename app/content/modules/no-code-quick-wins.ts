import { LessonContent } from './ai-made-simple'

export const NO_CODE_QUICK_WINS_CONTENT: Record<string, LessonContent> = {
  'b-m3-l1': {
    id: 'b-m3-l1',
    title: 'Choose the Right Tool (Simple Checklist)',
    type: 'text',
    description: 'A 5-point checklist for picking the right AI tools for your needs.',
    content: `
### The 5-Point Tool Selection Checklist

Use this checklist when picking any AI tool:

1. **Job to be done** — What exact task will it do? (e.g., auto-reply to enquiries, summarize PDFs)
2. **Data safety** — POPIA: does it store personal data? Can you anonymize? Is there a privacy policy and data export?
3. **Bandwidth & devices** — Works well on mobile? Low-data mode or transcript-first?
4. **Cost & limits** — Free tier, monthly cap, per-use fees. Can you set **usage caps** and alerts?
5. **Fit & support** — Is it simple enough for your team? Tutorials? Local support or community?

### Rule of Thumb
Start with **one chat assistant** + **one document helper** + **one no-code automation tool**. Keep it small; prove value in a week.
    `
  },
  'b-m3-l2': {
    id: 'b-m3-l2',
    title: 'No-Code Automation Basics',
    type: 'text',
    description: 'Understanding triggers, actions, and guardrails in automation.',
    content: `
### The Automation Recipe: Trigger → Actions → Checks

No-code automations are **recipes**. Think: **Trigger → Actions → Checks**.

- **Trigger:** The event that starts the flow. Example: *"New enquiry email arrives"* or *"Form submitted."*
- **Actions:** Steps that happen next. Example: *"Draft reply → send for approval → log to sheet/CRM."*
- **Checks (guardrails):** Rules that prevent mistakes. Example: *"If message lacks phone number, ask for it instead of sending."*

### Golden Rules

- Keep the **first version short** (2–3 actions).
- Always include a **human-approval step** for anything customer-facing.
- **Log every run** (timestamp, contact, outcome) so you can audit and improve.
    `
  },
  'b-m3-l3': {
    id: 'b-m3-l3',
    title: 'Build Your First Micro-Automation',
    type: 'text',
    description: 'Step-by-step guide to building an enquiry auto-reply with logging.',
    content: `
### Your First Automation: Enquiry Auto-Reply + Log

**Use case:** When a new enquiry arrives (form or email), send a polite **draft reply** for approval, then **log** the enquiry.

### The Recipe

- **Trigger:** New form submission (or email with subject contains "Enquiry").
- **Action 1 (AI draft):** Create a **polite reply** using your prompt template. Include 2–3 clarifying questions if details are missing.
- **Action 2 (Approval):** Send the draft to a human approver (you) by email/WhatsApp. Only **send to customer after approval**.
- **Action 3 (Log):** Append a row to a **Google Sheet/Excel** with: Date, Name, Contact, Topic, Status (Replied/Questions Sent).

### Prompt Template for the Draft

\`\`\`
Role: "Act as a polite support agent for {Company}."
Goal: "Draft a reply confirming we received the enquiry and asking missing details."
Rules: "No invented facts. POPIA: no personal data beyond what client sent. Keep to 120–160 words."
Format: "Subject + greeting + body + bullets for questions + sign-off."
\`\`\`

### Safety Note
If contact details are missing, **do not send**; ask for them in the approval message.
    `
  },
  'b-m3-l4': {
    id: 'b-m3-l4',
    title: 'Tracking & Dashboards',
    type: 'text',
    description: 'Making your automation results visible and measurable.',
    content: `
### Make Results Visible

If you don't **see the wins**, you'll stop using the flow. Let's track them.

### Log Sheet Columns

| Timestamp | Channel | Contact | Topic | Time Saved (min) | Outcome | Notes |
|-----------|---------|---------|-------|------------------|---------|-------|

### Weekly View

Count these metrics:
- Total enquiries handled
- Average response time
- % needing clarifications
- **Total minutes saved**

### Dashboard Options

- **Start simple:** A chart or pivot in your Sheet
- **Level up later:** Data Studio/Power BI

### Pro Tip
Add a column **"Minutes saved"**. If your draft cuts 8 minutes per reply and you send 10 replies/day, that's **80 minutes saved daily**.
    `
  },
  'b-m3-l5': {
    id: 'b-m3-l5',
    title: 'Cost Caps & Privacy Guardrails',
    type: 'text',
    description: 'Protecting your wallet and your customers with simple setups.',
    content: `
### Two Non-Negotiable Setups

Protect your wallet and your customers with these quick setups:

### Cost Caps

- Use a tool that supports **monthly limits** and **alerts**.
- Prefer cheaper models for drafts; reserve higher-quality models for final checks.
- Cache and **reuse prompts/templates**.

### Privacy Rules

- Treat personal data as **red** unless you have consent.
- Share the **least data** needed. Remove names/IDs when possible.
- Keep a **one-page policy**: what's allowed, who approves, how long you retain logs.

### Checklist to Post on Your Wall

> **"No invented facts. Ask when unsure. Cite sources where relevant. Human review before sending."**
    `
  },
  'b-m3-l6': {
    id: 'b-m3-l6',
    title: 'Troubleshooting & Iteration',
    type: 'text',
    description: 'Making your automation better each week.',
    content: `
### Tuning Your Flows

Every flow needs **tuning**. Use this checklist:

| Problem | Solution |
|---------|----------|
| Outputs are vague | Tighten the **Goal** and **Format**; add examples |
| Info is missing | Prompt the AI to **list assumptions** and questions |
| Tone is off | Add **tone words** (warm, direct, formal) and word limits |
| Errors slip through | Add a **human-approval** step earlier |
| Costs rise | Switch to a **cheaper model** for drafts; limit run frequency |

### Friday 15-Minute Review

Run a weekly review:
1. Look at the log
2. Update prompts
3. Celebrate time saved!
    `
  },
  'b-m3-l7': {
    id: 'b-m3-l7',
    title: 'Module Quiz: No-Code Quick Wins',
    type: 'quiz',
    description: 'Test your knowledge of no-code automation fundamentals.',
    quiz: [
      {
        question: 'The first question to ask when choosing a tool is:',
        options: [
          'How much does it cost?',
          'What job will it do?',
          'Does it have a mobile app?',
          'Is it popular?'
        ],
        correctAnswer: 1
      },
      {
        question: 'In no-code flows, the "trigger" is:',
        options: [
          'The output you want',
          'A human approval step',
          'The event that starts the automation',
          'The log entry'
        ],
        correctAnswer: 2
      },
      {
        question: 'A good first build should have:',
        options: [
          '10+ actions for completeness',
          '2–3 actions and a human approval step',
          'No human involvement',
          'Only AI-generated content'
        ],
        correctAnswer: 1
      },
      {
        question: 'The safest step before sending a customer email is:',
        options: [
          'Spell-check only',
          'Auto-send immediately',
          'Human approval of the AI draft',
          'Adding more recipients'
        ],
        correctAnswer: 2
      },
      {
        question: 'One key metric to include in your tracking is:',
        options: [
          'Number of tools used',
          'Color of the dashboard',
          'Total minutes saved',
          'Length of prompts'
        ],
        correctAnswer: 2
      }
    ]
  }
}
