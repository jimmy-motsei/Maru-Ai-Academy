import Link from 'next/link'
import { Card, Badge, Button, ModuleIcon } from '../ui'
import { Module } from '@/types/modules'

interface ModuleCardProps {
  module: Module
  compact?: boolean
  isLocked?: boolean
}

export const ModuleCard: React.FC<ModuleCardProps> = ({ module, compact = false, isLocked = false }) => {
  return (
    <Card className={`h-full flex flex-col group relative overflow-hidden ${isLocked ? 'opacity-75 grayscale-[0.5]' : ''}`} hover={!isLocked}>
      {/* Background decoration */}
      <div className="absolute -right-10 -top-10 w-32 h-32 bg-maru-blue-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"></div>
      
      <div className="flex items-start justify-between mb-4 relative z-10">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-maru-line bg-maru-cloud text-maru-teal shadow-sm transition-transform duration-300 group-hover:scale-110">
          <ModuleIcon name={module.icon} locked={isLocked} />
        </div>
        <Badge variant={isLocked ? 'neutral' : (module.stream === 'beginner' ? 'teal' : 'blue')} size="sm">
          {isLocked ? 'Pro Only' : `Module ${module.order}`}
        </Badge>
      </div>

      <div className="flex-grow relative z-10">
        <h3 className="text-xl font-heading font-bold text-maru-navy mb-2 group-hover:text-maru-blue-700 transition-colors">
          {module.title}
        </h3>
        <p className="text-maru-grey text-sm line-clamp-2 mb-4">
          {module.description}
        </p>
        
        {!compact && (
          <div className="flex items-center space-x-4 text-xs text-maru-grey mb-6">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {module.duration}
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              {module.lessonsCount} Lessons
            </div>
          </div>
        )}
      </div>

      <div className="relative z-10 mt-auto pt-4 border-t border-maru-line">
        <Link href={isLocked ? '/pricing' : `/modules/${module.slug}`} className="w-full">
          <Button 
            variant={isLocked ? 'primary' : 'secondary'} 
            fullWidth 
            size="sm" 
            className={isLocked ? '' : 'group-hover:bg-maru-blue-100 group-hover:border-maru-blue-100'}
          >
            {isLocked ? 'Upgrade to unlock' : 'Start module'}
          </Button>
        </Link>
      </div>
    </Card>
  )
}

export default ModuleCard
