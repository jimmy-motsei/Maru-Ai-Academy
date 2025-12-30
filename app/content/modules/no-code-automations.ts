import { LessonContent } from './ai-made-simple'

export const NO_CODE_AUTOMATIONS_CONTENT: Record<string, LessonContent> = {
  'i-m3-l1': {
    id: 'i-m3-l1',
    title: 'Automation Patterns',
    type: 'text',
    description: 'Learn the four core patterns: triage, routing, approvals, logging.',
    content: `
### The Four Core Patterns

Great automations follow repeatable **patterns**. Learn these four and you can build most business flows:

| Pattern | Purpose |
|---------|---------|
| **1. Triage** | Classify the incoming item (lead type, urgency, topic) |
| **2. Routing** | Send it to the right person/team (sales, support, finance) |
| **3. Approval** | A human checks any customer-facing draft |
| **4. Logging** | Write a record (who/what/when/result) for audit and reporting |

### The Recipe Mindset

> *Trigger → Triage → Draft → Approval → Action → Log → Notify*

Start small, then add branches (if/else) based on triage labels.
    `
  },
  'i-m3-l2': {
    id: 'i-m3-l2',
    title: 'Build a Multi-Step Flow',
    type: 'text',
    description: 'Create a lead handling flow from trigger to CRM.',
    content: `
### Lead Handling Flow

We'll build a robust **lead handling** flow:

### The Complete Flow

| Step | Type | Description |
|------|------|-------------|
| **Trigger** | System | Web form submission or "New lead email" |
| **Triage** | AI | Classify Intent (demo/support/other), Urgency (low/med/high), Fit (basic/high-fit) |
| **Draft Reply** | AI | Use a template with tone + word limit + "no invented facts" |
| **Approval** | Human | Approver edits/approves; only then send |
| **Action** | System | Send reply to lead; schedule meeting link if requested |
| **Meeting Brief** | AI | From the thread, produce JSON brief |
| **Log** | System | Append to Sheet/DB with all details |
| **Sync** | System | Create/update CRM (HubSpot) with contact |

### Edge Cases

Missing contact, unclear request → bounce to approver with questions; **do not send** to the lead.
    `
  },
  'i-m3-l3': {
    id: 'i-m3-l3',
    title: 'Cost Control & Model Tiering',
    type: 'text',
    description: 'Keep automations affordable with smart model selection.',
    content: `
### Fast Where You Can, Strong Where You Must

Keep automations affordable by **tiering** models and limiting runs.

### Rules of Thumb

- Use a **cheaper/faster model** for triage and first drafts
- Use a **higher-quality model** only for final checks or complex tasks
- Add **rate limits** (e.g., max runs per hour/day)
- Add a **monthly cap** + alerts
- Cache and reuse common outputs (e.g., signature blocks, boilerplates)

### Prompt Hygiene

- Short, focused prompts
- Reuse templates
- Avoid dumping huge threads unless necessary

### Cost Formula

> **Cost = (Runs × Tokens per Run × Price per Token)**

Reduce any of these to cut costs.
    `
  },
  'i-m3-l4': {
    id: 'i-m3-l4',
    title: 'Monitoring & Dashboards',
    type: 'text',
    description: 'Track health and impact with the right metrics.',
    content: `
### Set-and-Tend, Not Set-and-Forget

Automations need ongoing monitoring. Track **health** and **impact**.

### Operational Metrics

| Metric | Why It Matters |
|--------|----------------|
| Success rate | Are runs completing? |
| Failure rate | What's breaking? |
| Approval turnaround | Are humans bottlenecking? |
| Latency | Is it fast enough? |

### Business Metrics

| Metric | Why It Matters |
|--------|----------------|
| Volume processed | Scale of impact |
| **Minutes saved** | Core ROI metric |
| Conversion rate | Business outcome |

### Alerts to Set Up

- Payment/webhook failures
- High failure rates
- Approval queue backlog
- Spend nearing cap
    `
  },
  'i-m3-l5': {
    id: 'i-m3-l5',
    title: 'Quality Checks & A/B Tests',
    type: 'text',
    description: 'Continuous improvement through experiments.',
    content: `
### Keep Improving with Light Experiments

### Quality Techniques

| Technique | How |
|-----------|-----|
| **Self-check** | Ask the model to validate schema and list assumptions |
| **A/B prompts** | Compare two prompt versions on a small sample; pick the winner |
| **Golden set** | 10–20 representative cases you re-run to ensure quality stays stable |
| **Feedback capture** | Add thumbs-up/down or short tags from approvers (tone/clarity/fact) |

### Iteration Cadence

- **Weekly:** 15-minute review
- **Monthly:** Prompt/component updates (versioned)

### The A/B Process

1. Create variant B of your prompt
2. Run both on 10–20 cases
3. Compare quality scores
4. Promote the winner
    `
  },
  'i-m3-l6': {
    id: 'i-m3-l6',
    title: 'Governance, Privacy & Rollbacks',
    type: 'text',
    description: 'Make automations trustworthy and resilient.',
    content: `
### Make Automations Trustworthy

### Governance Checklist

| Item | Description |
|------|-------------|
| **SOP** | Per flow: purpose, steps, approval, data rules, owner |
| **Access** | Who can edit/run; enforce least privilege |
| **POPIA** | Minimize personal data; consent; retention windows; redact in logs |
| **Rollback** | Keep a manual path + disable switch |
| **Change log** | Version prompts/components; record dates and reasons |

### Culture Rule

> **"When in doubt, stop and ask."**

It's better to pause than send a wrong message.

### Rollback Plan Template

1. **Detect:** How will you know something is wrong?
2. **Disable:** Where's the off switch?
3. **Manual Path:** What do humans do while it's offline?
4. **Fix:** Who fixes it and how?
5. **Restore:** How do you turn it back on safely?
    `
  },
  'i-m3-l7': {
    id: 'i-m3-l7',
    title: 'Module Quiz: No-Code Automations',
    type: 'quiz',
    description: 'Test your knowledge of advanced automation strategies.',
    quiz: [
      {
        question: 'A safe default for customer messages is to include:',
        options: [
          'No human involvement',
          'A human approval step before sending',
          'Automatic sending with no review',
          'Only AI-generated content'
        ],
        correctAnswer: 1
      },
      {
        question: 'A good cost-saving tactic is to:',
        options: [
          'Use the most expensive model for everything',
          'Use cheaper models for triage/drafts and stronger models for final checks',
          'Avoid using AI at all',
          'Remove all rate limits'
        ],
        correctAnswer: 1
      },
      {
        question: 'A core business metric for AI workflows is:',
        options: [
          'Number of prompts used',
          'Minutes saved (time ROI)',
          'Color of the dashboard',
          'Number of AI models available'
        ],
        correctAnswer: 1
      },
      {
        question: 'An A/B test compares:',
        options: [
          'Two different users',
          'Two prompt versions on the same task',
          'Two different companies',
          'Two different time zones'
        ],
        correctAnswer: 1
      },
      {
        question: 'Least privilege means:',
        options: [
          'Give everyone admin access',
          'Give people only the access they need to do their job',
          'Remove all access controls',
          'Trust everyone equally'
        ],
        correctAnswer: 1
      }
    ]
  }
}
