import { LessonContent } from './ai-made-simple'

export const FIRST_LIVE_WORKFLOW_CONTENT: Record<string, LessonContent> = {
  'b-m4-l1': {
    id: 'b-m4-l1',
    title: 'Pick the Right Capstone',
    type: 'text',
    description: 'How to choose a simple, valuable workflow for your capstone project.',
    content: `
### Your Capstone: One Live Workflow

You'll ship **one live workflow** that saves real time every day. Keep it **simple, safe, and visible**.

### How to Choose (3 Filters)

1. **Frequent** — Happens daily or weekly (emails, follow-ups, summaries).
2. **Repeatable** — Similar inputs each time (enquiries, status updates).
3. **Safe** — Uses **green** or anonymized data; has a built-in **human review** step.

### Good Examples

- Enquiry → reply draft → human approve → send → log.
- Meeting notes → action items → weekly reminder.
- Report text → decision summary → task table.

### Avoid for Capstone v1

- Legal contracts
- Payroll
- Anything needing sensitive personal data
    `
  },
  'b-m4-l2': {
    id: 'b-m4-l2',
    title: 'Design the Workflow',
    type: 'text',
    description: 'Map your steps, roles, and guardrails using a simple canvas.',
    content: `
### Design Before You Build

Use this one-page canvas:

### Workflow Canvas

| Field | Your Answer |
|-------|-------------|
| **Name** | e.g., "Enquiry Auto-Reply + Log" |
| **Trigger** | What starts it (form/email/meeting end) |
| **Steps** | List 2–4 actions in order |
| **Human Review** | Where you approve/decline |
| **Data Rules** | Green/yellow/red; what to anonymize |
| **Prompt(s)** | Paste your final templates |
| **Outputs** | Email/summary/task table/notes |
| **Log Fields** | Timestamp, owner, outcome, minutes saved |
| **Tools** | Chat assistant, doc helper, sheet; who owns them |
| **Risks & Mitigations** | What can go wrong + your check |

### Pro Tip

Make the **human review** step explicit:
> *"If missing contact or unclear request → ask for info; do not send."*
    `
  },
  'b-m4-l3': {
    id: 'b-m4-l3',
    title: 'Build & Test',
    type: 'text',
    description: 'Dry runs, edge cases, and tone checking before going live.',
    content: `
### Build a Small First Version

**Build tips:**
- Keep to **2–3 actions** plus **human approval**.
- Use your **5-part prompts** with tone, word limits, and "no invented facts."
- Store prompts as templates so every run is consistent.

### Test Plan (15–20 min)

1. **Dry-run** on 3–5 past examples (anonymized).
2. Check **tone** (polite, clear, local context), **facts**, and **format**.
3. **Edge cases:** missing phone/email, unclear request, long messages.
4. Fix prompts or add checks where outputs failed.

**Only then** switch the flow to live.

### Common Edge Cases to Test

- Missing phone number
- Missing email address
- Unclear request
- Very long messages
- Multiple questions in one message
    `
  },
  'b-m4-l4': {
    id: 'b-m4-l4',
    title: 'Measure Impact',
    type: 'text',
    description: 'Track baseline, create a scorecard, and run weekly reviews.',
    content: `
### Proving Value Keeps Momentum

### Baseline Today

- Time per task (minutes)
- Volume per day/week
- Error rate (if any)

### After Launch

Log **minutes saved** per run and any corrections you made.

### AI Scorecard (Weekly)

| Metric | This Week |
|--------|-----------|
| Volume handled | |
| Avg response time (before vs after) | |
| Minutes saved (sum) | |
| Quality notes (any fixes) | |
| Next improvement | |

### Goal for Beginners

Achieve **consistent savings** (e.g., 8–15 minutes per run), not perfection.
    `
  },
  'b-m4-l5': {
    id: 'b-m4-l5',
    title: 'Document & Handover',
    type: 'text',
    description: 'Create a one-page SOP so others can use your workflow.',
    content: `
### Document So Others Can Use It

### SOP (One Page)

| Section | Content |
|---------|---------|
| **Purpose** | What this workflow delivers |
| **When it runs** | Trigger and frequency |
| **How to run** | Steps 1–4 (with screenshots) |
| **Human review** | What to check before sending |
| **Data rules** | What's allowed, what to anonymize |
| **Troubleshooting** | Common issues and fixes |
| **Owner & backup** | Who maintains it |

### Policy Reminder

Copy your safety line into the SOP:

> *"No invented facts. Ask when unsure. Cite sources where needed. Human review required."*
    `
  },
  'b-m4-l6': {
    id: 'b-m4-l6',
    title: 'Launch & Support',
    type: 'text',
    description: 'Go live, monitor, and iterate on your workflow.',
    content: `
### Launch Time — Keep It Calm and Reversible

### Launch Plan

1. Start with **one team** or **one inbox** for a week.
2. Announce who's on **approval duty** and expected reply times.
3. Monitor the log daily; adjust prompts as needed.
4. Collect **wins** (minutes saved, happy replies) to share in your next meeting.

### After Week 1

- Widen to more users
- Keep the approval step until error rate is near zero
- Set a **monthly cost cap** and alerts

### When to Remove Approval Steps

Only when:
- Error rate is near zero
- Team is confident
- You have good monitoring in place
    `
  },
  'b-m4-l7': {
    id: 'b-m4-l7',
    title: 'Module Quiz: First Live Workflow',
    type: 'quiz',
    description: 'Test your knowledge of launching a live AI workflow.',
    quiz: [
      {
        question: 'A strong capstone is NOT usually:',
        options: [
          'A daily task',
          'A rare, once-a-year task',
          'A repeatable process',
          'Something with similar inputs'
        ],
        correctAnswer: 1
      },
      {
        question: 'The Trigger in a workflow describes:',
        options: [
          'The final output',
          'The approval step',
          'The event that starts the workflow',
          'The cost per run'
        ],
        correctAnswer: 2
      },
      {
        question: 'Before going live you should:',
        options: [
          'Skip testing to save time',
          'Dry-run with 3–5 examples and fix issues',
          'Remove all human oversight',
          'Use only one test case'
        ],
        correctAnswer: 1
      },
      {
        question: 'Baseline numbers help you:',
        options: [
          'Increase costs',
          'Compare before vs after to show gains',
          'Remove the need for logging',
          'Skip the approval step'
        ],
        correctAnswer: 1
      },
      {
        question: 'A low-risk launch starts with:',
        options: [
          'All teams at once',
          'One team or inbox for a week',
          'No monitoring',
          'Removing all approvals'
        ],
        correctAnswer: 1
      }
    ]
  }
}
