import { Badge, Button } from '@/components/ui'
import { Course } from '@/types/modules'

interface CourseHeroProps {
  course: Course
}

export const CourseHero: React.FC<CourseHeroProps> = ({ course }) => {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-primary-900 text-white py-16 lg:py-24 relative overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/4"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          <div className="flex items-center gap-4 mb-6">
            <Badge variant="primary" className="bg-primary-500/20 text-primary-200 border border-primary-500/30">
              Course
            </Badge>
            <div className="flex items-center text-sm text-gray-300">
              <span className="text-yellow-400 mr-1">★</span>
              {course.rating} ({course.totalReviews.toLocaleString()} reviews)
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight">
            {course.title}
          </h1>
          
          <p className="text-xl text-gray-200 mb-8 leading-relaxed max-w-2xl">
            {course.shortDesc}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <Button variant="primary" size="lg" className="shadow-lg shadow-primary-500/20 border-0">
              Enroll for Free
            </Button>
            <div className="text-sm text-gray-400">
              <span className="font-bold text-white">{course.enrollmentCount.toLocaleString()}</span> already enrolled
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/10 flex items-center gap-4">
            <div className="bg-white/10 rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">
               {course.instructors[0].name.charAt(0)}
            </div>
            <div className="text-sm">
              <div className="text-gray-400">Instructor</div>
              <div className="font-semibold">{course.instructors[0].name}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
