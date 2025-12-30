import { LessonContent } from './ai-made-simple'

export const MEASUREMENT_GOVERNANCE_CONTENT: Record<string, LessonContent> = {
  'i-m4-l1': {
    id: 'i-m4-l1',
    title: 'KPIs That Matter',
    type: 'text',
    description: 'Shift from counting clicks to measuring outcomes.',
    content: `
### From Activity to Outcomes

Dashboards only help if they drive **decisions**. Shift from counting clicks to measuring **outcomes**.

### Outcome KPIs

| KPI | Description |
|-----|-------------|
| **Time ROI** | Minutes saved per run × volume (daily/weekly) |
| **Quality** | Rework rate (how often humans fix outputs) |
| **Throughput** | Items handled per day/week; response times |
| **Conversion** | Replies → meetings → sales (if applicable) |
| **Adoption** | % of target users who used the workflow this week |

### Setting Targets

1. Set a **baseline** (last 2–4 weeks)
2. Aim for **+30–50% throughput** or **–40–60% time per item** in the first month
    `
  },
  'i-m4-l2': {
    id: 'i-m4-l2',
    title: 'Instrumentation & Data Model',
    type: 'text',
    description: 'Standardize your logging for continuous improvement.',
    content: `
### Log Once, Learn Forever

If you **don't log it**, you can't improve it. Standardize your log across workflows.

### Minimal Log Schema (Per Run)

| Field | Purpose |
|-------|---------|
| \`timestamp\` | When did it run? |
| \`workflow_name\` | Which automation? |
| \`trigger\` | What started it? |
| \`owner\` | Accountability |
| \`input_size\` | Context for costs |
| \`outcome\` | Success/failure |
| \`approval_time_sec\` | Bottleneck detection |
| \`model_tier\` | Cost tracking |
| \`tokens_or_cost\` | Spend control |
| \`minutes_saved\` | ROI calculation |
| \`notes\` | Context for debugging |

### POPIA Reminder

Keep **personal data out** or anonymize.

### Storage Progression

Start with Sheet/DB → Later move to warehouse/BI → Ensure retention (90–180 days) and access controls.
    `
  },
  'i-m4-l3': {
    id: 'i-m4-l3',
    title: 'Dashboards & Reviews',
    type: 'text',
    description: 'Create a single weekly view that drives decisions.',
    content: `
### Cadence That Sustains Momentum

Make a **single weekly view** that leaders actually read.

### Starter Dashboard Cards

| Card | What It Shows |
|------|---------------|
| **Minutes Saved** | This week vs last |
| **Items Processed** | Volume and response time |
| **Rework Rate** | Top 3 failure reasons |
| **Spend vs Cap** | Month-to-date |
| **Adoption** | % of target users active |

### Review Cadence

| Frequency | Duration | Focus |
|-----------|----------|-------|
| **Weekly** | 15 min | Ops review: scan metrics, pick one fix |
| **Monthly** | 45 min | Governance: risks, policies, model tiers, budget |
    `
  },
  'i-m4-l4': {
    id: 'i-m4-l4',
    title: 'Policy & Risk',
    type: 'text',
    description: 'Create simple rules that actually get used.',
    content: `
### Short and Clear Policies

Policies must be **short and clear** so people follow them.

### One-Page Policy Essentials

| Section | Content |
|---------|---------|
| **Allowed uses** | With examples |
| **Banned uses** | With examples |
| **Data rules** | Green/yellow/red; anonymize by default |
| **Approval** | What must be reviewed by humans |
| **Citations** | No invented facts; cite when applicable |
| **Retention** | How long logs and drafts are kept |
| **Incident response** | Who to call; disable switch; rollback steps |

### Rollout

1. Publish in the LMS
2. Add a short quiz for sign-off
3. Track acknowledgements
    `
  },
  'i-m4-l5': {
    id: 'i-m4-l5',
    title: 'Handover & SOPs',
    type: 'text',
    description: 'Make your workflows run without you.',
    content: `
### SOPs Anyone Can Follow

To scale, your workflows need SOPs and a clean handover.

### SOP Template (One Page)

| Section | Content |
|---------|---------|
| **Purpose & Outcomes** | What this delivers |
| **Trigger & Steps** | 2–6 steps with screenshots |
| **Approval Checklist** | Tone, facts, format, safety |
| **Common Errors & Fixes** | Troubleshooting guide |
| **Owner & Backup** | Who maintains it |
| **Disable/Rollback** | Emergency instructions |

### Handover Pack Contents

- SOP
- Prompt components (with versions)
- Dashboard link
- Log access
- Contacts

### The Handover Meeting

Do a **30-min live walkthrough** with Q&A.
    `
  },
  'i-m4-l6': {
    id: 'i-m4-l6',
    title: 'Scale-Out & Sunset',
    type: 'text',
    description: 'Portfolio thinking for your automations.',
    content: `
### Add Winners, Fix Maybes, Retire Losers

Treat automations like a **portfolio**: add winners, fix maybes, retire losers.

### Scale-Out Checklist

| Criterion | Requirement |
|-----------|-------------|
| **Quality** | Stable (low rework) for 2–4 weeks |
| **ROI** | Clear minutes saved |
| **Capacity** | Owner can support more users |
| **Training** | Policy sign-off + SOP read complete |
| **Spend** | Within cap |

### Sunset Criteria

| Signal | Action |
|--------|--------|
| Low usage | Consider retiring |
| Rework too high | Fix or sunset |
| Negative ROI | Sunset |
| Better alternative | Migrate and sunset |

### After Sunsetting

- Archive SOP
- Disable the automation
- Keep a summary note in your registry
    `
  },
  'i-m4-l7': {
    id: 'i-m4-l7',
    title: 'Module Quiz: Measurement & Governance',
    type: 'quiz',
    description: 'Test your knowledge of AI governance and scaling.',
    quiz: [
      {
        question: 'The most important KPI family for AI workflows is:',
        options: [
          'Number of prompts',
          'Time ROI (minutes saved × volume)',
          'Lines of code',
          'Number of meetings'
        ],
        correctAnswer: 1
      },
      {
        question: 'Without logging, you cannot:',
        options: [
          'Run the automation',
          'Measure and improve reliably',
          'Send emails',
          'Create prompts'
        ],
        correctAnswer: 1
      },
      {
        question: 'The output of a weekly review should be:',
        options: [
          'A 50-page report',
          'One prioritized improvement to implement',
          'Nothing specific',
          'A complete rewrite of all prompts'
        ],
        correctAnswer: 1
      },
      {
        question: 'A good SOP includes:',
        options: [
          'Only the prompt text',
          'Purpose, steps with screenshots, approval checklist, owner, rollback',
          'Just the contact email',
          'Marketing materials'
        ],
        correctAnswer: 1
      },
      {
        question: 'Scale-out is appropriate when:',
        options: [
          'You just launched today',
          'Quality is stable and ROI is clear',
          'No one is using it',
          'Costs are too high'
        ],
        correctAnswer: 1
      }
    ]
  }
}
