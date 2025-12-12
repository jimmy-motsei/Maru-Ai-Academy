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
        lessonsCount: 6
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
        lessonsCount: 4
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
        lessonsCount: 3
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
        lessonsCount: 5
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
        lessonsCount: 6
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
        lessonsCount: 8
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
        lessonsCount: 4
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

