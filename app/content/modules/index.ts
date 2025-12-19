import { AI_MADE_SIMPLE_CONTENT, LessonContent } from './ai-made-simple'

// Registry of all module content
export const CONTENT_REGISTRY: Record<string, Record<string, LessonContent>> = {
  'ai-made-simple': AI_MADE_SIMPLE_CONTENT,
  // Add other modules here as we create them
}

export function getLessonContent(moduleSlug: string, lessonId: string): LessonContent | null {
  const moduleContent = CONTENT_REGISTRY[moduleSlug]
  if (!moduleContent) return null
  
  return moduleContent[lessonId] || null
}
