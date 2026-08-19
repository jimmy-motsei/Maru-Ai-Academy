import { Course } from '@/types/modules'

interface StatsBarProps {
  course: Course
}

export const StatsBar: React.FC<StatsBarProps> = ({ course }) => {
  return (
    <div className="border-b border-maru-line bg-white sticky top-0 z-40 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex overflow-x-auto py-4 gap-8 lg:gap-16 text-sm whitespace-nowrap scrollbar-hide">
          <div className="flex flex-col">
             <span className="font-bold text-maru-navy">Level</span>
             <span className="text-maru-grey">{course.level}</span>
          </div>
          <div className="flex flex-col">
             <span className="font-bold text-maru-navy">Total Duration</span>
             <span className="text-maru-grey">{course.duration}</span>
          </div>
          <div className="flex flex-col">
             <span className="font-bold text-maru-navy">Schedule</span>
             <span className="text-maru-grey">Flexible</span>
          </div>
          <div className="flex flex-col">
             <span className="font-bold text-maru-navy">Language</span>
             <span className="text-maru-grey">English</span>
          </div>
        </div>
      </div>
    </div>
  )
}
