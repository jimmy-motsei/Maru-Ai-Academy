'use client'

import { useState } from 'react'
import { Course } from '@/types/modules'
import { Card } from '@/components/ui'

interface CurriculumAccordionProps {
  course: Course
}

export const CurriculumAccordion: React.FC<CurriculumAccordionProps> = ({ course }) => {
  const [openModuleId, setOpenModuleId] = useState<string | null>(course.modules[0]?.id || null)

  const toggleModule = (id: string) => {
    setOpenModuleId(openModuleId === id ? null : id)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        There are {course.modules.length} modules in this course
      </h2>
      
      {course.modules.map((module) => (
        <Card key={module.id} className="p-0 overflow-hidden border border-gray-200 shadow-none hover:shadow-md transition-shadow">
          <button 
            onClick={() => toggleModule(module.id)}
            className="w-full text-left p-6 flex items-start justify-between bg-white hover:bg-gray-50 transition-colors"
          >
            <div>
              <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
                Module {module.order}
              </div>
              <h3 className="text-lg font-bold text-gray-900">{module.title}</h3>
            </div>
            <div className={`transform transition-transform duration-300 ${openModuleId === module.id ? 'rotate-180' : ''}`}>
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>
          
          <div 
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              openModuleId === module.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="p-6 pt-0 bg-white border-t border-gray-100">
              <p className="text-gray-600 mb-4">{module.description}</p>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <span className="mr-2">📺</span> {module.lessonsCount} Video Lessons
                </div>
                <div className="flex items-center">
                  <span className="mr-2">📖</span> 2 Readings
                </div>
                <div className="flex items-center">
                  <span className="mr-2">⏱️</span> {module.duration}
                </div>
              </div>
              
              <div className="mt-4">
                 <button className="text-primary-600 font-semibold text-sm hover:text-primary-700">
                   View Module Details &rarr;
                 </button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
