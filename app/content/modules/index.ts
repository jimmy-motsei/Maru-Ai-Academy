import { AI_MADE_SIMPLE_CONTENT, LessonContent } from './ai-made-simple'
import { PROMPTS_THAT_WORK_CONTENT } from './prompts-that-work'
import { NO_CODE_QUICK_WINS_CONTENT } from './no-code-quick-wins'
import { FIRST_LIVE_WORKFLOW_CONTENT } from './first-live-workflow'
// Intermediate Stream
import { AD_HOC_TO_REPEATABLE_CONTENT } from './ad-hoc-to-repeatable'
import { SEMANTIC_SEARCH_CONTENT } from './semantic-search-private-knowledge'
import { NO_CODE_AUTOMATIONS_CONTENT } from './no-code-automations'
import { MEASUREMENT_GOVERNANCE_CONTENT } from './measurement-governance'

// Registry of all module content
export const CONTENT_REGISTRY: Record<string, Record<string, LessonContent>> = {
  // Beginner Stream
  'ai-made-simple': AI_MADE_SIMPLE_CONTENT,
  'prompts-that-work': PROMPTS_THAT_WORK_CONTENT,
  'no-code-quick-wins': NO_CODE_QUICK_WINS_CONTENT,
  'first-live-workflow': FIRST_LIVE_WORKFLOW_CONTENT,
  // Intermediate Stream
  'ad-hoc-to-repeatable': AD_HOC_TO_REPEATABLE_CONTENT,
  'semantic-search-private-knowledge': SEMANTIC_SEARCH_CONTENT,
  'no-code-automations': NO_CODE_AUTOMATIONS_CONTENT,
  'measurement-governance': MEASUREMENT_GOVERNANCE_CONTENT,
}

export function getLessonContent(moduleSlug: string, lessonId: string): LessonContent | null {
  const moduleContent = CONTENT_REGISTRY[moduleSlug]
  if (!moduleContent) return null
  
  return moduleContent[lessonId] || null
}
