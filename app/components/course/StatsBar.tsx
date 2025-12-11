import { Course } from '@/types/modules'

interface StatsBarProps {
  course: Course
}

export const StatsBar: React.FC<StatsBarProps> = ({ course }) => {
  return (
    <div className="border-b border-gray-200 bg-white sticky top-0 z-40 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex overflow-x-auto py-4 gap-8 lg:gap-16 text-sm whitespace-nowrap scrollbar-hide">
          <div className="flex flex-col">
             <span className="font-bold text-gray-900">Level</span>
             <span className="text-gray-600">{course.level}</span>
          </div>
          <div className="flex flex-col">
             <span className="font-bold text-gray-900">Total Duration</span>
             <span className="text-gray-600">{course.duration}</span>
          </div>
          <div className="flex flex-col">
             <span className="font-bold text-gray-900">Schedule</span>
             <span className="text-gray-600">Flexible</span>
          </div>
          <div className="flex flex-col">
             <span className="font-bold text-gray-900">Language</span>
             <span className="text-gray-600">English</span>
          </div>
        </div>
      </div>
    </div>
  )
}
