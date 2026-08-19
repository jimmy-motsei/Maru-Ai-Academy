import React from 'react'
import {
  BookOpen,
  Lightbulb,
  Lock,
  MessageSquare,
  Puzzle,
  Repeat,
  Rocket,
  Search,
  Shield,
  Wrench,
  type LucideIcon,
} from 'lucide-react'

/**
 * Maps a module's `icon` key to a Lucide icon.
 *
 * The curriculum already stores semantic keys ('bulb', 'rocket', 'shield'),
 * which were being rendered as emoji in two places with two different switch
 * statements. The Maru brand voice forbids emoji, and the keys map cleanly
 * onto real icons, so the switch lives here once.
 *
 * Teal is correct for these: module icons sit alongside kicker labels as
 * section furniture rather than as UI chrome.
 */

const ICONS: Record<string, LucideIcon> = {
  bulb: Lightbulb,
  message: MessageSquare,
  tool: Wrench,
  rocket: Rocket,
  repeat: Repeat,
  search: Search,
  puzzle: Puzzle,
  shield: Shield,
}

export interface ModuleIconProps {
  /** Semantic key from the curriculum, e.g. 'bulb'. Unknown keys fall back. */
  name?: string
  locked?: boolean
  className?: string
}

export const ModuleIcon: React.FC<ModuleIconProps> = ({
  name,
  locked = false,
  className = 'h-6 w-6',
}) => {
  const Icon = locked ? Lock : (name && ICONS[name]) || BookOpen
  return <Icon className={className} aria-hidden="true" />
}

export default ModuleIcon
