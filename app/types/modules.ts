export interface Lesson {
  id: string
  title: string
  duration: string
  type: 'video' | 'text' | 'quiz'
  content?: string
  videoUrl?: string
}

export interface Module {
  id: string
  title: string
  description: string
  stream: 'beginner' | 'intermediate'
  order: number
  slug: string
  icon?: string
  duration?: string
  lessonsCount?: number
  lessons?: Lesson[]
  learningObjectives?: string[]
}

export interface Stream {
  id: 'beginner' | 'intermediate'
  title: string
  description: string
  modules: Module[]
}

export const STREAMS: Stream[] = [
  {
    id: 'beginner',
    title: 'Beginner Stream',
    description: 'Perfect for getting started with AI. Learn the fundamentals of AI productivity, safety, and basic automation.',
    modules: [
      {
        id: 'b-m1',
        title: 'AI Made Simple',
        description: 'Foundations & Safety. Understand what AI is, how it works, and how to use it securely in your workplace.',
        stream: 'beginner',
        order: 1,
        slug: 'ai-made-simple',
        icon: 'bulb',
        duration: '2 hours',
        lessonsCount: 5,
        learningObjectives: [
          'Understand what AI is and explore different model types in plain English',
          'Navigate tool categories: Chat, document, slide, meeting, and workflow tools',
          'Learn safe AI usage including POPIA basics and the green/yellow/red data framework',
          'Master the 5-part prompt formula: Role, Goal, Inputs, Rules, and Format',
          'Achieve quick productivity wins with AI in emails, slides, and reports'
        ],
        lessons: [
          { id: 'b-m1-l1', title: 'What is Generative AI?', duration: '15 min', type: 'video' },
          { id: 'b-m1-l2', title: 'LLMs vs Traditional Software', duration: '20 min', type: 'text' },
          { id: 'b-m1-l3', title: 'AI Safety & Data Privacy', duration: '25 min', type: 'video' },
          { id: 'b-m1-l4', title: 'The Hallucination Problem', duration: '15 min', type: 'text' },
          { id: 'b-m1-l5', title: 'Module Quiz: Fundamentals', duration: '10 min', type: 'quiz' }
        ]
      },
      {
        id: 'b-m2',
        title: 'Prompts That Work at Work',
        description: 'Master the art of prompting. Learn techniques to get consistent, high-quality results from AI models.',
        stream: 'beginner',
        order: 2,
        slug: 'prompts-that-work',
        icon: 'message',
        duration: '2.5 hours',
        lessonsCount: 7,
        learningObjectives: [
          'Master the reusable prompt frame with variables, quality checks, and base templates',
          'Create professional email templates for customer replies and communication',
          'Transform bullet points into complete presentation outlines and slide skeletons',
          'Summarize long documents and reports into actionable decisions',
          'Implement tracking and follow-through systems with checklists and progress monitoring',
          'Combine everything to create one prompt that generates many high-quality outputs'
        ],
        lessons: [
          { id: 'b-m2-l1', title: 'The Reusable Prompt Frame', duration: '20 min', type: 'text' },
          { id: 'b-m2-l2', title: 'Email & Customer Replies', duration: '25 min', type: 'text' },
          { id: 'b-m2-l3', title: 'Presentations & Slide Outlines', duration: '20 min', type: 'text' },
          { id: 'b-m2-l4', title: 'Reports & Summaries', duration: '20 min', type: 'text' },
          { id: 'b-m2-l5', title: 'Tracking & Follow-Through', duration: '20 min', type: 'text' },
          { id: 'b-m2-l6', title: 'Putting It Together', duration: '15 min', type: 'text' },
          { id: 'b-m2-l7', title: 'Module Quiz: Prompts That Work', duration: '15 min', type: 'quiz' }
        ]
      },
      {
        id: 'b-m3',
        title: 'Picking Tools & No-Code Quick Wins',
        description: 'Navigate the AI tool landscape and build simple automations without writing any code.',
        stream: 'beginner',
        order: 3,
        slug: 'no-code-quick-wins',
        icon: 'tool',
        duration: '3 hours',
        lessonsCount: 7,
        learningObjectives: [
          'Select the right AI tool using a simple 5-point checklist for evaluation',
          'Understand no-code automation patterns: Triggers, Actions, and Checks',
          'Build your first micro-automation like an enquiry auto-reply and logging system',
          'Create tracking dashboards to make automation results visible',
          'Implement cost caps and privacy guardrails with simple, non-negotiable rules',
          'Troubleshoot and iterate your automations to improve them each week'
        ],
        lessons: [
          { id: 'b-m3-l1', title: 'Choose the Right Tool (Simple Checklist)', duration: '15 min', type: 'text' },
          { id: 'b-m3-l2', title: 'No-Code Automation Basics', duration: '20 min', type: 'text' },
          { id: 'b-m3-l3', title: 'Build Your First Micro-Automation', duration: '30 min', type: 'text' },
          { id: 'b-m3-l4', title: 'Tracking & Dashboards', duration: '20 min', type: 'text' },
          { id: 'b-m3-l5', title: 'Cost Caps & Privacy Guardrails', duration: '20 min', type: 'text' },
          { id: 'b-m3-l6', title: 'Troubleshooting & Iteration', duration: '15 min', type: 'text' },
          { id: 'b-m3-l7', title: 'Module Quiz: No-Code Quick Wins', duration: '15 min', type: 'quiz' }
        ]
      },
      {
        id: 'b-m4',
        title: 'Your First Live Workflow',
        description: 'Capstone Project. Build and deploy a real-world AI workflow that solves a specific business problem.',
        stream: 'beginner',
        order: 4,
        slug: 'first-live-workflow',
        icon: 'rocket',
        duration: '4 hours',
        lessonsCount: 7,
        learningObjectives: [
          'Select a simple and valuable capstone project that delivers real impact',
          'Design a complete workflow by mapping steps, roles, and guardrails',
          'Build and test your workflow with dry runs, edge cases, and tone adjustments',
          'Measure impact using baselines, scorecards, and weekly review processes',
          'Document Standard Operating Procedures (SOPs) and create one-page policy documents',
          'Launch and support your live workflow with monitoring and iteration'
        ],
        lessons: [
          { id: 'b-m4-l1', title: 'Pick the Right Capstone', duration: '15 min', type: 'text' },
          { id: 'b-m4-l2', title: 'Design the Workflow', duration: '25 min', type: 'text' },
          { id: 'b-m4-l3', title: 'Build & Test', duration: '30 min', type: 'text' },
          { id: 'b-m4-l4', title: 'Measure Impact', duration: '20 min', type: 'text' },
          { id: 'b-m4-l5', title: 'Document & Handover', duration: '20 min', type: 'text' },
          { id: 'b-m4-l6', title: 'Launch & Support', duration: '20 min', type: 'text' },
          { id: 'b-m4-l7', title: 'Module Quiz: First Live Workflow', duration: '15 min', type: 'quiz' }
        ]
      }
    ]
  },
  {
    id: 'intermediate',
    title: 'Intermediate Stream',
    description: 'For power users ready to scale AI across teams. Advanced workflows, governance, and team automation.',
    modules: [
      {
        id: 'i-m1',
        title: 'From Ad-Hoc to Repeatable',
        description: 'Transform one-off success into reliable systems. Standardize your prompts and workflows.',
        stream: 'intermediate',
        order: 1,
        slug: 'ad-hoc-to-repeatable',
        icon: 'repeat',
        duration: '3 hours',
        lessonsCount: 7,
        learningObjectives: [
          'Design prompts as reusable templates with variables, constraints, and structured outputs',
          'Create output contracts with schemas, validation rules, and examples',
          'Ensure data readiness with clean inputs and POPIA compliance',
          'Build prompt component libraries with versioning and governance',
          'Chain template components into workflows with JSON outputs',
          'Implement quality gates with self-checks, human review loops, and feedback mechanisms'
        ],
        lessons: [
          { id: 'i-m1-l1', title: 'Design Prompts as Templates', duration: '25 min', type: 'text' },
          { id: 'i-m1-l2', title: 'Output Contracts', duration: '20 min', type: 'text' },
          { id: 'i-m1-l3', title: 'Data Readiness', duration: '20 min', type: 'text' },
          { id: 'i-m1-l4', title: 'Prompt Libraries & Components', duration: '25 min', type: 'text' },
          { id: 'i-m1-l5', title: 'From Template to Workflow', duration: '30 min', type: 'text' },
          { id: 'i-m1-l6', title: 'Quality Gates & Human-in-the-Loop', duration: '20 min', type: 'text' },
          { id: 'i-m1-l7', title: 'Module Quiz: Ad-Hoc to Repeatable', duration: '15 min', type: 'quiz' }
        ]
      },
      {
        id: 'i-m2',
        title: 'Semantic Search & Private Knowledge',
        description: 'Unlock your company data. Learn about RAG, vector databases, and chatting with your documents.',
        stream: 'intermediate',
        order: 2,
        slug: 'semantic-search-private-knowledge',
        icon: 'search',
        duration: '3.5 hours',
        lessonsCount: 7,
        learningObjectives: [
          'Understand semantic search and how meaning-based search provides grounded answers',
          'Build your mini-library with proper document preparation, metadata, and versioning',
          'Ask better questions using citation prompts to get precise, referenced answers',
          'Implement access controls and POPIA-compliant data protection for private knowledge',
          'Reduce hallucinations through quality checks and systematic evaluation methods',
          'Create a complete Q&A system hands-on with your own knowledge library'
        ],
        lessons: [
          { id: 'i-m2-l1', title: 'What is Semantic Search?', duration: '20 min', type: 'text' },
          { id: 'i-m2-l2', title: 'Build Your Mini-Library', duration: '30 min', type: 'text' },
          { id: 'i-m2-l3', title: 'Ask Better Questions', duration: '25 min', type: 'text' },
          { id: 'i-m2-l4', title: 'Access, Privacy & POPIA', duration: '25 min', type: 'text' },
          { id: 'i-m2-l5', title: 'Reduce Hallucinations', duration: '25 min', type: 'text' },
          { id: 'i-m2-l6', title: 'Hands-On: Create Your Library', duration: '30 min', type: 'text' },
          { id: 'i-m2-l7', title: 'Module Quiz: Semantic Search', duration: '15 min', type: 'quiz' }
        ]
      },
      {
        id: 'i-m3',
        title: 'No-Code Automations That Stick',
        description: 'Advanced no-code strategies. Build robust, error-handled automations that run reliably.',
        stream: 'intermediate',
        order: 3,
        slug: 'no-code-automations',
        icon: 'puzzle',
        duration: '4 hours',
        lessonsCount: 7,
        learningObjectives: [
          'Master automation patterns including triage, routing, approvals, and logging',
          'Build end-to-end multi-step workflows like lead handling systems',
          'Implement cost control with model selection, rate limits, and spending caps',
          'Set up monitoring and dashboards with health metrics, alerts, and reporting',
          'Run quality checks and A/B tests using golden sets and feedback loops',
          'Ensure governance with SOPs, access controls, POPIA compliance, and rollback procedures'
        ],
        lessons: [
          { id: 'i-m3-l1', title: 'Automation Patterns', duration: '25 min', type: 'text' },
          { id: 'i-m3-l2', title: 'Build a Multi-Step Flow', duration: '35 min', type: 'text' },
          { id: 'i-m3-l3', title: 'Cost Control & Model Tiering', duration: '25 min', type: 'text' },
          { id: 'i-m3-l4', title: 'Monitoring & Dashboards', duration: '25 min', type: 'text' },
          { id: 'i-m3-l5', title: 'Quality Checks & A/B Tests', duration: '25 min', type: 'text' },
          { id: 'i-m3-l6', title: 'Governance, Privacy & Rollbacks', duration: '25 min', type: 'text' },
          { id: 'i-m3-l7', title: 'Module Quiz: No-Code Automations', duration: '15 min', type: 'quiz' }
        ]
      },
      {
        id: 'i-m4',
        title: 'Measurement, Governance & Handover',
        description: 'Leading AI initiatives. How to measure ROI, ensure compliance, and manage team adoption.',
        stream: 'intermediate',
        order: 4,
        slug: 'measurement-governance',
        icon: 'shield',
        duration: '3 hours',
        lessonsCount: 7,
        learningObjectives: [
          'Define outcome-focused KPIs that matter and establish baseline measurements',
          'Design instrumentation and data models with proper logging schemas and retention policies',
          'Create focused dashboards and establish weekly/monthly review cadences for decision-making',
          'Develop one-page policy documents and risk frameworks for compliance',
          'Prepare comprehensive handover documentation and SOPs for team scaling',
          'Manage workflow portfolios including scale-out strategies and sunset procedures'
        ],
        lessons: [
          { id: 'i-m4-l1', title: 'KPIs That Matter', duration: '25 min', type: 'text' },
          { id: 'i-m4-l2', title: 'Instrumentation & Data Model', duration: '25 min', type: 'text' },
          { id: 'i-m4-l3', title: 'Dashboards & Reviews', duration: '20 min', type: 'text' },
          { id: 'i-m4-l4', title: 'Policy & Risk', duration: '25 min', type: 'text' },
          { id: 'i-m4-l5', title: 'Handover & SOPs', duration: '25 min', type: 'text' },
          { id: 'i-m4-l6', title: 'Scale-Out & Sunset', duration: '20 min', type: 'text' },
          { id: 'i-m4-l7', title: 'Module Quiz: Measurement & Governance', duration: '15 min', type: 'quiz' }
        ]
      }
    ]
  }
]

export interface Instructor {
  name: string
  role: string
  image: string
  bio?: string
  company?: string
}

export interface Course {
  id: string
  slug: string
  title: string
  description: string
  shortDesc: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  duration: string
  rating: number
  totalReviews: number
  enrollmentCount: number
  skills: string[]
  instructors: Instructor[]
  modules: Module[]
}

export const COURSES: Course[] = [
  {
    id: 'course-1',
    slug: 'intro-to-ai',
    title: 'Introduction to Artificial Intelligence (AI)',
    shortDesc: 'Master the basics of AI, machine learning, and prompt engineering.',
    description: 'In this course you will learn what Artificial Intelligence (AI) is, explore use cases and applications of AI, understand AI concepts and terminology like machine learning, deep learning and neural networks. You will be exposed to various issues and concerns surrounding AI such as ethics and bias, and jobs, and get advice from experts about learning and starting a career in AI.',
    level: 'Beginner',
    duration: '10 hours',
    rating: 4.8,
    totalReviews: 1240,
    enrollmentCount: 15400,
    skills: ['Generative AI', 'Prompt Engineering', 'AI Ethics', 'Large Language Models'],
    instructors: [
      {
        name: 'Dr. Sarah Chen',
        role: 'AI Research Scientist',
        image: '/instructors/sarah.jpg',
        company: 'DeepTech AI'
      }
    ],
    modules: STREAMS[0].modules // Reusing the beginner stream modules
  }
]

export function getCourseBySlug(slug: string): Course | undefined {
  return COURSES.find(c => c.slug === slug)
}

export function getModuleBySlug(slug: string): Module | undefined {
  const allModules = STREAMS.flatMap(s => s.modules)
  return allModules.find(m => m.slug === slug)
}

