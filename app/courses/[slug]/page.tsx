import { notFound } from 'next/navigation'
import { getCourseBySlug } from '@/types/modules'
import { CourseHero, StatsBar, CurriculumAccordion } from '@/components/course'
import { Badge, Card } from '@/components/ui'
import Image from 'next/image'

export default function CourseLandingPage({ params }: { params: { slug: string } }) {
  // In a real app, verify slug or fetch data. For this demo, we use the single mock course
  // if the slug matches, or default to it to show the design.
  const course = getCourseBySlug(params.slug) || getCourseBySlug('intro-to-ai')

  if (!course) {
    notFound()
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      
      {/* 1. Hero Section */}
      <CourseHero course={course} />
      
      {/* 2. Stats Bar */}
      <StatsBar course={course} />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* What you'll learn */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What you'll learn</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Explain the definition of AI and its key concepts",
                  "Understand the difference between AI, Machine Learning, and Deep Learning",
                  "Identify real-world use cases and applications",
                  "Discuss AI ethics, bias, and safety concerns",
                  "Write effective prompts for generative AI models"
                ].map((item, i) => (
                  <div key={i} className="flex items-start">
                     <svg className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                     </svg>
                     <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Skills You'll Gain */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Skills you'll gain</h2>
              <div className="flex flex-wrap gap-3">
                {course.skills.map((skill) => (
                   <Badge key={skill} variant="neutral" className="bg-gray-200 text-gray-800 px-4 py-2 text-sm rounded-lg">
                     {skill}
                   </Badge>
                ))}
              </div>
            </section>
            
            {/* Curriculum */}
            <section id="syllabus">
               <CurriculumAccordion course={course} />
            </section>

             {/* Instructors */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Instructor</h2>
              {course.instructors.map((inst, i) => (
                <div key={i} className="flex items-start gap-6">
                  <div className="w-24 h-24 bg-gray-200 rounded-full flex-shrink-0 overflow-hidden relative">
                    {/* Placeholder for real image */}
                    <div className="w-full h-full bg-primary-100 flex items-center justify-center text-3xl font-bold text-primary-300">
                      {inst.name.charAt(0)}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary-700 underline mb-1">{inst.name}</h3>
                    <p className="text-gray-900 font-medium mb-2">{inst.role} @ {inst.company}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Sarah is a leading researcher in the field of Artificial Intelligence, focusing on making Large Language Models accessible and safe for enterprise use. She has over 15 years of experience in the tech industry.
                    </p>
                  </div>
                </div>
              ))}
            </section>
            
          </div>

          {/* Sidebar Column */}
          <div className="hidden lg:block space-y-8">
            <Card className="sticky top-24 border-t-4 border-t-primary-500 p-6">
               <h3 className="text-xl font-bold text-gray-900 mb-4">Earn a career certificate</h3>
               <p className="text-gray-600 text-sm mb-6">
                 Add this credential to your LinkedIn profile, resume, or CV. Share it on social media and in your performance review.
               </p>
               <div className="bg-gray-100 h-40 rounded-lg flex items-center justify-center mb-6 border border-gray-200">
                  <span className="text-gray-400 font-medium">Certificate Preview</span>
               </div>
               <button className="text-primary-600 text-sm font-semibold hover:underline">
                 View sample certificate
               </button>
            </Card>

            <div className="bg-white p-6 rounded-xl border border-gray-200">
               <h3 className="font-bold text-gray-900 mb-4">Learner Outcomes</h3>
               <div className="space-y-6">
                 <div>
                   <div className="text-3xl font-bold text-gray-900">35%</div>
                   <p className="text-gray-600 text-sm">started a new career after completing this course</p>
                 </div>
                 <div>
                   <div className="text-3xl font-bold text-gray-900">42%</div>
                   <p className="text-gray-600 text-sm">got a tangible career benefit from this course</p>
                 </div>
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
