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

