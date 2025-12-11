'use client';

import { useEffect, useState } from 'react';
import { ModuleCard } from '@/components/modules';
import { Badge } from '@/components/ui';
import api, { ApiModule } from '@/lib/api';

// Group modules by stream
interface StreamGroup {
  id: 'beginner' | 'intermediate';
  title: string;
  description: string;
  modules: ApiModule[];
}

export default function ModulesPage() {
  const [modules, setModules] = useState<ApiModule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchModules() {
      setLoading(true);
      const { data, error } = await api.getModules();
      
      if (error) {
        setError(error);
        setLoading(false);
        return;
      }
      
      if (data?.modules) {
        setModules(data.modules);
      }
      setLoading(false);
    }

    fetchModules();
  }, []);

  // Group modules by stream
  const streams: StreamGroup[] = [
    {
      id: 'beginner',
      title: 'Beginner Stream',
      description: 'Perfect for getting started with AI. Learn the fundamentals of AI productivity, safety, and basic automation.',
      modules: modules.filter(m => m.stream === 'BEGINNER').sort((a, b) => a.order - b.order)
    },
    {
      id: 'intermediate',
      title: 'Intermediate Stream',
      description: 'For power users ready to scale AI across teams. Advanced workflows, governance, and team automation.',
      modules: modules.filter(m => m.stream === 'INTERMEDIATE').sort((a, b) => a.order - b.order)
    }
  ];

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading modules...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <p className="text-red-600 mb-4">Error loading modules: {error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="text-primary-600 hover:underline"
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="primary" className="mb-4">Curriculum</Badge>
          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-gray-900 mb-6">
            Everything You Need to Master AI
          </h1>
          <p className="text-xl text-gray-600">
            A comprehensive, structured learning path designed to take you from novice to AI expert.
          </p>
        </div>

        <div className="space-y-20">
          {streams.map((stream) => (
            <section key={stream.id} className="relative">
              {/* Stream Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 border-b border-gray-200 pb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-3xl font-heading font-bold text-gray-900">
                      {stream.title}
                    </h2>
                    <Badge variant={stream.id === 'beginner' ? 'success' : 'primary'}>
                      {stream.modules.length} Modules
                    </Badge>
                  </div>
                  <p className="text-lg text-gray-600 max-w-2xl">
                    {stream.description}
                  </p>
                </div>
              </div>

              {/* Stream Grid */}
              {stream.modules.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stream.modules.map((module) => (
                    <ModuleCard 
                      key={module.id} 
                      module={{
                        id: module.id,
                        title: module.title,
                        description: module.description,
                        stream: module.stream.toLowerCase() as 'beginner' | 'intermediate',
                        order: module.order,
                        slug: module.slug,
                        icon: module.icon,
                        duration: module.duration
                      }} 
                    />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">No modules available yet.</p>
              )}
            </section>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-24 pt-16 border-t border-gray-200 text-center">
          <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">
            Not sure where to start?
          </h2>
          <p className="text-gray-600 mb-8">
            Take our quick assessment to find the perfect learning path for your goals.
          </p>
          <button className="text-primary-600 font-semibold hover:text-primary-700 underline">
            Take the AI Readiness Assessment &rarr;
          </button>
        </div>
      </div>
    </div>
  )
}
